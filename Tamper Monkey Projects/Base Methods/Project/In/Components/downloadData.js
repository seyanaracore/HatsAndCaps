import createCSV from "./createCSV.js";

const download = (content, fileName, fileFormat) => {
   if (!content || !fileName || !fileFormat) {
      throw new Error("Need all arguments");
   }
   let data = content;

   switch (fileFormat) {
      case "txt": {
         data = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
         break;
      }
      case "csv": {
         data =
            "data:text/plain;charset=ANSI," +
            encodeURIComponent(createCSV({ ...content }));
         break;
      }
   }

   let a = document.createElement("a");
   a.style.display = "none";
   a.href = data;
   a.setAttribute("download", fileName + "." + fileFormat);
   a.click();
};

export default download;
