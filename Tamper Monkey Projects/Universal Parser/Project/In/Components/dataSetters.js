import Configuration from "../Utils/Configuration";

export const setItemsLinks = (itemsLinks) => {
   const { itemsLinksListName } = Configuration.get();

   window.LocalStorageUtil.set(itemsLinksListName, [...new Set(itemsLinks)]);
};
export const setItemsInfo = (itemsInfo) => {
   const { itemsInfoListName } = Configuration.get();

   window.LocalStorageUtil.set(itemsInfoListName, itemsInfo);
};
export const setErrorsList = (errorsList) => {
   const { itemsErrorsListName } = Configuration.get();

   window.LocalStorageUtil.set(itemsErrorsListName, errorsList);
};
