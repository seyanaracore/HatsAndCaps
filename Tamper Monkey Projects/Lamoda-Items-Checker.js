// @name         Lamoda Items Checker
// @namespace    Lamoda
// @version      1.0
// @match        https://www.lamoda.ru/*
// @icon         chrome://favicon/https://www.lamoda.ru/
// @description  Lamoda Parser
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Universal%20Parser/Project/Out/app.js
// @require		  https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Lamoda-Items-Checker.js
// @grant        none

const config = {
   validatePageUrl: false,
};

const getNumbers = (str) => str.match(/[0-9]/g).join("");
const getOutOfStock = () => {
   const sizesBlock = document.querySelectorAll(
      ".ui-product-page-sizes-chooser-item"
   );
   if (!sizesBlock.length) return "Это One Size";

   const inStockSelector = "ui-product-page-sizes-chooser-item_enabled";
   const sizes = [...sizesBlock].map((sizeBlock) => ({
      inStock: sizeBlock.classList.contains(inStockSelector),
      sizeNum: getNumbers(sizeBlock.firstElementChild.textContent),
   }));
   return (
      sizes
         .filter((sizeObj) => !sizeObj.inStock)
         .map((size) => size.sizeNum)
         .join() + ","
   );
};

const dataHandler = () => {
   const buyButton = document.querySelector(".x-add-to-cart button");
   if (!buyButton) throw new Error("Not found buy button");
   const sizesOutOfStock = getOutOfStock();

   const isDisabled = !!buyButton.getAttribute("disabled");

   return { isDisabled, sizesOutOfStock };
};

window.initializeMethods([dataHandler]);
window.initializeVariables([{ name: "config", value: config }]);
