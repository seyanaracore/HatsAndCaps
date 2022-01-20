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