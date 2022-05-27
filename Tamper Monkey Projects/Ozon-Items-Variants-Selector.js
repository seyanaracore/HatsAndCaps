// @name         Ozon Variants Selector
// @namespace    Ozon
// @version      1.0
// @match        https://www.ozon.ru/product/*
// @icon         chrome://favicon/https://www.ozon.ru/
// @description  Ozon items variants selector
// @require		  https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Ozon-Items-Variants-Selector.js
// @grant        none

const selectVariants = () => {
   const idsList = prompt("Список айди картинок через запятую:")
      .replace(/s/g, "")
      .split(",");

   const variants = [
      ...document.querySelectorAll('[data-widget="webAspects"] img'),
   ];

   idsList.forEach((id) => {
      const variant = variants.find((img) => img.src.includes(id));
      variant.parentElement.style.border = "2px solid black";
   });
};

const initVariantsSelectorButton = () => {
   const selectVariantsButton = document.createElement("button");
   selectVariantsButton.textContent = "Выделить варианты по айди картинки";
   selectVariantsButton.addEventListener("click", selectVariants);

   document
      .querySelector('[data-widget="webAspects"]')
      .insertAdjacentElement("beforebegin", selectVariantsButton);
};

window.sleep(1).then(() => initVariantsSelectorButton());
