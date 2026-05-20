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

  CREATE TABLE IF NOT EXISTS vector_index (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    source_kind TEXT NOT NULL,
    source_ref TEXT NOT NULL,
    content TEXT NOT NULL,
    vector_json TEXT NOT NULL,
    keywords_json TEXT NOT NULL,
    metadata_json TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE(project_id, source_kind, source_ref)
  );

  CREATE INDEX IF NOT EXISTS idx_vector_index_project_kind
    ON vector_index(project_id, source_kind);

  CREATE TABLE IF NOT EXISTS chapter_facts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    chapter_id INTEGER NOT NULL,
    fact_type TEXT NOT NULL,
    subject TEXT NOT NULL,
    predicate TEXT NOT NULL,
    object TEXT NOT NULL,
    evidence TEXT NOT NULL,
    confidence REAL NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_chapter_facts_project_chapter
    ON chapter_facts(project_id, chapter_id);

  CREATE TABLE IF NOT EXISTS character_states (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    character_name TEXT NOT NULL,
    chapter_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    location TEXT NOT NULL,
    goal TEXT NOT NULL,
    relation_snapshot TEXT NOT NULL,
    power_state TEXT NOT NULL,
    evidence TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE(project_id, character_name, chapter_id)
  );

  CREATE INDEX IF NOT EXISTS idx_character_states_project_character
    ON character_states(project_id, character_name);

  CREATE TABLE IF NOT EXISTS plot_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    version_id TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    summary TEXT NOT NULL,
    state_json TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_plot_versions_project_created
    ON plot_versions(project_id, created_at);

  CREATE TABLE IF NOT EXISTS regression_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    run_id TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL,
    score INTEGER NOT NULL,
    issues_json TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_regression_runs_project_created
    ON regression_runs(project_id, created_at);

  CREATE TABLE IF NOT EXISTS prompt_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    prompt_id TEXT NOT NULL UNIQUE,
    task TEXT NOT NULL,
    label TEXT NOT NULL,
    prompt_text TEXT NOT NULL,
    metrics_json TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_prompt_versions_project_task
    ON prompt_versions(project_id, task);

  CREATE TABLE IF NOT EXISTS prompt_eval_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    eval_id TEXT NOT NULL UNIQUE,
    prompt_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    cases_json TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_prompt_eval_project_created
    ON prompt_eval_runs(project_id, created_at);

  CREATE TABLE IF NOT EXISTS cost_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    chapter_id INTEGER NOT NULL,
    event_key TEXT NOT NULL UNIQUE,
    provider TEXT NOT NULL,
    model TEXT NOT NULL,
    task TEXT NOT NULL,
    input_tokens INTEGER NOT NULL,
    output_tokens INTEGER NOT NULL,
    total_tokens INTEGER NOT NULL,
    estimated_cost REAL NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_cost_events_project_created
    ON cost_events(project_id, created_at);

  CREATE TABLE IF NOT EXISTS editor_agent_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    chapter_id INTEGER NOT NULL,
    run_id TEXT NOT NULL UNIQUE,
    rounds_json TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_editor_agent_project_chapter
    ON editor_agent_runs(project_id, chapter_id);
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
  const explicit = String(provider.apiType || provider.kind || "").toLowerCase();
  if (["openai", "deepseek", "gemini"].includes(explicit)) return explicit;
  if (explicit === "anthropic" || explicit === "claude") return "anthropic";
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
    || providers.find((item) => String(item.id || "").toLowerCase() === routeProvider || routeProvider.includes(String(item.id || "").toLowerCase()))
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

const RAG_STOP_TERMS = new Set([
  "本章", "正文", "生成", "必须", "角色", "细纲", "粗纲", "文风", "规则", "目标", "场景", "章节", "输出",
  "不要", "不能", "需要", "当前", "一个", "两个", "这个", "那个", "如果", "然后", "继续", "推进",
]);

function compactRagText(text = "", limit = 520) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function ragTerms(text = "") {
  const terms = new Set();
  const source = String(text || "").replace(/\s+/g, " ").slice(0, 8000);
  for (const match of source.match(/[\u4e00-\u9fa5]{2,6}|[A-Za-z0-9_+-]{2,}/g) || []) {
    const term = match.trim();
    if (term.length < 2 || RAG_STOP_TERMS.has(term)) continue;
    terms.add(term.toLowerCase());
    if (terms.size >= 220) break;
  }
  return [...terms];
}

function chapterDistanceFromRef(ref = "", chapterId = 0) {
  const target = Number(chapterId) || 0;
  if (!target) return 99;
  const numbers = String(ref || "").match(/\d+/g)?.map(Number) || [];
  if (!numbers.length) return 99;
  if (numbers.length >= 2) {
    const start = Math.min(numbers[0], numbers[1]);
    const end = Math.max(numbers[0], numbers[1]);
    if (target >= start && target <= end) return 0;
    return Math.min(Math.abs(target - start), Math.abs(target - end));
  }
  return Math.abs(target - numbers[0]);
}

function readableRagContent(row = {}) {
  const raw = String(row.content || "");
  try {
    const data = JSON.parse(raw);
    if (data && typeof data === "object") {
      const detail = data.detailedOutline && typeof data.detailedOutline === "object" && !Array.isArray(data.detailedOutline)
        ? [data.detailedOutline.core, data.detailedOutline.opening, data.detailedOutline.hook].filter(Boolean).join(" ")
        : "";
      return compactRagText([
        data.title,
        data.role,
        data.relation,
        data.actual,
        data.next,
        data.outline,
        detail,
        data.memorySummary,
        data.endingSnapshot,
        data.nextChapterBridge,
        data.previousEnding,
        data.previousBridge,
        data.currentNeed,
        data.digest,
        data.goal,
        Array.isArray(data.profiles) ? data.profiles.map((item) => `${item.name || ""}:${item.rule || ""}`).join("；") : "",
      ].filter(Boolean).join("；"), 620);
    }
  } catch {
    // Plain memory rows are fine.
  }
  return compactRagText(raw, 620);
}

function scoreRagRow(row, terms, chapterId) {
  const content = readableRagContent(row);
  if (!content) return 0;
  const lower = content.toLowerCase();
  let overlap = 0;
  for (const term of terms) {
    if (lower.includes(term)) overlap += Math.min(8, Math.max(2, term.length));
  }
  const distance = chapterDistanceFromRef(row.ref, chapterId);
  let base = 0;
  if (row.kind === "continuity") base += 36;
  if (row.kind === "chapter") base += distance <= 1 ? 34 : distance <= 3 ? 22 : distance <= 8 ? 10 : 0;
  if (row.kind === "outline") base += distance === 0 ? 28 : distance <= 5 ? 12 : 0;
  if (row.kind === "character") base += 16;
  if (row.kind === "style") base += 14;
  if (row.kind === "generation") base += 10;
  return base + overlap;
}

function buildRagAugmentedPrompt({ projectId = "", chapterId = 0, prompt = "" } = {}) {
  const id = String(projectId || "").trim();
  if (!id) return { prompt, meta: { used: false, hits: 0, refs: [] } };
  const terms = ragTerms(`${chapterId} ${prompt}`);
  const rows = db
    .prepare("SELECT project_id, kind, ref, content, created_at FROM memories WHERE project_id = ?")
    .all(id)
    .map((row) => ({
      ...row,
      contentText: readableRagContent(row),
      score: scoreRagRow(row, terms, chapterId),
    }))
    .filter((row) => row.score >= 18 && row.contentText)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  if (!rows.length) return { prompt, meta: { used: false, hits: 0, refs: [] } };

  const context = rows
    .map((row, index) => `${index + 1}. [${row.kind}/${row.ref}] ${row.contentText}`)
    .join("\n");
  return {
    prompt: [
      "【RAG检索记忆】",
      "以下内容来自本地项目记忆库，只能用于保持设定、连续性、角色状态和文风，不要照抄，不要在正文里输出“RAG/检索/记忆库”等字样。",
      context,
      "",
      "【生成请求】",
      prompt,
    ].join("\n"),
    meta: {
      used: true,
      hits: rows.length,
      refs: rows.map((row) => `${row.kind}/${row.ref}`),
    },
  };
}

