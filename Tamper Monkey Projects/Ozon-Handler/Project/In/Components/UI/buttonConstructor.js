class pageButtonContructor {
   constructor(btnText, handler, container) {
      const uiButton = document.createElement("button");
      uiButton.innerText = btnText;
      uiButton.addEventListener("click", handler);

      container.insertAdjacentElement("beforeend", uiButton);
   }
}

export default pageButtonContructor;
