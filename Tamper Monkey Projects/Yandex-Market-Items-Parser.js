// @name         Yandex Market Items Parser
// @namespace    Yandex-Market
// @version      1.0
// @match        https://market.yandex.ru/*
// @icon         chrome://favicon/https://market.yandex.ru/
// @description  Market Parser
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Yandex%20Market%20-%20parser/Project/Out/app.js
// @require		  https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Yandex-Market-Items-Parser.js
// @grant        none

const config = {
	validatePageUrl: false
}

const dataHandler = () => {
	const name = document.querySelector('[data-tid="c0924aa2"]')?.textContent;
	const color =
		document
			.querySelector('[data-tid="d44db34b"]')
			?.textContent?.replace("Цвет товара:", "") || "none";
	const imageLink = document.querySelector(
		'[data-tid="c15635ad 510deb4a"] img'
	)?.src;

	if (!name) return null;

	return { name, color, imageLink };
};

window.initializeMethods([dataHandler]);
window.initializeVariables([{ name: "config", value: config }])
