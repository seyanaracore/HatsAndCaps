import { clearAllData, clearErrors, clearInfo, clearLinks } from "./Components/clearData";
import { getErrors, getItemsData, getLinks } from "./Components/dataGetters";
import { setItemsLinks } from "./Components/dataSetters";
import { consoleInfo } from "./Utils/constants";
import downloadParsedData from "./Components/downloadData";
import startParse from "./Components/Page/Parser";
import toNextLink from "./Components/ToNextLink";
import transferErrorLinks from "./Components/transferErrorLinks";

//Initialize Global
window.initializeMethods([
   clearAllData,
   clearInfo,
   clearLinks,
   startParse,
   getErrors,
   getLinks,
   getItemsData,
   downloadParsedData,
   setItemsLinks,
   toNextLink,
   clearErrors,
   transferErrorLinks
]);

//Вывод информации в консоль
console.log(consoleInfo);
