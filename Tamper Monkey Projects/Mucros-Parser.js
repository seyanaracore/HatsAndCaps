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
   const itemsInfo = getInfo(items);
   window.copyToClipboard(itemsInfo);
};

const addButton = () => {
   document.querySelector(".wp-block-column > p").innerHTML +=
      "<br><button style='margin-top: 5px; font-weight: bold' onclick='getInfo()'>Собрать данные о товарах</button>";
}

addButton()
