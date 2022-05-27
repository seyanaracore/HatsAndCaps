export const collectItems = () =>
   [
      ...document.querySelectorAll(
         ".widget-search-result-container a.tile-hover-target"
      ),
   ]
      .map((el) => ({
         domEl: el,
         link: el.href.split("/?")[0],
         img: el.querySelector("img")?.src,
      }))
      .filter((item) => item.img)
      .map((item) => ({
         ...item,
         imgKey: item.img.split("/").at(-1).split(".")[0],
      }));

const collectLinks = () =>
   collectItems().map((item) => {
      delete item.domEl;

      return item;
   });

export default collectLinks;
