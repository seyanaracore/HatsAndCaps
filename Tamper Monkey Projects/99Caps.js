const parseLinks = () => {
   const links = [...document.querySelectorAll(".product.catalog__item")].map(
      (el) => el.href
   );
   window.copyToClipboard(links.join("\n"));
   window.toBottomElement("body");
};

function handler() {
   try {
      const $ = (sel) => document.querySelector(sel);
      const code = $(".product-description__vendor-code").textContent.split(
         ". "
      )[1];
      const title = $(".product-description__title").textContent;
      const brand = $(".product-description__brand").textContent;
      const price = $(
         ".product-description__discounted-price"
      ).textContent.split(" ")[0];
      const inSale = $(".product-description__stock-mark").textContent;
      const imgLink = $(".product-photos__photo").children[1].src;

      return { code, title, brand, price, inSale, imgLink };
   } catch (e) {
      return null;
   }
}
