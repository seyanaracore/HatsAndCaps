// @name         Ozon Variants Collector
// @namespace    Ozon
// @version      1.0
// @match        https://www.ozon.ru/product/*
// @icon         chrome://favicon/https://www.ozon.ru/
// @description  Ozon items variants collector
// @require		  https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Ozon-Items-Variants-Collector.js
// @grant        none

const initVariantsCollectorButton = () => {
   const collectVariants = () => {
      const itemsVariantsImgsIds = [
         ...document.querySelectorAll('[data-widget="webAspects"] img'),
      ].map((img) => img.src.split("/").at(-1).split(".")[0]);

      window.copyToClipboard(
         itemsVariantsImgsIds.join("\n"),
         `Скопировано вариантов: ${itemsVariantsImgsIds.length} шт.`
      );
   };

   const collectVariantsButton = document.createElement("button");
   collectVariantsButton.textContent = "Собрать айди картинок вариантов";
   collectVariantsButton.addEventListener("click", collectVariants);

   document
      .querySelector('[data-widget="webAspects"]')
      .insertAdjacentElement("beforebegin", collectVariantsButton);
};

window.sleep(1).then(() => initVariantsCollectorButton());
