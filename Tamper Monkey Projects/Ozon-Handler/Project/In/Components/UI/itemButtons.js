import { parseItem } from "../parseItem";
import { clearParsedItems } from "../setters";
import { copyParsedItems } from "../finallyDataHandlers";
import pageButtonContructor from "./buttonConstructor";

const containerSelector = '[data-widget="webPdpGrid"]';

export function initItemButtons() {
   new pageButtonContructor("Спарсить вариант", parseItem, containerSelector);
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
