const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");

const rootDir = __dirname;
const dbPath = path.join(rootDir, "workbench.sqlite");
const port = Number(process.env.PORT || 4173);
const workspaceKey = "default";

const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS app_state (
    workspace TEXT PRIMARY KEY,
    state_json TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    kind TEXT NOT NULL,
    ref TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_memories_project_kind
    ON memories(project_id, kind);

  CREATE TABLE IF NOT EXISTS state_backups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workspace TEXT NOT NULL,
    reason TEXT NOT NULL,
    state_json TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_state_backups_workspace_created
    ON state_backups(workspace, created_at);
`);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function readSavedState() {
  const row = db
    .prepare("SELECT state_json FROM app_state WHERE workspace = ?")
    .get(workspaceKey);
  return row ? JSON.parse(row.state_json) : null;
}

function projectStats(project = {}) {
  const chapters = project.chapters || [];
  return {
    chapters: chapters.length,
    withText: chapters.filter((chapter) => String(chapter.manuscript || "").trim()).length,
    done: chapters.filter((chapter) => chapter.status === "完成").length,
    reviewed: chapters.filter((chapter) => ["已审查", "审查中", "待修", "需审查"].includes(chapter.status)).length,
    withMeta: chapters.filter((chapter) => chapter.llmMeta).length,
    words: Number(project.words || 0),
  };
}

function validateStateTransition(previousState, nextState) {
  if (!previousState || !nextState) return null;
  for (const previousProject of previousState.projects || []) {
    const nextProject = (nextState.projects || []).find((project) => project.id === previousProject.id);
    if (!nextProject) continue;
    const before = projectStats(previousProject);
    const after = projectStats(nextProject);
    const hadWork = before.withText >= 3 || before.done >= 2 || before.withMeta >= 1 || before.words >= 5000;
    const lostMostText = before.withText >= 3 && after.withText <= Math.max(1, Math.floor(before.withText * 0.3));
    const lostDone = before.done >= 2 && after.done === 0;
    const sameOrLargerPlan = after.chapters >= Math.max(before.chapters * 0.9, before.chapters - 5);
    if (hadWork && sameOrLargerPlan && (lostMostText || lostDone)) {
      return {
        projectId: previousProject.id,
        projectTitle: previousProject.title,
        message: `拒绝保存：检测到《${previousProject.title}》可能被旧页面覆盖，正文章节 ${before.withText}→${after.withText}，完成章节 ${before.done}→${after.done}。请刷新页面后再操作。`,
        before,
        after,
      };
    }
  }
  return null;
}

function backupCurrentState(reason = "before-save", now = new Date().toISOString()) {
  const row = db
    .prepare("SELECT state_json FROM app_state WHERE workspace = ?")
    .get(workspaceKey);
  if (!row?.state_json) return false;
  db.prepare(`
    INSERT INTO state_backups (workspace, reason, state_json, created_at)
    VALUES (?, ?, ?, ?)
  `).run(workspaceKey, String(reason || "before-save").slice(0, 120), row.state_json, now);
  const stale = db
    .prepare("SELECT id FROM state_backups WHERE workspace = ? ORDER BY id DESC LIMIT 1 OFFSET 40")
    .get(workspaceKey);
  if (stale?.id) {
    db.prepare("DELETE FROM state_backups WHERE workspace = ? AND id <= ?").run(workspaceKey, stale.id);
  }
  return true;
}

function compactErrorText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500);
}

function joinUrl(baseUrl, apiPath) {
  return `${String(baseUrl || "").replace(/\/+$/, "")}/${String(apiPath || "").replace(/^\/+/, "")}`;
}

function versionedBaseUrl(kind, baseUrl) {
  const fallback = kind === "deepseek"
    ? "https://api.deepseek.com/v1"
    : kind === "anthropic"
      ? "https://api.anthropic.com/v1"
      : "https://api.openai.com/v1";
  const base = String(baseUrl || fallback).replace(/\/+$/, "");
  if (kind === "gemini") return baseUrl || "https://generativelanguage.googleapis.com";
  return /\/v\d+(?:\b|\/?$)/.test(base) ? base : `${base}/v1`;
}

function providerKind(provider = {}, route = {}) {
  const text = `${provider.id || ""} ${provider.name || ""} ${route.provider || ""}`.toLowerCase();
  if (text.includes("deepseek")) return "deepseek";
  if (text.includes("anthropic") || text.includes("claude")) return "anthropic";
  if (text.includes("gemini") || text.includes("google")) return "gemini";
  if (text.includes("openai") || text.includes("gpt")) return "openai";
  return "openai";
}

function normalizeApiKey(provider = {}) {
  const key = String(provider.key || "").trim();
  if (!key) throw new Error(`${provider.name} API Key 为空`);
  if (/[\u2022\u25cf\u25e6\u2219]/.test(key) || /^[*•●]+$/.test(key)) {
    throw new Error(`${provider.name} API Key 仍是占位符，请粘贴真实密钥`);
  }
  if (/[^\x20-\x7e]/.test(key)) {
    throw new Error(`${provider.name} API Key 含有非法字符，请删除占位符或中文符号后重新粘贴`);
  }
  return key;
}

function findRouteAndProvider(state, taskName, providerId = "") {
  const task = String(taskName || "章节正文");
  const routes = state.routes || [];
  const providers = state.providers || [];
  const requestedProvider = providerId ? providers.find((item) => item.id === providerId) : null;
  const route = requestedProvider
    ? routes.find((item) => {
        const routeProvider = String(item.provider || "").toLowerCase();
        const providerName = String(requestedProvider.name || "").toLowerCase();
        return routeProvider === providerName || routeProvider.includes(providerName) || providerName.includes(routeProvider);
      }) || routes[0]
    : routes.find((item) => item.task === task)
    || routes.find((item) => String(item.task || "").includes(task) || task.includes(String(item.task || "")))
    || routes.find((item) => /章节正文|正文/.test(String(item.task || "")))
    || routes[0];
  if (!route) throw new Error("未配置任务模型路由");

  const routeProvider = String(route.provider || "").toLowerCase();
  const provider = requestedProvider
    || providers.find((item) => String(item.name || "").toLowerCase() === routeProvider)
    || providers.find((item) => String(item.name || "").toLowerCase().includes(routeProvider) || routeProvider.includes(String(item.name || "").toLowerCase()))
    || providers.find((item) => providerKind(item, route) === providerKind({}, route));
  if (!provider) throw new Error(`未找到供应商配置：${route.provider}`);
  if (!provider.enabled) throw new Error(`${provider.name} 当前未启用`);
  const key = normalizeApiKey(provider);
  return { route, provider: { ...provider, key }, kind: providerKind(provider, route) };
}

function normalizeUsage(kind, usage = {}) {
  if (kind === "anthropic") {
    const input = Number(usage.input_tokens || 0) + Number(usage.cache_creation_input_tokens || 0) + Number(usage.cache_read_input_tokens || 0);
    const output = Number(usage.output_tokens || 0);
    return { inputTokens: input, outputTokens: output, totalTokens: input + output, raw: usage };
  }
  if (kind === "gemini") {
    return {
      inputTokens: Number(usage.promptTokenCount || 0),
      outputTokens: Number(usage.candidatesTokenCount || 0),
      totalTokens: Number(usage.totalTokenCount || 0),
      raw: usage,
    };
  }
  return {
    inputTokens: Number(usage.input_tokens || usage.prompt_tokens || 0),
    outputTokens: Number(usage.output_tokens || usage.completion_tokens || 0),
    totalTokens: Number(usage.total_tokens || 0),
    raw: usage,
  };
}

function extractOpenAIText(payload = {}) {
  if (payload.output_text) return payload.output_text;
  const parts = [];
  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (content.text) parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

function extractGeminiText(payload = {}) {
  return (payload.candidates || [])
    .flatMap((candidate) => candidate.content?.parts || [])
    .map((part) => part.text || "")
    .filter(Boolean)
    .join("\n")
    .trim();
}

async function postJson(url, headers, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(180000),
  });
  const text = await response.text();
  let payload = {};
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = { raw: text };
  }
  if (!response.ok) {
    const message = payload.error?.message || payload.message || payload.raw || response.statusText;
    throw new Error(`${response.status} ${compactErrorText(message)} ｜ ${url}`);
  }
  return { payload, requestId: response.headers.get("x-request-id") || response.headers.get("request-id") || "" };
}

async function getJson(url, headers) {
  const response = await fetch(url, {
    method: "GET",
    headers,
    signal: AbortSignal.timeout(60000),
  });
  const text = await response.text();
  let payload = {};
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = { raw: text };
  }
  if (!response.ok) {
    const message = payload.error?.message || payload.message || payload.raw || response.statusText;
    throw new Error(`${response.status} ${compactErrorText(message)} ｜ ${url}`);
  }
  return { payload, requestId: response.headers.get("x-request-id") || response.headers.get("request-id") || "" };
}

function findProviderForModels(state, providerId = "") {
  const provider = (state.providers || []).find((item) => item.id === providerId);
  if (!provider) throw new Error("未找到供应商配置");
  if (!provider.enabled) throw new Error(`${provider.name} 当前未启用`);
  const key = normalizeApiKey(provider);
  return { provider: { ...provider, key }, kind: providerKind(provider, {}) };
}

function normalizeModelList(kind, payload = {}) {
  const rows = kind === "gemini" ? (payload.models || []) : (payload.data || []);
  return rows
    .map((item) => {
      const rawId = item.id || item.name || "";
      const id = String(rawId).replace(/^models\//, "");
      return {
        id,
        name: item.display_name || item.displayName || id,
        createdAt: item.created_at || item.created || "",
        methods: item.supportedGenerationMethods || [],
      };
    })
    .filter((item) => item.id)
    .filter((item) => kind !== "gemini" || !item.methods.length || item.methods.includes("generateContent"))
    .sort((a, b) => a.id.localeCompare(b.id));
}

async function listProviderModels(state, providerId) {
  const { provider, kind } = findProviderForModels(state, providerId);
  if (kind === "anthropic") {
    const { payload, requestId } = await getJson(
      joinUrl(versionedBaseUrl(kind, provider.baseUrl), "/models"),
      {
        "x-api-key": provider.key,
        "anthropic-version": "2023-06-01",
      },
    );
    return { provider, kind, models: normalizeModelList(kind, payload), requestId };
  }

  if (kind === "gemini") {
    const { payload, requestId } = await getJson(
      joinUrl(provider.baseUrl || "https://generativelanguage.googleapis.com", "/v1beta/models"),
      { "x-goog-api-key": provider.key },
    );
    return { provider, kind, models: normalizeModelList(kind, payload), requestId };
  }

  const { payload, requestId } = await getJson(
    joinUrl(versionedBaseUrl(kind, provider.baseUrl), "/models"),
    { Authorization: `Bearer ${provider.key}` },
  );
  return { provider, kind, models: normalizeModelList(kind, payload), requestId };
}

function normalizeSavedModels(provider = {}) {
  return (provider.availableModels || [])
    .map((item) => {
      if (typeof item === "string") return { id: item, name: item };
      return { ...item, id: String(item.id || item.name || ""), name: item.name || item.id || "" };
    })
    .filter((item) => item.id);
}

function scoreAvailableModel(kind, modelId, requestedModel = "") {
  const id = String(modelId || "").toLowerCase();
  const requested = String(requestedModel || "").toLowerCase();
  if (!id) return -Infinity;
  if (requested && id === requested) return 100000;

  let score = 0;
  if (requested) {
    const requestedFamily = requested.match(/^[a-z]+-\d+(?:\.\d+)?/)?.[0] || requested.split("-")[0];
    if (requestedFamily && id.startsWith(requestedFamily)) score += 120;
  }

  if (kind === "openai") {
    if (id.includes("gpt-5.5")) score += 95;
    else if (id.includes("gpt-5.4")) score += 90;
    else if (id.includes("gpt-5.3")) score += 80;
    else if (id.includes("gpt-5")) score += 70;
    else if (id.includes("gpt-4")) score += 50;
    if (id.includes("codex")) score -= 18;
    if (id.includes("nano")) score -= 35;
    if (id.includes("mini")) score -= 14;
  } else if (kind === "deepseek") {
    if (id.includes("chat")) score += 70;
    if (id.includes("reasoner")) score += 45;
  } else if (kind === "gemini") {
    if (id.includes("pro")) score += 70;
    if (id.includes("flash")) score += 45;
  } else if (kind === "anthropic") {
    if (id.includes("sonnet")) score += 70;
    if (id.includes("opus")) score += 65;
    if (id.includes("haiku")) score += 35;
  }

  return score;
}

function pickAvailableModel(kind, models = [], requestedModel = "") {
  const requested = String(requestedModel || "").trim();
  const allRows = models
    .map((item) => (typeof item === "string" ? { id: item } : item))
    .filter((item) => item?.id);
  const usableRows = allRows.filter((item) => item.generationOk === true || item.usable === true);
  const rows = usableRows.length ? usableRows : allRows.filter((item) => item.generationOk !== false);
  if (!rows.length) return requested;

  const exact = rows.find((item) => String(item.id).toLowerCase() === requested.toLowerCase());
  if (exact) return exact.id;
  if (!usableRows.length) return rows[0]?.id || requested;

  return [...rows]
    .sort((a, b) => scoreAvailableModel(kind, b.id, requested) - scoreAvailableModel(kind, a.id, requested))
    [0]?.id || requested;
}

function hasUsableModelText(result = {}) {
  return Boolean(String(result.text || "").trim());
}

function modelProbeSummary(probes = []) {
  const failed = probes
    .filter((probe) => !probe.generationOk)
    .slice(0, 3)
    .map((probe) => `${probe.id}: ${probe.error || "返回为空"}`);
  return failed.join("；");
}

async function probeProviderModels({ state, payload, modelList }) {
  const listedModels = modelList.models || [];
  const explicitModel = String(payload.model || "").trim();
  const candidates = explicitModel
    ? [explicitModel]
    : listedModels.map((model) => model.id).filter(Boolean).slice(0, 12);

  if (!candidates.length) {
    candidates.push("");
  }

  const probes = [];
  let firstSuccess = null;
  for (const modelId of candidates) {
    try {
      const result = await callModel({
        state,
        task: payload.task || "连接测试",
        providerId: payload.providerId,
        modelOverride: modelId,
        prompt: "只回复 OK 两个字母，用于本地写作工作台连接测试。",
        targetWords: 20,
      });
      const generationOk = hasUsableModelText(result);
      const probe = {
        id: modelId || result.model || result.route?.model || "",
        generationOk,
        endpoint: result.endpoint || "",
        model: result.model || modelId || "",
        usage: result.usage || {},
        error: generationOk ? "" : "模型返回为空",
      };
      probes.push(probe);
      if (generationOk && !firstSuccess) firstSuccess = result;
    } catch (error) {
      probes.push({
        id: modelId,
        generationOk: false,
        endpoint: "",
        model: modelId,
        usage: {},
        error: error.message || "生成测试失败",
      });
    }
  }

  const probeById = new Map(probes.filter((probe) => probe.id).map((probe) => [probe.id, probe]));
  const annotatedModels = listedModels.map((model) => ({
    ...model,
    ...(probeById.get(model.id) || {}),
  }));
  const usableModels = annotatedModels.filter((model) => model.generationOk);
  return { probes, result: firstSuccess, models: annotatedModels, usableModels };
}

async function resolveModelForCall({ state, route, provider, kind, modelOverride }) {
  const requestedModel = String(modelOverride || route.model || "").trim();
  if (modelOverride) {
    return {
      model: requestedModel,
      requestedModel,
      autoSelectedModel: false,
      modelSelectionReason: "explicit-override",
    };
  }

  const savedModels = normalizeSavedModels(provider);
  if (savedModels.length) {
    const picked = pickAvailableModel(kind, savedModels, requestedModel);
    return {
      model: picked,
      requestedModel,
      autoSelectedModel: picked !== requestedModel,
      modelSelectionReason: picked === requestedModel ? "saved-list-exact" : "saved-list-fallback",
      availableModelCount: savedModels.length,
    };
  }

  try {
    const listed = await listProviderModels(state, provider.id);
    const picked = pickAvailableModel(kind, listed.models, requestedModel);
    return {
      model: picked,
      requestedModel,
      autoSelectedModel: picked !== requestedModel,
      modelSelectionReason: picked === requestedModel ? "live-list-exact" : "live-list-fallback",
      availableModelCount: listed.models.length,
      modelListRequestId: listed.requestId || "",
    };
  } catch (error) {
    return {
      model: requestedModel,
      requestedModel,
      autoSelectedModel: false,
      modelSelectionReason: "list-unavailable",
      modelListError: error.message || "模型列表不可用",
    };
  }
}

async function callModel({ state, task, prompt, targetWords, providerId, modelOverride }) {
  const { route, provider, kind } = findRouteAndProvider(state, task, providerId);
  const modelSelection = await resolveModelForCall({ state, route, provider, kind, modelOverride });
  const model = String(modelSelection.model || "").trim();
  const temperature = Number(route.temperature);
  const maxTokens = Math.max(2600, Math.min(8000, Math.round((Number(targetWords) || 2200) * 1.8)));
  if (!model) throw new Error(`任务「${route.task}」未填写模型名`);

  if (kind === "anthropic") {
    const { payload, requestId } = await postJson(
      joinUrl(versionedBaseUrl(kind, provider.baseUrl), "/messages"),
      {
        "x-api-key": provider.key,
        "anthropic-version": "2023-06-01",
      },
      {
        model,
        max_tokens: maxTokens,
        temperature: Number.isFinite(temperature) ? temperature : undefined,
        messages: [{ role: "user", content: prompt }],
      },
    );
    return {
      text: (payload.content || []).map((part) => part.text || "").filter(Boolean).join("\n").trim(),
      usage: normalizeUsage(kind, payload.usage),
      requestId,
      route,
      provider,
      model: payload.model || model,
      requestedModel: modelSelection.requestedModel,
      autoSelectedModel: modelSelection.autoSelectedModel,
      modelSelectionReason: modelSelection.modelSelectionReason,
      finishReason: payload.stop_reason || "",
    };
  }

  if (kind === "gemini") {
    const base = provider.baseUrl || "https://generativelanguage.googleapis.com";
    const { payload, requestId } = await postJson(
      joinUrl(base, `/v1beta/models/${encodeURIComponent(model)}:generateContent`),
      { "x-goog-api-key": provider.key },
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: Number.isFinite(temperature) ? temperature : undefined,
          maxOutputTokens: maxTokens,
        },
      },
    );
    return {
      text: extractGeminiText(payload),
      usage: normalizeUsage(kind, payload.usageMetadata),
      requestId: requestId || payload.responseId || "",
      route,
      provider,
      model: payload.modelVersion || model,
      requestedModel: modelSelection.requestedModel,
      autoSelectedModel: modelSelection.autoSelectedModel,
      modelSelectionReason: modelSelection.modelSelectionReason,
      finishReason: payload.candidates?.[0]?.finishReason || "",
    };
  }

  if (kind === "openai") {
    let payload;
    let requestId;
    let endpoint = "chat/completions";
    try {
      const chatResult = await postJson(
        joinUrl(versionedBaseUrl(kind, provider.baseUrl), "/chat/completions"),
        { Authorization: `Bearer ${provider.key}` },
        {
          model,
          messages: [{ role: "user", content: prompt }],
          temperature: Number.isFinite(temperature) ? temperature : undefined,
          max_tokens: maxTokens,
        },
      );
      payload = chatResult.payload;
      requestId = chatResult.requestId;
      return {
        text: payload.choices?.[0]?.message?.content || "",
        usage: normalizeUsage(kind, payload.usage),
        requestId,
        route,
        provider,
        model: payload.model || model,
        requestedModel: modelSelection.requestedModel,
        autoSelectedModel: modelSelection.autoSelectedModel,
        modelSelectionReason: modelSelection.modelSelectionReason,
        finishReason: payload.choices?.[0]?.finish_reason || "",
        endpoint,
      };
    } catch (chatError) {
      endpoint = "responses";
      const responseResult = await postJson(
        joinUrl(versionedBaseUrl(kind, provider.baseUrl), "/responses"),
        { Authorization: `Bearer ${provider.key}` },
        {
          model,
          input: prompt,
          temperature: Number.isFinite(temperature) ? temperature : undefined,
          max_output_tokens: maxTokens,
        },
      );
      payload = responseResult.payload;
      requestId = responseResult.requestId;
      payload.__fallbackFrom = chatError.message;
    }
    return {
      text: extractOpenAIText(payload),
      usage: normalizeUsage(kind, payload.usage),
      requestId,
      route,
      provider,
      model: payload.model || model,
      requestedModel: modelSelection.requestedModel,
      autoSelectedModel: modelSelection.autoSelectedModel,
      modelSelectionReason: modelSelection.modelSelectionReason,
      finishReason: payload.status || "",
      endpoint,
      fallbackFrom: payload.__fallbackFrom || "",
    };
  }

  const { payload, requestId } = await postJson(
    joinUrl(versionedBaseUrl(kind, provider.baseUrl), "/chat/completions"),
    { Authorization: `Bearer ${provider.key}` },
    {
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: Number.isFinite(temperature) ? temperature : undefined,
      max_tokens: maxTokens,
    },
  );
  return {
    text: payload.choices?.[0]?.message?.content || "",
    usage: normalizeUsage(kind, payload.usage),
    requestId,
    route,
    provider,
    model: payload.model || model,
    requestedModel: modelSelection.requestedModel,
    autoSelectedModel: modelSelection.autoSelectedModel,
    modelSelectionReason: modelSelection.modelSelectionReason,
    finishReason: payload.choices?.[0]?.finish_reason || "",
  };
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 80 * 1024 * 1024) {
        reject(new Error("请求体过大"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function memoryRowsFromState(state) {
  const rows = [];
  for (const project of state.projects || []) {
    const projectId = String(project.id || "project");
    rows.push({
      projectId,
      kind: "project",
      ref: "meta",
      content: JSON.stringify({
        title: project.title,
        genre: project.genre,
        totalChapters: project.totalChapters,
        currentChapter: project.currentChapter,
        logline: project.logline,
      }),
    });

    if (project.storyMemory) {
      rows.push({
        projectId,
        kind: "continuity",
        ref: "active-story-memory",
        content: JSON.stringify({
          activeChapterId: project.storyMemory.activeChapterId || null,
          activeChapterTitle: project.storyMemory.activeChapterTitle || "",
          previousChapterId: project.storyMemory.previousChapterId || null,
          previousChapterTitle: project.storyMemory.previousChapterTitle || "",
          previousEnding: project.storyMemory.previousEnding || "",
          previousBridge: project.storyMemory.previousBridge || "",
          currentNeed: project.storyMemory.currentNeed || "",
          digest: project.storyMemory.digest || "",
          updatedAt: project.storyMemoryUpdatedAt || "",
        }),
      });
    }

    for (const outline of (project.outlineRows || []).slice(0, 500)) {
      rows.push({
        projectId,
        kind: "outline",
        ref: outline.chapter || "-",
        content: [outline.target, outline.event, outline.clue].filter(Boolean).join(" | "),
      });
    }

    for (const chapter of project.chapters || []) {
      rows.push({
        projectId,
        kind: "chapter",
        ref: String(chapter.id),
        content: JSON.stringify({
          title: chapter.title,
          outline: chapter.outline,
          detailedOutline: chapter.detailedOutline,
          manuscriptPreview: String(chapter.manuscript || "").slice(0, 1200),
          memorySummary: chapter.memorySummary || "",
          endingSnapshot: chapter.endingSnapshot || "",
          nextChapterBridge: chapter.nextChapterBridge || "",
          continuityMemory: chapter.continuityMemory || null,
          score: chapter.score,
        }),
      });

      if (chapter.memorySummary || chapter.endingSnapshot || chapter.nextChapterBridge || chapter.continuityMemory) {
        rows.push({
          projectId,
          kind: "continuity",
          ref: `chapter-${chapter.id}`,
          content: JSON.stringify({
            title: chapter.title,
            memorySummary: chapter.memorySummary || "",
            endingSnapshot: chapter.endingSnapshot || "",
            nextChapterBridge: chapter.nextChapterBridge || "",
            continuityMemory: chapter.continuityMemory || null,
            updatedAt: chapter.memoryUpdatedAt || chapter.continuityMemoryUpdatedAt || "",
          }),
        });
      }
    }

    for (const rule of project.learnedRules || []) {
      rows.push({
        projectId,
        kind: "style",
        ref: "learned-rule",
        content: rule,
      });
    }

    if (project.styleTags?.length) {
      rows.push({
        projectId,
        kind: "style",
        ref: "editable-tags",
        content: JSON.stringify(project.styleTags),
      });
    }

    if (project.styleBlendProfiles?.length || project.styleFusionGoal) {
      rows.push({
        projectId,
        kind: "style",
        ref: "fusion-chain",
        content: JSON.stringify({
          goal: project.styleFusionGoal || "",
          profiles: project.styleBlendProfiles || [],
        }),
      });
    }

    for (const sample of project.styleRevisionSamples || []) {
      rows.push({
        projectId,
        kind: "style",
        ref: `manual-revision-${sample.chapter}`,
        content: JSON.stringify(sample),
      });
    }

    if (project.styleSample) {
      rows.push({
        projectId,
        kind: "style",
        ref: "sample",
        content: String(project.styleSample).slice(0, 20000),
      });
    }

    rows.push({
      projectId,
      kind: "generation",
      ref: "word-contract",
      content: JSON.stringify({
        chapterTargetWords: project.chapterTargetWords || 2200,
        generationRules: project.generationRules || [],
      }),
    });

    for (const character of project.characters || []) {
      rows.push({
        projectId,
        kind: "character",
        ref: character.name || "-",
        content: JSON.stringify(character),
      });
    }
  }
  return rows;
}

function persistMemory(state) {
  const now = new Date().toISOString();
  const rows = memoryRowsFromState(state);
  const deleteStmt = db.prepare("DELETE FROM memories");
  const insertStmt = db.prepare(`
    INSERT INTO memories (project_id, kind, ref, content, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  db.exec("BEGIN");
  try {
    deleteStmt.run();
    for (const row of rows) {
      insertStmt.run(row.projectId, row.kind, row.ref, row.content, now);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function handleStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
  const rawPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.normalize(path.join(rootDir, rawPath));

  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  });
}

async function handleApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);

  if (req.method === "GET" && url.pathname === "/api/state") {
    const row = db
      .prepare("SELECT state_json, updated_at FROM app_state WHERE workspace = ?")
      .get(workspaceKey);
    sendJson(res, 200, {
      state: row ? JSON.parse(row.state_json) : null,
      updatedAt: row?.updated_at || null,
      dbPath,
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/state") {
    const body = await readBody(req);
    const payload = JSON.parse(body || "{}");
    if (!payload.state || !Array.isArray(payload.state.projects)) {
      sendJson(res, 400, { ok: false, error: "state.projects 缺失" });
      return;
    }

    const currentRow = db
      .prepare("SELECT state_json, updated_at FROM app_state WHERE workspace = ?")
      .get(workspaceKey);
    const loadedStateUpdatedAt = payload.loadedStateUpdatedAt || payload.state.loadedStateUpdatedAt || "";
    if (loadedStateUpdatedAt && currentRow?.updated_at && loadedStateUpdatedAt !== currentRow.updated_at) {
      sendJson(res, 409, {
        ok: false,
        error: "当前页面状态已过期，请刷新后再保存。",
        currentUpdatedAt: currentRow.updated_at,
        loadedStateUpdatedAt,
      });
      return;
    }
    const currentState = currentRow?.state_json ? JSON.parse(currentRow.state_json) : null;
    const invalidTransition = validateStateTransition(currentState, payload.state);
    if (invalidTransition) {
      sendJson(res, 409, { ok: false, error: invalidTransition.message, details: invalidTransition });
      return;
    }

    const now = new Date().toISOString();
    if (currentRow?.state_json) {
      backupCurrentState(payload.reason || "state-save", now);
    }
    db.prepare(`
      INSERT INTO app_state (workspace, state_json, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(workspace) DO UPDATE SET
        state_json = excluded.state_json,
        updated_at = excluded.updated_at
    `).run(workspaceKey, JSON.stringify(payload.state), now);

    persistMemory(payload.state);
    sendJson(res, 200, { ok: true, updatedAt: now, dbPath });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/memory") {
    const projectId = url.searchParams.get("projectId") || "";
    const kind = url.searchParams.get("kind") || "";
    const limit = Math.min(Number(url.searchParams.get("limit") || 80), 300);
    const rows = projectId
      ? kind
        ? db.prepare("SELECT project_id, kind, ref, content, created_at FROM memories WHERE project_id = ? AND kind = ? ORDER BY id LIMIT ?").all(projectId, kind, limit)
        : db.prepare("SELECT project_id, kind, ref, content, created_at FROM memories WHERE project_id = ? ORDER BY id LIMIT ?").all(projectId, limit)
      : db.prepare("SELECT project_id, kind, ref, content, created_at FROM memories ORDER BY id LIMIT ?").all(limit);
    sendJson(res, 200, { rows });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/memory") {
    const payload = JSON.parse(await readBody(req) || "{}");
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO memories (project_id, kind, ref, content, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      String(payload.projectId || "default"),
      String(payload.kind || "note"),
      String(payload.ref || "manual"),
      String(payload.content || ""),
      now,
    );
    sendJson(res, 200, { ok: true, createdAt: now });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/llm/generate") {
    const payload = JSON.parse(await readBody(req) || "{}");
    const state = readSavedState();
    if (!state) {
      sendJson(res, 400, { ok: false, error: "本地数据库还没有保存模型配置" });
      return;
    }
    if (!String(payload.prompt || "").trim()) {
      sendJson(res, 400, { ok: false, error: "prompt 为空" });
      return;
    }

    const startedAt = Date.now();
    try {
      const result = await callModel({
        state,
        task: payload.task || "章节正文",
        prompt: String(payload.prompt),
        targetWords: Number(payload.targetWords || 2200),
      });
      if (!result.text) throw new Error("模型返回为空");
      sendJson(res, 200, {
        ok: true,
        text: result.text,
        usage: result.usage,
        provider: result.provider.name,
        providerId: result.provider.id,
        task: result.route.task,
        model: result.model,
        routeModel: result.route.model,
        requestedModel: result.requestedModel || result.route.model,
        autoSelectedModel: Boolean(result.autoSelectedModel),
        modelSelectionReason: result.modelSelectionReason || "",
        temperature: result.route.temperature,
        finishReason: result.finishReason,
        endpoint: result.endpoint || "",
        fallbackFrom: result.fallbackFrom || "",
        requestId: result.requestId,
        latencyMs: Date.now() - startedAt,
      });
    } catch (error) {
      sendJson(res, 400, { ok: false, error: error.message || "模型调用失败" });
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/llm/test") {
    const payload = JSON.parse(await readBody(req) || "{}");
    const state = readSavedState();
    if (!state) {
      sendJson(res, 400, { ok: false, error: "本地数据库还没有保存模型配置" });
      return;
    }
    const startedAt = Date.now();
    try {
      let modelList = { models: [], error: "" };
      try {
        const listed = await listProviderModels(state, payload.providerId);
        modelList = { models: listed.models, error: "", requestId: listed.requestId };
      } catch (error) {
        modelList = { models: [], error: error.message || "模型列表获取失败" };
      }

      let generationTest = { ok: false, error: "", result: null, probes: [], models: modelList.models };
      if (payload.testGeneration !== false) {
        const probed = await probeProviderModels({ state, payload, modelList });
        generationTest = {
          ok: Boolean(probed.result),
          error: probed.result ? "" : modelProbeSummary(probed.probes) || "没有模型通过轻量生成测试",
          result: probed.result,
          probes: probed.probes,
          models: probed.models,
          usableModels: probed.usableModels,
        };
      }

      if (!modelList.models.length && modelList.error && !generationTest.ok) {
        sendJson(res, 400, {
          ok: false,
          error: `模型列表失败：${modelList.error}${generationTest.error ? `；生成测试失败：${generationTest.error}` : ""}`,
          models: [],
          modelListError: modelList.error,
          generationError: generationTest.error,
        });
        return;
      }

      const result = generationTest.result;
      sendJson(res, 200, {
        ok: true,
        text: result?.text || "",
        usage: result?.usage || {},
        provider: result?.provider?.name || modelList.provider || "",
        providerId: result?.provider?.id || payload.providerId || "",
        model: result?.model || "",
        routeModel: result?.route?.model || "",
        requestedModel: result?.requestedModel || result?.route?.model || "",
        autoSelectedModel: Boolean(result?.autoSelectedModel),
        modelSelectionReason: result?.modelSelectionReason || "",
        endpoint: result?.endpoint || "",
        fallbackFrom: result?.fallbackFrom || "",
        requestId: result?.requestId || modelList.requestId || "",
        latencyMs: Date.now() - startedAt,
        models: generationTest.models || modelList.models,
        usableModels: generationTest.usableModels || [],
        modelProbes: generationTest.probes || [],
        modelListError: modelList.error,
        generationOk: generationTest.ok,
        generationError: generationTest.error,
        modelListRequestId: modelList.requestId || "",
      });
    } catch (error) {
      sendJson(res, 400, { ok: false, error: error.message || "连接测试失败" });
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/llm/models") {
    const payload = JSON.parse(await readBody(req) || "{}");
    const state = readSavedState();
    if (!state) {
      sendJson(res, 400, { ok: false, error: "本地数据库还没有保存模型配置" });
      return;
    }
    try {
      const listed = await listProviderModels(state, payload.providerId);
      sendJson(res, 200, {
        ok: true,
        provider: listed.provider.name,
        providerId: listed.provider.id,
        models: listed.models,
        requestId: listed.requestId,
      });
    } catch (error) {
      sendJson(res, 400, { ok: false, error: error.message || "模型列表获取失败" });
    }
    return;
  }

  sendJson(res, 404, { ok: false, error: "Not found" });
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/")) {
    handleApi(req, res).catch((error) => {
      sendJson(res, 500, { ok: false, error: error.message || "服务错误" });
    });
    return;
  }
  handleStatic(req, res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`AI webnovel workbench service running at http://127.0.0.1:${port}`);
  console.log(`SQLite database: ${dbPath}`);
});
