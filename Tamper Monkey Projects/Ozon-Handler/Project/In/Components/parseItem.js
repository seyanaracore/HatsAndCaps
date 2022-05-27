import { getParsedItems } from "./getters";
import { setParsedItems } from "./setters";

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

   setParsedItems(...alreadyParsedItems, item);
};

const initParseItemBtn = () => {
   const SKU = document.querySelector('[data-widget="webDetailSKU"]');
   const parseItemBTN = document.createElement("button");
   parseItemBTN.textContent = "Добавить в парсинг";
   parseItemBTN.addEventListener("click", parseItem);

   SKU.insertAdjacentElement("beforebegin", parseItemBTN);
};

export default initParseItemBtn;
