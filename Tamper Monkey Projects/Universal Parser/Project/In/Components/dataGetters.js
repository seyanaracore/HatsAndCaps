import Configuration from "../Utils/Configuration";

const {
   itemsErrorsListName,
   itemsInfoListName,
   itemsLinksListName,
} = Configuration.get()

export const getItemsData = () => {
   return window.LocalStorageUtil.get(itemsInfoListName) || [];
};
export const getLinks = () => {
   return window.LocalStorageUtil.get(itemsLinksListName) || [];
};
export const getErrors = () => {
   return window.LocalStorageUtil.get(itemsErrorsListName) || [];
};
