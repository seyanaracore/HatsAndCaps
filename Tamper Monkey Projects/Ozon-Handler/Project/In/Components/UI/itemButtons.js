import { parseItem } from "../parseItem";
import { clearParsedItems } from "../setters";
import { copyParsedItems } from "../finallyDataHandlers";
import pageButtonContructor from "./buttonConstructor";

const containerSelector = '[data-widget="webPdpGrid"]';

const getContainer = () => {
   const container = document.createElement("div");
   container.style.position = "fixed"
   container.style.bottom = "10px";
   container.style.left = "10px";
   container.style.zIndex = "9999";
   container.style.padding = "10px";
   container.style.background = "aliceblue";
   container.style.border = "1px solid black";
   container.style.borderRadius = "12px";
   return container;
};

export function initItemButtons() {
   const container = getContainer();

   new pageButtonContructor("Спарсить вариант", parseItem, container);
   new pageButtonContructor("Очистить все данные", clearParsedItems, container);
   new pageButtonContructor(
      "Скопировать все данные",
      copyParsedItems,
      container
   );

   document.body.insertAdjacentElement("beforeend", container);
}
