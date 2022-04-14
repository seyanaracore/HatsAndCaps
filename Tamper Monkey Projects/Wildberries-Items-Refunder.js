// @name         Wildberries Items Refunder
// @namespace    Wildberries
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.wildberries.ru/*
// @icon         chrome://favicon/https://www.wildberries.ru/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Universal%20Parser/Project/Out/app.js
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Wildberries-Items-Refunder.js
// @grant        none

const lcKey = "wbItemsToRefund";
const getSizes = () => {
	const sizes = {};
	document.querySelectorAll(".sizes-list__size").forEach((size) => {
		sizes[size.textContent] = size.parentNode;
	});
	return sizes;
};
const setItemsListToRefund = (itemsList) => {
	return window.LocalStorageUtil.set(lcKey, itemsList);
};
const getItemsToRefund = () => {
	return window.LocalStorageUtil.get(lcKey) || [];
};
const deleteItemsToRefund = () => {
	window.LocalStorageUtil.delete(lcKey);
	console.log(lcKey + " - удалено")
};
const getBuyButton = () =>
	[...document.querySelectorAll(".btn-main")].find(
		(btn) =>
			btn.textContent === "        Добавить в корзину        В корзину    "
	);
const findSize = (SKU) => {
	const itemsList = getItemsToRefund();
	const size = itemsList.find((item) => (item.sku === SKU))?.size || null
	console.log("Size to refund: " + size)
	return size;
};
const getWBSKU = () => document.querySelector("#productNmId").textContent

const deleteItemSize = (SKU, size) => {
	const itemsList = getItemsToRefund();
	const filteredItemsList = itemsList.filter((item) => {
		return item.sku !== SKU && item.size !== size
	})
	console.log("Осталось товаров: " + filteredItemsList.length, filteredItemsList)
	setItemsListToRefund(filteredItemsList);
}

const buyItem = (size) => {
	const WBSKU = getWBSKU();
	const buyButton = getBuyButton()
	deleteItemSize(WBSKU, size)
	buyButton.click()
}

const consoleInfo = `getItemsToRefund() - Получить список товаров;
setItemsListToRefund([{sku, size}]) - Установить список товаров;
deleteItemsToRefund() - Очистить список товаров;`
console.log(consoleInfo)

const dataHandler = () => {
	const WBSKU = getWBSKU();
	const sizes = getSizes();
	const sizeToRefund = findSize(WBSKU);
	if (!findSize || !sizes || !sizes[sizeToRefund]) return null

	sizes[sizeToRefund]?.click();
	buyItem(sizeToRefund)
	return { WBSKU, status: "ok" }
};

window.initializeMethods([dataHandler, getItemsToRefund, setItemsListToRefund, deleteItemsToRefund]);
