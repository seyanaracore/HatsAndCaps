import { copyParsedItems } from "../finallyDataHandlers";
import { handleData } from "../itemsParser";
import { clearParsedItems } from "../setters";
import pageButtonContructor from "./buttonConstructor";

const containerSelector = '[data-widget="column"]';

export function initProductsListButtons() {
   new pageButtonContructor("Собрать товары", handleData, containerSelector);
   new pageButtonContructor(
      "Очистить все данные",
      clearParsedItems,
      containerSelector
   );
   new pageButtonContructor(
      "Скопировать все данные",
      copyParsedItems,
      containerSelector
   );
}
