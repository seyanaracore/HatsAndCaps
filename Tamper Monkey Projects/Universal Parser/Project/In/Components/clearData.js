import {
   itemsErrorsListName,
   itemsInfoListName,
   itemsLinksListName,
} from "../Utils/Configuration";

export const clearLinks = () => {
   const isConfrim = confirm("Удалить все ссылки на товары?");
   if (!isConfrim) return;
   window.LocalStorageUtil.delete(itemsLinksListName);
   console.log("Ссылки на товары были удалены.");
};

export const clearInfo = () => {
   const isConfrim = confirm("Удалить всю информацию о товарах?");
   if (!isConfrim) return;
   window.LocalStorageUtil.delete(itemsInfoListName);
   console.log("Информация о товарах была очищена.");
};
export const clearErrors = () => {
   const isConfrim = confirm("Очистить лог ошибок?");
   if (!isConfrim) return;
   window.LocalStorageUtil.delete(itemsErrorsListName);
   console.log("Лог ошибок очищен.");
};

export const clearAllData = () => {
   clearLinks();
   clearInfo();
   clearErrors();
};
