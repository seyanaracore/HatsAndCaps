// @name         Ozon Links Collector
// @namespace    Ozon
// @version      1.0
// @match        https://www.ozon.ru/brand/*
// @match        https://www.ozon.ru/seller/*
// @match        https://www.ozon.ru/seller/*/*
// @match        https://www.ozon.ru/seller/*/*/*
// @icon         chrome://favicon/https://www.ozon.ru/
// @description  Ozon items links collector and copy to buffer
// @require		  https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Ozon-Links-Collector.js
// @grant        none

const handleItemsLinksToCopy = (itemsList) =>
   itemsList.map((el) => el.link + "\t" + el.img);

const initButtonLinksCollector = () => {
   const collectLinks = () => {
      const items = [
         ...document.querySelectorAll(
            ".widget-search-result-container a.tile-hover-target"
         ),
      ]
         .map((el) => ({
            link: el.href.split("/?")[0],
            img: el.querySelector("img")?.src,
         }))
         .filter((item) => item.img);

      const data = handleItemsLinksToCopy(items);
      window.copyToClipboard(
         "Item link\tItem image\n" + data.join("\n"),
         `Ссылки скопированы в буфер обмена. ${items.length} шт.`
      );
   };

   const pageHead = document.querySelector('[data-widget="column"]');
   const collectLinksBtn = document.createElement("button");
   collectLinksBtn.innerText = "Собрать ссылки";
   collectLinksBtn.addEventListener("click", collectLinks);

   pageHead.insertAdjacentElement("beforeend", collectLinksBtn);
};

window.sleep(1).then(() => initButtonLinksCollector());
