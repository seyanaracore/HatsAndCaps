import { clearAllData, clearInfo, clearLinks } from "./Components/ClearData";
import { getErrors, getItemsData, getLinks } from "./Components/dataGetters";
import { setItemsLinks } from "./Components/dataSetters";
import { consoleInfo } from "./Utils/constants";
import downloadParsedData from "./Components/downloadData";
import startParse from "./Components/Page/Parser";

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
]);

//Вывод информации в консоль
console.log(consoleInfo);
