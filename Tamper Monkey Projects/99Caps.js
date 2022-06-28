const handlePageItems = () => {
   const items = document.querySelectorAll(".product.catalog__item");
   const itemsData = [];

   items.forEach((item) => {
      const itemData = {};

      itemData.link = item.href;
      itemData.name = item.children[1].children[0].textContent;
      itemData.price = item.children[1].children[1].textContent;
      itemData.imgLink = item.children[0].children[0].src;

      itemsData.push(itemData);
   });

   return itemsData;
};
const downloadPageItems = () => {
   window.download(
      { content: handlePageItems(), headers: "template" },
      "99caps_New-Era",
      "csv"
   );
};
const dataHandler = () => {
   return {
      vendorCode: document.querySelector(".product-description__vendor-code")
         ?.textContent,
   };
};

window.intializeMethods([dataHandler, downloadPageItems, handlePageItems]);

console.log("Methods: dataHandler, downloadPageItems, handlePageItems");
