//Утилиты
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
window.sleep = (sec = 0.5) => {
  return new Promise((res) => {
    setTimeout(() => res(), sec * 1000);
  });
};
window.createCSV = ({ content, headers, handler } = content) => {
  const sep = ";";
  let fileData = `sep=${sep}\n`;

  //Заголовки
  if (headers.length) {
    if (Array.isArray(headers)) {
      //Массив заголовков = первая строка
      fileData += `${headers.join(sep)}\n`;
    } else {
      //Строка заголовков
      fileData += `${headers}\n`;
    }
  }

  //Содержание
  content.forEach((item) => {
    //Массив объектов
    for (value of Object.values(item)) {
      //1 объект = 1 строка
      fileData += `${value}${sep}`; //1 свойство = 1 столбец
    }
    fileData += `\n`;
  });
  return fileData;
};
window.download = (content, fileName, fileFormat) => {
  switch (fileFormat) {
    case "txt":
      content = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
      break;
    case "csv":
      content =
        "data:text/plain;charset=utf-8," +
        encodeURIComponent(window.createCSV(content));
      break;
  }

  let a = document.createElement("a");
  a.style.display = "none";
  a.href = content;
  a.setAttribute("download", fileName + "." + fileFormat);
  a.click();
};
//Константы
window.itemsLinksListName = "itemsLinksList";
window.itemsInfoListName = "itemsInfoList";
window.initialPage = "https://preorder.fwshats.de/en/catalogsearch/";
window.itemsErrorsListName = "itemsErrorsList";
window.sleepTime = 3;

try {
  window.$ = jQuery;
} catch {
  window.sleep(8).then((res) => {
    window.location.href = window.initialPage;
  });
  return;
}

//Методы
window.toFirstItem = () => {
  window.location.href = window[window.itemsLinksListName][0];
};
window.getErrors = () =>
  window.LocalStorageUtil.get(window.itemsErrorsListName) || [];
window.getItemInfo = () => {
  //RegExp
  const onlyNumReg = /[^0-9]/g;
  const onlySymReg = /[^0-9.]/g;

  //Методы
  const toCamelCase = (string) => {
    string = string.split(" ");
    string = string.map((word, idx) => {
      word = word.split("");
      idx === 0
        ? (word[0] = word[0].toLowerCase())
        : (word[0] = word[0].toUpperCase());
      return word.join("");
    });
    return string.join("");
  };
  const getImageLink = () => {
    let link =
      window
        .$(".zoomWindowContainer > div")[0]
        ?.style.backgroundImage.split('"')[1]
        ?.split("/") || "-";
    if (Array.isArray(link)) {
      link.pop();
      return link.join("/") + "/";
    } else {
      return null;
    }
  };
  const getVariants = () => {
    const imageLink = getImageLink();

    const variants = [];
    if (imageLink) {
      [...window.$(".gallery-slick__thumb")].forEach((variant) => {
        const color = variant.lastElementChild.textContent
          .replace("\n", "")
          .trim();
        const colorImageLink =
          imageLink + variant.firstElementChild.src.split("/").at(-1);

        variants.push({
          color: color,
          imageLink: colorImageLink,
        });
      });
    } else {
      [...$("[option-attr-code='color_name']")].forEach((variant) => {
        const color = variant.getAttribute("option-label");
        variants.push({
          color: color,
          imageLink: "no photos",
        });
      });
    }
    return variants.length ? variants : null;
  };
  const getItemProps = () => {
    const itemPropsHeadersElements = [
      ...window.$(".product-view__property-label"),
    ];
    if (!itemPropsHeadersElements.length) return null

    let itemProps = {};

    itemPropsHeadersElements.forEach((prop) => {
      const propName = prop?.textContent?.trim() || "error"
      const propContent = prop?.nextSibling?.nextSibling?.textContent?.trim() || "error"

      if (propName.toLowerCase() == "care instructions") return;

      itemProps[propName] = propContent;
    });
    return itemProps;
  };
  const getName = () => {
    return (
      window.$("[itemprop='name']")[0]?.textContent?.replace("\n", "").trim() ||
      null
    );
  };
  const getPreOrderPrice = () => {
    return (
      window
        .$(".price__value.price__value--special .price")[0]
        ?.textContent.replace(onlySymReg, "") || null
    );
  };
  const getSizes = () => {
    const sizes = [...window.$("[option-attr-code='size']")].map(
      (size) => size?.textContent || "error"
    );
    return sizes.length ? sizes : null;
  };

  //Данные
  const variants = getVariants();
  const preOrderPrice = getPreOrderPrice();
  const name = getName();
  const sizes = getSizes();
  const itemProps = getItemProps();
  if (!variants || !preOrderPrice || !name || !sizes || !itemProps) {
    let itemsErrorsList = window.getErrors();

    itemsErrorsList = [...new Set(itemsErrorsList)];
    itemsErrorsList.push(window.location.href.split("-").at(-1));

    window.LocalStorageUtil.set(itemsErrorsList, window.itemsErrorsListName);
    console.log("New Error!!!", itemsErrorsList.length)
    return null;
  }

  let itemInfo = {
    variants,
    preOrderPrice,
    name,
    sizes,
  };

  //Декомпозиция свойств товара
  for (let prop in itemProps) {
    let name = toCamelCase(prop);
    itemInfo[name] = itemProps[prop]?.replace(/; /g, " - ").trim();
  }
  return itemInfo;
};
window.downloadCSV = () => {
  const getHeaders = (items) => {
    let headers = [];
    items.forEach((item) => {
      for (let key of Object.keys(item)) {
        //for(let key in item) {
        if (!headers.includes(key)) headers.push(key);
      }
    });
    return headers.sort();
  };
  const toUniqType = (items) => {
    const generateObject = (headers, object) => {
      let obj = {};
      headers.forEach((header) => {
        obj[header] = object[header] || "-";
      });
      return obj;
    };
    return items.map((object) => {
      return generateObject(headers, object);
    });
  };
  const transposeItemsProp = (items, prop) => {
    let transposedItemsList = [];

    items.forEach((item) => {
      if (!item.hasOwnProperty(prop)) return;

      item[prop].forEach((arrElement) => {
        let obj = { ...item };
        delete obj[prop];

        for (element in arrElement) {
          obj[element] = arrElement[element];
        }

        transposedItemsList.push(obj);
      });
    });
    return transposedItemsList;
  };

  let items = transposeItemsProp(window[window.itemsInfoListName], "variants");
  let headers = getHeaders(items);
  items = toUniqType(items);

  window.download({ content: items, headers }, "result", "csv");
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
}

window.clearAllData = () => {
  window.clearLinks();
  window.clearInfo();
  window.clearErrors()
};

window.parseInfo = async () => {
  await window.sleep(window.sleepTime); //Задержка для загрузки данных и избежания блокировки соединения
  let itemInfo = window.getItemInfo(); //Получение данных о товаре

  if (itemInfo) {
    window[window.itemsInfoListName].push(itemInfo); //Добавить в массив данные о товаре
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

    if (window[window.itemsLinksListName][0] == window.location.href) {
      //Сравнение текущей ссылки и ссылки на первый товар
      await window.parseInfo();
    } /*if (
          window.location.href == window.initialPage ||
          window.location.href != window[window.itemsLinksListName][0]
        )*/ else {
      window.toFirstItem();
    }
  } else {
    //Если ссылок нет
    window[window.itemsLinksListName] = prompt(
      //Запросить список
      "Список ссылок пуст. Введите их через запятую:"
    );

    if (window[window.itemsLinksListName].length) {
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
window.startParse();
