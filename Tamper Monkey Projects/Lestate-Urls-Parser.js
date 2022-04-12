// @name         Lestate Urls Parser
// @namespace    Lestate
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://lestate.ru/*
// @icon         chrome://favicon/https://lestate.ru/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Universal%20Parser/Project/Out/app.js
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Lestate-Urls-Parser.js
// @grant        none

const dataHandler = () => {
   const siteName = "https://lestate.ru/";
   const imgLink =
      siteName +
      document
         .querySelector("picture.js-item-slider-pic > source[data-srcset]")
         ?.getAttribute("srcset")
         ?.split(" ")[0]
         ?.replace(".webp", "");

   const productLink = document.querySelector(".catalog-list__item > a")?.href;

   if (!productLink) return null;
   return { imgLink, productLink };
};

window.initializeMethods([dataHandler]);
