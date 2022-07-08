import selectAlreadyParsedItems from "./checkOnParsing";
import collectItems from "./collectPageItems";
import { handleItems } from "./finallyDataHandlers";
import { getParsedItems } from "./getters";
import { clearParsedItems, setParsedItems } from "./setters";

const handleData = () => {
   const alreadyParsedItems = getParsedItems();
   console.log("already parsed:", alreadyParsedItems);
   const items = collectItems();
   console.log("page items:", items);
   const filteredItems = items.filter(
      (item) =>
         !alreadyParsedItems.find((parsedItem) => parsedItem.link === item.link)
   );
   console.log("new items:", filteredItems);
   const allItemsList = filteredItems.concat(alreadyParsedItems);
   console.log("already parsed + new items:", allItemsList);

   setParsedItems(allItemsList);

   window.copyToClipboard(
      handleItems(items).join("\n"),
      `Ссылки скопированы в буфер обмена. ${items.length} шт.`
   );
   selectAlreadyParsedItems();
};

export const initButtonLinksCollector = () => {
   const pageHead = document.querySelector('[data-widget="column"]');
   const collectLinksBtn = document.createElement("button");
   collectLinksBtn.innerText = "Собрать товары";
   collectLinksBtn.addEventListener("click", handleData);

   pageHead.insertAdjacentElement("beforeend", collectLinksBtn);
};
export const initButtonClearData = () => {
   const pageHead = document.querySelector('[data-widget="column"]');
   const clearDataBtn = document.createElement("button");
   clearDataBtn.innerText = "Очистить данные";
   clearDataBtn.addEventListener("click", clearParsedItems);

   pageHead.insertAdjacentElement("beforeend", clearDataBtn);
};
