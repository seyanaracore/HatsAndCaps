import { sleepTime, writePageUrl } from "../../Utils/constants";
import { getErrors, getItemsData } from "../dataGetters";
import { setItemsLinks } from "../dataSetters";
import toNextLink from "../ToNextLink";

const pageHandler = async () => {
   await window.sleep(sleepTime); //Задержка для загрузки данных и избежания блокировки соединения
   const itemsInfoList = getItemsData();
   const itemsLinksList = getLinks();
   const itemsErrorsList = getErrors();
   const handlingURL = itemsLinksList[0];

   const itemInfo = getItemInfo(); //Получение данных о товаре

   if (itemInfo) {
      itemsInfoList.push(
         writePageUrl ? { ...itemInfo, handlingURL } : itemInfo
      ); //Добавить в массив данные о товаре
   } else {
      itemsErrorsList.push(handlingURL);
   }

   itemsLinksList.shift(); //Удалить ссылку товара

   console.log(itemInfo);
   console.log("Осталось: " + itemsLinksList.length);

   setItemsLinks(itemsLinksList);
   setItemsInfo(itemsInfoList);
   setErrorsList(itemsErrorsList);

   toNextLink();
};

export default pageHandler;
