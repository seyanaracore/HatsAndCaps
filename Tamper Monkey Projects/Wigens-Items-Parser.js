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
const config = {
   sleepTime: 3,
};

const getVariants = () => {
   const variantsList = [...$(".swatch-attribute.ac_color .swatch-option")];
   const downloadUrl = $("#download-image")[0].href.split("/");
   const imgBaseUrl =
      downloadUrl.slice(0, downloadUrl.length - 1).join("/") + "/";

   return variantsList.map((color) => {
      const colorImgLink = color.style.background
         .match(/\"(.*?)\"/g, "")?.[0]
         .split("/")
         .at(-1)
         .split(".")[0];
      const generatedFullLink = colorImgLink
         ? imgBaseUrl + colorImgLink + ".png"
         : someError;

      return {
         color: color.getAttribute("aria-label"),
         imgLink: generatedFullLink,
      };
   });
};

const handleVariant = () => {
   const productData = {};
   productData.art = $('[data-th="Art.no"]')[0]?.textContent || someError;
   productData.productName =
      $('[data-ui-id="page-title-wrapper"]')[0]?.textContent || someError;
   productData.imgLink = $("#download-image")[0]?.href || "No image";
   productData.sizes = [...$(".swatch-option.text")]
      .filter((size) => !size.classList.contains("disabled"))
      .map((size) => size?.textContent || someError)
      .join(",");
   productData.country =
      $('[data-th="Country of origin"]')[0]?.textContent || someError;
   productData.material =
      $('[data-th="Material"]')[0]?.textContent || someError;
   productData.lining = $('[data-th="Lining"]')[0]?.textContent || someError;

   return productData;
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

const dataHandler = async () => {
   const variantsList = [...$(".swatch-attribute.ac_color .swatch-option")];
   const variantsData = [];

   for (const variant of variantsList) {
      await window.sleep(0.4);
      variant.click();
      const variantData = handleVariant();
      variantData.color = variant.getAttribute("aria-label");

      variantsData.push(variantData);
   }

   return variantsData;
};
const parsePrice = () => {
   return $(".price").textContent.slice(1,99)
}

const downloadWigens = () => {
   const itemsInfo = getItemsData()
      .map((el) => {
         const items = [];

         Object.keys(el).forEach((item) => {
            if (item !== "handlingURL")
               items.push({ ...el[item], handlingUrl: el.handlingURL });
         });

         return items;
      })
      .flat();

   if (!itemsInfo.length) throw new Error("Items data list is empty.");

   window.download(
      { content: itemsInfo, headers: "template" },
      "Wigens",
      "csv"
   );
};
console.log("downloadWigens() - download parsed items.");

/*
   1. setItemsLinks([])
   2. downloadWigens


   window.initializeMethods([downloadWigens])
   startParse(dataHandler, config)
*/
