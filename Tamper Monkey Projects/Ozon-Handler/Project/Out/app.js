/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

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

var collectItems = function collectItems() {
  return _toConsumableArray(document.querySelectorAll(".widget-search-result-container a.tile-hover-target")).map(function (el) {
    var _el$querySelector;

    return {
      domEl: el,
      link: el.href.split("/?")[0],
      img: (_el$querySelector = el.querySelector("img")) === null || _el$querySelector === void 0 ? void 0 : _el$querySelector.src,
      imgKey: item.img.split("/").at(-1).split(".")[0]
    };
  }).filter(function (item) {
    return item.img;
  });
};

var collectLinks = function collectLinks() {
  return collectItems().map(function (item) {
    delete item.domEl;
    return item;
  });
};

/* harmony default export */ var collectPageItems = (collectLinks);
;// CONCATENATED MODULE: ./Project/In/Utils/constants.js
var lcKey = "ozonItemsList";
;// CONCATENATED MODULE: ./Project/In/Components/getters.js

var getParsedItems = function getParsedItems() {
  return window.LocalStorageUtil.get(lcKey) || [];
};
;// CONCATENATED MODULE: ./Project/In/Components/checkOnParsing.js



var selectAlreadyParsedItems = function selectAlreadyParsedItems() {
  var pageItems = collectItems();
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
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/construct.js


function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}
;// CONCATENATED MODULE: ./Project/In/Components/setters.js

var setParsedItems = function setParsedItems(data) {
  return window.LocalStorageUtil.set(lcKey, data);
};
;// CONCATENATED MODULE: ./Project/In/Components/itemsParser.js






var handleItemsLinksToCopy = function handleItemsLinksToCopy(itemsList) {
  return itemsList.map(function (el) {
    return el.link + "\t" + el.img.replace("/wc250", "");
  });
};

var handleData = function handleData() {
  var items = collectPageItems();
  var alreadyParsedItems = getParsedItems();
  setParsedItems(_toConsumableArray(_construct(Set, _toConsumableArray(items).concat(_toConsumableArray(alreadyParsedItems)))));
  window.copyToClipboard(handleItemsLinksToCopy(data).join("\n"), "\u0421\u0441\u044B\u043B\u043A\u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430. ".concat(items.length, " \u0448\u0442."));
};

var initButtonLinksCollector = function initButtonLinksCollector() {
  var pageHead = document.querySelector('[data-widget="column"]');
  var collectLinksBtn = document.createElement("button");
  collectLinksBtn.innerText = "Собрать ссылки";
  collectLinksBtn.addEventListener("click", handleData);
  pageHead.insertAdjacentElement("beforeend", collectLinksBtn);
};
;// CONCATENATED MODULE: ./Project/In/index.js


window.sleep(1).then(function () {
  checkOnParsing();
  initButtonLinksCollector();
});
/******/ })()
;