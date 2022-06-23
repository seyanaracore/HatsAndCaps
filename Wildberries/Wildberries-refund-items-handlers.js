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
   .slice(7,999)
   .map((img) => ({
      sku: img.src.split("/").at(-1).split("-")[0],
      size: img.parentNode.children[4]?.textContent.trim() || "Some went wrong",
   }));

window.download(
   { content: items, headers: "template" },
   "6 возврат",
   "csv"
);
