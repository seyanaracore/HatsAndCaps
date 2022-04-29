// @name         Ozon SKU Copy
// @namespace    Ozon
// @version      1.0
// @match        https://www.ozon.ru/product/*
// @icon         chrome://favicon/https://www.ozon.ru/
// @description  Ozon sku copy func
// @require		  https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Ozon-SKU-Copy.js
// @grant        none

window.sleep(1).then(() => {
   const element = document.querySelector('[data-widget="webDetailSKU"]')
   element.onclick = (e) => {
      const SKU = e.target.textContent.split(" ")[2];
      console.log(SKU);
      window.copyToClipboard(SKU);
   };
   element.style.cursor = "pointer"
});
