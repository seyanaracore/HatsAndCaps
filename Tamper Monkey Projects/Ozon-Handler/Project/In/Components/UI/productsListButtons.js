import { copyParsedItems } from "../finallyDataHandlers";
import { handleData } from "../itemsParser";
import { clearParsedItems } from "../setters";
import pageButtonContructor from "./buttonConstructor";
import getContainer from "./getContainer";

const containerSelector = '[data-widget="column"]';

export function initProductsListButtons() {
   const container = getContainer()

   new pageButtonContructor("Собрать товары", handleData, container);
   new pageButtonContructor(
      "Очистить все данные",
      clearParsedItems,
      container
   );
   new pageButtonContructor(
      "Скопировать все данные",
      copyParsedItems,
      container
   );

   document.body.insertAdjacentElement("beforeend", container);
}
