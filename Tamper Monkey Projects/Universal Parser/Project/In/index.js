import { clearAllData, clearErrors, clearInfo, clearLinks } from "./Components/ClearData";
import { getErrors, getItemsData, getLinks } from "./Components/DataGetters";
import { setItemsLinks } from "./Components/DataSetters";
import { consoleInfo } from "./Utils/Constants";
import downloadParsedData from "./Components/DownloadData";
import startParse from "./Components/Page/Parser";
import toNextLink from "./Components/ToNextLink";
import transferErrorLinks from "./Components/TransferErrorLinks";

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
