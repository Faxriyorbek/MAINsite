renderShell("sozlamalar.html");
const font = document.getElementById("font");
const fv = document.getElementById("fv");
const notif = document.getElementById("notif");

font.value = localStorage.getItem("turon_font") || 16;
fv.textContent = font.value;
notif.checked = localStorage.getItem("turon_notif") === "1";

document
  .querySelectorAll("[data-t]")
  .forEach((b) => (b.onclick = () => setTheme(b.dataset.t)));
font.oninput = () => {
  localStorage.setItem("turon_font", font.value);
  fv.textContent = font.value;
  applyTheme();
};
notif.onchange = () =>
  localStorage.setItem("turon_notif", notif.checked ? "1" : "0");
document.getElementById("out").onclick = logout;
