// @name         Mucros Parser
// @namespace    Mucros
// @version      2.0
// @description  try to take over the world!
// @author       You
// @match        https://mucrosweavers.ie/*
// @icon         chrome://favicon/http://mucrosweavers.ie/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Mucros-Parser.js
// @grant        none

const getInfo = () => {
   const sizesVariants = ["One Size", "S", "M", "L", "XL", "XXL"];
   const items = document.querySelectorAll(".wp-block-column.products");
   const out = "OUT OF STOCK";
   const getInfo = (items = items) => {
      let info = "";
      items.forEach((item) => {
         if (item.childNodes.length) {
            let imageLink = item.firstChild.href;
            let style = item.childNodes[1].textContent.trim();
            let sizes = [...item.lastChild?.childNodes]
               .filter((size) => size.classList?.contains("size_box"))
               .map((size) => size.lastChild.textContent);
            let sizesStr = "," + sizesVariants.join(); //Заполнение вариантов размеров
            sizes.forEach((size) => {
               sizesStr = sizesStr.replace("," + size, "\t"); //Замена доступных размеров пропуском
            });
            sizesVariants.forEach((size) => {
               sizesStr = sizesStr.replace("," + size, "-\t"); //Замена оставшихся размеров прочерком
            });
            info += `${style}\t${imageLink}\t${sizesStr}\n`;
         }
      });
      return info;
   };
   const headers = ["Name", "ImageLink", ...sizesVariants];
   const itemsInfo = getInfo(items);
   window.copyToClipboard(headers.split("\t") + "\n" + itemsInfo);
};

const addListener = () => {
   document.querySelector("#buttonParser").addEventListener("click", getInfo);
};

const addButton = () => {
   document.querySelector(".wp-block-column > p").innerHTML +=
      "<br><button style='margin-top: 5px; font-weight: bold' id='buttonParser'>Собрать данные о товарах</button>";
};

addButton();
addListener();
