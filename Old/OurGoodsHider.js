//____________________________________________________________________________________________
// @name         Hide our items
// @namespace    http://tampermonkey.net/
// @match        https://www.ozon.ru/*
// @icon         chrome://favicon/http://www.ozon.ru/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Ozon/OurGoodsHider.js
//____________________________________________________________________________________________

(function() {
    'use strict';
    const ourBrand = 'HATS AND CAPS'
    const checkArticles = () => {
        document.querySelectorAll(".a9x3 > .bh6").forEach(item => {
            const itemSeller = item.childNodes[2].lastElementChild.lastElementChild.lastElementChild.lastElementChild?.textContent.split("продавец ")[1]
            if(itemSeller === ourBrand) {
                item.style.display = "none"
            }
        })
    }
    let windowUrl = null
    setInterval (async() => {
        let actualUrl = window.location.href
        if(actualUrl != windowUrl) {
            windowUrl = actualUrl
            await window.sleep(1.5)
            checkArticles()
        }
    }, 1000)
})();