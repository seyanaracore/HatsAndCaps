import { parseItem } from "../parseItem";
import { clearParsedItems } from "../setters";
import { copyParsedItems } from "../finallyDataHandlers";
import pageButtonContructor from "./buttonConstructor";

const containerSelector = '[data-widget="webPdpGrid"]';

const getContainer = () => {
   const container = document.createElement("div");
   container.innerHTML = `
<div style='
   position: fixed;
   bottom: 10px;
   z-index: 9999;
   padding: 10px;
   background: aliceblue;
   border: 1px solid black;
   border-radius: 12px;
'></div>`;
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
