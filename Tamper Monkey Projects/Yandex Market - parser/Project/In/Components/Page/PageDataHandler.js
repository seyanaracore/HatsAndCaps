const getItemInfo = () => {
   const name = document.querySelector('[data-tid="c0924aa2"]')?.textContent;
   const color =
      document.querySelector('[data-tid="d44db34b"]')?.textContent || "none";
   const imageLink = document.querySelector(
      '[data-tid="c15635ad 510deb4a"] img'
   )?.src;

   if (!name) return null;

   return { name, color, imageLink };
};

export default getItemInfo;
