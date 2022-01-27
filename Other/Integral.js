//____________________________________________________________________________________________
// @name         Get last report
// @namespace    https://hatsandcaps.ru/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://home.integraldos.ru/213/finance/*
// @icon         chrome://favicon/http://home.integraldos.ru/
// @grant        none
//____________________________________________________________________________________________

function copySMAinfo(e) {
  e.target.parentElement.preventDefault;
  navigator.clipboard.writeText(code + " " + date + " " + sum);
  alert("copied");
}

const table = document.querySelector("tbody");
const reportRow = table.lastElementChild;
const buttonCell = reportRow.childNodes[9];

const code = buttonCell.parentElement.firstElementChild.textContent
  .replace("\n", "")
  .trim();
const date = buttonCell.parentElement.childNodes[7].textContent
  .replace("\n", "")
  .trim();
const sum = buttonCell.parentElement.childNodes[17].textContent
  .replace("\n", "")
  .trim();

buttonCell.innerHTML =
  '<button id="copyData" style="margin: 0; width: 100%; padding: 0">Копировать</button';

document.querySelector("#copyData").addEventListener("click", copySMAinfo);
