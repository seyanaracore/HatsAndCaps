// @name         Wildberries Fakers Checker
// @namespace    Wildberries
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.wildberries.ru/*
// @icon         chrome://favicon/https://www.wildberries.ru/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Universal%20Parser/Project/Out/app.js
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Wildberries-Fakers-Checker.js
// @grant        none

const lcKey = "wbFakersItems";

const getWBSKU = () => document.querySelector("#productNmId")?.textContent;

const dataHandler = async (selector = "#errorPage") => {
   await window.sleep(0.5);
   return {
      status: document.querySelector(selector) ? "blocked" : "not blocked",
   };
};
const config = {
   rmDuplicateUrls: false,
};

window.initializeMethods([dataHandler]);

//() => dataHandler(".catalog-page--non-search" / "#errorPage")
