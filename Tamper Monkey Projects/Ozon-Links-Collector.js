// @name         Ozon Links Collector
// @namespace    Ozon
// @version      1.0
// @match        https://www.ozon.ru/brand/*
// @match        https://www.ozon.ru/seller/*
// @icon         chrome://favicon/https://www.ozon.ru/
// @description  Ozon items links collector and copy to buffer
// @require		  https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Ozon-Links-Collector.js
// @grant        none

const initButtonLinksCollector = () => {
   const collectLinks = () => {
      const links = [
         ...new Set(
            [
               ...document.querySelectorAll(
                  ".widget-search-result-container a.tile-hover-target"
               ),
            ].map((el) => el.href.split("/?")[0])
         ),
      ];

      window.copyToClipboard(
         links.join("\n"),
         `Ссылки скопированы в буфер обмена. ${links.length} шт.`
      );
   };

   const pageHead = document.querySelector('[data-widget="column"]');
   const collectLinksBtn = document.createElement("button");
   collectLinksBtn.innerText = "Собрать ссылки";
   collectLinksBtn.addEventListener("click", collectLinks);

   pageHead.insertAdjacentElement("beforeend", collectLinksBtn);
};
