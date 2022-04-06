const config = {
   validatePageUrl: true,
};
const dataHandler = () => {
   const itemLink = document.querySelectorAll(".catalog-grid-item__link")[0]
      ?.href;
   if (!itemLink) return null;
   return { itemLink };
};
window.initializeMethods([dataHandler]);
window.initializeVariables([{ name: "config", value: config }]);
