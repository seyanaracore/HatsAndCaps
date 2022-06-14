import {
   initializeMethods,
   initializeClass,
   initializeVariables,
} from "./Components/InitializeGlobal.js";
import download from "./Components/downloadData.js";
import sleep from "./Components/sleep.js";
import copyToClipboard from "./Components/copyToClipboard.js";
import LocalStorageUtil from "./Components/localStorageUtil.js";
import toBottomElement from "./Components/toBottomElement.js";
import notify from "./Components/notify.js";
import createCSV from "./Components/createCSV.js";

initializeClass([LocalStorageUtil]);

initializeMethods([
   sleep,
   notify,
   download,
   copyToClipboard,
   toBottomElement,
   initializeMethods,
   initializeClass,
   initializeVariables,
   createCSV
]);
