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

const getWBSKU = () => document.querySelector("#productNmId").textContent;

const dataHandler = async () => {
   const WBSKU = getWBSKU();
   const pageError = document.querySelector("#errorPage");

   await window.sleep(0.5);
   return { WBSKU, status: pageError ? "blocked" : "notBLocked" };
};
const config = {
   rmDuplicateUrls: false,
};

window.initializeMethods([dataHandler]);
