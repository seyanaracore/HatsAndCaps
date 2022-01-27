//____________________________________________________________________________________________
// @name         Undelivered goods getter
// @version      1.0
// @author       You
// @match        https://seller.wildberries.ru/goods-return/all-applications-module/details-application/*
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Wildberries/UndeliveredGoodsGetter.js
// @icon         chrome://favicon/http://seller.wildberries.ru/
//____________________________________________________________________________________________
const openAllItems = () => {
  document.querySelector(".Select__input__UEDcY4B-tm")?.click();
  document
    .querySelector(".Dropdown-list__m2s501tI-S")
    ?.lastElementChild?.lastChild?.click();
};
const toTopDocument = (Height) => {
  document.querySelector("html").scrollTop = Height;
};
const getItems = () => {
  const deliveredList = ["Выдано", "Доставлено на ПВЗ"];
  const items = document.querySelectorAll(".Table-row__3JM38WmHbG");
  const place = document.querySelectorAll(
    ".Application-info-item__value-black__3sCu7Lg3uC"
  )[7].textContent;
  const req = document
    .querySelector(".Text--black__2QzLgsh8wU")
    .textContent.split("№")[1];
  let unfinishedItems = "";
  items.forEach((item) => {
    const article = item.childNodes[2].textContent;
    const size = item.childNodes[3].textContent;
    const batch = item.childNodes[4].textContent;
    const count = item.childNodes[6].textContent;
    const status = item.childNodes[7].textContent;
    if (!deliveredList.includes(status)) {
      unfinishedItems += `${req}\t${place}\t${article}\t${size}\t${batch}\t${count}\t${status}\n`;
    }
  });
  return unfinishedItems;
};
function copyToClipboard() {
  let area = document.createElement("textarea");

  document.body.appendChild(area);
  area.value = getItems();
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
  console.log("copied");
}
const addButton = () => {
  const button = document.createElement("button");
  button.appendChild(
    document.createTextNode("Копировать недоставленные товары")
  );
  button.classList.add("Button-link__1AiwFepwtc");
  button.classList.add("Button-link--button__cYI0ZDG7N8");
  button.classList.add("Button-link--interface__3Ebwm3QUyl");
  button.classList.add("Button-link--button-big__3P92Y1Da-q");
  button.style.marginLeft = "5px";
  button.addEventListener("click", copyToClipboard);
  document
    .querySelector(".Details-application-page__upload-btn")
    ?.appendChild(button);
};

let windowUrl = null;
setInterval(async () => {
  let actualUrl = window.location.href;
  if (actualUrl != windowUrl) {
    windowUrl = actualUrl;
    if (!!window.location.href.split("/").at(-1).match(/[0-9]/)) {
      while (!document.querySelector(".Details-application-page__upload-btn")) {
        await window.sleep(1);
      }
      const currentScroll = document.querySelector("html").scrollTop;
      openAllItems();
      addButton();
      toTopDocument(currentScroll);
    }
  }
}, 1000);
