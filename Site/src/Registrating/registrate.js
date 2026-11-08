let DATA = { students: [] };
const routeSel = document.getElementById("route");
const nameSel = document.getElementById("name");
const pass = document.getElementById("pass");
const err = document.getElementById("err");

if (getUser()) location.href = "../Main/index.html";

fetch("../user.json")
  .then((r) => r.json())
  .then((d) => (DATA = d))
  .catch(
    () => (err.textContent = "user.json o'qilmadi. Live Server bilan oching."),
  );

routeSel.onchange = () => {
  const r = Number(routeSel.value);
  nameSel.innerHTML = '<option value="">Ism familiyani tanlang</option>';
  DATA.students
    .filter((s) => s.yonalish === r)
    .forEach((s) => {
      const o = document.createElement("option");
      o.value = s.name;
      o.textContent = s.name;
      nameSel.appendChild(o);
    });
  nameSel.disabled = !r;
  pass.disabled = true;
  pass.value = "";
};
nameSel.onchange = () => {
  pass.disabled = !nameSel.value;
};

document.getElementById("go").onclick = () => {
  const s = DATA.students.find(
    (x) => x.name === nameSel.value && x.yonalish === Number(routeSel.value),
  );
  if (!s) {
    err.textContent = "Yo'nalish va ismni tanlang";
    return;
  }
  if (pass.value !== s.password) {
    err.textContent = "Parol noto'g'ri";
    return;
  }
  setUser(s);
  location.href = "../Main/index.html";
};
