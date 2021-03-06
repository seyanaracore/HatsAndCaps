//Доставленные
const itemsList = [...document.querySelectorAll(".j-open-product-popup")]
   .slice(231, 361)
   .map((el) => ({
      sku: el.getAttribute("data-popup-nm-id"),
      size: el.childNodes[9]?.textContent.trim() || 0,
   }));
window.download(
   { content: itemsList, headers: "template" },
   "1 возврат",
   "csv"
);

//Доставки, вписать нужный слайс

const getItems = (date, startWith = 0) => {
   const items = [
      ...document.querySelectorAll(
         ".delivery-block__content .goods-list-delivery img"
      ),
   ]
      .map((img) => ({
         sku: img.src.split("/").at(-4).split("-")[0],
         size:
            img.parentNode.children[4]?.textContent.trim() || "Some went wrong",
         date: img.parentElement.parentElement.parentElement.children[1]
            .children[0].children[3]?.children[0].textContent,
         el: img,
      }))
      .filter((item) => item.date === date);
   const slicedItems = items.slice(startWith, items.length);
   slicedItems.forEach(
      (item) =>
         (item.el.parentElement.parentElement.style.border = "2px solid black")
   );
   return slicedItems.map((el) => {
      delete el.date;
      delete el.el
      return el;
   });
};

const items = getItems("27.07.2022", 1);
window.download({ content: items, headers: "template" }, "Возврат шляпы 2707", "csv");
