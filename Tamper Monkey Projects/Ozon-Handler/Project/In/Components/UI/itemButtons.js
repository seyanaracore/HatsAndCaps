import { parseItem } from "../parseItem";
import { clearParsedItems } from "../setters";
import { copyParsedItems } from "../finallyDataHandlers";
import pageButtonContructor from "./buttonConstructor";
import getContainer from "./getContainer";

const containerSelector = '[data-widget="webPdpGrid"]';

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
