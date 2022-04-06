window.sleep = (sec = 0.5) => {
   return new Promise((res) => {
      setTimeout(() => res(), sec * 1000);
   });
};
window.LocalStorageUtil = {
   get(key = null) {
      if (!key) return;
      try {
         return JSON.parse(localStorage.getItem(key));
      } catch (error) {
         console.error(error);
      }
   },
   set(key = null, value) {
      if (!key) return;
      localStorage.setItem(key, JSON.stringify(value));
   },
   delete(key = null) {
      if (!key) return;
      localStorage.removeItem(key);
   },
};
window.download = (content, fileName, fileFormat) => {
   const createCSV = ({ content, headers, sep = ";" } = content) => {
      let fileData = `sep=${sep}\n`;

      //Заголовки
      if (headers.length) {
         fileData += Array.isArray(headers)
            ? `${headers.join(sep)}\n`
            : `${headers}\n`;
      }

      //Содержание
      content.forEach((item) => {
         //Массив объектов
         for (let value of Object.values(item)) {
            //1 объект = 1 строка
            fileData += `${value}${sep}`; //1 свойство = 1 столбец
         }
         fileData += `\n`;
      });
      return fileData;
   };
   switch (fileFormat) {
      case "txt":
         content =
            "data:text/plain;charset=utf-8," + encodeURIComponent(content);
         break;
      case "csv":
         content =
            "data:text/plain;charset=utf-8," +
            encodeURIComponent(createCSV(content));
         break;
   }

   let a = document.createElement("a");
   a.style.display = "none";
   a.href = content;
   a.setAttribute("download", fileName + "." + fileFormat);
   a.click();
};

const items = document.querySelectorAll(".goods-list-delivery__item");

const parseItems = async (items) => {
   const itemsData = [];

   for (let item of [...items]) {
      const price =
         item.childNodes[1].childNodes[3].childNodes[1].childNodes[1]
            .textContent;
      item.childNodes[1].childNodes[1].click();
      await window.sleep(0.5);

      const link = document.querySelectorAll(".btn-base")[2]?.href;
      const imageLink = document.querySelector(
         ".photo-zoom__preview.j-zoom-preview"
      )?.src;
      const size = document.querySelector(".sizes-list__size")?.textContent;
      const color = document.querySelector(".color")?.textContent;
      const material =
         document.querySelector('[data-link="text{:product^consist}"]')
            ?.textContent || "-";
      const id = document.querySelector("#productNmId")?.textContent;
      const name = document
         .querySelector(".same-part-kt__header.j-product-title")
         ?.textContent?.trim();

      itemsData.push({
         id,
         name,
         link,
         size,
         color,
         material,
         imageLink,
         price,
      });
      document.querySelector(".j-close.popup__close.close").click();
   }
   console.log("finish");
   return itemsData;
};
const itemsData = await parseItems(items);

if (itemsData.length) {
   window.LocalStorageUtil.set("wbcartitems", itemsData);
   window.download(
      {
         content: itemsData,
         headers: Object.keys(itemsData[0]),
      },
      "wb-cart",
      "csv"
   );
}
