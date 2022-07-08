import {
   copyParsedItems,
   downloadParsedItems,
} from "./Components/finallyDataHandlers";
import selectVariants from "./Components/handleItemVariants";
import { clearParsedItems } from "./Components/setters";
import { initItemButtons } from "./Components/UI/itemButtons";
import { initProductsListButtons } from "./Components/UI/productsListButtons";

const pageUrl = window.location.href;

if (pageUrl.includes("https://www.ozon.ru/product/")) {
   window.sleep(1).then(() => {
      selectVariants();
      initItemButtons();
   });
} else if (
   pageUrl.includes("https://www.ozon.ru/seller/") ||
   pageUrl.includes("https://www.ozon.ru/brand/")
) {
   window.sleep(1).then(() => {
      initProductsListButtons();
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
