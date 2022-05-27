/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
;// CONCATENATED MODULE: ./Project/In/Components/collectPageItems.js



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var collectItems = function collectItems() {
  return _toConsumableArray(document.querySelectorAll(".widget-search-result-container a.tile-hover-target")).map(function (el) {
    var _el$querySelector;

    return {
      domEl: el,
      link: el.href.split("/?")[0],
      img: (_el$querySelector = el.querySelector("img")) === null || _el$querySelector === void 0 ? void 0 : _el$querySelector.src
    };
  }).filter(function (item) {
    return item.img;
  }).map(function (item) {
    return _objectSpread(_objectSpread({}, item), {}, {
      imgKey: item.img.split("/").at(-1).split(".")[0]
    });
  });
};
/* harmony default export */ var collectPageItems = (collectItems);
;// CONCATENATED MODULE: ./Project/In/Utils/constants.js
var lcKey = "ozonItemsList";
;// CONCATENATED MODULE: ./Project/In/Components/getters.js

var getParsedItems = function getParsedItems() {
  return window.LocalStorageUtil.get(lcKey) || [];
};
;// CONCATENATED MODULE: ./Project/In/Components/checkOnParsing.js



var selectAlreadyParsedItems = function selectAlreadyParsedItems() {
  var pageItems = collectPageItems();
  var parsedItems = getParsedItems();
  pageItems.forEach(function (pageItem) {
    if (parsedItems.find(function (item) {
      return item.imgKey === pageItem.imgKey;
    })) {
      pageItem.domEl.parentElement.style.border = "2px solid black";
    }
  });
};

/* harmony default export */ var checkOnParsing = (selectAlreadyParsedItems);
;// CONCATENATED MODULE: ./Project/In/Components/setters.js

var setParsedItems = function setParsedItems(data) {
  return window.LocalStorageUtil.set(lcKey, data);
};
var clearParsedItems = function clearParsedItems() {
  return window.LocalStorageUtil["delete"](lcKey);
};
;// CONCATENATED MODULE: ./Project/In/Components/itemsParser.js




var handleItemsLinksToCopy = function handleItemsLinksToCopy(itemsList) {
  return itemsList.map(function (el) {
    return el.link + "\t" + el.img.replace("/wc250", "");
  });
};

var handleData = function handleData() {
  var alreadyParsedItems = getParsedItems();
  var items = collectPageItems().filter(function (item) {
    return !alreadyParsedItems.find(function (parsedItem) {
      return parsedItem.link === item.link;
    });
  });
  var allItemsList = items.concat(alreadyParsedItems);
  setParsedItems(allItemsList);
  window.copyToClipboard(handleItemsLinksToCopy(allItemsList).join("\n"), "\u0421\u0441\u044B\u043B\u043A\u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430. ".concat(items.length, " \u0448\u0442."));
};

var initButtonLinksCollector = function initButtonLinksCollector() {
  var pageHead = document.querySelector('[data-widget="column"]');
  var collectLinksBtn = document.createElement("button");
  collectLinksBtn.innerText = "Собрать ссылки";
  collectLinksBtn.addEventListener("click", handleData);
  pageHead.insertAdjacentElement("beforeend", collectLinksBtn);
};
;// CONCATENATED MODULE: ./Project/In/Components/parseItem.js




var parseItem = function parseItem() {
  var alreadyParsedItems = getParsedItems();
  var img = document.querySelector('[data-widget="webGallery"] img').src;
  var link = window.location.href.split("/?")[0];
  var imgKey = img.split("/").at(-1).split(".")[0];
  var item = {
    img: img,
    link: link,
    imgKey: imgKey
  };
  setParsedItems.apply(void 0, _toConsumableArray(alreadyParsedItems).concat([item]));
};

var initParseItemBtn = function initParseItemBtn() {
  var SKU = document.querySelector('[data-widget="webDetailSKU"]');
  var parseItemBTN = document.createElement("button");
  parseItemBTN.textContent = "Добавить в парсинг";
  parseItemBTN.addEventListener("click", parseItem);
  SKU.insertAdjacentElement("beforebegin", parseItemBTN);
};

/* harmony default export */ var Components_parseItem = (initParseItemBtn);
;// CONCATENATED MODULE: ./Project/In/index.js




var pageUrl = window.location.href;

if (pageUrl.includes("https://www.ozon.ru/product/")) {
  window.sleep(1).then(function () {
    Components_parseItem();
    checkOnParsing();
  });
} else if (pageUrl.includes("https://www.ozon.ru/seller/") || pageUrl.includes("https://www.ozon.ru/brand/")) {
  window.sleep(1).then(function () {
    checkOnParsing();
    initButtonLinksCollector();
  });
}

window.initializeMethods([clearParsedItems]);
console.log('Удаление спаршенных товаров - clearParsedItems()');
/******/ })()
;