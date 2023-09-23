import { getParsedItems } from "./getters";

const deleteImgSize = (str) => str.replace(str.split("/").at(-2) + "/", "");

export const handleItems = (itemsList) =>
   itemsList.map((el) => el.link + "\t" + deleteImgSize(el.img));

export const deleteDomEl = (itemsList) => itemsList.map(item => ({
   img: item.img,
   imgKey: item.imgKey,
   link: item.link,
}))

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
