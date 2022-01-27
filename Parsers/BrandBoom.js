window.$ = (selector) => document.querySelector(selector);

window.deleteItems = () => window.LocalStorageUtil.delete(window.localStrName);

window.selectAllCartItems = () => {
  return document
    .querySelectorAll(".cb-orderline.d-print-none")
    .forEach((btn) => btn.click());
};

window.clearCart = async () => {
  window.selectAllCartItems();
  await window.sleep(0.2);
  window.$(".primary-btn.btn.btn-white.order-only").click();
  await window.sleep(1);
  window.$(".modal-footer > .btn").click();
  window.deleteItems();
};

window.getBtns = () => {
  let products = [...window.$All(".product")].filter(
    (product) => !product.classList.contains("ordered")
  );
  let btns = products
    .map((product) => product.lastChild.lastChild.lastChild.lastChild)
    .filter((btn) => !btn.hasAttribute("disabled"))
    .filter((btn) => btn.style.display != "none");
  return btns;
};

window.parseItem = async () => {
  const itemObj = await window.getItemInfo();
  let itemObjString = "";
  for (let prop in itemObj) {
    itemObjString += itemObj[prop] + `\t`;
  }
  window.itemsInfo += itemObjStringl;
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
  if (btn) {
    btn.parentElement.parentElement.parentElement.childNodes[2].lastElementChild.lastElementChild.childNodes[0].click();
  }

  await window.sleep(window.sleepTime);
  let closeBtn = window.$("#product-review-widget .modal-close")
  const itemInfoObj = {};
  //Parse info
  try {
    itemInfoObj.imageLink = window.$("#pr-viewer-box img")?.src;
    if (!itemInfoObj.imageLink) throw new Error();
  } catch (e) {
    await window.sleep(3);
    itemInfoObj.imageLink = window.$("#pr-viewer-box img").src;
  }

  itemInfoObj.style = window.$(".product-style div")?.textContent || "-";
  itemInfoObj.sex = window.$(".product-type div")?.textContent || "-";
  itemInfoObj.category = window.$(".product-category div")?.textContent || "-";
  itemInfoObj.priceLocal =
    window
      .$(".product-price .original")
      ?.textContent.replace(/[^0-9.]/g, "")
      .replace(".", ",") || "-";
  itemInfoObj.priceRetail =
    window
      .$(".product-price .product-retail")
      ?.textContent.replace(/[^0-9.]/g, "")
      .replace(".", ",") || "-";
  itemInfoObj.material = window.$(".product-vendor div")?.textContent || "-";
  itemInfoObj.name = window.$(".pr-title").textContent || "-";
  itemInfoObj.season = window.$(".product-season div")?.textContent || "-";
  itemInfoObj.sizes = window.$(".product-size div")?.textContent || "-";
  itemInfoObj.color = window.$(".product-options div")?.textContent || "-";
  itemInfoObj.description =
    window.$(".product-description div")?.textContent || "-";

  closeBtn.click();
  return itemInfoObj;
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
"getItemInfo()" вывод информации о товаре в консоль;
"getExcel()" получение конечной информации;
`
);
