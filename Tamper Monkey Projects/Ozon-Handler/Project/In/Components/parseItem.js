import { getParsedItems } from "./getters";
import { clearParsedItems, setParsedItems } from "./setters";

const parseItem = () => {
   const alreadyParsedItems = getParsedItems();
   const img = document.querySelector('[data-widget="webGallery"] img').src;
   const link = window.location.href.split("/?")[0];
   const imgKey = img.split("/").at(-1).split(".")[0];
   const item = {
      img,
      link,
      imgKey,
   };

   console.log("Добавлен в список:", item);
   window.notify(`Успех. Добавлен в список: ${item.link}`);
   setParsedItems([...alreadyParsedItems, item]);
};

const initParseItemBtn = () => {
   const SKU = document.querySelector('[data-widget="webDetailSKU"]');
   const parseItemBTN = document.createElement("button");
   parseItemBTN.textContent = "Спарсить";
   parseItemBTN.addEventListener("click", parseItem);

   SKU.insertAdjacentElement("beforebegin", parseItemBTN);
};

export const initClearDataBtn = () => {
   const SKU = document.querySelector('[data-widget="webDetailSKU"]');
   const clearDataBTN = document.createElement("button");
   clearDataBTN.textContent = "Очистить данные";
   clearDataBTN.addEventListener("click", clearParsedItems);

   SKU.insertAdjacentElement("beforebegin", clearDataBTN);
};

export default initParseItemBtn;
