// ==UserScript==
// @name         BrandBoom
// @namespace    https://www.brandboom.com/*
// @version      1.0
// @match        https://www.brandboom.com/*
// @icon         chrome://favicon/http://www.brandboom.com/
// @require       https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Other/BaseMethods.js
// ==/UserScript==

window.deleteItems = () => window.LocalStorageUtil.delete(window.localStrName);
window.LocalStorageUtil = {
  get(key = null) {
    if (!key) return;
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.error(error);
    }
  },
  set(key = null, value) {
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(value));
  },
  delete(key = null) {
    if (!key) return;
    localStorage.removeItem(key);
  },
};
window.copyToClipboard = (string) => {
  let area = document.createElement("textarea");
  document.body.appendChild(area);
  area.value = string;
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
  console.log("copied");
};
window.sleep = (sec = 0.5) => {
  return new Promise((res) => {
    setTimeout(() => res(), sec * 1000);
  });
};
window.selectAllCartItems = () =>
  document
    .querySelectorAll(".cb-orderline.d-print-none")
    .forEach((btn) => btn.click());
window.clearCart = async () => {
  window.selectAllCartItems();
  await window.sleep(0.2);
  document.querySelector(".primary-btn.btn.btn-white.order-only").click();
  await window.sleep(1);
  document.querySelector(".modal-footer > .btn").click();
  window.deleteItems();
};
window.getBtns = () => {
  let products = [...document.querySelectorAll(".product")].filter(
    (product) => !product.classList.contains("ordered")
  );
  let btns = products
    .map((product) => product.lastChild.lastChild.lastChild.lastChild)
    .filter((btn) => !btn.hasAttribute("disabled"))
    .filter((btn) => btn.style.display != "none");
  return btns;
};
window.parseItem = async () => {
  window.itemsInfo += await window.getItemInfo();
  window.LocalStorageUtil.set(window.localStrName, window.itemsInfo);
};
window.parseAll = async () => {
  let btns = window.getBtns();
  let btnsCounter = 0;
  while (btns.length) {
    for (let btn of btns) {
      if (btnsCounter % 4 == 0) document.documentElement.scrollTop += 350;
      await window.sleep(window.sleepTime);
      window.itemsInfo += await window.getItemInfo(btn);
      btn.click();
      btnsCounter += 1;
    }
    btns = window.getBtns();
  }
  window.LocalStorageUtil.set(window.localStrName, window.itemsInfo);
  console.log("finished");
};
window.getItemInfo = async (btn) => {
  btn.parentElement.parentElement.parentElement.childNodes[2].lastElementChild.lastElementChild.childNodes[0].click();
  await window.sleep(window.sleepTime);
  let closeBtn = document.querySelector("#product-review-widget .modal-close");
  let style = "-";
  let sex = "-";
  let category = "-";
  let material = "-";
  let name = "-";
  let season = "-";
  let sizes = "-";
  let color = "-";
  let description = "-";
  let imageLink = "-";
  let priceLocal = "-";
  let priceRetail = "-";
  try {
    imageLink = document.querySelector("#pr-viewer-box img")?.src;
    if (!imageLink) throw new Error();
  } catch (e) {
    await window.sleep(3);
    imageLink = document.querySelector("#pr-viewer-box img").src;
  }
  style = document.querySelector(".product-style div")?.textContent || "-";
  sex = document.querySelector(".product-type div")?.textContent || "-";
  category =
    document.querySelector(".product-category div")?.textContent || "-";
  priceLocal =
    document
      .querySelector(".product-price .original")
      ?.textContent.replace(/[^0-9.]/g, "")
      .replace(".", ",") || "-";
  priceRetail =
    document
      .querySelector(".product-price .product-retail")
      ?.textContent.replace(/[^0-9.]/g, "")
      .replace(".", ",") || "-";
  material = document.querySelector(".product-vendor div")?.textContent || "-";
  name = document.querySelector(".pr-title").textContent || "-";
  season = document.querySelector(".product-season div")?.textContent || "-";
  sizes = document.querySelector(".product-size div")?.textContent || "-";
  color = document.querySelector(".product-options div")?.textContent || "-";
  description =
    document.querySelector(".product-description div")?.textContent || "-";
  let itemInfo = `${imageLink}\t${style}\t${name}\t${color}\t${category}\t${sex}\t${season}\t${material}\t${priceLocal}\t${priceRetail}\t${sizes}\t${description}\n`;
  closeBtn.click();
  return itemInfo;
};
window.getExcel = () => {
  window.copyToClipboard(window.LocalStorageUtil.get(window.localStrName));
};

window.columns = [
  "ImageLink",
  "Style",
  "Name",
  "Color",
  "Category",
  "Sex",
  "Season",
  "Material",
  "Price",
  "Price Retail",
  "Sizes",
  "Description",
];
window.itemsInfo =
  window.LocalStorageUtil.get(window.localStrName) ||
  window.columns.join("\t") + "\n";
window.sleepTime = 0.5;
window.localStrName = "itemsInfo";

console.log(
  `"clearCart()" в корзине, для её очистки;
"parseAll()" парсинг 1 блока в зоне видимости;
"parseItem()" парсинг и запись 1 открой вещи;
"getExcel()" получение конечной информации;
`
);
