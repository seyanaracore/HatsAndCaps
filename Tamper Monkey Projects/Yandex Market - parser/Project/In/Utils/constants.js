const settings = {
   itemsLinksListName: "itemsLinksList",
   itemsInfoListName: "itemsInfoList",
   itemsErrorsListName: "itemsErrorsList",
   initialPage: "",
   sleepTime: 3,
   writePageUrl: true,
   validatePageUrl: false,
};

export const {
   itemsLinksListName,
   itemsInfoListName,
   itemsErrorsListName,
   initialPage,
   sleepTime,
   writePageUrl,
   validatePageUrl
} = settings;

export const consoleInfo = `"clearAllData()" - очистить данные.
"clearInfo()" - очистить информацию о товарах.
"clearLinks()" - очистить ссылки на товары.
"startParse()" - запуск парсинга.
"getErrors()" - получить ошибочные артикула
"getLinks()" - ссылки на товары.
"getItemsData()" - информация о товарах.
"downloadParsedData()" - загрузить результат.
"setItemsLinks(linksList) - установить ссылки на товары."
`;
