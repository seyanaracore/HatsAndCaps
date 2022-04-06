//____________________________________________________________________________________________
// @name         Hide sellers items
// @namespace    https://hatsandcaps.ru/
// @match        https://www.wildberries.ru/catalog/0/search.aspx?*
// @icon         chrome://favicon/http://www.wildberries.ru/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Wildberries/SellersGoodsHider.js
// @grant        none
//____________________________________________________________________________________________
const sellerNames = [
    "Стиляжки",
    "Markuss",
    "На_стиле",
    "GRA",
    "BestDreams",
    "Even Temper",
    "Madison Hill",
    "Bronks",
    "SouthTrade",
    "SPARKGOOD",
    "Наруто",
    "LUXE BELT",
    "ShopShop",
]
let windowUrl = null
const checkBrandNames = () => {
    document.querySelectorAll(".brand-name").forEach((brand)=>{
        if(sellerNames.includes(brand.textContent.split(" /")[0])){
            brand.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none"
        }
    })
}
setInterval (async () => {
    let actualUrl = window.location.href
    if(actualUrl != windowUrl) {
        windowUrl = actualUrl
        await window.sleep(1.5)
        checkBrandNames()
    }
}, 1000)