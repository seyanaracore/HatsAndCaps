import Configuration from "../Utils/Configuration";

export const setItemsLinks = (itemsUrls) => {
   const { itemsLinksListName, rmDuplicateUrls } = Configuration.get();
   const urls = rmDuplicateUrls ? [...new Set(itemsUrls)] : itemsUrls;

   window.LocalStorageUtil.set(itemsLinksListName, urls);
   console.log("Items links setted: " + urls.length, urls);
};
export const setItemsInfo = (itemsInfo) => {
   const { itemsInfoListName } = Configuration.get();

   window.LocalStorageUtil.set(itemsInfoListName, itemsInfo);
};
export const setErrorsList = (errorsList) => {
   const { itemsErrorsListName } = Configuration.get();

   window.LocalStorageUtil.set(itemsErrorsListName, errorsList);
};
