// ==UserScript==
// @name         Yandex items info parser
// @namespace    http://goorin.ru/
// @match        https://market.yandex.ru/*
// @icon         chrome://favicon/https://market.yandex.ru/
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function () {
	window.download = (content, fileName, fileFormat) => {
		const defaultSep = ";";
	
		const createCSV = (
			params = { content: null, headers: null, sep: defaultSep }
		) => {
			//Ошибки
			if (!params) throw new Error("props {content, headers, sep}");
			const { content, headers, sep } = params;
			const contentType = Array.isArray(content) ? "array" : typeof content;
	
			if (headers && !Array.isArray(headers)) {
				throw new Error("The headers must be in array format");
			}
			if (!content) {
				throw new Error("Content is empty");
			}
	
			let fileData = `sep=${sep}\n`;
	
			//Заголовки
			if (headers?.length) {
				fileData += headersHandler(headers, sep);
			}
	
			//Содержание
			switch (contentType) {
				case "array": {
					fileData += arrayHandler(content, sep);
					break;
				}
				case "object": {
					fileData += objectHandler(content, sep);
					break;
				}
				default: {
					fileData += content + "\n";
				}
			}
			return fileData;
		};
	
		const objectHandler = (object, sep = defaultSep) => {
			let fileData = "";
			for (let value of Object.values(object)) {
				//1 объект = 1 строка
				fileData += `${value}${sep}`; //1 свойство = 1 столбец
			}
			return fileData + `\n`;
		};
	
		const arrayHandler = (array, sep = defaultSep) => {
			let fileData = "";
			array.forEach((item) => {
				//Массив объектов
				fileData += objectHandler(item, sep);
				fileData += `\n`;
			});
			return fileData;
		};
	
		const headersHandler = (headers, sep = defaultSep) => {
			return `${headers.join(sep)}\n`;
		};
	
		switch (fileFormat) {
			case "txt": {
				content =
					"data:text/plain;charset=utf-8," + encodeURIComponent(content);
				break;
			}
			case "csv": {
				content =
					"data:text/plain;charset=utf-8," +
					encodeURIComponent(
						createCSV({...content})
					);
				break;
			}
		}
	
		let a = document.createElement("a");
		a.style.display = "none";
		a.href = content;
		a.setAttribute("download", fileName + "." + fileFormat);
		a.click();
	};
	window.sleep = (sec = 0.5) => {
		return new Promise((res) => {
			setTimeout(() => res(), sec * 1000);
		});
	};
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
	//Константы
	window.itemsLinksListName = "itemsLinksList";
	window.itemsInfoListName = "itemsInfoList";
	window.initialPage = "https://market.yandex.ru/";
	window.itemsErrorsListName = "itemsErrorsList";
	window.itemsLinksList = window.sleepTime = 3;
	
	try {
		window.$ = jQuery;
	} catch {
		window.sleep(8).then((res) => {
			window.location.href = window.initialPage;
		});
		return;
	}
	
	//Методы
	window.downloadCSV = () => {
		 window.download({content: window.itemsLinksList, headers: Object.keys(window.itemsLinksList)},"result","csv")
	}
	window.toFirstItem = () => {
		window.location.href = window[window.itemsLinksListName][0];
	};
	window.getErrors = () =>
		window.LocalStorageUtil.get(window.itemsErrorsListName) || [];
	window.getItemInfo = () => {
		const name = document.querySelector('[data-tid="c0924aa2"]')?.textContent;
		const color = document.querySelector('[data-tid="d44db34b"]')?.textContent || "none";
	
		if(!name) return null
	
		return { name, color };
	};
	window.clearLinks = () => {
		const isConfrim = confirm("Удалить все ссылки на товары?");
		if (!isConfrim) return;
		window.LocalStorageUtil.delete(window.itemsLinksListName);
		console.log("Ссылки на товары были удалены.");
	};
	
	window.clearInfo = () => {
		const isConfrim = confirm("Удалить всю информацию о товарах?");
		if (!isConfrim) return;
		window.LocalStorageUtil.delete(window.itemsInfoListName);
		console.log("Информация о товарах была очищена.");
	};
	window.clearErrors = () => {
		const isConfrim = confirm("Очистить лог ошибок?");
		if (!isConfrim) return;
		window.LocalStorageUtil.delete(window.itemsErrorsListName);
		console.log("Лог ошибок очищен.");
	};
	
	window.clearAllData = () => {
		window.clearLinks();
		window.clearInfo();
		window.clearErrors();
	};
	
	window.parseInfo = async (link) => {
		await window.sleep(window.sleepTime); //Задержка для загрузки данных и избежания блокировки соединения
		let itemInfo = window.getItemInfo(); //Получение данных о товаре
	
		if (itemInfo) {
			window[window.itemsInfoListName].push({...itemInfo, link}); //Добавить в массив данные о товаре
		}
		window[window.itemsLinksListName].shift(); //Удалить ссылку товара
	
		console.log(itemInfo);
		console.log("Осталось: " + window[window.itemsLinksListName].length);
	
		window.LocalStorageUtil.set(
			//Запись массива ссылок на товары
			window.itemsLinksListName,
			window[window.itemsLinksListName]
		);
		window.LocalStorageUtil.set(
			//Запись массива информации о товарах
			window.itemsInfoListName,
			window[window.itemsInfoListName]
		);
	
		window.toFirstItem();
	};
	
	window.startParse = async () => {
		if (window[window.itemsLinksListName]?.length) {
			//Проврка наличия ссылок на товары
			console.log("Осталось: " + window[window.itemsLinksListName].length);
			await window.parseInfo(window[window.itemsLinksListName][0]);
	
			/*if (window[window.itemsLinksListName][0] == window.location.href) {
				//Сравнение текущей ссылки и ссылки на первый товар
				await window.parseInfo(window[window.itemsLinksListName][0]);
			} if (
				  window.location.href == window.initialPage ||
				  window.location.href != window[window.itemsLinksListName][0]
				) else {
				window.toFirstItem();
			}*/
		} else {
			//Если ссылок нет
			window[window.itemsLinksListName] = prompt(
				//Запросить список
				"Список ссылок пуст. Введите их через запятую:"
			);
	
			if (window[window.itemsLinksListName]?.length) {
				//Если ссылки введены
				//Форматирование, обработка введённых данных
				window[window.itemsLinksListName] = window[
					window.itemsLinksListName
				].replace(" ", "");
				window[window.itemsLinksListName] =
					window[window.itemsLinksListName].split(",");
				window[window.itemsLinksListName] = [
					...new Set(window[window.itemsLinksListName]),
				];
				//Запись в хранилище ссылок на товары
				window.LocalStorageUtil.set(
					window.itemsLinksListName,
					window[window.itemsLinksListName]
				);
				window.toFirstItem(); //Переход к первому товару
				//window.location.href = window.initialPage;
			}
		}
	};
	//Инциализация
	
	//Получение списка ссылок на товары
	window[window.itemsLinksListName] = window.LocalStorageUtil.get(
		window.itemsLinksListName
	);
	//Получение списка информации о товарах
	window[window.itemsInfoListName] =
		window.LocalStorageUtil.get(window.itemsInfoListName) || [];
	//Вывод информации в консоль
	console.log(`
		"clearAllData()" - очистить данные.
		"clearInfo()" - очистить информацию о товарах.
		"clearLinks()" - очистить ссылки на товары.
		"startParse()" - запуск парсинга.
		"getErrors()" - получить ошибочные артикула
		"${window.itemsLinksListName}" - ссылки на товары.
		"${window.itemsInfoListName}" - информация о товарах.
		`);
	//Парсинг
	//window.clearAllData()
	//window.sleep(2).then(()=>window.startParse())
	//window.startParse();
	//console.log(window.itemsInfoList)
	//console.log(window.getErrors())
	window.downloadCSV()
	})();
	