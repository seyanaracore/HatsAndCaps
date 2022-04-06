//____________________________________________________________________________________________
// @name         Refund items marker
// @namespace    http://tampermonkey.net/
// @match        https://seller.wildberries.ru/goods-return/make-application/all-goods
// @icon         chrome://favicon/http://seller.wildberries.ru/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Wildberries/RefundItemsMarker.js
// @grant        none
//____________________________________________________________________________________________
window.showMaxItems = () => {
  let itemsListShower = document.querySelectorAll(
    ".Select__input__UEDcY4B-tm"
  )[1];
  let itemsShowsVariants = itemsListShower.parentNode.lastChild.lastChild;
  itemsShowsVariants.click();
  let maxItems = document.querySelector(
    ".Dropdown-list__m2s501tI-S.Dropdown-list--openUp__10LoenuBFe"
  ).lastChild.lastChild;
  if (!maxItems.classList.contains("Dropdown-option--selected__1pKr-PFNQa"))
    maxItems.click();
};

window.clicker = () => {
  let itemsBTN = document.querySelectorAll(".Custom-icon-button__29P35mls6t");
  for (let button in itemsBTN) {
    let itemsCheckedCount = +document
      .querySelectorAll(
        ".Text__6kNfBFVpt1.Text--h3__1i3piVqU1n.Text--black__2QzLgsh8wU"
      )[5]
      .textContent.split(" шт.")[0];
    if (itemsCheckedCount > 300) {
      break;
    }
    itemsBTN[button]?.click();
    itemsBTN = document.querySelectorAll(".Custom-icon-button__29P35mls6t");
  }
};
window.collectItems = async () => {
  window.showMaxItems();
  await window.sleep(1);
  window.clicker();
};
while (
  !document.querySelector(
    ".Make-application-tabs-layout__title-wrapper__34a9cWDvaD"
  )
) {
  await window.sleep(1);
}
document.querySelector(".Goods-from-list-page__table__27PXXC0kiB").innerHTML +=
  "<br><button style='margin-top: 5px; font-weight: bold' onclick='window.collectItems()'>Выбрать все товары</button>";
