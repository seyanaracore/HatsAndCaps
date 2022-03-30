const lcKey = "yandexMarketLinks"
const getFormattedArticle = (article) => {
   let art = article.split("");

   art.splice(2, 0, "-");
   art.splice(6, 0, "-");
   art.splice(9, 0, "-");

   return art.join("");
};

const getLinks = () => {
   let links = document.querySelectorAll(
      '[data-value="offer-control-market"] a'
   );

   return [...links]
      .filter((link) => link.textContent == "Открыть на Маркете")
      .map((link) => link.href);
};

const getArticles = () => {
   let articles = document.querySelectorAll('[data-e2e="offer-id"]');
   return [...articles].map((article) =>
      getFormattedArticle(article.textContent)
   );
};

const assignLists = (links, articles) => {
   if (links.length !== articles.length) return "Not equal lenght";

   return links.map((link, idx) => {
      return {
         article: articles[idx],
         link,
      };
   });
};

const downloadParsedLinks = (csvContent) => {
   const contentDownload = csvContent ? csvContent : window.LocalStorageUtil.get(lcKey)
   window.download(
      { content: contentDownload, headers: "template" },
      "yandex-market-links",
      "csv"
   );
};
const parseLinks = () => {
   const links = getLinks();
   const articles = getArticles();
   const prevLinks = window.LocalStorageUtil.get(lcKey) || [];

   const assignedLists = [...prevLinks, ...assignLists(links, articles)];

   window.LocalStorageUtil.set(lcKey, assignedLists);

   console.log("parsed: " + assignedLists.length)
}
const clearParsedLinks = () => {
   window.LocalStorageUtil.delete(lcKey)
   console.log("Storage cleared")
}
const getLastArticle = () => {
   console.log(window.LocalStorageUtil.get(lcKey).at(-1).article)
}

window.initializeMethods([parseLinks, clearParsedLinks, downloadParsedLinks, getLastArticle])
console.log(`parseLinks() - спарсить ссылки.
clearParsedLinks() - очистить спаршенные ссылки.
downloadParsedLinks() - скачать спаршенные ссылки.
getLastArticle() - получить последний спаршенный артикул.
`)