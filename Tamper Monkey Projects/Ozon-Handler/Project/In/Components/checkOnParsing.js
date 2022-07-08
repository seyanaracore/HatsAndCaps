import { itemSelectBorder } from "../Utils/constants";
import collectItems from "./collectPageItems";
import { getParsedItems } from "./getters";

const selectAlreadyParsedItems = /*async*/ () => {
   const pageItems = collectItems();
   const parsedItems = getParsedItems();

   for (let i = 0; i < pageItems.length; i++) {
      const pageItem = pageItems[i];

      /*await window.sleep(0.1);*/
      if (parsedItems.find((item) => item.imgKey === pageItem.imgKey)) {
         pageItem.domEl.parentElement.style.border = itemSelectBorder;
      }
   }
};
export default selectAlreadyParsedItems;
