// @name         Wildberries Cart Cleaner
// @namespace    Wildberries
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.wildberries.ru/*
// @icon         chrome://favicon/https://www.wildberries.ru/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Wildberries-Cart-Cleaner.js
// @grant        none

const clearCart = async (departureFrom) => {
   const btns = [...document.querySelectorAll(".btn__del.j-basket-item-del")];
   const btnsObjects = btns.map((btn) => {
      const departure = departureFrom
         ? btn.parentElement.parentElement.parentElement.childNodes[3]
              .childNodes[3].childNodes[8].firstElementChild.firstElementChild
              .textContent
         : null;
      return { departure, rmButton: btn };
   });
   const filteredBtns = departureFrom
      ? btnsObjects.filter((btn) => btn.departure === departureFrom)
      : btnsObjects;

   for (const btn of filteredBtns) {
      await window.sleep(0.2);
      btn.rmButton.click();
   }
};

console.log(`clearCart() - чтобы очистить корзину;
clearCart(departureFrom) - удалить товары из этих места;`);

window.initializeMethods([clearCart]);
