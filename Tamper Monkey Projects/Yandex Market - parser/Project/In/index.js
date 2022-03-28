import { clearAllData, clearInfo, clearLinks } from "./Components/ClearData";
import { getErrors, getItemsData, getLinks } from "./Components/dataGetters";
import { setItemsLinks } from "./Components/dataSetters";
import downloadParsedData from "./Components/downloadData";
import startParse from "./Components/Page/Parser";
import { consoleInfo } from "./Utils/constants";

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
// window.initializeVariables([{ name: "", value: "" }]);

//Вывод информации в консоль
console.log(consoleInfo);

//Start
startParse();
