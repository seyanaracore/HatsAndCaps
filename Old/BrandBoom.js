//____________________________________________________________________________________________
// @name         BrandBoom
// @namespace    https://www.brandboom.com/*
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.brandboom.com/*
// @icon         chrome://favicon/http://www.brandboom.com/
// @grant        none
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Parsers/BrandBoom.js
//____________________________________________________________________________________________

window.$ = (selector) => document.querySelector(selector);

window.deleteItems = () => window.LocalStorageUtil.delete(window.localStrName);

window.selectAllCartItems = () => {
   return document
      .querySelectorAll(".cb-orderline.d-print-none")
      .forEach((btn) => btn.click());
};

window.clearCart = async () => {
   window.selectAllCartItems();
   await window.sleep(0.2);
   window.$(".primary-btn.btn.btn-white.order-only").click();
   await window.sleep(1);
   window.$(".modal-footer > .btn").click();
   window.deleteItems();
};

window.getBtns = () => {
   let products = [...document.querySelectorAll(".product")].filter(
      (product) => !product.classList.contains("ordered")
   );
   let btns = products
      .map((product) => product.lastChild.lastChild.lastChild.lastChild)
      .filter((btn) => !btn.hasAttribute("disabled"))
      .filter((btn) => btn.style.display != "none");
   return btns;
};
window.decomposeObjToTable = (obj) => {
   let itemObjString = "";
   for (let prop in obj) {
      itemObjString += obj[prop] + `\t`;
   }
   return itemObjString;
};
window.parseItem = async () => {
   window.itemsInfo += decomposeObjToTable(await window.getItemInfo());
   window.LocalStorageUtil.set(window.localStrName, window.itemsInfo);
};

window.parseAll = async () => {
   let btns = window.getBtns();
   let btnsCounter = 0;
   while (btns.length) {
      for (let btn of btns) {
         if (btnsCounter % 4 == 0) document.documentElement.scrollTop += 350;
         await window.sleep(window.sleepTime);
         window.itemsInfo += await window.getItemInfo(btn);
         btn.click();
         btnsCounter += 1;
      }
      btns = window.getBtns();
   }
   window.LocalStorageUtil.set(window.localStrName, window.itemsInfo);
   console.log("finished");
};
window.getItemInfo = async (btn) => {
   if (btn) {
      btn.parentElement.parentElement.parentElement.childNodes[2].lastElementChild.lastElementChild.childNodes[0].click();
   }

   await window.sleep(window.sleepTime);
   let closeBtn = window.$("#product-review-widget .modal-close");
   //Parse info_______________________________________________________
   const itemInfoObj = {};
   //Image link
   try {
      itemInfoObj[window.columns[0]] = window.$("#pr-viewer-box img")?.src;
      if (!itemInfoObj[window.columns[0]]) throw new Error();
   } catch (e) {
      await window.sleep(3);
      itemInfoObj[window.columns[0]] = window.$("#pr-viewer-box img").src;
   }
   //Style
   itemInfoObj[window.columns[1]] =
      window.$(".product-style div")?.textContent || "-";
   //Name
   itemInfoObj[window.columns[2]] = window.$(".pr-title").textContent || "-";
   //Color
   itemInfoObj[window.columns[3]] =
      window.$(".product-options div")?.textContent || "-";
   //Category
   itemInfoObj[window.columns[4]] =
      window.$(".product-category div")?.textContent || "-";
   //Sex
   itemInfoObj[window.columns[5]] =
      window.$(".product-type div")?.textContent || "-";
   //Season
   itemInfoObj[window.columns[6]] =
      window.$(".product-season div")?.textContent || "-";
   //Material
   itemInfoObj[window.columns[7]] =
      window.$(".product-vendor div")?.textContent || "-";
   //Price
   itemInfoObj[window.columns[8]] =
      window
         .$(".product-price .original")
         ?.textContent.replace(/[^0-9.]/g, "")
         .replace(".", ",") || "-";
   //Price retail
   itemInfoObj[window.columns[9]] =
      window
         .$(".product-price .product-retail")
         ?.textContent.replace(/[^0-9.]/g, "")
         .replace(".", ",") || "-";
   //Sizes
   itemInfoObj[window.columns[10]] =
      window.$(".product-size div")?.textContent || "-";
   //Description
   itemInfoObj[window.columns[11]] =
      window.$(".product-description div")?.textContent || "-";

   if (btn) {
      closeBtn.click();
   }
   return itemInfoObj;
};
window.getExcel = () => {
   window.copyToClipboard(window.LocalStorageUtil.get(window.localStrName));
};

window.columns = [
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
window.itemsInfo =
   window.LocalStorageUtil.get(window.localStrName) ||
   window.columns.join("\t") + "\n";
window.sleepTime = 0.5;
window.localStrName = "itemsInfo";

console.log(
   `"clearCart()" в корзине, для её очистки;
"parseAll()" парсинг 1 блока в зоне видимости;
"parseItem()" парсинг и запись 1 открой вещи;
"await getItemInfo()" вывод информации о товаре в консоль;
"getExcel()" получение конечной информации;
`
);
