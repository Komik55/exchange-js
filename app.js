"use srtict";
let current = null;
(() => {
  const render = (date, numb) => {
    for (let i = 0; i < date.length; i++) {
      const a = document.createElement("option");
      a.textContent = date[i];
      a.value = numb[i];
      select.setAttribute("name", date[i]);
      select.append(a);
    }
    document.querySelector(".btn").addEventListener("click", onResult);
    document.querySelector(".inp").addEventListener("input", onInput);
  };

  fetch("https://open.er-api.com/v6/latest/USD")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      render(Object.keys(data.rates), Object.values(data.rates));
    })
    .catch((e) => console.log(e));
})();

let getData = null;
let getText = null;
function onInput() {
  let __inp = document.querySelector(".inp");
  __inp.value = __inp.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function onAdd(sel) {
  const value = sel.options[sel.selectedIndex].value;
  getData = Number(value);
  getText = sel.options[sel.selectedIndex].text;
}

function onResult() {
  let __inp = document.querySelector(".inp");
  if (__inp.value !== "") {
    __inp.value = __inp.value.replaceAll(" ", "");
    let res = __inp.value * getData;
    if (isNaN(res)) return;
    res = String(res).replaceAll(".", ",");
    res = res.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    title.textContent = `${res} ${getText}`;
  }
}
