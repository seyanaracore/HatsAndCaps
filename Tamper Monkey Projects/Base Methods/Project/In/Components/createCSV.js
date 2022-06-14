const defaultSep = ";";

export const createCSV = (params = { content, headers, sep }) => {
   //Ошибки
   if (!params) throw new Error("props {content, headers, sep}");
   const { content } = params;
   const sep = params.sep ? params.sep : defaultSep;
   let { headers } = params;

   const contentType = Array.isArray(content) ? "array" : typeof content;

   if (
      (headers === "template" && contentType === "array") ||
      contentType === "object"
   ) {
      if (!(typeof content[0] === "object" || typeof content === "object")) {
         throw new Error("For template headers need a object");
      }
      headers =
         contentType === "array"
            ? Object.keys(content[0])
            : Object.keys(content);
   } else if (headers && !Array.isArray(headers)) {
      throw new Error("The headers must be in array format");
   }

   if (!content) {
      throw new Error("Content is empty");
   }

   let fileData = `sep=${sep}\n`;

   //Заголовки
   if (headers?.length) {
      fileData += headersHandler(headers, sep);
   }

   //Содержание
   switch (contentType) {
      case "array": {
         fileData += arrayHandler(content, sep);
         break;
      }
      case "object": {
         fileData += objectHandler(content, sep);
         break;
      }
      default: {
         fileData += content + "\n";
      }
   }
   return fileData;
};

const objectHandler = (object, sep = defaultSep) => {
   let fileData = "";
   for (let value of Object.values(object)) {
      //1 объект = 1 строка
      fileData += `${value}${sep}`; //1 свойство = 1 столбец
   }
   return fileData + `\n`;
};

const arrayHandler = (array, sep = defaultSep) => {
   let fileData = "";
   array.forEach((item) => {
      //Массив объектов
      fileData += typeof item === "object" ? objectHandler(item, sep) : item;
   });
   fileData += `\n`;
   return fileData;
};

const headersHandler = (headers, sep = defaultSep) => {
   return `${headers.join(sep)}\n`;
};

export default createCSV;
