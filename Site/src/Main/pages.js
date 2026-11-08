const page = document.body.dataset.page;
renderShell(page + ".html");
const u = getUser();
const H = (t, s) =>
  `<h1 class="mb-1 mt-8 text-3xl font-extrabold">${t}</h1><p class="mb-6 text-slate-500">${s}</p>`;
const mine = (n) =>
  Number(n) === u.yonalish
    ? '<span class="ml-2 rounded-full bg-emerald-500 px-3 py-1 text-xs text-white">Sizniki</span>'
    : "";

const views = {
  yonalishlar: () =>
    H("Yo'nalishlar", "Barcha avtobus yo'nalishlari va bekatlari") +
    '<div class="grid gap-6 md:grid-cols-3">' +
    Object.keys(ROUTES)
      .map(
        (n) => `
      <div class="card ${Number(n) === u.yonalish ? "ring-2 ring-emerald-500" : ""}">
        <h2 class="mb-4 text-lg font-bold">${ROUTES[n]}${mine(n)}</h2>
        <ol class="space-y-3 border-l-2 border-emerald-500 pl-5">
          ${STOPS[n].map((s) => `<li class="relative"><span class="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-sky-500"></span>${s}</li>`).join("")}
        </ol>
      </div>`,
      )
      .join("") +
    "</div>",

  jadval: () =>
    H("Jadval", "Avtobuslarning jo'nash vaqtlari") +
    '<div class="overflow-x-auto"><table class="w-full overflow-hidden rounded-2xl text-left shadow-lg">' +
    '<thead class="bg-gradient-to-r from-emerald-600 to-sky-600 text-white"><tr><th class="p-4">Yo\'nalish</th><th class="p-4">Vaqtlar</th></tr></thead><tbody>' +
    Object.keys(ROUTES)
      .map(
        (n) =>
          `<tr class="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><td class="p-4 font-semibold">${n}-yo'nalish ${mine(n)}</td><td class="flex flex-wrap gap-2 p-4">${TIMES[n].map((t) => `<span class="rounded-lg bg-sky-500/15 px-3 py-1 font-mono text-sky-500">${t}</span>`).join("")}</td></tr>`,
      )
      .join("") +
    "</tbody></table></div>",

  xarita: () =>
    H("Xarita", "Avtobus yo'nalishlari xaritasi") +
    '<div id="map" class="flex h-[32rem] items-center justify-center rounded-3xl border-2 border-dashed border-emerald-500/50 bg-slate-100 dark:bg-slate-900"><!-- Xarita shu yerga qo\'yiladi --></div>',

  elonlar: () =>
    H("E'lonlar", "So'nggi yangiliklar") +
    '<div class="grid gap-5 md:grid-cols-3">' +
    NEWS.map(
      ([t, d, i]) =>
        `<div class="card"><div class="text-4xl">${i}</div><h2 class="mb-2 mt-3 text-lg font-bold">${t}</h2><p class="text-slate-500">${d}</p></div>`,
    ).join("") +
    "</div>",

  yordam: () =>
    H("Yordam", "Ko'p beriladigan savollar") +
    '<div class="space-y-3">' +
    FAQ.map(
      ([q, a]) =>
        `<details class="card cursor-pointer"><summary class="font-semibold">${q}</summary><p class="mt-3 text-slate-500">${a}</p></details>`,
    ).join("") +
    "</div>",
};
document.getElementById("content").innerHTML = views[page]();
