// @name         Yandex Market Order Handler
// @namespace    Yandex-Market
// @version      2.0
// @description  try to take over the world!
// @author       You
// @match        https://partner.market.yandex.ru/supplier/*/orders/*
// @icon         chrome://favicon/https://market.yandex.ru/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Yandex-Market-Order-Handler.js
// @grant        none

const items = document.querySelectorAll(
   "[data-e2e='sku'] span[data-tid='ae445ad4']"
);

items.forEach((artNumber) => {
   if (!artNumber.classList.length) {
      let art = artNumber.textContent.split("");

      art.splice(2, 0, "-");
      art.splice(6, 0, "-");
      art.splice(9, 0, "-");

      art = art.join("");

      artNumber.innerText = art;
      artNumber.style.cursor = "pointer";
      artNumber.addEventListener("click", (e) => {
         const SKU = e.target.textContent.trim()
         navigator.clipboard.writeText(SKU);
         window.notify(SKU + " copied")
      });
   }
});
