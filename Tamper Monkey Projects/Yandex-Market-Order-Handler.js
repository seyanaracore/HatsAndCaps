// @name         Yandex Market Order Handler
// @namespace    Yandex-Market
// @version      2.0
// @description  try to take over the world!
// @author       You
// @match        https://partner.market.yandex.ru/supplier/*/orders/*
// @icon         chrome://favicon/https://market.yandex.ru/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Yandex-Market-Order-Handler.js
// @grant        none

function setItemsArtHandler() {
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
         artNumber.style.backgroundColor = "yellow";
         artNumber.addEventListener("click", (e) => {
            const SKU = e.target.textContent.trim();
            navigator.clipboard.writeText(SKU);
            window.notify(SKU + " copied");
         });
      }
   });
}

function setOrderNumberHandler() {
   const titleElement = document.querySelector(
      ".p-layout__header-title-wrapper"
   );
   const newTitleEl = document.createElement("span");
   const orderNum = titleElement.textContent.split(" / ")[1] || titleElement.textContent.split(" № ")[1]

   newTitleEl.innerText = orderNum;
   newTitleEl.style.backgroundColor = "yellow";
   newTitleEl.style.cursor = "pointer";
   newTitleEl.addEventListener("click", (e) => {
      const orderNumber = e.target.textContent.trim();
      navigator.clipboard.writeText(orderNumber);
      window.notify(orderNumber + " copied");
   });

   titleElement.innerHTML = "Заказ № ";
   titleElement.insertAdjacentElement("beforeend", newTitleEl);
}

function setDataHandler() {
   const dataEl = document.querySelector('[data-tid-prop="31bb50f9 1dace6d8"]');
   dataEl.style.cursor = "pointer";
   dataEl.style.backgroundColor = "yellow";
   dataEl.addEventListener("click", (e) => {
      const data = e.target.textContent.trim();
      navigator.clipboard.writeText(data);
      window.notify(data + " copied");
   });
}
