const names = [...document.querySelectorAll(".Table-row__3eDoH6vOWF")].map(
   (row) => row.childNodes[1]
);
const filterNamesBy = (queryName, reverse) => {
   const resultObject = {
      filteredNames: [],
      other: [],
   };
   names.forEach((name) => {
      if (reverse) {
         !name.textContent.includes(queryName)
            ? resultObject.filteredNames.push({
                 domEl: name,
                 text: name.textContent,
              })
            : resultObject.other.push({ domEl: name });
      } else {
         name.textContent.includes(queryName)
            ? resultObject.filteredNames.push({
                 domEl: name,
                 text: name.textContent,
              })
            : resultObject.other.push({ domEl: name });
      }
   });
   return resultObject;
};

const hideOtherItems = async () => {
   for (const item of filteredNamesList.other) {
      await window.sleep(0.2);
      item.domEl.parentElement.style.display = "none";
   }
};
const filteredNamesList = filterNamesBy("2021", true);

