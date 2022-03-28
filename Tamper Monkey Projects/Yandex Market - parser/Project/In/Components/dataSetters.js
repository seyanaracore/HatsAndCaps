import {
   itemsErrorsListName,
   itemsInfoListName,
   itemsLinksListName,
} from "../Utils/constants";

export const setItemsLinks = (itemsLinks) => {
   window.LocalStorageUtil.set(itemsLinksListName, [...new Set(itemsLinks)]);
};
export const setItemsInfo = (itemsInfo) => {
   window.LocalStorageUtil.set(itemsInfoListName, itemsInfo);
};
export const setErrorsList = (errorsList) => {
   window.LocalStorageUtil.set(itemsErrorsListName, errorsList);
};
