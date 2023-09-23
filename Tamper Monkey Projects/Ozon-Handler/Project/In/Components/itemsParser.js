import selectAlreadyParsedItems from "./checkOnParsing";
import collectItems from "./collectPageItems";
import { handleItems } from "./finallyDataHandlers";
import { getParsedItems } from "./getters";
import { setParsedItems } from "./setters";

export const handleData = () => {
   const alreadyParsedItems = getParsedItems();
   console.log("Уже были:", alreadyParsedItems);
   const items = collectItems();
   console.log("Товары на странице:", items);
   const filteredItems = items.filter(
      (item) =>
         !alreadyParsedItems.find((parsedItem) => parsedItem.link === item.link)
   );
   console.log("Новые товары:", filteredItems);
   const allItemsList = filteredItems.concat(alreadyParsedItems);
   console.log("Старые + новые товары:", allItemsList);

   const itemsForSave = deleteDomEl(allItemsList)

   setParsedItems(itemsForSave);

   window.copyToClipboard(
      handleItems(items).join("\n"),
      `Ссылки скопированы в буфер обмена. ${items.length} шт.`
   );
   selectAlreadyParsedItems();
};
