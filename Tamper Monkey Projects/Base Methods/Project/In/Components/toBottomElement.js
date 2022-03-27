const toBottomElement = async (elementSelector = "html", offset = 0) => {
   const element = document.querySelector(elementSelector);
   return new Promise(async (res) => {
      let actualScroll = 1;
      let maxScroll = 0;
      while (actualScroll != maxScroll) {
         await window.sleep(0.5);
         actualScroll = element.scrollTop;
         element.scrollTop += 9999;
         maxScroll = element.scrollTop;
      }
      element.scrollTop -= offset;
      res();
   });
};

export default toBottomElement;
