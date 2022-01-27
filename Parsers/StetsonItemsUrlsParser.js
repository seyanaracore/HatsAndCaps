//____________________________________________________________________________________________
// @name         Stetson items urls parser
// @namespace    http://goorin.ru/
// @match        https://preorder.fwshats.de/en/*
// @icon         chrome://favicon/http://preorder.fwshats.de/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Parsers/StetsonItemsUrlsParser.js
//____________________________________________________________________________________________

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
//Методы
window.search = (value) => {
  if (value) {
    window.location.href =
      "https://preorder.fwshats.de/en/catalogsearch/result/?q=" + value;
  } else {
    console.error("No value for search");
  }
};

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
