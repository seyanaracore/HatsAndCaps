import collectLinks from "./collectPageItems";
import { getParsedItems } from "./getters";
import { setParsedItems } from "./setters";

const handleItemsLinksToCopy = (itemsList) =>
   itemsList.map((el) => el.link + "\t" + el.img.replace("/wc250", ""));

const handleData = () => {
   const items = collectLinks();
   const alreadyParsedItems = getParsedItems();

   setParsedItems([...new Set(...items, ...alreadyParsedItems)]);

   window.copyToClipboard(
      handleItemsLinksToCopy(data).join("\n"),
      `Ссылки скопированы в буфер обмена. ${items.length} шт.`
   );
};

export const initButtonLinksCollector = () => {
   const pageHead = document.querySelector('[data-widget="column"]');
   const collectLinksBtn = document.createElement("button");
   collectLinksBtn.innerText = "Собрать ссылки";
   collectLinksBtn.addEventListener("click", handleData);

   pageHead.insertAdjacentElement("beforeend", collectLinksBtn);
};
