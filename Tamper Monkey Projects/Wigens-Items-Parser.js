// @name         Wigens Items Parser
// @namespace    Wigens
// @version      2.0
// @description  try to take over the world!
// @author       You
// @match        https://houseofamandachristensen.com/eur/wigens/*
// @icon         chrome://favicon/http://houseofamandachristensen.com
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Universal%20Parser/Project/Out/app.js
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Wigens-Items-Parser.js
// @grant        none

const $ = (sel) => document.querySelectorAll(sel)

const getColors = () => {
   const colorsList = document.querySelectorAll('.swatch-option.image')

   return colorsList.map(color => {
      return {
         colorName: color.getAttribute("aria-label"),
         imgLink: color,
      }
   })
}

const dataHandler = () => {
   const productData = {
      art,
      name,
      colors: [],
      sizes,
      country,
      material,
      lining,
   };

   productData.art = $('[data-th="Art.no"]')[0].textContent
   productData.name = $('[data-ui-id="page-title-wrapper"]')[0].textContent
   productData.colors = getColors()
   productData.sizes = 
   productData.country = 
   productData.material = 
   productData.lining = 
};

window.intializeMethods([dataHandler]);
