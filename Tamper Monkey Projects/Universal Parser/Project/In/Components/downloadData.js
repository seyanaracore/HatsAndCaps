import { getItemsData } from "./DataGetters";

export const downloadParsedData = () => {
   const itemsInfo = getItemsData();
   if (!itemsInfo.length) throw new Error("Items data list is empty.");

   window.download(
      { content: itemsInfo, headers: "template" },
      "parsed-data",
      "csv"
   );
};
export const downloadErrors = () => {
   const errorsList = getErrors();

   window.download(
      { content: errorsList, headers: "template" },
      "Errors",
      "csv"
   );
};

export default downloadParsedData;
