//To <head> tag HTML
//<script src="./settings.js" defer></script>
//<script src="./utils/createCSV.js" defer></script>
//<script src="./components/getHeaders.js" defer></script>
//<script src="./index.js" defer></script>

const stringHandler = (string) => {
  return string
    .replace(/\[.*\]/, "")
    .replace(/\r?\n/g, "")
    .replace(/\t/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const getInfo = (item) => {
  let initialDomElement = item;
  let itemInfoList = [];

  //Материал__________________________________________________________________________________
  let nextDomElement = initialDomElement.nextSibling;
  while (!nextDomElement.textContent.includes(materialsSeparator)) {
    nextDomElement = nextDomElement.nextSibling;
  }
  let metarials = nextDomElement.textContent;
  if (!itemInfoList.find((el) => el.includes(materialsSeparator))) {
    itemInfoList.push(metarials);
  }

  //Цвета_____________________________________________________________________________________
  nextDomElement = initialDomElement.nextSibling;
  while (!nextDomElement.textContent.includes(colorsSeparator)) {
    nextDomElement = nextDomElement.nextSibling;
  }
  let colors = nextDomElement.textContent;
  if (!itemInfoList.find((el) => el.includes(colorsSeparator))) {
    itemInfoList.push(colors);
  }

  //Размеры___________________________________________________________________________________
  nextDomElement = initialDomElement.nextSibling;
  while (!nextDomElement.textContent.includes(sizesSeparator)) {
    nextDomElement = nextDomElement.nextSibling;
  }
  let sizes = nextDomElement.textContent;
  if (!itemInfoList.find((el) => el.includes(sizesSeparator))) {
    itemInfoList.push(sizes);
  }
  //__________________________________________________________________________________________
  return stringHandler(itemInfoList.join(" "));
};

const getItemsInfo = (itemsHeaders) => {
  let itemsList = [];
  itemsHeaders.forEach((item) => {
    let itemObject = {};
    //table content
    itemObject.header = stringHandler(item.textContent);
    itemObject.info = getInfo(item);

    itemsList.push(itemObject);
  });
  return itemsList;
};

//const itemsHeaders = getItemsHeadersBySelector(headersClassList)

const itemsHeaders =
  parseBy === "styles"
    ? getItemsHeadersByStyles(
        parsingTypes[parseBy].stylesVariantsList,
        parsingTypes[parseBy].selector
      )
    : getItemsHeadersBySelector(parsingTypes[parseBy]);
const items = getItemsInfo(itemsHeaders);

console.log(items);

const fileData = createFile(items, headers);
downloadFile(fileData, fileName, fileFormat);
