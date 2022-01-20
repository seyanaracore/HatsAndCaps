window.sleep = (sec = 0.5) => {
  return new Promise((res) => {
    setTimeout(() => res(), sec * 1000);
  });
};
//Константы
window.articlesListName = "articlesList";
window.articlesErrorsListName = "articlesErrorsList";
window.itemsLinksListName = "itemsLinksList";
window.initialPage = "https://preorder.fwshats.de/en/catalogsearch/";
window.sleepTime = 3;
try {
  window.$ = jQuery;
} catch {
  window.sleep(8).then((res) => {
    window.location.href = window.initialPage;
  });
  return;
}
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
//Методы
window.search = (value) => {
  if (value) {
    window.location.href =
      "https://preorder.fwshats.de/en/catalogsearch/result/?q=" + value;
  } else {
    console.error("No value for search");
  }
};
window.download = (content, fileName, fileFormat) => {
  switch (fileFormat) {
    case "txt":
      content = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
      break;
    case "png":
      content = content.toDataURL("image/webp");
      break;
  }

  let a = document.createElement("a");
  a.style.display = "none";
  a.href = content;
  a.setAttribute("download", fileName + "." + fileFormat);
  a.click();
};
window.downloadLinks = () => {
  window.download(window.itemsLinksList.join(),"itemsLinks", "txt")
}
window.parseLinks = async () => {
  const itemLink = window.$(".catalog-grid-item__link")[0].href;
  window.articlesList.shift();
  if (itemLink) {
    window.itemsLinksList.push(itemLink);

    window.LocalStorageUtil.set(window.articlesListName, window.articlesList);
    window.LocalStorageUtil.set(
      window.itemsLinksListName,
      window.itemsLinksList
    );
  } else {
    let articlesErrorsList =
      window.LocalStorageUtil.get(window.articlesErrorsListName) || [];

    articlesErrorsList = [...new Set(articlesErrorsList)];
    articlesErrorsList.push(window.location.href.split("q=")[1]);

    window.LocalStorageUtil.set(
      window.articlesErrorsListName,
      articlesErrorsList
    );
  }
  await window.sleep(window.sleepTime);
  window.search(window.articlesList[0]);
};
window.clearArticles = () => {
  window.LocalStorageUtil.delete(window.articlesListName);
  console.log("Articles deleted");
};
//____________
window.articlesList = window.LocalStorageUtil.get(window.articlesListName);
window.itemsLinksList =
  window.LocalStorageUtil.get(window.itemsLinksListName) || [];
window.linkArticle = window.location.href.split("q=")[1];

if (window.articlesList?.length) {
  console.log(
    window.articlesList[0],
    "Осталось: " + window.articlesList.length
  );
  if (window.articlesList[0] == window.linkArticle) {
    window.parseLinks();
  } /*if (window.location.href == window.initialPage)*/ else {
    window.search(window.articlesList[0]);
  }
} else {
  window.articlesList = prompt(
    "Список артикулов пуст. Введите их через запятую"
  );

  if (window.articlesList.length) {
    window.articlesList = window.articlesList.replace(" ", "");
    window.articlesList = window.articlesList.split(",");
    window.articlesList = [...new Set(window.articlesList)];

    window.LocalStorageUtil.set(window.articlesListName, window.articlesList);
    window.search(window.articlesList[0]);
  }
}
