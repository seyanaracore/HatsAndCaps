// @name         Wigens Items Parser
// @namespace    Wigens
// @version      2.0
// @description  try to take over the world!
// @author       You
// @match        https://houseofamandachristensen.com/eur/*
// @icon         chrome://favicon/http://houseofamandachristensen.com
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Universal%20Parser/Project/Out/app.js
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Wigens-Items-Parser.js
// @grant        none

const $ = (sel) => document.querySelectorAll(sel);
const someError = "Some went wrong";

const getVariants = () => {
   const variantsList = [...$(".swatch-option.image")];
   const downloadUrl = $("#download-image")[0].href.split("/");
   const imgBaseUrl =
      downloadUrl.slice(0, downloadUrl.length - 1).join("/") + "/";

   return variantsList.map((color) => {
      return {
         color: color.getAttribute("aria-label"),
         imgLink:
            imgBaseUrl +
            color.style.background
               .match(/\"(.*?)\"/g, "")[0]
               .split("/")
               .at(-1)
               .split(".")[0] +
            ".png",
      };
   });
};

const generateProductsFromVariants = (product) => {
   const products = [];

   product.variants.forEach((variant) => {
      const newProduct = { ...product };
      delete newProduct.variants;
      products.push({
         ...newProduct,
         color: variant.color,
         imgLink: variant.imgLink,
      });
   });

   return products;
};

const dataHandler = () => {
   const productData = {};

   productData.art = $('[data-th="Art.no"]')[0]?.textContent || someError;
   productData.productName =
      $('[data-ui-id="page-title-wrapper"]')[0]?.textContent || someError;

   try {
      productData.variants = getVariants();
   } catch (err) {
      productData.variants = someError;
   }

   productData.sizes = [...$(".swatch-option.text")]
      .map((size) => size?.textContent || someError)
      .join(",");
   productData.country = $('[data-th="Country of origin"]')[0]?.textContent || someError;
   productData.material = $('[data-th="Material"]')[0]?.textContent || someError;
   productData.lining = $('[data-th="Lining"]')[0]?.textContent || someError;

   const products = generateProductsFromVariants(productData);

   return products;
};

const downloadItems = () => {
   const itemsInfo = getItemsData()
      .map((el) => ({ ...el[0], handlingUrl: el.handlingURL }))
      .flat();
   if (!itemsInfo.length) throw new Error("Items data list is empty.");

   window.download(
      { content: itemsInfo, headers: "template" },
      "Wigens",
      "csv"
   );
};

/*
   1. setItemsLinks([])
   2. downloadItems()


   window.initializeMethods([downloadItems])
   startParse(dataHandler)
*/
