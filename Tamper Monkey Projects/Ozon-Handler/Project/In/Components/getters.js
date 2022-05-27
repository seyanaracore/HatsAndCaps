import { lcKey } from "../Utils/constants";

export const getParsedItems = () => window.LocalStorageUtil.get(lcKey) || [];
