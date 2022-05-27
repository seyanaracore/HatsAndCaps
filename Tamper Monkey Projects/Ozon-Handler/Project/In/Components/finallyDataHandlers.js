import { getParsedItems } from "./getters";

export const handleItems = (itemsList) =>
   itemsList.map((el) => el.link + "\t" + el.img.replace("/wc250", "").replace("/wc1200", ""));

export const downloadParsedItems = () => {
   const parsedData = getParsedItems();

   window.download(
      { content: handleItems(parsedData), headers: "template" },
      "Ozon-Items",
      "csv"
   );
};
export const copyParsedItems = () => {
   const parsedData = getParsedItems();

   window.copyToClipboard(
      handleItems(parsedData).join("\n"),
      `Товары скопированы в буфер обмена. ${parsedData.length} шт.`
   );
};
