//To <head> tag HTML
//<script src="./settings.js" defer></script>
//<script src="./utils/createCSV.js" defer></script>
//<script src="./components/getHeaders.js" defer></script>
//<script src="./index.js" defer></script>

const stringHandler = (string) => {
  return string.replace(/\[.*\]/,"").replace(/\r?\n/g, "").replace(/\t/g, "").trim()
}

const getInfo = (item) => {
  let initialDomElement = item
  let itemInfoList = []

  //Материал
  let nextDomElement = initialDomElement.nextSibling;
  while (!nextDomElement.textContent.includes(materialsSeparator)) {
    nextDomElement = nextDomElement.nextSibling;
  }
  let metarials = stringHandler(nextDomElement.textContent)
  if(!itemInfoList.includes(metarials)) itemInfoList.push(metarials)

  //Цвета
  nextDomElement = initialDomElement.nextSibling;
  while (!nextDomElement.textContent.includes(colorsSeparator)) {
    nextDomElement = nextDomElement.nextSibling;
  }
  let colors = stringHandler(nextDomElement.textContent)
  if(!itemInfoList.includes(colors)) itemInfoList.push(colors)

  //Размеры
  nextDomElement = initialDomElement.nextSibling;
  while (!nextDomElement.textContent.includes(sizesSeparator)) {
    nextDomElement = nextDomElement.nextSibling;
  }
  let sizes = stringHandler(nextDomElement.textContent)
  if(!itemInfoList.includes(sizes)) itemInfoList.push(sizes)

  console.log(itemInfoList.join(" "));
  return itemInfoList.join(" ");
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
    ? getItemsHeadersByStyles(parsingTypes[parseBy].stylesVariantsList, parsingTypes[parseBy].selector)
    : getItemsHeadersBySelector(parsingTypes[parseBy]);
const items = getItemsInfo(itemsHeaders);

console.log(items);

const fileData = createFile(items, headers);
downloadFile(fileData, fileName, fileFormat);
