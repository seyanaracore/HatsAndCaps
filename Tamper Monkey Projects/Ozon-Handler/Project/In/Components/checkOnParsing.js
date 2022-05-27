import collectItems from "./collectPageItems";
import { getParsedItems } from "./getters";

const selectAlreadyParsedItems = () => {
   const pageItems = collectItems();
   const parsedItems = getParsedItems();

   pageItems.forEach((pageItem) => {
      if (parsedItems.find((item) => item.imgKey === pageItem.imgKey)) {
         pageItem.domEl.parentElement.style.border = "2px solid black";
      }
   });
};
export default selectAlreadyParsedItems;
