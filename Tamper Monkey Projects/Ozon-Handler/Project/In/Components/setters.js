import { lcKey } from "../Utils/constants";

export const setParsedItems = (data) =>
   window.LocalStorageUtil.set(lcKey, data);
export const clearParsedItems = () => window.LocalStorageUtil.delete(lcKey);