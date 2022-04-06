// @name         BrandBoom Parser
// @namespace    BrandBoom
// @version      2.0
// @description  try to take over the world!
// @author       You
// @match        https://www.brandboom.com/*
// @icon         chrome://favicon/https://www.brandboom.com/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/BrandBoom-Parser.js
// @grant        none

const deleteItems = () => window.LocalStorageUtil.delete(localStrName);

const selectAllCartItems = () => {
   return document
      .querySelectorAll(".cb-orderline.d-print-none")
      .forEach((btn) => btn.click());
};

const clearCart = async () => {
   selectAllCartItems();
   await window.sleep(0.2);
   document.querySelector(".primary-btn.btn.btn-white.order-only").click();
   await window.sleep(1);
   document.querySelector(".modal-footer > .btn").click();
   deleteItems();
};

const getBtns = () => {
   let products = [...document.querySelectorAll(".product")].filter(
      (product) => !product.classList.contains("ordered")
   );
   let btns = products
      .map((product) => product.lastChild.lastChild.lastChild.lastChild)
      .filter((btn) => !btn.hasAttribute("disabled"))
      .filter((btn) => btn.style.display != "none");
   return btns;
};

const decomposeObjToTable = (obj) => {
   let itemObjString = "";
   for (let prop in obj) {
      itemObjString += obj[prop] + `\t`;
   }
   return itemObjString + "\n";
};

const parseItem = async () => {
   itemsInfo += decomposeObjToTable(await getItemInfo());
   window.LocalStorageUtil.set(localStrName, itemsInfo);
};
const parseAll = async () => {
   let btns = window.getBtns();
   let btnsCounter = 0;
   while (btns.length) {
      for (let btn of btns) {
         if (btnsCounter % 4 == 0) document.documentElement.scrollTop += 350;
         await window.sleep(window.sleepTime);
         window.itemsInfo += window.decomposeObjToTable(
            await window.getItemInfo(btn)
         );
         btn.click();
         btnsCounter += 1;
      }
      btns = getBtns();
   }
   window.LocalStorageUtil.set(localStrName, itemsInfo);
   console.log("Finished");
};
const getItemInfo = async (btn) => {
   if (btn) {
      btn.parentElement.parentElement.parentElement.childNodes[2].lastElementChild.lastElementChild.childNodes[0].click();
   }

   await window.sleep(sleepTime);
   let closeBtn = document.querySelector("#product-review-widget .modal-close");

   //Parse info_______________________________________________________
   const itemInfoObj = {};

   //Image link
   try {
      itemInfoObj[columns[0]] =
         document.querySelector("#pr-viewer-box img")?.src;

      if (!itemInfoObj[columns[0]]) throw new Error();
   } catch (e) {
      await window.sleep(3);

      itemInfoObj[columns[0]] =
         document.querySelector("#pr-viewer-box img").src;
   }

   //Style
   itemInfoObj[columns[1]] =
      document.querySelector(".product-style div")?.textContent || "-";
   //Name
   itemInfoObj[columns[2]] =
      document.querySelector(".pr-title").textContent || "-";
   //Color
   itemInfoObj[columns[3]] =
      document.querySelector(".product-options div")?.textContent || "-";
   //Category
   itemInfoObj[columns[4]] =
      document.querySelector(".product-category div")?.textContent || "-";
   //Sex
   itemInfoObj[columns[5]] =
      document.querySelector(".product-type div")?.textContent || "-";
   //Season
   itemInfoObj[columns[6]] =
      document.querySelector(".product-season div")?.textContent || "-";
   //Material
   itemInfoObj[columns[7]] =
      document.querySelector(".product-vendor div")?.textContent || "-";
   //Price
   itemInfoObj[columns[8]] =
      document
         .querySelector(".product-price .original")
         ?.textContent.replace(/[^0-9.]/g, "")
         .replace(".", ",") || "-";
   //Price retail
   itemInfoObj[columns[9]] =
      document
         .querySelector(".product-price .product-retail")
         ?.textContent.replace(/[^0-9.]/g, "")
         .replace(".", ",") || "-";
   //Sizes
   itemInfoObj[columns[10]] =
      document.querySelector(".product-size div")?.textContent || "-";
   //Description
   itemInfoObj[columns[11]] =
      document.querySelector(".product-description div")?.textContent || "-";

   if (btn) {
      closeBtn.click();
   }
   return itemInfoObj;
};
window.getExcel = () => {
   window.copyToClipboard(window.LocalStorageUtil.get(localStrName));
};

const columns = [
   "ImageLink",
   "Style",
   "Name",
   "Color",
   "Category",
   "Sex",
   "Season",
   "Material",
   "Price",
   "PriceRetail",
   "Sizes",
   "Description",
];
let itemsInfo =
   window.LocalStorageUtil.get(localStrName) || columns.join("\t") + "\n";
const sleepTime = 0.5;
const localStrName = "itemsInfo";

console.log(
   `"clearCart()" в корзине, для её очистки;
"parseAll()" парсинг 1 блока в зоне видимости;
"parseItem()" парсинг и запись 1 открой вещи;
"await getItemInfo()" вывод информации о товаре в консоль;
"getExcel()" получение конечной информации;
`
);

window.initializeMethods([
   clearCart,
   parseAll,
   parseItem,
   getItemInfo,
   getExcel,
]);
