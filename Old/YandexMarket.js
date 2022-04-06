//____________________________________________________________________________________________
// @name         YM article decompose
// @match        https://partner.market.yandex.ru/supplier/*/orders/*
// @icon         https://yastatic.net/market-export/_/i/partner/favicon/2021/1/32.ico
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Other/YandexMarket.js
// @grant        none
//____________________________________________________________________________________________

window.copy = (event) => {
  navigator.clipboard.writeText(event.target.textContent.trim());
  alert("copied")
};

const items = document.querySelectorAll(
  ".style-offerDetailWrapper___3r9k1 span[data-tid='ae445ad4']"
);
items.forEach((artNumber) => {
  if (!artNumber.classList.length) {
    let art = artNumber.textContent.split("");

    art.splice(2, 0, "-");
    art.splice(6, 0, "-");
    art.splice(9, 0, "-");

    art = art.join("");

    artNumber.innerText = art;
    artNumber.style.cursor = "pointer";
    artNumber.addEventListener("click", window.copy);
  }
});
