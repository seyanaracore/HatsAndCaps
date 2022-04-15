// @name         Wildberries Cart Cleaner
// @namespace    Wildberries
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.wildberries.ru/*
// @icon         chrome://favicon/https://www.wildberries.ru/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Wildberries-Cart-Cleaner.js
// @grant        none

const clearCart = async () => {
	const btns = [...document.querySelectorAll(".btn__del.j-basket-item-del")]
	for (const btn of btns) {
		await window.sleep(0.5)
		btn.click()
	}
}

console.log("clearCart() - чтобы очистить корзину");

window.initializeMethods([clearCart]);
