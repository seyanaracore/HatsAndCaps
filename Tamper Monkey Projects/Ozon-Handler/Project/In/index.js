import selectAlreadyParsedItems from "./Components/checkOnParsing";
import { initButtonLinksCollector } from "./Components/itemsParser";
import initParseItemBtn from "./Components/parseItem";
import { clearParsedItems } from "./Components/setters";

const pageUrl = window.location.href;

if (pageUrl.includes("https://www.ozon.ru/product/")) {
   window.sleep(1).then(() => {
      initParseItemBtn();
      selectAlreadyParsedItems();
   });
} else if (
   pageUrl.includes("https://www.ozon.ru/seller/") ||
   pageUrl.includes("https://www.ozon.ru/brand/")
) {
   window.sleep(1).then(() => {
      selectAlreadyParsedItems();
      initButtonLinksCollector();
   });
}

window.initializeMethods([clearParsedItems]);