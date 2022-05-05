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

const items = [...document.querySelectorAll(".goods-list-delivery img")]
   .slice(10, 900)
   .map((img) => ({
      sku: img.src.split("/").at(-1).split("-")[0],
      size: img.parentNode.childNodes[5]?.textContent.trim() || 0,
   }));

window.download(
   { content: items, headers: "template" },
   "3 возврат",
   "csv"
);
