import selectAlreadyParsedItems from "./Components/checkOnParsing";
import { initButtonLinksCollector } from "./Components/itemsParser";

window.sleep(1).then(() => {
   selectAlreadyParsedItems();
   initButtonLinksCollector();
});
