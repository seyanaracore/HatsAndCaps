function copyToClipboard(string) {
  let area = document.createElement("textarea");
  document.body.appendChild(area);
  area.value = string;
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
  console.log("\ncopied");
}

function getImagesList() {
  let imgsList = "";
  [...document.querySelectorAll("img")]
    .filter((image) => {
      return image.height > 20 && image.height < 200;
    })
    .forEach((el) => (imgsList += el.src.split("/").at(-1) + `\n`));
  return imgsList;
}
function getStylesList() {
  let styles = "";
  document
    .querySelectorAll("h1")
    .forEach((el) => (styles += el?.textContent.trim() + `\n`));
  return styles;
}

const imageList = getImagesList();
const itemsStyles = getStylesList();

console.log("copyToClipboard(imageList)");
console.log("copyToClipboard(itemsStyles)");

let colorsItems = [...document.querySelectorAll(".s1")]
let list = []
for (let colorIdx = 0; colorIdx < colorsItems.length; colorIdx++) {
    let colorItem = colorsItems[colorIdx]
    let colors = colorItem.textContent

    if(colorItem?.nextElementSibling?.classList?.contains(".s1")) {
        console.log("getted", colorItem.nextElementSibling)
        colorIdx--
        colorItem.nextElementSibling.classList.remove(".s1")
        colorsItems = [...document.querySelectorAll(".s1")]
        colors += el.nextElementSibling.textContent
    }
    list.push(colors)
}