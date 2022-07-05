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
   items.forEach((el) => {
      const artNumber = el.item;
      let art = artNumber.textContent.split("");

      art.splice(2, 0, "-");
      art.splice(6, 0, "-");
      art.splice(9, 0, "-");

      art = art.join("");

      artNumber.innerText = art;
      artNumber.style.cursor = "pointer";
      artNumber.style.backgroundColor = "yellow";

      const itemOrderCount =
         artNumber.parentElement.parentElement.parentElement.parentElement
            .parentElement.parentElement.nextSibling.nextSibling.children[0]
            .children[0].children[0];
      const orderedMoreThanOne = parseInt(itemOrderCount.textContent) > 1;

      if (orderedMoreThanOne) itemOrderCount.style.color = "red";

      artNumber.addEventListener("click", (e) => {
         if (orderedMoreThanOne) alert("Внимание, количество больше 1 штуки");
         const SKU = e.target.textContent.trim();
         navigator.clipboard.writeText(SKU);
         window.notify(SKU + " скопировано");
      });
   });
}

function setOrderNumberHandler() {
   const titleElement = document.querySelector(
      '[data-e2e-i18n-key="pages.order-info:page-title-current-order-detailed-no-arrow"]'
   );
   const newTitleEl = document.createElement("span");
   const orderNum =
      titleElement.textContent.split(" / ")[1] ||
      titleElement.textContent.split(" № ")[1];

   newTitleEl.innerText = orderNum;
   newTitleEl.style.backgroundColor = "yellow";
   newTitleEl.style.cursor = "pointer";
   newTitleEl.addEventListener("click", (e) => {
      const orderNumber = e.target.textContent.trim();
      navigator.clipboard.writeText(orderNumber);
      window.notify(orderNumber + " скопировано");
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
      window.notify(data + " скопировано");
   });
}

function getSKUList() {
   return [
      ...document.querySelectorAll(
         "[data-e2e='sku'] span[data-tid='ae445ad4']"
      ),
   ].filter((el) => !el.classList.length);
}

function trackCopyArts() {
   window.addEventListener("beforeunload", (event) => {
      if (items.find((el) => el.clicked === true)) {
         const indifference = confirm(
            "Внимание! Не все артикулы были скопированы."
         );

         if (!indifference) {
            event.preventDefault();
            // Chrome требует установки возвратного значения.
            event.returnValue = "";
         }
      }
   });
}

window.sleep(1).then(() => {
   window.items = getSKUList().map((el) => ({ clicked: false, item: el }));

   setItemsArtHandler();
   setOrderNumberHandler();
   setDataHandler();
   trackCopyArts();
});
