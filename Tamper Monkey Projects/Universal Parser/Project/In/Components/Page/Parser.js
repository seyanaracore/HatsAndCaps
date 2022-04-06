import Configuration from "../../Utils/Configuration";
import toNextLink from "../ToNextLink";
import PageDataHandler from "./PageDataHandler";
import pageHandler from "./PageHandler";

import { setItemsLinks } from "../DataSetters";
import { getLinks } from "../DataGetters"


const startParse = async (config, pageDataHandler) => {
   const { validatePageUrl } = Configuration.get()
   
   //Проверка наличия обработчика данных страницы
   if (!pageDataHandler) throw new Error("Excepted function for page data handle.")
   //Установка обработчика данных страницы
   PageDataHandler.set(pageDataHandler)

   //Установка конфига
   config && Configuration.set(config)

   const itemsLinks = getLinks();
   const handleUrl = itemsLinks[0];

   //Проверка наличия ссылок на товары
   if (itemsLinks.length) {
      console.log("Осталось: " + itemsLinks.length);

      //Сравнение текущей ссылки и ссылки на первый товар
      if (validatePageUrl && window.location.href !== handleUrl) toNextLink();

      await pageHandler();
   } else {
      //Если ссылок нет - запросить список
      const userLinksList =
         prompt("Список ссылок пуст. Введите их через запятую:") || [];

      if (!userLinksList?.length) return;

      //Если ссылки введены - форматирование, обработка введённых данных
      let userLinksListHandled = userLinksList.replace(" ", "").trim();
      userLinksListHandled = userLinksListHandled.split(",");

      //Запись в хранилище ссылок на товары
      setItemsLinks(userLinksListHandled);

      //Переход к первому товару
      toNextLink();
   }
};

export default startParse;
