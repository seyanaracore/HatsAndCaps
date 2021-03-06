//____________________________________________________________________________________________
// @name         Base methods
// @namespace    https://hatsandcaps.ru/
// @version      1.0
// @match        *://*
// @match        *://*/*
// @match        *://*/*/*
// @match        *://*/*/*/*
// @icon         https://avatars.mds.yandex.net/i?id=d72422cb4c1114a80d464a479f882eb1-5676890-images-thumbs&n=13
//____________________________________________________________________________________________

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
      await sleep(0.5);
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
  const createCSV = ({ content, headers, sep = ";" } = content) => {
    let fileData = `sep=${sep}\n`;

    //Заголовки
    if (headers.length)
      fileData += Array.isArray(headers)
        ? `${headers.join(sep)}\n`
        : `${headers}\n`;

    //Содержание
    content.forEach((item) => {
      //Массив объектов
      for (let value of Object.values(item)) {
        //1 объект = 1 строка
        fileData += `${value}${sep}`; //1 свойство = 1 столбец
      }
      fileData += `\n`;
    });
    return fileData;
  };
  switch (fileFormat) {
    case "txt":
      content = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
      break;
    case "csv":
      content =
        "data:text/plain;charset=utf-8," +
        encodeURIComponent(createCSV(content));
      break;
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
