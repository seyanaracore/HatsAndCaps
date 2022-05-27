import selectAlreadyParsedItems from "./checkOnParsing";
import collectItems from "./collectPageItems";
import { getParsedItems } from "./getters";
import { setParsedItems } from "./setters";

const handleItemsLinksToCopy = (itemsList) =>
   itemsList.map((el) => el.link + "\t" + el.img.replace("/wc250", ""));

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
      handleItemsLinksToCopy(items).join("\n"),
      `Ссылки скопированы в буфер обмена. ${items.length} шт.`
   );
   selectAlreadyParsedItems()
};

export const initButtonLinksCollector = () => {
   const pageHead = document.querySelector('[data-widget="column"]');
   const collectLinksBtn = document.createElement("button");
   collectLinksBtn.innerText = "Собрать ссылки";
   collectLinksBtn.addEventListener("click", handleData);

   pageHead.insertAdjacentElement("beforeend", collectLinksBtn);
};
