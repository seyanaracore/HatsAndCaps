import { validatePageUrl } from "../../Utils/constants";
import { getLinks } from "../dataGetters";
import { setItemsLinks } from "../dataSetters";
import toNextLink from "../ToNextLink";
import pageHandler from "./PageHandler";

const startParse = async () => {
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
