import {
   copyParsedItems,
   downloadParsedItems,
} from "./Components/finallyDataHandlers";
import selectVariants from "./Components/handleItemVariants";
import {
   initButtonClearData,
   initButtonLinksCollector,
} from "./Components/itemsParser";
import initParseItemBtn, { initClearDataBtn } from "./Components/parseItem";
import { clearParsedItems } from "./Components/setters";

const pageUrl = window.location.href;

if (pageUrl.includes("https://www.ozon.ru/product/")) {
   window.sleep(1).then(() => {
      initParseItemBtn();
      selectVariants();
      initClearDataBtn();
   });
} else if (
   pageUrl.includes("https://www.ozon.ru/seller/") ||
   pageUrl.includes("https://www.ozon.ru/brand/")
) {
   window.sleep(1).then(() => {
      // selectAlreadyParsedItems();
      initButtonLinksCollector();
      initButtonClearData();
   });
}

window.initializeMethods([
   clearParsedItems,
   copyParsedItems,
   downloadParsedItems,
]);

console.log(
   "Удаление товаров - clearParsedItems()\nСкачать товары - downloadParsedItems()\nКопировать в буфер - copyParsedItems()"
);
