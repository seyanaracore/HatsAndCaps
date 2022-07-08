import { lcKey } from "../Utils/constants";

export const setParsedItems = (data) => {
   window.LocalStorageUtil.set(lcKey, data);
   console.log("Данные установлены:", data);
};
export const clearParsedItems = () => {
   window.LocalStorageUtil.delete(lcKey);
   console.log("Данные удалены.");
   window.notify("Данные удалены.", 4)
};
