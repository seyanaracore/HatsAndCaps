import Configuration from "../Utils/Configuration";

const {
   itemsErrorsListName,
   itemsInfoListName,
   itemsLinksListName,
} = Configuration.get()

export const setItemsLinks = (itemsLinks) => {
   window.LocalStorageUtil.set(itemsLinksListName, [...new Set(itemsLinks)]);
};
export const setItemsInfo = (itemsInfo) => {
   window.LocalStorageUtil.set(itemsInfoListName, itemsInfo);
};
export const setErrorsList = (errorsList) => {
   window.LocalStorageUtil.set(itemsErrorsListName, errorsList);
};
