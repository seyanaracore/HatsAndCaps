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

const downloadCSV = (csvContent) => {
   window.download(
      { content: csvContent, headers: Object.keys(csvContent[0]) },
      "yandex-market",
      "csv"
   );
};

const links = getLinks();
const articles = getArticles();
const prevLinks = window.LocalStorageUtil.get("yandexMarket") || [];

const assignedLists = [...prevLinks, ...assignLists(links, articles)];

window.LocalStorageUtil.set("yandexMarket", assignedLists);

console.log("parsed: "+ assignedLists.length)