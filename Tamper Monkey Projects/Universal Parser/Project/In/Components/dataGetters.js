import Configuration from "../Utils/Configuration";

export const getItemsData = () => {
   const { itemsInfoListName } = Configuration.get();

   return window.LocalStorageUtil.get(itemsInfoListName) || [];
};
export const getLinks = () => {
   const { itemsLinksListName } = Configuration.get();

   return window.LocalStorageUtil.get(itemsLinksListName) || [];
};
export const getErrors = () => {
   const { itemsErrorsListName } = Configuration.get();

   return window.LocalStorageUtil.get(itemsErrorsListName) || [];
};
