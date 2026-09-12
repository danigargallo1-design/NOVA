/* =====================================================================
   NOVA — script.js
   PWA vanilla (HTML + CSS + JS). Persistencia local con IndexedDB.
   Escribe primero. Organiza después.
   ===================================================================== */
"use strict";

/* ---------------------------------------------------------------------
   ICONOS  (SVG inline, trazo fino y geométrico — fáciles de reemplazar)
   Para cambiar un icono, edita únicamente su entrada en este objeto.
   --------------------------------------------------------------------- */
const ICONS = {
  home: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
  layers: '<path d="m12 3 8 4.5-8 4.5-8-4.5z"/><path d="m4 12 8 4.5 8-4.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6h.04A1.7 1.7 0 0 0 10 3.05V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.64a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9v.04A1.7 1.7 0 0 0 20.95 10H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15z"/>',
  "arrow-left": '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  "arrow-right": '<path d="M5 12h14M12 5l7 7-7 7"/>',
  "chevron-right": '<path d="m9 6 6 6-6 6"/>',
  dots: '<circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4"/>',
  sparkle: '<path d="M12 3c.4 3.6 1.4 4.6 5 5-3.6.4-4.6 1.4-5 5-.4-3.6-1.4-4.6-5-5 3.6-.4 4.6-1.4 5-5z"/>',
  list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  rocket:
    '<path d="M5 15c-1.5 1.2-2 5-2 5s3.8-.5 5-2M9 11a10 10 0 0 1 8-6 10 10 0 0 1-6 8l-2 3-3-3z"/><circle cx="14.5" cy="9.5" r="1.2"/>',
  note: '<path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v6h6"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.3 1 2.5h6c0-1.2.2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.8 6.6 20l1-6.1L3.2 9.5l6.1-.9z"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  trash: '<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>',
  tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l8 8-9 9z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
  inbox: '<path d="M4 13h4l1.5 3h5L16 13h4M4 13 6 5h12l2 8v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
  moon: '<path d="M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z"/>',
  transform: '<path d="M4 7h11l-3-3M20 17H9l3 3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  heart: '<path d="M12 20s-7-4.3-9.3-8.3A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5.7C19 15.7 12 20 12 20z"/>',
};

function ic(name, extra) {
  const path = ICONS[name] || "";
  return (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round"' +
    (extra ? ' class="' + extra + '"' : "") +
    ">" +
    path +
    "</svg>"
  );
}

/* Rellena todos los <span data-icon="x"> del DOM estático */
function hydrateIcons(root) {
  (root || document).querySelectorAll("[data-icon]").forEach((el) => {
    if (!el.dataset.hydrated) {
      el.innerHTML = ic(el.dataset.icon);
      el.dataset.hydrated = "1";
    }
  });
}

/* ---------------------------------------------------------------------
   TIPOS DE CONTENIDO
   --------------------------------------------------------------------- */
const TYPES = {
  nota: { label: "Nota", icon: "note", accent: "var(--accent-note)" },
  idea: { label: "Idea", icon: "sparkle", accent: "var(--accent-idea)" },
  tarea: { label: "Tarea", icon: "check", accent: "var(--accent-task)" },
  lista: { label: "Lista", icon: "list", accent: "var(--accent-list)" },
  proyecto: { label: "Proyecto", icon: "rocket", accent: "var(--accent-project)" },
};
const CHECKLIST_TYPES = ["lista", "proyecto"];

/* ---------------------------------------------------------------------
   INDEXEDDB — capa de persistencia nativa
   --------------------------------------------------------------------- */
