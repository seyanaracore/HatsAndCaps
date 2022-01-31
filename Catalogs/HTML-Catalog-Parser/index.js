//To <head> tag HTML
//<script src="./settings.js" defer></script>
//<script src="./components/getHeaders.js" defer></script>
//<script src="./utils/createCSV.js" defer></script>
//<script src="./index.js" defer></script>

const getMaterial = (item) => {
  let nextDomElement = item.nextSibling;
  while (!nextDomElement.textContent.includes(materialsSeparator)) {
    nextDomElement = nextDomElement.nextSibling;
  }
  let material = nextDomElement.textContent;
  return material.trim();
};

const getItemsInfo = (itemsHeaders) => {
  let itemsList = [];
  itemsHeaders.forEach((item) => {
    let itemObject = {};
    //table content
    itemObject.header = item.textContent.replace(/\[.*\]/,"").replace("\n", "").replace(`\t`, "").trim();
    itemObject.materials = getMaterial(item).replace(/\[.*\]/,"").replace("\n", "").replace(`\t`, "").trim();

    itemsList.push(itemObject);
  });
  return itemsList;
};

//const itemsHeaders = getItemsHeadersBySelector(headersClassList)

const itemsHeaders =
  parseBy === "styles"
    ? getItemsHeadersByStyles(parsingTypes[parseBy].stylesVariantsList, parsingTypes[parseBy].selector)
    : getItemsHeadersBySelector(parsingTypes[parseBy]);
const items = getItemsInfo(itemsHeaders);

console.log(items);

const fileData = createFile(items, headers);
downloadFile(fileData, fileName, fileFormat);