function hashString(value = "") {
  let hash = 2166136261;
  const text = String(value || "");
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function stableId(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function buildHashVector(text = "", dimensions = 96) {
  const vector = Array.from({ length: dimensions }, () => 0);
  for (const term of ragTerms(text)) {
    const hash = hashString(term);
    const index = hash % dimensions;
    const sign = hash & 1 ? 1 : -1;
    vector[index] += sign * Math.min(3, Math.max(1, term.length / 2));
  }
  const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
  return vector.map((value) => Number((value / norm).toFixed(6)));
}

function cosineSimilarity(a = [], b = []) {
  const length = Math.min(a.length, b.length);
  let score = 0;
  for (let index = 0; index < length; index += 1) score += Number(a[index] || 0) * Number(b[index] || 0);
  return score;
}

function vectorSource(projectId, sourceKind, sourceRef, content, metadata = {}) {
  return {
    projectId,
    sourceKind,
    sourceRef: String(sourceRef || "-"),
    content: compactRagText(content, 1400),
    metadata,
  };
}

function clampPercentServer(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.max(0, Math.min(100, Math.round(number)));
}

function parseChineseIntegerServer(value = "") {
  const text = String(value || "").replace(/\s+/g, "").replace(/[点.].*$/, "");
  if (!text) return null;
  const digitMap = { 零: 0, 〇: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  if (/^\d+$/.test(text)) return Number(text);
  if (!/^[零〇一二两三四五六七八九十百]+$/.test(text)) return null;
  let section = 0;
  let current = null;
  for (const char of text) {
    if (Object.prototype.hasOwnProperty.call(digitMap, char)) {
      current = digitMap[char];
    } else if (char === "十") {
      section += (current === null ? 1 : current) * 10;
      current = null;
    } else if (char === "百") {
      section += (current === null ? 1 : current) * 100;
      current = null;
    }
  }
  return section + (current || 0);
}

function parseScoreValueServer(value) {
  const raw = String(value ?? "").trim().replace(/[，,]/g, "");
  if (!raw) return null;
  const number = /^\d+$/.test(raw) ? Number(raw) : parseChineseIntegerServer(raw);
  if (!Number.isFinite(number)) return null;
  const rounded = Math.round(number);
  return {
    raw,
    value: rounded,
    valid: rounded >= 0 && rounded <= 100,
  };
}

function scoreDisplayServer(raw, value) {
  return String(raw) === String(value) ? String(value) : `${raw}（解析为 ${value}）`;
}

function stateTextFromChapterServer(chapter = {}) {
  const detail = chapter.detailedOutline && typeof chapter.detailedOutline === "object" && !Array.isArray(chapter.detailedOutline)
    ? chapter.detailedOutline
    : {};
  const scenes = (detail.scenes || [])
    .map((scene) => [scene.title, scene.content, ...(scene.systemLines || [])].filter(Boolean).join(" "))
    .join("\n");
  return [
    chapter.outline,
    detail.core,
    detail.opening,
    scenes,
    detail.hook,
    chapter.manuscript,
  ].filter(Boolean).join("\n");
}

function collectPercentEventsServer(text = "", transitionRegex, singleRegex) {
  const events = [];
  for (const match of String(text || "").matchAll(singleRegex)) {
    const value = clampPercentServer(match[1]);
    if (value === null) continue;
    events.push({
      value,
      from: null,
      to: value,
      index: match.index || 0,
      evidence: compactRagText(match[0], 80),
    });
  }
  for (const match of String(text || "").matchAll(transitionRegex)) {
    const from = clampPercentServer(match[1]);
    const to = clampPercentServer(match[2]);
    if (to === null) continue;
    events.push({
      value: to,
      from,
      to,
      index: match.index || 0,
      evidence: compactRagText(match[0], 80),
    });
  }
  return events.sort((a, b) => a.index - b.index);
}

function lastPercentEventServer(events = []) {
  return events.length ? events[events.length - 1] : null;
}

function maxPercentEventServer(events = []) {
  return events.reduce((best, item) => {
    if (!best || item.value > best.value) return item;
    if (item.value === best.value && best.from === null && item.from !== null) return item;
    return best;
  }, null);
}

function normalizeCharacterStatNameServer(name = "") {
  return characterShortNameServer(String(name || "").replace(/[【】\[\]：:·的\s]/g, ""));
}

function isPrimaryProtagonistNameServer(name = "") {
  return /^(陈玄|男主|主角|宿主)$/.test(characterShortNameServer(name));
}

function isInvalidCharacterStatNameServer(name = "") {
  const short = characterShortNameServer(name);
  return /^(目标|当前|系统|面板|检测|高星|星运|看见|显示|提示|宿主|新增|建议|数字)$/.test(short)
    || /他|她|它|自己|看见|面板|系统|提示|目标|星运|信息|成年|未成年|刷出|出来|一条|而|上|下/.test(short);
}

function defaultTargetCharacterForChapterServer(chapter = {}) {
  const roles = (chapter.roles || [])
    .map((role) => characterShortNameServer(role))
    .filter((name) => name && !isPrimaryProtagonistNameServer(name));
  return roles.length === 1 ? roles[0] : "";
}

function collectCharacterStatEventsServer(chapter = {}) {
  const text = stateTextFromChapterServer(chapter);
  const defaultTarget = defaultTargetCharacterForChapterServer(chapter);
  const roleNames = (chapter.roles || []).map((role) => characterShortNameServer(role)).filter(Boolean);
  const knownCharacters = new Set(roleNames
    .map((role) => characterShortNameServer(role))
    .filter((name) => name && !isPrimaryProtagonistNameServer(name)));
  const isKnownCharacter = (character) => {
    if (!knownCharacters.size) return !roleNames.length;
    return [...knownCharacters].some((name) => name === character || name.includes(character) || character.includes(name));
  };
  const events = [];
  const add = (name, value, from, index, evidence) => {
    const character = normalizeCharacterStatNameServer(name || defaultTarget);
    const parsed = parseScoreValueServer(value);
    const parsedFrom = from === null || from === undefined ? null : parseScoreValueServer(from);
    if (!character || isInvalidCharacterStatNameServer(character) || !isKnownCharacter(character) || !parsed) return;
    events.push({
      character,
      key: "starLuck",
      label: `${character}星运/幸运值`,
      value: parsed.value,
      rawValue: parsed.raw,
      from: parsedFrom?.valid ? parsedFrom.value : null,
      rawFrom: parsedFrom?.raw || "",
      unit: "/100",
      outOfRange: !parsed.valid,
      fromOutOfRange: Boolean(parsedFrom && !parsedFrom.valid),
      index: index || 0,
      evidence: compactRagText(evidence, 90),
    });
  };

  const statWords = "星运值|星运指数|幸运值|气运值";
  const scoreValue = "(\\d{1,4}|[零〇一二两三四五六七八九十百]{1,8})";
  const changeWords = "→|->|—|-|~|～|至|到|涨到|升到|提升到|爬到|冲到|跳到|变成";
  const namedTransition = new RegExp(`([一-龥]{2,4})(?:[·的\\s：:，,、｜|]){0,5}(?:${statWords})[^。\\n]{0,24}?${scoreValue}\\s*(?:\\/\\s*100|%)?\\s*(?:${changeWords})\\s*${scoreValue}\\s*(?:\\/\\s*100|%)?`, "g");
  const namedSingle = new RegExp(`([一-龥]{2,4})(?:[·的\\s：:，,、｜|]){0,5}(?:${statWords})[^。\\n]{0,18}?${scoreValue}\\s*(?:\\/\\s*100|%)?`, "g");
  const bracketNameSingle = new RegExp(`[【\\[]?([一-龥]{2,4})[，,、\\s]{1,4}(?:(?:成年|未成年|高星运目标|目标对象)[，,、\\s]{1,4})?(?:${statWords})[^。\\n]{0,18}?${scoreValue}\\s*(?:\\/\\s*100|%)?`, "g");
  const previousNameSingle = new RegExp(`([一-龥]{2,4})[。；;，,、\\s]{0,4}(?:成年|高星运目标|当前状态|系统面板|面板)?[^。\\n]{0,20}?(?:${statWords})[^。\\n]{0,18}?${scoreValue}\\s*(?:\\/\\s*100|%)?`, "g");
  const targetTransition = new RegExp(`(?:目标|当前目标|目标对象)[^。\\n]{0,8}(?:${statWords})[^。\\n]{0,18}?${scoreValue}\\s*(?:\\/\\s*100|%)?\\s*(?:${changeWords})\\s*${scoreValue}\\s*(?:\\/\\s*100|%)?`, "g");
  const targetSingle = new RegExp(`(?:目标|当前目标|目标对象)[^。\\n]{0,8}(?:${statWords})[^。\\n]{0,18}?${scoreValue}\\s*(?:\\/\\s*100|%)?`, "g");
  const continuationSingle = new RegExp(`(?:${statWords})[^。\\n]{0,12}?(?:停在|显示|变成|为|是|：|:|预估)[“"']?${scoreValue}[”"']?\\s*(?:\\/\\s*100|%)?`, "g");
  const climbPattern = new RegExp(`([一-龥]{2,4})的(?:${statWords})[^。\\n]{0,24}?从\\s*${scoreValue}\\s*(?:\\/\\s*100|%)?\\s*(?:爬到|涨到|升到|到|变成)\\s*${scoreValue}\\s*(?:\\/\\s*100|%)?`, "g");

  for (const match of text.matchAll(namedTransition)) add(match[1], match[3], match[2], match.index, match[0]);
  for (const match of text.matchAll(climbPattern)) add(match[1], match[3], match[2], match.index, match[0]);
  for (const match of text.matchAll(bracketNameSingle)) add(match[1], match[2], null, match.index, match[0]);
  for (const match of text.matchAll(namedSingle)) add(match[1], match[2], null, match.index, match[0]);
  for (const match of text.matchAll(previousNameSingle)) add(match[1], match[2], null, match.index, match[0]);
  if (defaultTarget) {
    for (const match of text.matchAll(targetTransition)) add(defaultTarget, match[2], match[1], match.index, match[0]);
    for (const match of text.matchAll(targetSingle)) add(defaultTarget, match[1], null, match.index, match[0]);
  }

  const explicitCharacters = new Set(events.map((event) => event.character));
  if (explicitCharacters.size === 1) {
    const [character] = [...explicitCharacters];
    for (const match of text.matchAll(continuationSingle)) add(character, match[1], null, match.index, match[0]);
  }

  return events.sort((a, b) => a.index - b.index);
}

function characterStatRangeIssuesServer(events = [], pos = "") {
  const issues = [];
  const seen = new Set();
  for (const event of events) {
    const checks = [
      event.outOfRange ? { raw: event.rawValue, value: event.value } : null,
      event.fromOutOfRange ? { raw: event.rawFrom, value: parseScoreValueServer(event.rawFrom)?.value } : null,
    ].filter(Boolean);
    for (const check of checks) {
      const key = `${event.character}-${check.raw}-${check.value}`;
      if (seen.has(key)) continue;
      seen.add(key);
      issues.push({
        level: "高",
        type: "数值合法性",
        pos,
        text: `${event.character}星运/幸运值越界：${scoreDisplayServer(check.raw, check.value)}，合法范围是 0-100。`,
        fix: "改成 0-100 内的稳定人物数值，并和前后章节承接；如果想写 810 这类大数，应改成“星运能量余额”，不要写成人物星运/幸运值。",
        evidence: event.evidence,
      });
    }
  }
  return issues;
}

function extractCharacterStatsServer(chapter = {}) {
  const grouped = new Map();
  for (const event of collectCharacterStatEventsServer(chapter)) {
    if (event.outOfRange) continue;
    const previous = grouped.get(event.character);
    if (!previous || event.value > previous.value || (event.value === previous.value && previous.from === null && event.from !== null)) {
      grouped.set(event.character, event);
    }
  }
  return Object.fromEntries([...grouped.entries()].map(([character, event]) => [character, {
    label: event.label,
    value: event.value,
    from: event.from,
    unit: event.unit,
    evidence: event.evidence,
  }]));
}

function extractChapterProgressStateServer(chapter = {}) {
  const text = stateTextFromChapterServer(chapter);
  const trustEvents = collectPercentEventsServer(
    text,
    /(?:刘亦菲|星运羁绊|事业型羁绊|高星运目标|目标)?[^。\n]{0,12}?信任度[^。\n]{0,24}?(\d{1,3})\s*%\s*(?:→|->|—|-|~|～|至|到|涨到|升到|提升到|拉到)\s*(\d{1,3})\s*%/g,
    /(?:刘亦菲|星运羁绊|事业型羁绊|高星运目标|目标)?[^。\n]{0,12}?信任度[^。\n]{0,24}?(\d{1,3})\s*%(?!\s*(?:→|->|—|-|~|～|至|到|涨到|升到|提升到|拉到))/g,
  );
  const rawBacklashEvents = collectPercentEventsServer(
    text,
    /反噬(?:值|进度|波动区间)?[^。\n]{0,18}?(\d{1,3})\s*%\s*(?:→|->|—|-|~|～|至|到|涨到|升到|跳到|冲破|拉到)\s*(\d{1,3})\s*%/g,
    /(?:当前)?反噬(?:值|进度)?[^。\n]{0,18}?(\d{1,3})\s*%(?!\s*(?:→|->|—|-|~|～|至|到|涨到|升到|跳到|冲破|拉到))/g,
  );
  const backlashEvents = rawBacklashEvents.filter((event) => !/波动区间|风险区间/.test(event.evidence));
  const predictionEvents = collectPercentEventsServer(
    text,
    /预言(?:完成|进度|兑现)[^。\n]{0,18}?(\d{1,3})\s*%\s*(?:→|->|—|-|~|～|至|到|涨到|升到|提升到)\s*(\d{1,3})\s*%/g,
    /预言(?:完成|进度|兑现)[^。\n]{0,18}?(\d{1,3})\s*%(?!\s*(?:→|->|—|-|~|～|至|到|涨到|升到|提升到))/g,
  );
  const trust = trustDropAllowedTextServer(text) ? lastPercentEventServer(trustEvents) : maxPercentEventServer(trustEvents);
  const backlash = lastPercentEventServer(backlashEvents.length ? backlashEvents : rawBacklashEvents);
  const prediction = lastPercentEventServer(predictionEvents);
  return {
    trust: trust ? { label: "刘亦菲信任度", value: trust.value, from: trust.from, evidence: trust.evidence } : null,
    backlash: backlash ? { label: "反噬值", value: backlash.value, from: backlash.from, evidence: backlash.evidence } : null,
    prediction: prediction ? { label: "预言完成度", value: prediction.value, from: prediction.from, evidence: prediction.evidence } : null,
    characterStats: extractCharacterStatsServer(chapter),
  };
}

function sortChaptersByIdServer(chapters = []) {
  return [...chapters].sort((a, b) => Number(a.id || 0) - Number(b.id || 0));
}

function progressStateCoreServer(state = {}) {
  const characterStats = Object.fromEntries(Object.entries(state.characterStats || {}).filter(([, item]) => item?.value !== undefined && item?.value !== null));
  return {
    trust: state.trust?.value !== undefined ? state.trust : null,
    backlash: state.backlash?.value !== undefined ? state.backlash : null,
    prediction: state.prediction?.value !== undefined ? state.prediction : null,
    characterStats,
  };
}

function mergeProgressStateServer(previous = {}, explicit = {}, chapterId = 0) {
  const previousStats = Object.fromEntries(Object.entries(previous.characterStats || {}).map(([name, item]) => [name, { ...item, inherited: true }]));
  const explicitStats = Object.fromEntries(Object.entries(explicit.characterStats || {}).map(([name, item]) => [name, { ...item, chapterId, inherited: false }]));
  const next = {
    trust: previous.trust ? { ...previous.trust, inherited: true } : null,
    backlash: previous.backlash ? { ...previous.backlash, inherited: true } : null,
    prediction: previous.prediction ? { ...previous.prediction, inherited: true } : null,
    characterStats: { ...previousStats, ...explicitStats },
  };
  for (const key of ["trust", "backlash", "prediction"]) {
    if (explicit[key]?.value !== undefined && explicit[key]?.value !== null) {
      next[key] = { ...explicit[key], chapterId, inherited: false };
    }
  }
  return progressStateCoreServer(next);
}

function resolveChapterProgressStateServer(project = {}, chapter = {}) {
  const targetId = Number(chapter?.id || 0);
  let state = {};
  for (const item of sortChaptersByIdServer(project.chapters || [])) {
    const itemId = Number(item.id || 0);
    if (!itemId || itemId > targetId) break;
    state = mergeProgressStateServer(state, extractChapterProgressStateServer(item), itemId);
    if (itemId === targetId) break;
  }
  return progressStateCoreServer(state);
}

function buildProjectProgressStateMapServer(project = {}) {
  const map = new Map();
  let state = {};
  for (const item of sortChaptersByIdServer(project.chapters || [])) {
    const itemId = Number(item.id || 0);
    if (!itemId) continue;
    state = mergeProgressStateServer(state, extractChapterProgressStateServer(item), itemId);
    map.set(itemId, progressStateCoreServer(state));
  }
  return map;
}

function formatProgressItemServer(item) {
  if (!item || item.value === undefined || item.value === null) return "";
  const unit = item.unit || "%";
  const value = item.from !== null && item.from !== undefined && item.from !== item.value
    ? `${item.from}${unit}→${item.value}${unit}`
    : `${item.value}${unit}`;
  return `${item.label || "数值"}${value}${item.inherited ? "（承接）" : ""}`;
}

function progressStateSummaryServer(state = {}) {
  return [state.trust, state.backlash, state.prediction, ...Object.values(state.characterStats || {})]
    .map(formatProgressItemServer)
    .filter(Boolean)
    .join("；");
}

function trustDropAllowedTextServer(text = "") {
  return /背叛|误会|失望|决裂|翻脸|信任崩塌|信任下降|信任跌|信任降低|关系破裂/.test(String(text || ""));
}

function statDropAllowedTextServer(text = "") {
  return /消耗|下降|降低|扣除|回落|跌|归零|反噬|失败|受损|代价/.test(String(text || ""));
}

function numericRegressionIssuesServer(project = {}) {
  const issues = [];
  let previousState = {};
  for (const chapter of sortChaptersByIdServer(project.chapters || [])) {
    const chapterId = Number(chapter.id || 0);
    if (!chapterId) continue;
    const explicit = extractChapterProgressStateServer(chapter);
    const currentState = mergeProgressStateServer(previousState, explicit, chapterId);
    const previousTrust = previousState.trust?.value;
    const currentTrust = explicit.trust?.value;
    const context = `${JSON.stringify(chapter.detailedOutline || "")}\n${chapter.manuscript || ""}\n${chapter.outline || ""}`;
    issues.push(...characterStatRangeIssuesServer(collectCharacterStatEventsServer(chapter), `第${chapter.id}章`));
    if (previousTrust !== undefined && previousTrust !== null && currentTrust !== undefined && currentTrust !== null && currentTrust < previousTrust && !trustDropAllowedTextServer(context)) {
      issues.push({
        level: "高",
        type: "数值连续性",
        pos: `第${chapter.id}章`,
        text: `刘亦菲信任度倒退：上一章 ${previousTrust}%，本章 ${currentTrust}%。`,
        fix: "把本章信任度改为持平或上升；如果确实要下降，先在细纲写清误会/背叛/信任崩塌的剧情原因。",
      });
    }
    const previousStats = previousState.characterStats || {};
    const currentStats = explicit.characterStats || {};
    for (const [name, item] of Object.entries(currentStats)) {
      const previousItem = previousStats[name];
      if (!previousItem || previousItem.value === undefined || previousItem.value === null) continue;
      if (item.value < previousItem.value && !statDropAllowedTextServer(context)) {
        issues.push({
          level: "高",
          type: "数值连续性",
          pos: `第${chapter.id}章`,
          text: `${name}星运/幸运值倒退：上一章 ${previousItem.value}/100，本章 ${item.value}/100。`,
          fix: "改成承接上一章数值或上升；如果确实要下降，先在细纲写清消耗、失败或反噬扣除原因。",
        });
      }
    }
    if (/曾黎/.test(context) && currentStats["曾黎"] && !previousStats["曾黎"] && !/曾黎[^。\n]{0,20}(?:星运值|星运指数|幸运值|气运值)|(?:星运值|星运指数|幸运值|气运值)[^。\n]{0,20}曾黎/.test(JSON.stringify(chapter.detailedOutline || ""))) {
      issues.push({
        level: "高",
        type: "数值连续性",
        pos: `第${chapter.id}章`,
        text: `正文给曾黎写了 ${currentStats["曾黎"].value}/100，但本章细纲没有设定曾黎星运/幸运值。`,
        fix: "要么删掉曾黎具体数值，只写线索露头；要么先在细纲系统线明确曾黎首次星运/幸运值。",
      });
    }
    previousState = currentState;
  }
  return issues;
}

function extractChapterFacts(project = {}) {
  const rows = [];
  const now = new Date().toISOString();
  const progressStateMap = buildProjectProgressStateMapServer(project);
  for (const chapter of project.chapters || []) {
    const chapterId = Number(chapter.id || 0);
    if (!chapterId) continue;
    const text = String(chapter.manuscript || "");
    const detail = chapter.detailedOutline && typeof chapter.detailedOutline === "object" && !Array.isArray(chapter.detailedOutline)
      ? chapter.detailedOutline
      : {};
    const summary = compactRagText([
      chapter.title,
      chapter.outline,
      detail.core,
      detail.opening,
      chapter.memorySummary,
      chapter.endingSnapshot,
    ].filter(Boolean).join("；"), 520);
    if (summary) {
      rows.push({
        projectId: project.id,
        chapterId,
        factType: "chapter_summary",
        subject: `第${chapterId}章`,
        predicate: "发生",
        object: summary,
        evidence: compactRagText(text || summary, 520),
        confidence: text ? 0.86 : 0.72,
        updatedAt: now,
      });
    }
    for (const role of chapter.roles || []) {
      const name = String(role || "").trim();
      if (!name) continue;
      rows.push({
        projectId: project.id,
        chapterId,
        factType: "character_appearance",
        subject: name,
        predicate: text.includes(name) ? "实际出场" : "计划出场",
        object: chapter.title || `第${chapterId}章`,
        evidence: compactRagText(text.includes(name) ? text.slice(Math.max(0, text.indexOf(name) - 120), text.indexOf(name) + 220) : chapter.outline || chapter.title, 360),
        confidence: text.includes(name) ? 0.9 : 0.64,
        updatedAt: now,
      });
    }
    for (const clue of chapter.clues || []) {
      if (!clue) continue;
      rows.push({
        projectId: project.id,
        chapterId,
        factType: "clue",
        subject: "伏笔",
        predicate: text.includes(clue) ? "已落正文" : "计划埋设",
        object: String(clue),
        evidence: compactRagText(chapter.outline || detail.hook || text, 360),
        confidence: text.includes(clue) ? 0.88 : 0.66,
        updatedAt: now,
      });
    }
    if (chapter.llmMeta?.model) {
      rows.push({
        projectId: project.id,
        chapterId,
        factType: "generation_model",
        subject: `第${chapterId}章`,
        predicate: "生成模型",
        object: `${chapter.llmMeta.provider || ""}/${chapter.llmMeta.model || ""}`,
        evidence: JSON.stringify(chapter.llmMeta).slice(0, 520),
        confidence: 0.95,
        updatedAt: now,
      });
    }
    const progressState = progressStateMap.get(chapterId) || progressStateCoreServer(extractChapterProgressStateServer(chapter));
    const progressItems = [
      ["trust", progressState.trust],
      ["backlash", progressState.backlash],
      ["prediction", progressState.prediction],
      ...Object.entries(progressState.characterStats || {}),
    ];
    for (const [key, item] of progressItems) {
      if (!item || item.value === undefined || item.value === null) continue;
      rows.push({
        projectId: project.id,
        chapterId,
        factType: "numeric_state",
        subject: `第${chapterId}章`,
        predicate: item.label || key,
        object: `${item.value}${item.unit || "%"}${item.inherited ? "（承接）" : ""}`,
        evidence: item.evidence || progressStateSummaryServer(progressState),
        confidence: item.inherited ? 0.72 : 0.9,
        updatedAt: now,
      });
    }
  }
  return rows;
}

function characterShortNameServer(name = "") {
  const text = String(name || "").trim();
  return text.split(/[／/、\s·｜|()（）-]/).filter(Boolean)[0] || text;
}

function isEarlyLiuyifeiChapterServer(project = {}, chapter = {}) {
  const detail = chapter.detailedOutline && typeof chapter.detailedOutline === "object" && !Array.isArray(chapter.detailedOutline)
    ? chapter.detailedOutline
    : {};
  return /娱乐圈|女星|演员|明星/.test(`${project.title || ""}${project.genre || ""}${project.logline || ""}`)
    && Number(chapter.id || 0) <= 7
    && /刘亦菲/.test(`${chapter.title || ""}${chapter.outline || ""}${detail.core || ""}${detail.sourceNode || ""}`);
}

function previousStoryTextBeforeServer(project = {}, chapterId = 0, lookback = 8) {
  const currentId = Number(chapterId || 0);
  return sortChaptersByIdServer(project.chapters || [])
    .filter((item) => Number(item.id || 0) < currentId)
    .slice(-lookback)
    .map((item) => [
      item.title,
      item.manuscript,
      item.memorySummary,
      item.endingSnapshot,
      JSON.stringify(item.detailedOutline || ""),
    ].filter(Boolean).join("\n"))
    .join("\n");
}

function liuyifeiKnowsChenXuanBeforeServer(project = {}, chapter = {}) {
  const previousText = previousStoryTextBeforeServer(project, chapter.id);
  if (!previousText || !previousText.includes("刘亦菲") || !previousText.includes("陈玄")) return false;
  return /刘亦菲[\s\S]{0,900}“陈玄[！!，,。—-]/.test(previousText)
    || /“陈玄[！!，,。—-][\s\S]{0,900}刘亦菲/.test(previousText)
    || /刘亦菲[\s\S]{0,500}不知道你叫什么名字[\s\S]{0,80}“陈玄/.test(previousText)
    || /“陈玄，”她念了一遍/.test(previousText);
}

function unsupportedContinuityFactIssuesServer(project = {}, chapter = {}) {
  const text = String(chapter.manuscript || "");
  if (!text) return [];
  const chapters = project.chapters || [];
  const currentId = Number(chapter.id || 0);
  const previous = chapters
    .filter((item) => Number(item.id || 0) < currentId)
    .sort((a, b) => Number(a.id || 0) - Number(b.id || 0))
    .at(-1);
  const allowedContext = [
    previous?.manuscript,
    previous?.memorySummary,
    previous?.endingSnapshot,
    JSON.stringify(previous?.detailedOutline || ""),
    JSON.stringify(chapter.detailedOutline || ""),
    chapter.outline,
  ].filter(Boolean).join("\n");
  const issues = ["胎记", "伤疤", "疤痕", "血缘秘密", "家庭秘密", "初吻", "私生子"]
    .filter((word) => text.includes(word) && !allowedContext.includes(word))
    .map((word) => ({
      level: "高",
      type: "事实",
      pos: `第${chapter.id}章`,
      text: `正文新增了前文和细纲没有支撑的私密事实：${word}。`,
      fix: "删除凭空新增事实，改用已出现的报纸、选角通告、电话预言、试镜结果等连续性证据。",
    }));
  if (liuyifeiKnowsChenXuanBeforeServer(project, chapter) && /我没记住你全名|还不知道你叫什么名字|不知道你叫什么名字|第一次知道.*陈玄|重新知道.*陈玄/.test(text)) {
    issues.push({
      level: "高",
      type: "连续性",
      pos: `第${chapter.id}章`,
      text: "身份认知重复：前文刘亦菲已经知道陈玄姓名，本章又写成重新问名或第一次记住。",
      fix: "删除重新问名桥段，让刘亦菲直接称呼陈玄；把冲突改到事业结果、监护人边界或信任推进上。",
    });
  }
  if (isEarlyLiuyifeiChapterServer(project, chapter) && /十块钱|10块|三十块钱|30块/.test(text)) {
    issues.push({
      level: "高",
      type: "事实",
      pos: `第${chapter.id}章`,
      text: "刘亦菲前 7 章金额设定被改写：当前固定为七块钱，不应出现十块/三十块。",
      fix: "把算命费、补钱、玩笑金额统一改成七块钱；无关价格改成不写具体数额。",
    });
  }
  return issues;
}

function extractCharacterStates(project = {}) {
  const rows = [];
  const now = new Date().toISOString();
  const chapters = project.chapters || [];
  const progressStateMap = buildProjectProgressStateMapServer(project);
  for (const character of project.characters || []) {
    const name = String(character.name || "").trim();
    if (!name) continue;
    const short = characterShortNameServer(name);
    const related = chapters
      .filter((chapter) => (chapter.roles || []).some((role) => characterShortNameServer(role) === short) || String(chapter.manuscript || "").includes(short))
      .slice(-5);
    const recent = related.at(-1) || {};
    const progressState = recent?.id ? (progressStateMap.get(Number(recent.id || 0)) || {}) : {};
    rows.push({
      projectId: project.id,
      characterName: name,
      chapterId: Number(recent.id || character.first || 0) || 0,
      status: character.risk ? `缺席风险：${character.risk}` : "持续跟踪",
      location: recent.title || character.plan || "待定位",
      goal: character.next || character.plan || "按角色线推进",
      relationSnapshot: [character.relation || character.role || "", progressStateSummaryServer(progressState)].filter(Boolean).join("；"),
      powerState: /星运|预言|赋能|强化|金手指/.test(`${character.role || ""}${character.relation || ""}${character.next || ""}`) ? "受金手指线影响" : "",
      evidence: compactRagText([character.actual, character.next, recent.memorySummary, recent.outline].filter(Boolean).join("；"), 520),
      updatedAt: now,
    });
  }
  return rows;
}

function ensurePromptVersions(project = {}) {
  const now = new Date().toISOString();
  const rules = [
    ...(project.generationRules || []),
    ...(project.learnedRules || []),
    ...(project.styleTags || []).filter((tag) => tag.enabled).map((tag) => tag.name),
    project.styleFusionGoal || "",
  ].filter(Boolean).join("\n");
  const promptText = compactRagText(`章节正文生成规则\n${rules || "按章节细纲、连续性记忆、人物状态和字数约束生成正文。"}`, 4000);
  const promptId = `prompt-${project.id}-${hashString(promptText).toString(16)}`;
  db.prepare(`
    INSERT OR IGNORE INTO prompt_versions (project_id, prompt_id, task, label, prompt_text, metrics_json, active, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    project.id,
    promptId,
    "章节正文",
    "自动同步：章节正文生成",
    promptText,
    JSON.stringify({ source: "project-rules", ruleCount: (project.generationRules || []).length + (project.learnedRules || []).length }),
    1,
    now,
  );
  db.prepare("UPDATE prompt_versions SET active = CASE WHEN prompt_id = ? THEN 1 ELSE 0 END WHERE project_id = ? AND task = ?")
    .run(promptId, project.id, "章节正文");
  return promptId;
}

function estimateModelCost(provider = "", model = "", inputTokens = 0, outputTokens = 0) {
  const id = `${provider} ${model}`.toLowerCase();
  let inputPerMillion = 0.4;
  let outputPerMillion = 1.2;
  if (/gpt|openai/.test(id)) {
    inputPerMillion = /mini|nano/.test(id) ? 0.15 : 2.5;
    outputPerMillion = /mini|nano/.test(id) ? 0.6 : 10;
  } else if (/claude|anthropic/.test(id)) {
    inputPerMillion = /haiku/.test(id) ? 0.8 : 3;
    outputPerMillion = /haiku/.test(id) ? 4 : 15;
  } else if (/gemini/.test(id)) {
    inputPerMillion = /flash/.test(id) ? 0.35 : 1.25;
    outputPerMillion = /flash/.test(id) ? 1.05 : 5;
  } else if (/deepseek/.test(id)) {
    inputPerMillion = 0.3;
    outputPerMillion = 1.2;
  }
  return Number(((Number(inputTokens || 0) / 1_000_000) * inputPerMillion + (Number(outputTokens || 0) / 1_000_000) * outputPerMillion).toFixed(6));
}

function recordCostEvent({ projectId = "", chapterId = 0, provider = "", model = "", task = "", usage = {}, createdAt = "" } = {}) {
  const inputTokens = Number(usage.inputTokens || 0);
  const outputTokens = Number(usage.outputTokens || 0);
  const totalTokens = Number(usage.totalTokens || inputTokens + outputTokens || 0);
  const timestamp = createdAt || new Date().toISOString();
  const eventKey = `${projectId}:${chapterId}:${task}:${provider}:${model}:${timestamp}:${totalTokens}`;
  const estimatedCost = estimateModelCost(provider, model, inputTokens, outputTokens);
  db.prepare(`
    INSERT OR IGNORE INTO cost_events (project_id, chapter_id, event_key, provider, model, task, input_tokens, output_tokens, total_tokens, estimated_cost, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    String(projectId || "default"),
    Number(chapterId || 0),
    eventKey,
    String(provider || ""),
    String(model || ""),
    String(task || ""),
    inputTokens,
    outputTokens,
    totalTokens,
    estimatedCost,
    timestamp,
  );
  return { inputTokens, outputTokens, totalTokens, estimatedCost, eventKey };
}

function syncCostEventsFromProject(project = {}) {
  for (const log of project.llmCallLogs || []) {
    recordCostEvent({
      projectId: project.id,
      chapterId: Number(log.chapter || 0),
      provider: log.provider || "",
      model: log.model || "",
      task: log.task || "章节正文",
      usage: log.usage || {},
      createdAt: log.calledAt || log.createdAt || "",
    });
  }
}

function rebuildVectorIndex(project, facts = [], states = []) {
  const now = new Date().toISOString();
  const projectId = String(project.id || "");
  if (!projectId) return 0;
  const sources = [];
  for (const row of memoryRowsFromState({ projects: [project] })) {
    sources.push(vectorSource(projectId, `memory:${row.kind}`, row.ref, row.content, { kind: row.kind }));
  }
  for (const fact of facts) {
    sources.push(vectorSource(projectId, `fact:${fact.factType}`, `${fact.chapterId}-${fact.subject}-${fact.predicate}`, `${fact.subject}${fact.predicate}${fact.object}。证据：${fact.evidence}`, { chapterId: fact.chapterId, confidence: fact.confidence }));
  }
  for (const state of states) {
    sources.push(vectorSource(projectId, "character_state", `${state.characterName}-${state.chapterId}`, `${state.characterName}：${state.status}；位置：${state.location}；目标：${state.goal}；关系：${state.relationSnapshot}；${state.evidence}`, { chapterId: state.chapterId }));
  }
  const prompts = db.prepare("SELECT prompt_id, task, label, prompt_text FROM prompt_versions WHERE project_id = ? ORDER BY id DESC LIMIT 20").all(projectId);
  for (const prompt of prompts) {
    sources.push(vectorSource(projectId, "prompt_version", prompt.prompt_id, `${prompt.task} ${prompt.label} ${prompt.prompt_text}`, { task: prompt.task }));
  }

  db.prepare("DELETE FROM vector_index WHERE project_id = ?").run(projectId);
  const insert = db.prepare(`
    INSERT OR REPLACE INTO vector_index (project_id, source_kind, source_ref, content, vector_json, keywords_json, metadata_json, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const source of sources) {
    if (!source.content) continue;
    insert.run(
      source.projectId,
      source.sourceKind,
      source.sourceRef,
      source.content,
      JSON.stringify(buildHashVector(source.content)),
      JSON.stringify(ragTerms(source.content).slice(0, 80)),
      JSON.stringify(source.metadata || {}),
      now,
    );
  }
  return sources.length;
}

function createPlotVersion(project = {}, label = "自动基线") {
  const now = new Date().toISOString();
  const progressStateMap = buildProjectProgressStateMapServer(project);
  const summary = compactRagText([
    project.title,
    `当前章节：${project.currentChapter || 0}`,
    `目录：${project.chapterPlanCount || project.chapters?.length || 0}`,
    `正文：${project.words || 0}字`,
    project.storyMemory?.digest || "",
  ].filter(Boolean).join("；"), 1000);
  const stateJson = JSON.stringify({
    title: project.title,
    currentChapter: project.currentChapter || 0,
    outlineRows: project.outlineRows || [],
    characters: project.characters || [],
    chapters: (project.chapters || []).map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      status: chapter.status,
      outline: chapter.outline,
      detailedOutline: chapter.detailedOutline,
      progressState: progressStateMap.get(Number(chapter.id || 0)) || {},
      memorySummary: chapter.memorySummary || "",
      endingSnapshot: chapter.endingSnapshot || "",
      score: chapter.score || null,
    })),
  });
  const versionId = `plot-${project.id}-${hashString(`${summary}:${stateJson}`).toString(16)}-${Date.now().toString(36)}`;
  db.prepare(`
    INSERT OR IGNORE INTO plot_versions (project_id, version_id, label, summary, state_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(project.id, versionId, label, summary, stateJson, now);
  return { versionId, label, summary, createdAt: now };
}

function ensureBaselinePlotVersion(project = {}) {
  const existing = db.prepare("SELECT id FROM plot_versions WHERE project_id = ? LIMIT 1").get(project.id);
  if (!existing) createPlotVersion(project, "自动基线");
}

function syncProductionFromState(state, { projectId = "" } = {}) {
  if (!state?.projects?.length) return { projects: 0, vectors: 0, facts: 0, states: 0 };
  const targetProjects = projectId
    ? state.projects.filter((project) => project.id === projectId)
    : state.projects;
  let vectorCount = 0;
  let factCount = 0;
  let stateCount = 0;
  db.exec("BEGIN");
  try {
    for (const project of targetProjects) {
      const facts = extractChapterFacts(project);
      const states = extractCharacterStates(project);
      db.prepare("DELETE FROM chapter_facts WHERE project_id = ?").run(project.id);
      db.prepare("DELETE FROM character_states WHERE project_id = ?").run(project.id);
      const factInsert = db.prepare(`
        INSERT INTO chapter_facts (project_id, chapter_id, fact_type, subject, predicate, object, evidence, confidence, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const fact of facts) {
        factInsert.run(fact.projectId, fact.chapterId, fact.factType, fact.subject, fact.predicate, fact.object, fact.evidence, fact.confidence, fact.updatedAt);
      }
      const stateInsert = db.prepare(`
        INSERT OR REPLACE INTO character_states (project_id, character_name, chapter_id, status, location, goal, relation_snapshot, power_state, evidence, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const row of states) {
        stateInsert.run(row.projectId, row.characterName, row.chapterId, row.status, row.location, row.goal, row.relationSnapshot, row.powerState, row.evidence, row.updatedAt);
      }
      ensurePromptVersions(project);
      ensureBaselinePlotVersion(project);
      syncCostEventsFromProject(project);
      vectorCount += rebuildVectorIndex(project, facts, states);
      factCount += facts.length;
      stateCount += states.length;
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  return { projects: targetProjects.length, vectors: vectorCount, facts: factCount, states: stateCount };
}

function hybridSearch({ projectId = "", query = "", chapterId = 0, kind = "", limit = 12 } = {}) {
  const terms = ragTerms(`${chapterId} ${query}`);
  const queryVector = buildHashVector(query || `${chapterId}`);
  const rows = kind
    ? db.prepare("SELECT * FROM vector_index WHERE project_id = ? AND source_kind LIKE ?").all(projectId, `${kind}%`)
    : db.prepare("SELECT * FROM vector_index WHERE project_id = ?").all(projectId);
  return rows
    .map((row) => {
      let vector = [];
      let keywords = [];
      try { vector = JSON.parse(row.vector_json || "[]"); } catch {}
      try { keywords = JSON.parse(row.keywords_json || "[]"); } catch {}
      const lower = `${row.content || ""} ${keywords.join(" ")}`.toLowerCase();
      const keywordScore = terms.reduce((sum, term) => sum + (lower.includes(term) ? Math.min(10, term.length + 2) : 0), 0);
      const vectorScore = cosineSimilarity(queryVector, vector) * 100;
      const distance = chapterDistanceFromRef(row.source_ref, chapterId);
      const chapterBoost = distance === 0 ? 24 : distance <= 2 ? 14 : distance <= 8 ? 6 : 0;
      const kindBoost = /continuity|character_state|chapter/.test(row.source_kind) ? 8 : 0;
      const score = keywordScore * 0.52 + vectorScore * 0.34 + chapterBoost + kindBoost;
      return {
        sourceKind: row.source_kind,
        sourceRef: row.source_ref,
        content: row.content,
        score: Number(score.toFixed(2)),
        keywordScore,
        vectorScore: Number(vectorScore.toFixed(2)),
        chapterDistance: distance,
      };
    })
    .filter((row) => row.score > 8 || !query)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(Number(limit) || 12, 50));
}

function projectById(state, projectId = "") {
  return (state?.projects || []).find((project) => project.id === projectId) || (state?.projects || [])[0] || null;
}

function regressionIssuesForProject(project = {}) {
  const issues = [];
  const chapters = project.chapters || [];
  const vectorCount = db.prepare("SELECT COUNT(*) AS count FROM vector_index WHERE project_id = ?").get(project.id)?.count || 0;
  const factCount = db.prepare("SELECT COUNT(*) AS count FROM chapter_facts WHERE project_id = ?").get(project.id)?.count || 0;
  if (vectorCount < Math.min(20, Math.max(5, chapters.length))) {
    issues.push({ level: "高", type: "RAG", pos: "向量索引", text: `向量片段只有 ${vectorCount} 条，低于当前项目需要。`, fix: "点击“同步生产索引”，确保章节、事实、人物状态已入库。" });
  }
  if (factCount < Math.min(20, Math.max(5, chapters.filter((chapter) => chapter.manuscript).length * 2))) {
    issues.push({ level: "中", type: "事实库", pos: "章节事实", text: `章节事实只有 ${factCount} 条，事实覆盖偏低。`, fix: "生成或保存正文后同步事实库，必要时补角色和伏笔字段。" });
  }
  issues.push(...numericRegressionIssuesServer(project));
  const drafts = chapters.filter((chapter) => chapter.manuscript);
  for (const chapter of drafts.slice(0, 80)) {
    const words = String(chapter.manuscript || "").match(/[\u4e00-\u9fa5A-Za-z0-9]/g)?.length || 0;
    if (words && (words < 2200 || words > 3000)) {
      issues.push({ level: words < 2200 ? "高" : "中", type: "字数", pos: `第${chapter.id}章`, text: `正文 ${words} 字，不在 2200-3000 区间。`, fix: "重新生成或编辑到目标字数区间。" });
    }
    const missingRoles = (chapter.roles || []).filter((role) => role && !String(chapter.manuscript || "").includes(characterShortNameServer(role)));
    if (missingRoles.length) {
      issues.push({ level: "中", type: "角色", pos: `第${chapter.id}章`, text: `计划角色未落正文：${missingRoles.slice(0, 3).join("、")}。`, fix: "补出场动作/台词，或调整章节角色计划。" });
    }
    issues.push(...unsupportedContinuityFactIssuesServer(project, chapter));
  }
  const states = db.prepare("SELECT character_name, COUNT(*) AS count FROM character_states WHERE project_id = ? GROUP BY character_name").all(project.id);
  for (const character of (project.characters || []).slice(0, 80)) {
    const match = states.find((row) => row.character_name === character.name);
    if (!match) {
      issues.push({ level: "中", type: "状态机", pos: character.name || "角色", text: "人物状态机缺少该角色记录。", fix: "同步生产索引，或在角色表补计划出场和关系进展。" });
    }
  }
  return issues.slice(0, 80);
}

function runRegression(project = {}) {
  const issues = regressionIssuesForProject(project);
  const high = issues.filter((issue) => issue.level === "高").length;
  const medium = issues.filter((issue) => issue.level === "中").length;
  const score = Math.max(0, Math.round(100 - high * 12 - medium * 5));
  const run = {
    runId: stableId("reg"),
    status: high ? "需修复" : medium ? "有风险" : "通过",
    score,
    issues,
    createdAt: new Date().toISOString(),
  };
  db.prepare(`
    INSERT INTO regression_runs (project_id, run_id, status, score, issues_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(project.id, run.runId, run.status, run.score, JSON.stringify(run.issues), run.createdAt);
  return run;
}

function evaluatePromptText(promptText = "") {
  const checks = [
    { name: "连续性", pass: /连续|上一章|承接|记忆|RAG/.test(promptText), fix: "加入上一章尾声和 RAG 记忆约束。" },
    { name: "人物状态", pass: /角色|人物|欲望|顾虑|选择|状态/.test(promptText), fix: "加入人物欲望、顾虑、状态机和关系变化。" },
    { name: "字数", pass: /2200|3000|字数|目标/.test(promptText), fix: "加入 2200-3000 字硬约束。" },
    { name: "去AI味", pass: /AI|物品清单|禁词|少解释|心理/.test(promptText), fix: "加入禁词、少物品堆叠和心理选择规则。" },
    { name: "审查", pass: /审查|评分|回归|伏笔|一致/.test(promptText), fix: "加入生成后审查标准。" },
  ];
  const passed = checks.filter((item) => item.pass).length;
  return {
    score: Math.round((passed / checks.length) * 100),
    cases: checks.map((item) => ({ ...item, status: item.pass ? "通过" : "待补" })),
  };
}

function runPromptEval(project = {}) {
  let prompt = db.prepare("SELECT * FROM prompt_versions WHERE project_id = ? AND active = 1 ORDER BY id DESC LIMIT 1").get(project.id);
  if (!prompt) {
    ensurePromptVersions(project);
    prompt = db.prepare("SELECT * FROM prompt_versions WHERE project_id = ? AND active = 1 ORDER BY id DESC LIMIT 1").get(project.id);
  }
  const evalResult = evaluatePromptText(prompt?.prompt_text || "");
  const run = {
    evalId: stableId("peval"),
    promptId: prompt?.prompt_id || "",
    score: evalResult.score,
    cases: evalResult.cases,
    createdAt: new Date().toISOString(),
  };
  db.prepare(`
    INSERT INTO prompt_eval_runs (project_id, eval_id, prompt_id, score, cases_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(project.id, run.evalId, run.promptId, run.score, JSON.stringify(run.cases), run.createdAt);
  return run;
}

function runEditorAgent(project = {}, chapterId = 0) {
  const chapter = (project.chapters || []).find((item) => Number(item.id) === Number(chapterId)) || (project.chapters || [])[0] || {};
  const text = String(chapter.manuscript || "");
  const words = text.match(/[\u4e00-\u9fa5A-Za-z0-9]/g)?.length || 0;
  const forbidden = (project.forbiddenWords || []).filter((word) => word && text.includes(word)).slice(0, 8);
  const ragHits = hybridSearch({
    projectId: project.id,
    query: `${chapter.title || ""} ${chapter.outline || ""} ${(chapter.roles || []).join(" ")}`,
    chapterId: Number(chapter.id || 0),
    limit: 6,
  });
  const rounds = [
    {
      round: 1,
      name: "诊断",
      output: [
        words ? `当前 ${words} 字。` : "当前没有正文，需要先生成或粘贴正文。",
        forbidden.length ? `命中禁词：${forbidden.join("、")}。` : "未命中主要禁词。",
        `RAG 可用上下文 ${ragHits.length} 条。`,
      ],
    },
    {
      round: 2,
      name: "结构修复",
      output: [
        "开头先接上一章结果，再进入本章新麻烦。",
        "中段保留两次选择：一次误判，一次反击或付代价。",
        "结尾落到电话、提示框、资源变化或角色选择。",
      ],
    },
    {
      round: 3,
      name: "人物鲜活",
      output: [
        "删掉静态场景清单，只留影响选择的细节。",
        "补主角此刻怕什么、想保住什么、为什么还要赌。",
        "每段心理后接动作或台词，不让人物原地解释。",
      ],
    },
    {
      round: 4,
      name: "去AI味",
      output: forbidden.length
        ? forbidden.map((word) => `把“${word}”替换成具体动作、欲望、顾虑或结果反馈。`)
        : ["继续避免模板词、宏大总结和空泛情绪标签。"],
    },
    {
      round: 5,
      name: "验收",
      output: [
        "检查字数 2200-3000。",
        "检查计划角色都在正文里有动作或台词。",
        "检查 RAG 记忆没有被照抄，只用于连续性。",
      ],
    },
  ];
  const run = {
    runId: stableId("agent"),
    projectId: project.id,
    chapterId: Number(chapter.id || chapterId || 0),
    rounds,
    status: "已生成修订方案",
    createdAt: new Date().toISOString(),
  };
  db.prepare(`
    INSERT INTO editor_agent_runs (project_id, chapter_id, run_id, rounds_json, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(project.id, run.chapterId, run.runId, JSON.stringify(rounds), run.status, run.createdAt);
  return run;
}

function buildProductionSummary(projectId = "") {
  const state = readSavedState();
  const project = projectById(state, projectId);
  const id = project?.id || projectId || "";
  if (!id) return null;
  const one = (sql, ...args) => db.prepare(sql).get(...args) || {};
  const all = (sql, ...args) => db.prepare(sql).all(...args);
  const latestRegression = one("SELECT * FROM regression_runs WHERE project_id = ? ORDER BY id DESC LIMIT 1", id);
  const latestEval = one("SELECT * FROM prompt_eval_runs WHERE project_id = ? ORDER BY id DESC LIMIT 1", id);
  const cost = one("SELECT COUNT(*) AS calls, SUM(input_tokens) AS inputTokens, SUM(output_tokens) AS outputTokens, SUM(total_tokens) AS totalTokens, SUM(estimated_cost) AS estimatedCost FROM cost_events WHERE project_id = ?", id);
  const vectorKinds = all("SELECT source_kind AS kind, COUNT(*) AS count FROM vector_index WHERE project_id = ? GROUP BY source_kind ORDER BY count DESC LIMIT 8", id);
  const facts = all("SELECT chapter_id, fact_type, subject, predicate, object, confidence FROM chapter_facts WHERE project_id = ? ORDER BY chapter_id DESC, id DESC LIMIT 12", id);
  const states = all("SELECT character_name, chapter_id, status, location, goal, relation_snapshot FROM character_states WHERE project_id = ? ORDER BY id DESC LIMIT 12", id);
  const versions = all("SELECT version_id, label, summary, created_at FROM plot_versions WHERE project_id = ? ORDER BY id DESC LIMIT 8", id);
  const prompts = all("SELECT prompt_id, task, label, active, metrics_json, created_at FROM prompt_versions WHERE project_id = ? ORDER BY id DESC LIMIT 8", id);
  const regressionRuns = all("SELECT run_id, status, score, issues_json, created_at FROM regression_runs WHERE project_id = ? ORDER BY id DESC LIMIT 6", id)
    .map((run) => ({ ...run, issues: JSON.parse(run.issues_json || "[]").slice(0, 5), issues_json: undefined }));
  const evalRuns = all("SELECT eval_id, prompt_id, score, cases_json, created_at FROM prompt_eval_runs WHERE project_id = ? ORDER BY id DESC LIMIT 6", id)
    .map((run) => ({ ...run, cases: JSON.parse(run.cases_json || "[]"), cases_json: undefined }));
  const agentRuns = all("SELECT run_id, chapter_id, rounds_json, status, created_at FROM editor_agent_runs WHERE project_id = ? ORDER BY id DESC LIMIT 4", id)
    .map((run) => ({ ...run, rounds: JSON.parse(run.rounds_json || "[]"), rounds_json: undefined }));
  return {
    projectId: id,
    title: project?.title || "",
    counts: {
      vectors: one("SELECT COUNT(*) AS count FROM vector_index WHERE project_id = ?", id).count || 0,
      facts: one("SELECT COUNT(*) AS count FROM chapter_facts WHERE project_id = ?", id).count || 0,
      characterStates: one("SELECT COUNT(*) AS count FROM character_states WHERE project_id = ?", id).count || 0,
      plotVersions: one("SELECT COUNT(*) AS count FROM plot_versions WHERE project_id = ?", id).count || 0,
      promptVersions: one("SELECT COUNT(*) AS count FROM prompt_versions WHERE project_id = ?", id).count || 0,
      regressionRuns: one("SELECT COUNT(*) AS count FROM regression_runs WHERE project_id = ?", id).count || 0,
      editorAgentRuns: one("SELECT COUNT(*) AS count FROM editor_agent_runs WHERE project_id = ?", id).count || 0,
    },
    latestRegression: latestRegression.run_id ? { runId: latestRegression.run_id, status: latestRegression.status, score: latestRegression.score, createdAt: latestRegression.created_at } : null,
    latestPromptEval: latestEval.eval_id ? { evalId: latestEval.eval_id, promptId: latestEval.prompt_id, score: latestEval.score, createdAt: latestEval.created_at } : null,
    cost: {
      calls: Number(cost.calls || 0),
      inputTokens: Number(cost.inputTokens || 0),
      outputTokens: Number(cost.outputTokens || 0),
      totalTokens: Number(cost.totalTokens || 0),
      estimatedCost: Number(cost.estimatedCost || 0),
    },
    vectorKinds,
    facts,
    states,
    versions,
    prompts,
    regressionRuns,
    evalRuns,
    agentRuns,
  };
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
  syncProductionFromState(state);
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

  if (req.method === "GET" && url.pathname === "/api/production/summary") {
    const projectId = url.searchParams.get("projectId") || "";
    const summary = buildProductionSummary(projectId);
    sendJson(res, summary ? 200 : 404, summary ? { ok: true, summary } : { ok: false, error: "未找到项目生产数据" });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/production/sync") {
    const payload = JSON.parse(await readBody(req) || "{}");
    const state = readSavedState();
    if (!state) {
      sendJson(res, 400, { ok: false, error: "本地数据库还没有保存项目状态" });
      return;
    }
    const result = syncProductionFromState(state, { projectId: payload.projectId || "" });
    const summary = buildProductionSummary(payload.projectId || "");
    sendJson(res, 200, { ok: true, result, summary });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/production/search") {
    const rows = hybridSearch({
      projectId: url.searchParams.get("projectId") || "",
      query: url.searchParams.get("q") || "",
      chapterId: Number(url.searchParams.get("chapterId") || 0),
      kind: url.searchParams.get("kind") || "",
      limit: Number(url.searchParams.get("limit") || 12),
    });
    sendJson(res, 200, { ok: true, rows });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/production/version") {
    const payload = JSON.parse(await readBody(req) || "{}");
    const state = readSavedState();
    const project = projectById(state, payload.projectId || "");
    if (!project) {
      sendJson(res, 404, { ok: false, error: "未找到项目" });
      return;
    }
    const version = createPlotVersion(project, payload.label || "手动剧情版本");
    sendJson(res, 200, { ok: true, version, summary: buildProductionSummary(project.id) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/production/regression") {
    const payload = JSON.parse(await readBody(req) || "{}");
    const state = readSavedState();
    const project = projectById(state, payload.projectId || "");
    if (!project) {
      sendJson(res, 404, { ok: false, error: "未找到项目" });
      return;
    }
    syncProductionFromState(state, { projectId: project.id });
    const run = runRegression(project);
    sendJson(res, 200, { ok: true, run, summary: buildProductionSummary(project.id) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/production/prompt-eval") {
    const payload = JSON.parse(await readBody(req) || "{}");
    const state = readSavedState();
    const project = projectById(state, payload.projectId || "");
    if (!project) {
      sendJson(res, 404, { ok: false, error: "未找到项目" });
      return;
    }
    syncProductionFromState(state, { projectId: project.id });
    const run = runPromptEval(project);
    sendJson(res, 200, { ok: true, run, summary: buildProductionSummary(project.id) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/production/editor-agent") {
    const payload = JSON.parse(await readBody(req) || "{}");
    const state = readSavedState();
    const project = projectById(state, payload.projectId || "");
    if (!project) {
      sendJson(res, 404, { ok: false, error: "未找到项目" });
      return;
    }
    syncProductionFromState(state, { projectId: project.id });
    const run = runEditorAgent(project, Number(payload.chapterId || 0));
    sendJson(res, 200, { ok: true, run, summary: buildProductionSummary(project.id) });
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
      const ragPrompt = buildRagAugmentedPrompt({
        projectId: payload.projectId,
        chapterId: payload.chapterId,
        prompt: String(payload.prompt),
      });
      const result = await callModel({
        state,
        task: payload.task || "章节正文",
        prompt: ragPrompt.prompt,
        targetWords: Number(payload.targetWords || 2200),
      });
      if (!result.text) throw new Error("模型返回为空");
      const cost = recordCostEvent({
        projectId: payload.projectId || "",
        chapterId: Number(payload.chapterId || 0),
        provider: result.provider.name,
        model: result.model,
        task: result.route.task,
        usage: result.usage,
      });
      sendJson(res, 200, {
        ok: true,
        text: result.text,
        rag: ragPrompt.meta,
        cost,
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
