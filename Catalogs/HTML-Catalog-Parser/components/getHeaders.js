const getItemsHeadersBySelector = (selectors) => {
  let headers = [];
  selectors.map((selector) => {
    headers = [...headers, ...document.querySelectorAll(selector)];
  });
  return headers;
};

const getItemsHeadersByStyles = (selectorsStylesVariantsList, selector) => {
  let headers = [];
  let selectorElementsList = [...document.querySelectorAll(selector)].filter(
    (domElement) => domElement.classList.length
  );
  headers = selectorElementsList.filter((domElement) => {
    let domElementStyles = window.getComputedStyle(domElement);
    return selectorsStylesVariantsList.some((stylesVariant) => {
      let elementValidate = true;
      for (style in stylesVariant) {
        let domElementStyle = domElementStyles[style];
        let variantStyle = stylesVariant[style];
        if (style === "fontSize") {
          domElementStyle = parseInt(domElementStyle);
          variantStyle = parseInt(variantStyle);
        }
        elementValidate
          ? (elementValidate = domElementStyle === variantStyle)
          : false;
      }
      return elementValidate;
    });
  });
  return headers;
};
