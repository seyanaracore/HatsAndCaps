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

const dataHandler = () => {
   const buyButton = document.querySelector(".x-add-to-cart button");
   if (!buyButton) throw new Error("Not found button");
   const isDisabled = !!buyButton.getAttribute("disabled");

   return { isDisabled };
};

window.initializeMethods([dataHandler]);
window.initializeVariables([{ name: "config", value: config }]);
