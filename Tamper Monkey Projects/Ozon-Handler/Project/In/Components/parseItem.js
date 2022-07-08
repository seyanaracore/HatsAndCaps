import { getParsedItems } from "./getters";
import { setParsedItems } from "./setters";

export const parseItem = () => {
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