const DB = (() => {
  const NAME = "nova-db";
  const STORE = "notes";
  let dbp = null;

  function open() {
    if (dbp) return dbp;
    dbp = new Promise((resolve, reject) => {
      const req = indexedDB.open(NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: "id" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbp;
  }

  async function tx(mode) {
    const db = await open();
    return db.transaction(STORE, mode).objectStore(STORE);
  }

  return {
    async all() {
      const store = await tx("readonly");
      return new Promise((res, rej) => {
        const r = store.getAll();
        r.onsuccess = () => res(r.result || []);
        r.onerror = () => rej(r.error);
      });
    },
    async put(note) {
      const store = await tx("readwrite");
      return new Promise((res, rej) => {
        const r = store.put(note);
        r.onsuccess = () => res(note);
        r.onerror = () => rej(r.error);
      });
    },
    async remove(id) {
      const store = await tx("readwrite");
      return new Promise((res, rej) => {
        const r = store.delete(id);
        r.onsuccess = () => res();
        r.onerror = () => rej(r.error);
      });
    },
    async clear() {
      const store = await tx("readwrite");
      return new Promise((res, rej) => {
        const r = store.clear();
        r.onsuccess = () => res();
        r.onerror = () => rej(r.error);
      });
    },
  };
})();

/* ---------------------------------------------------------------------
   ESTADO
   --------------------------------------------------------------------- */
const state = {
  notes: [],
  view: "home",
  filter: "todos",
  query: "",
  editing: null, // nota abierta en el editor
  dirty: false,
};

/* ---------------------------------------------------------------------
   UTILIDADES
   --------------------------------------------------------------------- */
const $ = (sel, root) => (root || document).querySelector(sel);
const uid = () => "n_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function escapeHtml(s) {
  return (s || "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function debounce(fn, ms) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

function timeAgo(ts) {
  const diff = Math.max(0, Date.now() - ts);
  const min = Math.floor(diff / 60000);
  if (min < 1) return "Ahora";
  if (min < 60) return "Hace " + min + " min";
  const h = Math.floor(min / 60);
  if (h < 24) return "Hace " + h + " h";
  const d = Math.floor(h / 24);
  if (d === 1) return "Ayer";
  if (d < 7) return "Hace " + d + " días";
  return new Date(ts).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

function greetByHour() {
  const h = new Date().getHours();
  if (h < 6) return "Buenas noches";
  if (h < 13) return "Buenos días";
  if (h < 21) return "Buenas tardes";
  return "Buenas noches";
}

function progressOf(note) {
  if (!note.items || !note.items.length) return { done: 0, total: 0, pct: 0 };
  const done = note.items.filter((i) => i.done).length;
  return { done, total: note.items.length, pct: Math.round((done / note.items.length) * 100) };
}

function excerptOf(note) {
  if (CHECKLIST_TYPES.includes(note.type) && note.items && note.items.length) {
    return note.items.slice(0, 3).map((i) => (i.done ? "✓ " : "· ") + i.text).join("   ");
  }
  return (note.body || "").split("\n").join(" ").trim();
}

function isEmptyNote(n) {
  const hasItems = n.items && n.items.some((i) => i.text.trim());
  return !n.title.trim() && !(n.body || "").trim() && !hasItems;
}

/* ---------------------------------------------------------------------
   NOVA SUGIERE — detección local por heurística (sin IA, offline)
   --------------------------------------------------------------------- */
const TASK_WORDS = [
  "comprar", "llamar", "enviar", "mandar", "terminar", "hacer", "revisar",
  "recordar", "pagar", "reservar", "escribir", "preparar", "contactar",
  "arreglar", "agendar", "reunión", "reunion", "cita", "entregar", "responder",
];
const IDEA_WORDS = [
  "idea", "y si", "podría", "podriamos", "podríamos", "concepto", "imagina",
  "quizá", "quizas", "quizás", "tal vez", "app para", "herramienta", "app que",
  "and if", "what if",
];

function detectSuggestion(text, currentType) {
  const raw = (text || "").trim();
  if (raw.length < 12) return null;
  const lower = raw.toLowerCase();
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  const bullets = lines.filter((l) => /^([-*•]|\d+[.)]|\[.?\])\s+/.test(l));

  let type = null;

  if (bullets.length >= 2) {
    const projectWords = /proyecto|fase|objetivo|milestone|entrega|lanzamiento|sprint/;
    type = bullets.length >= 6 || projectWords.test(lower) ? "proyecto" : "lista";
  } else if (IDEA_WORDS.some((w) => lower.includes(w))) {
    type = "idea";
  } else if (
    lines.length <= 2 &&
    (TASK_WORDS.some((w) => lower.startsWith(w) || lower.includes(" " + w)) ||
      /^\[.?\]/.test(raw))
  ) {
    type = "tarea";
  }

  if (!type || type === currentType) return null;

  const messages = {
    lista: "Parece una <b>lista</b>. ¿La organizamos con casillas?",
    proyecto: "Esto tiene pinta de <b>proyecto</b>: varias tareas para seguir su progreso.",
    tarea: "Suena a una <b>tarea</b> por hacer. ¿La marcamos como pendiente?",
    idea: "Parece una <b>idea</b>. La guardamos como debe ser.",
  };
  return { type, message: messages[type] };
}

/* Convierte el texto libre en elementos de checklist */
function parseItems(text) {
  const lines = (text || "").split("\n").map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return [];
  return lines.map((l) => {
    const done = /^\[x\]/i.test(l) || /^✓/.test(l);
    const clean = l.replace(/^([-*•]|\d+[.)]|\[.?\]|✓)\s*/i, "").trim();
    return { id: uid(), text: clean || l, done };
  });
}

/* ---------------------------------------------------------------------
   TOASTS
   --------------------------------------------------------------------- */
function toast(message, withCheck) {
  const host = $("#toast-host");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = (withCheck ? ic("check") : "") + "<span>" + escapeHtml(message) + "</span>";
  host.appendChild(el);
  requestAnimationFrame(() => el.classList.add("toast--show"));
  setTimeout(() => {
    el.classList.remove("toast--show");
    setTimeout(() => el.remove(), 300);
  }, 1900);
}

/* ---------------------------------------------------------------------
   CARD DE NOTA (fragmento reutilizable)
   --------------------------------------------------------------------- */
function cardHtml(note, index) {
  const t = TYPES[note.type] || TYPES.nota;
  const kind =
    '<span class="card__kind" style="color:' + t.accent + '">' +
    ic(t.icon) + t.label + "</span>";

  const star =
    '<button class="card__star' + (note.favorite ? " card__star--on" : "") +
    '" data-star="' + note.id + '" aria-label="Favorito" testID="star-' + note.id + '">' +
    ic("star") + "</button>";

  const title = escapeHtml(note.title || excerptOf(note) || "Sin título");

  let bottom;
  if (CHECKLIST_TYPES.includes(note.type) && note.items && note.items.length) {
    const p = progressOf(note);
    bottom =
      '<div class="progress"><div class="progress__track">' +
      '<div class="progress__fill" style="width:' + p.pct + '%"></div></div>' +
      '<div class="progress__label">' + p.pct + "% · " + p.done + " de " + p.total + " tareas</div></div>";
  } else {
    const ex = excerptOf(note);
    bottom =
      (ex ? '<div class="card__excerpt">' + escapeHtml(ex) + "</div>" : "") +
      '<div class="card__foot"><span class="card__meta">' + timeAgo(note.updatedAt) +
      '</span><span class="card__arrow">' + ic("arrow-right") + "</span></div>";
  }

  return (
    '<div class="card glass enter" style="animation-delay:' + (index * 45) + 'ms" ' +
    'role="button" tabindex="0" data-open="' + note.id + '" testID="card-' + note.id + '">' +
    '<div class="card__top">' + kind + star + "</div>" +
    '<div class="card__title">' + title + "</div>" +
    bottom +
    "</div>"
  );
}

/* ---------------------------------------------------------------------
   RENDER — HOME
   --------------------------------------------------------------------- */
function renderHome() {
  const recent = [...state.notes].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 6);

  const header =
    '<header class="app-header">' +
    '<div class="brand">NOVA<span class="brand__dot">.</span></div>' +
    '<button class="avatar" data-nav="settings" aria-label="Perfil" testID="home-avatar">' +
    ic("settings") + "</button></header>";

  const greeting =
    '<div class="greeting"><div class="greeting__hello">' + greetByHour() + "</div>" +
    '<div class="greeting__sub">¿Qué tienes en mente?</div></div>';

  const capture =
    '<button class="capture glass" data-new="1" testID="quick-capture">' +
    '<span class="capture__placeholder">Escribe algo…</span>' +
    '<span class="capture__add">' + ic("plus") + "</span></button>";

  let recentSection;
  if (recent.length) {
    recentSection =
      '<div class="section-label">Recientes</div><div class="stack">' +
      recent.map((n, i) => cardHtml(n, i)).join("") + "</div>";
  } else {
    recentSection =
      '<div class="section-label">Recientes</div>' +
      '<div class="empty"><div class="empty__mark">' + ic("sparkle") + "</div>" +
      '<div class="empty__title">Todo tranquilo.</div>' +
      '<div class="empty__text">Escribe cualquier cosa y NOVA te ayudará a darle forma.</div>' +
      '<button class="btn btn--primary empty__cta" data-new="1" testID="empty-create">' +
      ic("plus") + "Crear nota</button></div>";
  }

  $("#view-home").innerHTML = header + greeting + capture + recentSection;
}

/* ---------------------------------------------------------------------
   RENDER — NOTAS / INBOX
   --------------------------------------------------------------------- */
const FILTERS = [
  { key: "todos", label: "Todos" },
  { key: "inbox", label: "Inbox" },
  { key: "favoritos", label: "Favoritos" },
  { key: "idea", label: "Ideas" },
  { key: "tarea", label: "Tareas" },
  { key: "lista", label: "Listas" },
  { key: "proyecto", label: "Proyectos" },
  { key: "nota", label: "Notas" },
];

function filterNotes() {
  let list = [...state.notes].sort((a, b) => b.updatedAt - a.updatedAt);
  const f = state.filter;
  if (f === "inbox") list = list.filter((n) => !n.organized);
  else if (f === "favoritos") list = list.filter((n) => n.favorite);
  else if (TYPES[f]) list = list.filter((n) => n.type === f);
  return list;
}

function renderNotes() {
  const chips =
    '<div class="chips">' +
    FILTERS.map(
      (f) =>
        '<button class="chip' + (state.filter === f.key ? " chip--active" : "") +
        '" data-filter="' + f.key + '" testID="filter-' + f.key + '">' + f.label + "</button>"
    ).join("") +
    "</div>";

  const list = filterNotes();
  let body;
  if (list.length) {
    body = '<div class="stack">' + list.map((n, i) => cardHtml(n, i)).join("") + "</div>";
  } else {
    const msg =
      state.filter === "inbox"
        ? "Tu inbox está vacío. Aquí llega todo lo que aún no has organizado."
        : state.filter === "favoritos"
        ? "Marca tus notas con la estrella para verlas aquí."
        : "Nada por aquí todavía. Escribe algo para empezar.";
    body =
      '<div class="empty"><div class="empty__mark">' + ic("inbox") + "</div>" +
      '<div class="empty__title">Vacío por ahora.</div>' +
      '<div class="empty__text">' + msg + "</div>" +
      '<button class="btn btn--primary empty__cta" data-new="1" testID="empty-notes-create">' +
      ic("plus") + "Crear nota</button></div>";
  }

  $("#view-notes").innerHTML =
    '<div class="screen-title">Notas</div>' + chips + body;
}

/* ---------------------------------------------------------------------
   RENDER — BUSCAR
   --------------------------------------------------------------------- */
function renderSearch() {
  const q = state.query.trim().toLowerCase();
  let results = [];
  if (q) {
    results = state.notes
      .filter((n) => {
        const hay = [
          n.title,
          n.body,
          (n.tags || []).join(" "),
          (n.items || []).map((i) => i.text).join(" "),
          (TYPES[n.type] || {}).label,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }

  let body;
  if (!q) {
    body =
      '<div class="empty"><div class="empty__mark">' + ic("search") + "</div>" +
      '<div class="empty__title">Busca en NOVA.</div>' +
      '<div class="empty__text">Encuentra notas, ideas, listas y tareas al instante.</div></div>';
  } else if (results.length) {
    body =
      '<div class="section-label">' + results.length +
      (results.length === 1 ? " resultado" : " resultados") + "</div>" +
      '<div class="stack">' + results.map((n, i) => cardHtml(n, i)).join("") + "</div>";
  } else {
    body =
      '<div class="empty"><div class="empty__mark">' + ic("search") + "</div>" +
      '<div class="empty__title">Sin resultados.</div>' +
      '<div class="empty__text">No encontramos nada para “' + escapeHtml(state.query) + "”.</div></div>";
  }

  const field =
    '<div class="search-field glass">' + ic("search") +
    '<input id="search-input" type="text" placeholder="Buscar…" ' +
    'value="' + escapeHtml(state.query) + '" testID="search-input" ' +
    'autocomplete="off" autocorrect="off" autocapitalize="off" />' +
    (state.query
      ? '<button class="search-clear" data-search-clear="1" aria-label="Limpiar" testID="search-clear">' + ic("x") + "</button>"
      : "") +
    "</div>";

  $("#view-search").innerHTML =
    '<div class="screen-title">Buscar</div>' + field + body;

  const input = $("#search-input");
  if (input) {
    input.addEventListener("input", (e) => {
      state.query = e.target.value;
      const q2 = state.query.trim().toLowerCase();
      // Re-render solo la lista para no perder el foco del input
      renderSearchResults(q2);
    });
    if (state.query) {
      input.focus();
      const v = input.value;
      input.value = "";
      input.value = v;
    }
  }
}

function renderSearchResults(q) {
  // Vuelve a pintar la vista completa pero conservando foco vía flag
  const view = $("#view-search");
  const input = $("#search-input");
  const caret = input ? input.selectionStart : null;
  renderSearch();
  const input2 = $("#search-input");
  if (input2) {
    input2.focus();
    if (caret != null) {
      try { input2.setSelectionRange(caret, caret); } catch (e) {}
    }
  }
}

/* ---------------------------------------------------------------------
   RENDER — AJUSTES
   --------------------------------------------------------------------- */
function renderSettings() {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  const count = state.notes.length;

  const appearance =
    '<div class="section-label">Apariencia</div>' +
    '<div class="settings-group glass">' +
    '<button class="settings-row" data-toggle-theme="1" testID="toggle-theme">' +
    '<span class="settings-row__icon">' + ic("moon") + "</span>" +
    '<span class="settings-row__body"><span class="settings-row__title">Modo oscuro</span>' +
    '<span class="settings-row__desc">Cristal sobre fondo profundo</span></span>' +
    '<span class="toggle' + (dark ? " toggle--on" : "") + '"><span class="toggle__knob"></span></span>' +
    "</button></div>";

  const data =
    '<div class="section-label">Proyecto y datos</div>' +
    '<div class="settings-group glass">' +
    '<button class="settings-row" data-clear-all="1" testID="clear-all">' +
    '<span class="settings-row__icon" style="color:var(--danger);background:rgba(255,90,95,.1)">' + ic("trash") + "</span>" +
    '<span class="settings-row__body"><span class="settings-row__title" style="color:var(--danger)">Borrar todo</span>' +
    '<span class="settings-row__desc">' + count + (count === 1 ? " nota guardada" : " notas guardadas") + "</span></span>" +
    "</button></div>";

  const about =
    '<div class="section-label">Acerca de</div>' +
    '<div class="settings-group glass">' +
    '<div class="settings-row">' +
    '<span class="settings-row__icon">' + ic("info") + "</span>" +
    '<span class="settings-row__body"><span class="settings-row__title">NOVA</span>' +
    '<span class="settings-row__desc">Escribe primero. Organiza después.</span></span>' +
    '<span class="settings-row__trail">v1.0</span></div></div>' +
    '<div class="about"><b>N O V A</b></div>';

  $("#view-settings").innerHTML =
    '<div class="screen-title">Ajustes</div>' + appearance + data + about;
}

/* ---------------------------------------------------------------------
   ROUTER DE VISTAS
   --------------------------------------------------------------------- */
function renderView(name) {
  if (name === "home") renderHome();
  else if (name === "notes") renderNotes();
  else if (name === "search") renderSearch();
  else if (name === "settings") renderSettings();
  hydrateIcons($("#view-" + name));
}

function goView(name) {
  if (name === "create") {
    openEditor(null);
    return;
  }
  state.view = name;
  renderView(name);

  document.querySelectorAll(".view").forEach((v) => {
    v.classList.toggle("view--active", v.dataset.view === name);
    v.scrollTop = v.scrollTop; // no-op para asegurar layout
  });
  const active = $("#view-" + name);
  if (active) active.scrollTop = 0;

  document.querySelectorAll(".nav-btn").forEach((b) => {
    b.classList.toggle("nav-btn--active", b.dataset.nav === name);
  });

  document.body.dataset.scene = name;
}

/* ---------------------------------------------------------------------
   EDITOR
   --------------------------------------------------------------------- */
const editorEl = () => $("#editor");
let suggestDismissed = false;

function openEditor(id) {
  let note;
  if (id) {
    note = state.notes.find((n) => n.id === id);
    if (!note) return;
    state.editing = { ...note, items: (note.items || []).map((i) => ({ ...i })), tags: [...(note.tags || [])] };
  } else {
    state.editing = {
      id: uid(),
      type: "nota",
      title: "",
      body: "",
      favorite: false,
      tags: [],
      items: [],
      organized: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      _isNew: true,
    };
  }
  state.dirty = false;
  suggestDismissed = false;

  fillEditor();
  document.body.dataset.scene = "editor";
  const el = editorEl();
  el.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => el.classList.add("editor--open"));

  if (!id) setTimeout(() => $("#editor-body").focus(), 340);
}

function fillEditor() {
  const n = state.editing;
  const t = TYPES[n.type] || TYPES.nota;

  const tag = $("#editor-type-tag");
  tag.innerHTML = ic(t.icon) + t.label;
  tag.style.color = t.accent;

  const title = $("#editor-title");
  const body = $("#editor-body");
  title.value = n.title || "";
  body.value = n.body || "";
  autoGrow(title);
  autoGrow(body);

  // Checklist vs body según tipo
  const isCheck = CHECKLIST_TYPES.includes(n.type);
  body.hidden = isCheck;
  const cl = $("#editor-checklist");
  cl.hidden = !isCheck;
  if (isCheck) renderChecklist();

  renderTags();
  runSuggest();
  setStatus("");
}

function renderChecklist() {
  const n = state.editing;
  const items = n.items || [];
  const rows = items
    .map(
      (it) =>
        '<div class="check-item" data-item="' + it.id + '">' +
        '<button class="check-box' + (it.done ? " check-box--done" : "") +
        '" data-item-toggle="' + it.id + '" aria-label="Completar">' + ic("check") + "</button>" +
        '<input class="check-text' + (it.done ? " check-text--done" : "") +
        '" data-item-text="' + it.id + '" value="' + escapeHtml(it.text) + '" placeholder="Elemento" />' +
        '<button class="check-del" data-item-del="' + it.id + '" aria-label="Eliminar">' + ic("x") + "</button>" +
        "</div>"
    )
    .join("");

  $("#editor-checklist").innerHTML =
    rows +
    '<button class="check-add" data-item-add="1" testID="add-item">' + ic("plus") + "Añadir elemento</button>";
  hydrateIcons($("#editor-checklist"));
}

function renderTags() {
  const n = state.editing;
  const chips = (n.tags || [])
    .map(
      (tg) =>
        '<span class="tag">#' + escapeHtml(tg) +
        '<button class="tag__x" data-tag-del="' + escapeHtml(tg) + '" aria-label="Quitar">' + ic("x") + "</button></span>"
    )
    .join("");
  $("#editor-tags").innerHTML =
    chips +
    '<button class="tag-add" data-tag-add="1" testID="add-tag">' + ic("tag") + "Etiqueta</button>";
  hydrateIcons($("#editor-tags"));
}

function autoGrow(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

function setStatus(text, done) {
  const s = $("#editor-status");
  if (!text) {
    s.classList.remove("editor__status--show");
    s.innerHTML = "";
    return;
  }
  s.innerHTML = (done ? ic("check") : "") + "<span>" + text + "</span>";
  s.classList.add("editor__status--show");
}

const scheduleSave = debounce(() => saveEditing(true), 650);

function markDirty() {
  state.dirty = true;
  setStatus("Guardando…");
  scheduleSave();
}

async function saveEditing(silent) {
  const n = state.editing;
  if (!n) return;
  n.updatedAt = Date.now();

  if (isEmptyNote(n)) {
    // No persistir notas vacías; si existía, eliminar
    if (!n._isNew) {
      await DB.remove(n.id);
      state.notes = state.notes.filter((x) => x.id !== n.id);
    }
    return;
  }

  const toStore = { ...n };
  delete toStore._isNew;
  await DB.put(toStore);

  const idx = state.notes.findIndex((x) => x.id === n.id);
  if (idx >= 0) state.notes[idx] = { ...toStore };
  else state.notes.push({ ...toStore });
  n._isNew = false;

  if (silent) setStatus("Guardado", true);
  refreshCurrentView();
}

function refreshCurrentView() {
  // Solo re-pintamos la vista de fondo cuando el editor no está abierto;
  // al cerrar el editor se re-renderiza explícitamente.
  if (!editorEl().classList.contains("editor--open") && state.view) {
    renderView(state.view);
  }
}

async function closeEditor() {
  await saveEditing(false);
  const el = editorEl();
  el.classList.remove("editor--open");
  el.setAttribute("aria-hidden", "true");
  document.body.dataset.scene = state.view;
  setTimeout(() => {
    state.editing = null;
    renderView(state.view);
  }, 280);
}

/* NOVA SUGIERE dentro del editor */
function runSuggest() {
  const slot = $("#suggest-slot");
  const n = state.editing;
  if (!n || suggestDismissed) {
    slot.innerHTML = "";
    return;
  }
  const source = CHECKLIST_TYPES.includes(n.type)
    ? (n.items || []).map((i) => i.text).join("\n")
    : (n.title + "\n" + n.body);
  const sug = detectSuggestion(source, n.type);
  if (!sug) {
    slot.innerHTML = "";
    return;
  }
  slot.innerHTML =
    '<div class="suggest" testID="nova-suggest">' +
    '<span class="suggest__label">' + ic("sparkle") + "NOVA sugiere</span>" +
    '<div class="suggest__text">' + sug.message + "</div>" +
    '<div class="suggest__actions">' +
    '<button class="suggest__btn suggest__btn--keep" data-suggest-keep="1" testID="suggest-keep">Mantener</button>' +
    '<button class="suggest__btn suggest__btn--go" data-suggest-go="' + sug.type + '" testID="suggest-convert">Convertir</button>' +
    "</div></div>";
  hydrateIcons(slot);
}

/* Transformar el tipo de la nota */
function transformTo(type) {
  const n = state.editing;
  if (!n) return;
  const goingCheck = CHECKLIST_TYPES.includes(type);
  const wasCheck = CHECKLIST_TYPES.includes(n.type);

  if (goingCheck && !wasCheck) {
    const items = parseItems(n.body);
    n.items = items.length ? items : [{ id: uid(), text: "", done: false }];
    n.body = "";
  } else if (!goingCheck && wasCheck) {
    n.body = (n.items || []).map((i) => i.text).filter(Boolean).join("\n");
    n.items = [];
  }
  n.type = type;
  n.organized = true; // transformar = organizar
  suggestDismissed = true;
  fillEditor();
  markDirty();
  toast("Convertido en " + TYPES[type].label.toLowerCase(), true);
}

/* ---------------------------------------------------------------------
   BOTTOM SHEET genérico
   --------------------------------------------------------------------- */
function openSheet(html) {
  $("#sheet-content").innerHTML = html;
  hydrateIcons($("#sheet-content"));
  $("#scrim").classList.add("scrim--open");
  $("#scrim").setAttribute("aria-hidden", "false");
  $("#sheet").classList.add("sheet--open");
  $("#sheet").setAttribute("aria-hidden", "false");
}
function closeSheet() {
  $("#scrim").classList.remove("scrim--open");
  $("#scrim").setAttribute("aria-hidden", "true");
  $("#sheet").classList.remove("sheet--open");
  $("#sheet").setAttribute("aria-hidden", "true");
}

function optionRow(type) {
  const t = TYPES[type];
  const descs = {
    tarea: "Algo por hacer, con casilla para completar",
    lista: "Varios elementos con casillas",
    idea: "Un pensamiento para no perder",
    proyecto: "Tareas con seguimiento de progreso",
    nota: "Texto libre, sin estructura",
  };
  return (
    '<button class="sheet-opt" data-transform="' + type + '" testID="transform-' + type + '">' +
    '<span class="sheet-opt__icon" style="color:' + t.accent + '">' + ic(t.icon) + "</span>" +
    '<span class="sheet-opt__body"><span class="sheet-opt__title">' + t.label + "</span>" +
    '<span class="sheet-opt__desc">' + descs[type] + "</span></span>" +
    '<span class="sheet-opt__chev">' + ic("chevron-right") + "</span></button>"
  );
}

function openTransformSheet() {
  const cur = state.editing ? state.editing.type : "nota";
  const order = ["tarea", "lista", "idea", "proyecto", "nota"].filter((t) => t !== cur);
  const html =
    '<div class="sheet__title">Transformar</div>' +
    '<div class="sheet__sub">¿En qué quieres convertir esto?</div>' +
    order.map(optionRow).join("");
  openSheet(html);
}

function openEditorMenu() {
  const n = state.editing;
  if (!n) return;
  const fav = n.favorite;
  const html =
    '<div class="sheet__title">Opciones</div>' +
    '<div class="sheet__sub">' + (TYPES[n.type] || TYPES.nota).label + "</div>" +
    '<button class="sheet-opt" data-menu-fav="1" testID="menu-fav">' +
    '<span class="sheet-opt__icon" style="' + (fav ? "color:#ffb43b" : "") + '">' + ic("star") + "</span>" +
    '<span class="sheet-opt__body"><span class="sheet-opt__title">' +
    (fav ? "Quitar de favoritos" : "Marcar como favorito") + "</span></span></button>" +
    '<button class="sheet-opt" data-menu-transform="1" testID="menu-transform">' +
    '<span class="sheet-opt__icon">' + ic("transform") + "</span>" +
    '<span class="sheet-opt__body"><span class="sheet-opt__title">Transformar</span>' +
    '<span class="sheet-opt__desc">Cambiar el tipo de contenido</span></span></button>' +
    '<button class="sheet-opt" data-menu-organize="1" testID="menu-organize">' +
    '<span class="sheet-opt__icon">' + ic("inbox") + "</span>" +
    '<span class="sheet-opt__body"><span class="sheet-opt__title">' +
    (n.organized ? "Mover al inbox" : "Marcar como organizada") + "</span></span></button>" +
    '<button class="sheet-opt sheet-opt--danger" data-menu-delete="1" testID="menu-delete">' +
    '<span class="sheet-opt__icon">' + ic("trash") + "</span>" +
    '<span class="sheet-opt__body"><span class="sheet-opt__title">Eliminar</span></span></button>';
  openSheet(html);
}

async function deleteNote(id) {
  await DB.remove(id);
  state.notes = state.notes.filter((n) => n.id !== id);
}

/* ---------------------------------------------------------------------
   DELEGACIÓN DE EVENTOS
   --------------------------------------------------------------------- */
function onTap(e) {
  const el = e.target.closest("[data-nav],[data-new],[data-open],[data-star],[data-filter]," +
    "[data-toggle-theme],[data-clear-all],[data-suggest-keep],[data-suggest-go]," +
    "[data-transform],[data-menu-fav],[data-menu-transform],[data-menu-organize]," +
    "[data-menu-delete],[data-item-toggle],[data-item-del],[data-item-add]," +
    "[data-tag-del],[data-tag-add],[data-search-clear]");
  if (!el) return;
  const d = el.dataset;

  // Navegación
  if (d.nav) return goView(d.nav);
  if (d.new) return openEditor(null);
  if (d.open) return openEditor(d.open);

  // Favorito desde card
  if (d.star) {
    e.stopPropagation();
    const note = state.notes.find((n) => n.id === d.star);
    if (note) {
      note.favorite = !note.favorite;
      note.updatedAt = Date.now();
      DB.put(note);
      renderView(state.view);
      hydrateIcons($("#view-" + state.view));
    }
    return;
  }

  // Filtros
  if (d.filter) {
    state.filter = d.filter;
    renderNotes();
    hydrateIcons($("#view-notes"));
    return;
  }

  // Ajustes
  if (d.toggleTheme) return toggleTheme();
  if (d.clearAll) return confirmClearAll();

  // Sugerencia
  if (d.suggestKeep) { suggestDismissed = true; runSuggest(); return; }
  if (d.suggestGo) { transformTo(d.suggestGo); return; }

  // Sheet transformar
  if (d.transform) { closeSheet(); transformTo(d.transform); return; }

  // Menú del editor
  if (d.menuFav) {
    state.editing.favorite = !state.editing.favorite;
    markDirty();
    closeSheet();
    toast(state.editing.favorite ? "Añadido a favoritos" : "Quitado de favoritos");
    return;
  }
  if (d.menuTransform) { closeSheet(); setTimeout(openTransformSheet, 260); return; }
  if (d.menuOrganize) {
    state.editing.organized = !state.editing.organized;
    markDirty();
    closeSheet();
    toast(state.editing.organized ? "Marcada como organizada" : "Movida al inbox");
    return;
  }
  if (d.menuDelete) {
    closeSheet();
    const id = state.editing.id;
    state.editing._isNew = true; // evita re-guardado al cerrar
    editorEl().classList.remove("editor--open");
    editorEl().setAttribute("aria-hidden", "true");
    document.body.dataset.scene = state.view;
    deleteNote(id).then(() => {
      state.editing = null;
      renderView(state.view);
      toast("Nota eliminada");
    });
    return;
  }

  // Checklist
  if (d.itemToggle) {
    const it = state.editing.items.find((x) => x.id === d.itemToggle);
    if (it) { it.done = !it.done; renderChecklist(); markDirty(); }
    return;
  }
  if (d.itemDel) {
    state.editing.items = state.editing.items.filter((x) => x.id !== d.itemDel);
    renderChecklist();
    markDirty();
    return;
  }
  if (d.itemAdd) {
    state.editing.items.push({ id: uid(), text: "", done: false });
    renderChecklist();
    const inputs = document.querySelectorAll("#editor-checklist .check-text");
    if (inputs.length) inputs[inputs.length - 1].focus();
    return;
  }

  // Etiquetas
  if (d.tagDel) {
    state.editing.tags = state.editing.tags.filter((t) => t !== d.tagDel);
    renderTags();
    markDirty();
    return;
  }
  if (d.tagAdd) return openTagSheet();

  // Buscar
  if (d.searchClear) {
    state.query = "";
    renderSearch();
    hydrateIcons($("#view-search"));
    return;
  }
}

/* Entrada de texto en checklist / editor */
function onInput(e) {
  const t = e.target;
  if (t.id === "editor-title") {
    state.editing.title = t.value;
    autoGrow(t);
    runSuggest();
    markDirty();
  } else if (t.id === "editor-body") {
    state.editing.body = t.value;
    autoGrow(t);
    runSuggest();
    markDirty();
  } else if (t.dataset.itemText) {
    const it = state.editing.items.find((x) => x.id === t.dataset.itemText);
    if (it) { it.text = t.value; runSuggest(); markDirty(); }
  }
}

function openTagSheet() {
  const html =
    '<div class="sheet__title">Nueva etiqueta</div>' +
    '<div class="sheet__sub">Organiza tus notas por temas</div>' +
    '<div class="search-field glass" style="margin-bottom:16px">' + ic("tag") +
    '<input id="tag-input" type="text" placeholder="ej. trabajo, personal…" ' +
    'autocomplete="off" autocapitalize="off" testID="tag-input" /></div>' +
    '<button class="btn btn--primary btn--block" data-tag-save="1" testID="tag-save">Añadir etiqueta</button>';
  openSheet(html);
  const input = $("#tag-input");
  setTimeout(() => input && input.focus(), 320);
  const commit = () => {
    const v = (input.value || "").trim().replace(/^#/, "").toLowerCase();
    if (v && !state.editing.tags.includes(v)) {
      state.editing.tags.push(v);
      renderTags();
      markDirty();
    }
    closeSheet();
  };
  $("#sheet-content").querySelector("[data-tag-save]").addEventListener("click", commit);
  input.addEventListener("keydown", (ev) => { if (ev.key === "Enter") commit(); });
}

/* ---------------------------------------------------------------------
   TEMA / DATOS
   --------------------------------------------------------------------- */
function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("nova-theme", next);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", next === "dark" ? "#0f0f14" : "#f4f5f9");
  renderSettings();
  hydrateIcons($("#view-settings"));
}

function confirmClearAll() {
  const html =
    '<div class="sheet__title">¿Borrar todo?</div>' +
    '<div class="sheet__sub">Se eliminarán todas tus notas de este dispositivo. No se puede deshacer.</div>' +
    '<button class="btn btn--danger btn--glass btn--block" data-clear-confirm="1" testID="clear-confirm" style="margin-bottom:12px">Sí, borrar todo</button>' +
    '<button class="btn btn--glass btn--block" data-clear-cancel="1" testID="clear-cancel">Cancelar</button>';
  openSheet(html);
  const content = $("#sheet-content");
  content.querySelector("[data-clear-confirm]").addEventListener("click", async () => {
    await DB.clear();
    state.notes = [];
    closeSheet();
    renderView(state.view);
    hydrateIcons($("#view-" + state.view));
    toast("Todo borrado");
  });
  content.querySelector("[data-clear-cancel]").addEventListener("click", closeSheet);
}

/* ---------------------------------------------------------------------
   INICIALIZACIÓN
   --------------------------------------------------------------------- */
async function init() {
  // Tema guardado
  const savedTheme = localStorage.getItem("nova-theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.querySelector('meta[name="theme-color"]').setAttribute("content", "#0f0f14");
  }

  hydrateIcons(document);

  // Cargar datos
  try {
    state.notes = await DB.all();
  } catch (e) {
    state.notes = [];
  }

  // Listeners globales
  document.addEventListener("click", onTap);
  document.addEventListener("input", onInput);
  $("#editor-back").addEventListener("click", closeEditor);
  $("#editor-menu").addEventListener("click", openEditorMenu);
  $("#scrim").addEventListener("click", closeSheet);

  // Flush de seguridad: guarda la nota en edición antes de cerrar/recargar
  window.addEventListener("beforeunload", () => {
    if (state.editing && state.dirty && !isEmptyNote(state.editing)) {
      const toStore = { ...state.editing };
      delete toStore._isNew;
      toStore.updatedAt = Date.now();
      DB.put(toStore);
    }
  });
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && state.editing && state.dirty) {
      saveEditing(false);
    }
  });

  // Render inicial
  goView("home");

  // Registrar Service Worker (PWA / offline)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
