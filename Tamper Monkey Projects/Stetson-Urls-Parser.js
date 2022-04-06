// @name         Stetson Urls Parser
// @namespace    Stetson
// @version      2.0
// @description  try to take over the world!
// @author       You
// @match        https://preorder.fwshats.de/en/*
// @icon         chrome://favicon/http://preorder.fwshats.de/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Universal%20Parser/Project/Out/app.js
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Yandex-Market-Urls-Parser.js
// @grant        none

const dataHandler = () => {
   const itemLink = document.querySelectorAll(".catalog-grid-item__link")[0]
      ?.href;
   if (!itemLink) return null;
   return { itemLink };
};
window.initializeMethods([dataHandler]);
