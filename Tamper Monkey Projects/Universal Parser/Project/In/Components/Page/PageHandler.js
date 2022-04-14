import { getErrors, getItemsData } from "../DataGetters";
import { setErrorsList, setItemsInfo, setItemsLinks } from "../DataSetters";
import toNextLink from "../ToNextLink";
import PageDataHandler from "./PageDataHandler";
import Configuration from "../../Utils/Configuration";

const pageHandler = async () => {
   const { sleepTime, writePageUrl } = Configuration.get();

   await window.sleep(sleepTime); //Задержка для загрузки данных и избежания блокировки соединения
   const itemsInfoList = getItemsData();
   const itemsLinksList = getLinks();
   const itemsErrorsList = getErrors();
   const handlingURL = itemsLinksList[0];
   const dataHandler = PageDataHandler.get();

   let itemInfo = null
   try {
      itemInfo = dataHandler(); //Получение данных о товаре
      if (!itemInfo) throw new Error("Data processing error")
   } catch (err) {
      console.error(err.message)
      itemsErrorsList.push({ "Error": err.message, handlingURL });
   }

   if (itemInfo) itemsInfoList.push(
      writePageUrl ? { ...itemInfo, handlingURL } : itemInfo
   ); //Добавить в массив данные о товаре


   itemsLinksList.shift(); //Удалить ссылку товара

   console.log(itemInfo);
   console.log("Осталось: " + itemsLinksList.length);

   setItemsLinks(itemsLinksList);
   setItemsInfo(itemsInfoList);
   setErrorsList(itemsErrorsList);

   toNextLink();
};

export default pageHandler;
