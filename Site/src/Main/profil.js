renderShell("profil.html");
const u = getUser();
const pPass = document.getElementById("pPass");
const sel = document.getElementById("pRoute");

document.getElementById("pName").textContent = u.name;
document.getElementById("pSinf").textContent = u.sinf;
sel.value = u.yonalish;

let shown = false;
document.getElementById("eye").onclick = (e) => {
  shown = !shown;
  pPass.textContent = shown ? u.password : "••••••";
  e.target.textContent = shown ? "Yashirish" : "Ko'rsatish";
};

sel.onchange = () => {
  u.yonalish = Number(sel.value);
  setUser(u);
  document.getElementById("saved").textContent =
    "✓ Yo'nalish saqlandi: " + ROUTES[u.yonalish];
};
