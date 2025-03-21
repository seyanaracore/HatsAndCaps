// @name         Wildberries Items Refunder
// @namespace    Wildberries
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.wildberries.ru/lk/basket
// @icon         chrome://favicon/https://www.wildberries.ru/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Universal%20Parser/Project/Out/app.js
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Wildberries-Items-Refunder.js
// @grant        none

const lcKey = "wbItemsToRefund";

const getSizes = () => {
   const sizes = {};
   document.querySelectorAll(".sizes-list__size").forEach((size) => {
      sizes[size.textContent] = size.parentNode;
   });

   return sizes;
};

const setItemsListToRefund = (itemsList) => {
   return window.LocalStorageUtil.set(lcKey, itemsList);
};

const getItemsListToRefund = () => {
   return window.LocalStorageUtil.get(lcKey) || [];
};
const removeItemsListToRefund = () => {
   window.LocalStorageUtil.delete(lcKey);

   console.log("Товары к возврату очищены");
};

const getBuyButton = () => document.querySelector(`button[aria-label="Добавить в корзину"]`)

const findSize = (SKU) => {
   const itemsList = getItemsListToRefund();
   const size = itemsList.find((item) => item.sku === SKU)?.size || null;

   console.log("Size to refund: " + size);

   return size;
};

const getWBSKU = () => document.querySelector("#productNmId").textContent;

const deleteItemSize = (SKU, size) => {
   const itemsList = getItemsListToRefund();
   const filteredItemsList = itemsList.filter((item) => item.sku !== SKU || item.size !== size);

   console.log(
      "Осталось товаров: " + filteredItemsList.length,
      filteredItemsList
   );
   setItemsListToRefund(filteredItemsList);
};

const consoleInfo = `getItemsListToRefund() - Получить список товаров;
setItemsListToRefund([{sku, size}]) - Установить список товаров;
removeItemsListToRefund() - Очистить список товаров;`;
console.log(consoleInfo);

const dataHandler = async () => {
   const buyButton = getBuyButton();
   const WBSKU = getWBSKU();
   const sizes = getSizes();
   const sizeToRefund = findSize(WBSKU);

   const errorMsgs = [];

   if (buyButton.classList.contains("hide")) {
      errorMsgs.push(`Кнопка покупки не доступна: ${WBSKU}`);
   }
   if (!sizes) {
      errorMsgs.push(`Нет найдено ни одного размера у товара: ${WBSKU}`);
   }
   if (!sizeToRefund) {
      errorMsgs.push(`Не найдено ни 1 размера к возврату: ${WBSKU}`);
   }
   if (!sizes[sizeToRefund]) {
      errorMsgs.push(`Не найден нужный размер: ${WBSKU}`);
   }
   if (sizes[sizeToRefund].classList.contains("disabled")) {
      errorMsgs.push(`Нужный размер не доступен: ${WBSKU} - ${sizeToRefund}`);
   }

   if (errorMsgs.length) throw new Error(errorMsgs.join(", "));

   sizes[sizeToRefund].click(); // Выбор нужного размера

   await window.sleep(1)

   // это склад продавца
   const isSellerWarehouse = document.querySelector(".delivery__store").textContent.toLowerCase().includes("склад продавца")

   if (isSellerWarehouse) throw new Error("склад продавца")

   buyButton.click(); //Добавление размера корзину
   deleteItemSize(WBSKU, sizeToRefund); //Убрать размер к возврату у данного SKU

   await window.sleep(1)

   return { WBSKU, status: "ok" };
};
const config = {
   rmDuplicateUrls: false,
};

window.initializeVariables([{ name: "config", value: config }]);
window.initializeMethods([
   dataHandler,
   getItemsListToRefund,
   setItemsListToRefund,
   removeItemsListToRefund,
]);
