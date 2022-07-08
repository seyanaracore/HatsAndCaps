class pageButtonContructor {
   constructor(btnText, handler, selector) {
      const container = document.querySelector(selector);
      const uiButton = document.createElement("button");
      uiButton.innerText = btnText;
      uiButton.addEventListener("click", handler);

      container.insertAdjacentElement("beforeend", uiButton);
   }
}

export default pageButtonContructor;
