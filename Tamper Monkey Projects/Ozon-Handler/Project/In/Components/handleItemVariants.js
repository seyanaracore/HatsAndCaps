import { itemSelectBorder } from "../Utils/constants";
import { getParsedItems } from "./getters";

const collectVariants = () => [
   ...document.querySelectorAll('[data-widget="webAspects"] img'),
];

const selectVariants = () => {
   const parsedItems = getParsedItems();
   const variants = collectVariants().map((variant) => ({
      domEl: variant,
      imgId: variant.src.split("/").at(-1).split(".")[0],
   }));

   variants.forEach((itemVariant, idx) => {
      if (
         parsedItems.find((parsedItem) =>
            parsedItem.img.includes(itemVariant.imgId)
         )
      ) {
         itemVariant.domEl.parentElement.style.border = itemSelectBorder;
      }
   });
};
export default selectVariants;
