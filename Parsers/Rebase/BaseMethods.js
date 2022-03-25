// ==UserScript==
// @name         Base methods
// @namespace    https://hatsandcaps.ru/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        *://*
// @match        *://*/*
// @match        *://*/*/*
// @match        *://*/*/*/*
// @icon         https://avatars.mds.yandex.net/i?id=d72422cb4c1114a80d464a479f882eb1-5676890-images-thumbs&n=13
// @grant        none
// ==/UserScript==

(function() {
	window.sleep = (sec = 0.5) => {
	  return new Promise((res) => {
		 setTimeout(() => res(), sec * 1000);
	  });
	};
	window.toBottomElement = async (elementSelector = "html", offset = 0) => {
	  const element = document.querySelector(elementSelector);
	  return new Promise(async (res) => {
		 let actualScroll = 1;
		 let maxScroll = 0;
		 while (actualScroll != maxScroll) {
			await window.sleep(0.5);
			actualScroll = element.scrollTop;
			element.scrollTop += 9999;
			maxScroll = element.scrollTop;
		 }
		 element.scrollTop -= offset;
		 res();
	  });
	};
	window.copyToClipboard = (string) => {
	  let area = document.createElement("textarea");
	  document.body.appendChild(area);
	  area.value = string;
	  area.select();
	  document.execCommand("copy");
	  document.body.removeChild(area);
	  console.log("\ncopied");
	};
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
	})();