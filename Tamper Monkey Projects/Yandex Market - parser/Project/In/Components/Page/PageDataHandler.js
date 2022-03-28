const getItemInfo = () => {
   const name = document.querySelector('[data-tid="c0924aa2"]')?.textContent;
   const color =
      document.querySelector('[data-tid="d44db34b"]')?.textContent || "none";

   if (!name) return null;

   return { name, color };
};

export default getItemInfo;
