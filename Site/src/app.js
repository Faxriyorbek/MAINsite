const USER_KEY = "turon_user";
const THEME_KEY = "turon_theme";
const ROUTES = {
  1: "1-yo'nalish: Markaz → Turon maktabi",
  2: "2-yo'nalish: Yaypan → Turon maktabi",
  3: "3-yo'nalish: Obod mahalla → Turon maktabi",
};

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch (e) {
    return null;
  }
};
const setUser = (u) => localStorage.setItem(USER_KEY, JSON.stringify(u));
const logout = () => {
  localStorage.removeItem(USER_KEY);
  location.href = "../Registrating/Registrate.html";
};

const THEMES = ["black", "white", "green", "blue"];
function getTheme() {
  const t = localStorage.getItem(THEME_KEY);
  if (t === "dark") return "black";
  if (t === "light") return "white";
  return THEMES.includes(t) ? t : "black";
}
function applyTheme() {
  const t = getTheme();
  document.documentElement.dataset.theme = t;
  document.documentElement.classList.toggle("dark", t !== "white");
  document.documentElement.style.fontSize =
    (localStorage.getItem("turon_font") || 16) + "px";
}
applyTheme();

function setTheme(t) {
  localStorage.setItem(THEME_KEY, t);
  applyTheme();
}
function toggleTheme() {
  setTheme(getTheme() === "white" ? "black" : "white");
}

function requireAuth() {
  const u = getUser();
  if (!u) {
    location.href = "../Registrating/Registrate.html";
    return null;
  }
  return u;
}

function renderShell(active) {
  const user = requireAuth();
  if (!user) return;
  document.body.classList.add("themed");
  const items = PAGES;
  const links = items
    .map(
      ([href, icon, label]) => `
    <a href="${href}" class="flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition hover:bg-emerald-500/10 ${active === href ? "bg-emerald-500/15 text-emerald-500" : ""}">
      <span class="text-xl">${icon}</span>${label}</a>`,
    )
    .join("");

  document.getElementById("shell").innerHTML = `
    <header class="app-header sticky top-0 z-30 flex items-center gap-4 bg-gradient-to-r from-slate-950 via-emerald-900 to-sky-900 px-5 py-4 text-white shadow-xl">
      <button id="openMenu" class="rounded-lg p-2 text-2xl hover:bg-white/10" aria-label="Menyu">☰</button>
      <a href="index.html" class="text-2xl font-extrabold tracking-tight">TURON<span class="text-emerald-300">.go</span></a>
      <span class="ml-auto hidden text-sm text-sky-100 sm:block">${user.name}</span>
    </header>
    <div id="overlay" class="fixed inset-0 z-40 hidden bg-black/60 backdrop-blur-sm"></div>
    <aside id="drawer" class="fixed left-0 top-0 z-50 flex h-full w-72 -translate-x-full flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-slate-900">
      <div class="bg-gradient-to-br from-slate-950 via-emerald-800 to-sky-700 p-6 text-white">
        <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">${user.name[0]}</div>
        <p class="font-bold">${user.name}</p>
        <p class="text-sm text-sky-100">${user.sinf}</p>
      </div>
      <nav class="flex-1 space-y-1 overflow-y-auto p-3">
        ${links}
        <button id="nightBtn" class="flex w-full items-center gap-4 rounded-xl px-4 py-3 font-medium transition hover:bg-emerald-500/10">
          <span class="text-xl">🌙</span>Tungi rejim</button>
      </nav>
      <button id="exitBtn" class="m-3 flex items-center gap-4 rounded-xl px-4 py-3 font-bold text-red-500 transition hover:bg-red-500/10">
        <span class="text-xl">🚪</span>EXIT</button>
    </aside>`;

  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const open = (v) => {
    drawer.classList.toggle("-translate-x-full", !v);
    overlay.classList.toggle("hidden", !v);
  };
  document.getElementById("openMenu").onclick = () => open(true);
  overlay.onclick = () => open(false);
  document.getElementById("nightBtn").onclick = toggleTheme;
  document.getElementById("exitBtn").onclick = logout;

  const f = document.getElementById("footer");
  if (f)
    fetch("../footer.html")
      .then((r) => r.text())
      .then((h) => (f.innerHTML = h));
}

const PAGES = [
  ["index.html", "🏠", "Bosh sahifa"],
  ["yonalishlar.html", "🚌", "Yo'nalishlar"],
  ["jadval.html", "🕐", "Jadval"],
  ["xarita.html", "🗺️", "Xarita"],
  ["elonlar.html", "📢", "E'lonlar"],
  ["yordam.html", "❓", "Yordam"],
  ["profil.html", "👤", "Profil"],
  ["sozlamalar.html", "⚙️", "Sozlamalar"],
];
const STOPS = {
  1: [
    "Markaz",
    "Markaziy bozor",
    "Poliklinika",
    "Shahar bog'i",
    "Turon maktabi",
  ],
  2: ["Yaypan", "Temir yo'l", "Stadion", "Kutubxona", "Turon maktabi"],
  3: [
    "Obod mahalla",
    "Gul bozor",
    "Supermarket",
    "Sport majmua",
    "Turon maktabi",
  ],
};
const TIMES = {
  1: ["06:30", "07:00", "07:30", "13:30", "17:00"],
  2: ["06:40", "07:10", "07:40", "13:40", "17:10"],
  3: ["06:50", "07:20", "07:50", "13:50", "17:20"],
};
const NEWS = [
  [
    "Yangi jadval",
    "Dushanba kunidan boshlab 3-yo'nalish 10 daqiqa erta chiqadi.",
    "🕐",
  ],
  [
    "Bekat ta'mirlandi",
    "Markaziy bozor bekati yangi tom bilan jihozlandi.",
    "🛠️",
  ],
  [
    "Xavfsizlik",
    "Avtobusda o'tirganda kamarni taqing va tartibga rioya qiling.",
    "🛡️",
  ],
];
const FAQ = [
  [
    "Avtobus kechiksa nima qilaman?",
    "Keyingi reysni kuting yoki sinf rahbariga xabar bering.",
  ],
  [
    "Yo'nalishimni qanday o'zgartiraman?",
    "Profil sahifasida yo'nalishni tanlang, u darhol saqlanadi.",
  ],
  ["Parolni unutdim.", "Sinf rahbaringizga murojaat qiling."],
];
