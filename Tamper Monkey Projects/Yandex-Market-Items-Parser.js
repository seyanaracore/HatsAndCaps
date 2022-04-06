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
