/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./Project/In/Utils/constants.js
var lcKey = "ozonItemsList";
var itemSelectBorder = "2px solid red";
;// CONCATENATED MODULE: ./Project/In/Components/getters.js

var getParsedItems = function getParsedItems() {
  return window.LocalStorageUtil.get(lcKey) || [];
};
;// CONCATENATED MODULE: ./Project/In/Components/finallyDataHandlers.js


var deleteImgSize = function deleteImgSize(str) {
  return str.replace(str.split("/").at(-2) + "/", "");
};

var handleItems = function handleItems(itemsList) {
  return itemsList.map(function (el) {
    return el.link + "\t" + deleteImgSize(el.img);
  });
};
var finallyDataHandlers_deleteDomEl = function deleteDomEl(itemsList) {
  return itemsList.map(function (item) {
    return {
      img: item.img,
      imgKey: item.imgKey,
      link: item.link
    };
  });
};
var downloadParsedItems = function downloadParsedItems() {
  var parsedData = getParsedItems();
  window.download({
    content: handleItems(parsedData),
    headers: "template"
  }, "Ozon-Items", "csv");
};
var copyParsedItems = function copyParsedItems() {
  var parsedData = getParsedItems();
  window.copyToClipboard(handleItems(parsedData).join("\n"), "\u0422\u043E\u0432\u0430\u0440\u044B \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430. ".concat(parsedData.length, " \u0448\u0442."));
};
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
;// CONCATENATED MODULE: ./Project/In/Components/handleItemVariants.js




var collectVariants = function collectVariants() {
  return _toConsumableArray(document.querySelectorAll('[data-widget="webAspects"] img'));
};

var selectVariants = function selectVariants() {
  var parsedItems = getParsedItems();
  var variants = collectVariants().map(function (variant) {
    return {
      domEl: variant,
      imgId: variant.src.split("/").at(-1).split(".")[0]
    };
  });
  variants.forEach(function (itemVariant, idx) {
    if (parsedItems.find(function (parsedItem) {
      return parsedItem.img.includes(itemVariant.imgId);
    })) {
      itemVariant.domEl.parentElement.style.border = itemSelectBorder;
    }
  });
};

/* harmony default export */ var handleItemVariants = (selectVariants);
;// CONCATENATED MODULE: ./Project/In/Components/setters.js

var setParsedItems = function setParsedItems(data) {
  console.log(data);
  window.LocalStorageUtil.set(lcKey, data);
  console.log("Данные установлены:", data);
};
var clearParsedItems = function clearParsedItems() {
  window.LocalStorageUtil["delete"](lcKey);
  console.log("Данные удалены.");
  window.notify("Данные удалены.", 4);
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
  console.log("Добавлен в список:", item);
  window.notify("\u0423\u0441\u043F\u0435\u0445. \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u0441\u043F\u0438\u0441\u043E\u043A: ".concat(item.link));
  setParsedItems([].concat(_toConsumableArray(alreadyParsedItems), [item]));
};
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ./Project/In/Components/UI/buttonConstructor.js



var pageButtonContructor = /*#__PURE__*/_createClass(function pageButtonContructor(btnText, handler, container) {
  _classCallCheck(this, pageButtonContructor);

  var uiButton = document.createElement("button");
  uiButton.innerText = btnText;
  uiButton.addEventListener("click", handler);
  container.insertAdjacentElement("beforeend", uiButton);
});

/* harmony default export */ var buttonConstructor = (pageButtonContructor);
;// CONCATENATED MODULE: ./Project/In/Components/UI/getContainer.js
var getContainer = function getContainer() {
  var container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "10px";
  container.style.left = "10px";
  container.style.zIndex = "9999";
  container.style.padding = "10px";
  container.style.background = "aliceblue";
  container.style.border = "1px solid black";
  container.style.borderRadius = "12px";
  return container;
};

/* harmony default export */ var UI_getContainer = (getContainer);
;// CONCATENATED MODULE: ./Project/In/Components/UI/itemButtons.js





var containerSelector = '[data-widget="webPdpGrid"]';
function initItemButtons() {
  var container = UI_getContainer();
  new buttonConstructor("Спарсить вариант", parseItem, container);
  new buttonConstructor("Очистить все данные", clearParsedItems, container);
  new buttonConstructor("Скопировать все данные", copyParsedItems, container);
  document.body.insertAdjacentElement("beforeend", container);
}
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
;// CONCATENATED MODULE: ./Project/In/Components/checkOnParsing.js




var selectAlreadyParsedItems =
/*async*/
function selectAlreadyParsedItems() {
  var pageItems = collectPageItems();
  var parsedItems = getParsedItems();

  var _loop = function _loop(i) {
    var pageItem = pageItems[i];
    /*await window.sleep(0.1);*/

    if (parsedItems.find(function (item) {
      return item.imgKey === pageItem.imgKey;
    })) {
      pageItem.domEl.parentElement.style.border = itemSelectBorder;
    }
  };

  for (var i = 0; i < pageItems.length; i++) {
    _loop(i);
  }
};

/* harmony default export */ var checkOnParsing = (selectAlreadyParsedItems);
;// CONCATENATED MODULE: ./Project/In/Components/itemsParser.js





var handleData = function handleData() {
  var alreadyParsedItems = getParsedItems();
  console.log("Уже были:", alreadyParsedItems);
  var items = collectPageItems();
  console.log("Товары на странице:", items);
  var filteredItems = items.filter(function (item) {
    return !alreadyParsedItems.find(function (parsedItem) {
      return parsedItem.link === item.link;
    });
  });
  console.log("Новые товары:", filteredItems);
  var allItemsList = filteredItems.concat(alreadyParsedItems);
  console.log("Старые + новые товары:", allItemsList);
  var itemsForSave = deleteDomEl(allItemsList);
  setParsedItems(itemsForSave);
  window.copyToClipboard(handleItems(items).join("\n"), "\u0421\u0441\u044B\u043B\u043A\u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430. ".concat(items.length, " \u0448\u0442."));
  checkOnParsing();
};
;// CONCATENATED MODULE: ./Project/In/Components/UI/productsListButtons.js





var productsListButtons_containerSelector = '[data-widget="column"]';
function initProductsListButtons() {
  var container = UI_getContainer();
  new buttonConstructor("Собрать товары", handleData, container);
  new buttonConstructor("Очистить все данные", clearParsedItems, container);
  new buttonConstructor("Скопировать все данные", copyParsedItems, container);
  document.body.insertAdjacentElement("beforeend", container);
}
;// CONCATENATED MODULE: ./Project/In/index.js





var pageUrl = window.location.href;

if (pageUrl.includes("https://www.ozon.ru/product/")) {
  window.sleep(1).then(function () {
    handleItemVariants();
    initItemButtons();
  });
} else if (pageUrl.includes("https://www.ozon.ru/seller/") || pageUrl.includes("https://www.ozon.ru/brand/")) {
  window.sleep(1).then(function () {
    initProductsListButtons();
  });
}

window.initializeMethods([clearParsedItems, copyParsedItems, downloadParsedItems]);
console.log("Удаление товаров - clearParsedItems()\nСкачать товары - downloadParsedItems()\nКопировать в буфер - copyParsedItems()");
/******/ })()
;