// @name         Wildberries Cart Handlers
// @namespace    Wildberries
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.wildberries.ru/lk/*
// @icon         chrome://favicon/https://www.wildberries.ru/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Wildberries-Cart-Handlers.js
// @grant        none

const clearCart = async (departureFrom = "Склад продавца") => {
   const btns = [...document.querySelectorAll(".btn__del.j-basket-item-del")];
   const btnsObjects = btns.map((btn) => {
      const departure = departureFrom
         ? btn.parentElement.parentElement.parentElement.childNodes[3]
              .childNodes[3].childNodes[8].firstElementChild.firstElementChild
              .textContent
         : null;
      return { departure, rmButton: btn };
   });
   const filteredBtns = departureFrom
      ? btnsObjects.filter((btn) => btn.departure === departureFrom)
      : btnsObjects;

   for (const btn of filteredBtns) {
      await window.sleep(0.2);
      btn.rmButton.click();
   }
};

const getItemsList = () =>
   [...document.querySelectorAll(".list-item__good > a")].map((itemLink) => {
      const SKU = itemLink.href.split("catalog/")[1].split("/")[0];
      const quanity =
         +itemLink.parentNode.parentNode.childNodes[5].firstElementChild
            .firstElementChild.childNodes[3].value;
      const controlBtns = {
         reduce() {
            itemLink.parentNode.parentNode.childNodes[5].firstElementChild.firstElementChild.childNodes[1].click();
         },
         increase() {
            itemLink.parentNode.parentNode.childNodes[5].firstElementChild.firstElementChild.childNodes[5].click();
         },
      };
      return {
         SKU,
         quanity,
         controlBtns,
      };
   });

const lcKey = "ItemsRefundQuantitesList";

const getItemsRequiredQuantity = () => {
   return window.LocaleStorageUtil.get(lcKey) || [];
};
const setItemsRequiredQuantity = (itemsList) => {
   window.LocaleStorageUtil.set(lcKey, itemsList);
   console.log("Товары установлены");
};

const validateItems = async (itemsList) => {
   const itemsRequiredQuantity = getItemsRequiredQuantity();
   for (const item of itemsList) {
      const required = itemsRequiredQuantity.reduce(
         (reducer, el) =>
            (reducer += item.sku.toString() === el.sku.toString() ? el.req : 0),
         0
      );

      const countDiff = +required - +item.quanity;

      for (let i = 0; i < Math.abs(countDiff); i++) {
         await window.sleep(0.2);
         if (countDiff > 0) {
            item.controlBtns.increase.click();
         } else if (countDiff < 0) {
            item.controlBtns.reduce.click();
         }
      }
   }
};
const downloadCart = () => {
   window.download(
      { content: getItemsList(), headers: "template" },
      "WB-Cart",
      "csv"
   );
};

const setCartQuantities = async () => {
   const itemsList = getItemsList();
   await validateItems(itemsList);
};
const getCartItemsList = () => getItemsList();

console.log(`clearCart() - очистить "Склад продавца";
clearCart(название склада) - удалить товары с отправлением оттуда;
clearCart(null) - удалить все видимые товары;
setCartQuantities() - установить количества товаров до необходимого;
getItemsRequiredQuantity() - получить товары с количеством более 1;
setItemsRequiredQuantity([{sku, required}]) - установить товары с требуемым количеством;
downloadCart() - скачать товары из корзины;
getCartItemsList() - получить товары из корзины;
`);

window.initializeMethods([
   clearCart,
   setCartQuantities,
   getCartItemsList,
   downloadCart,
   getItemsRequiredQuantity,
   setItemsRequiredQuantity,
]);
