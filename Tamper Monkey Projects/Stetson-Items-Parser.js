// @name         Stetson Items Parser
// @namespace    Stetson
// @version      2.0
// @description  try to take over the world!
// @author       You
// @match        https://preorder.fwshats.de/en/*
// @icon         chrome://favicon/http://preorder.fwshats.de/
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Universal%20Parser/Project/Out/app.js
// @require      https://raw.githubusercontent.com/seyanaracore/HatsAndCaps/main/Tamper%20Monkey%20Projects/Stetson-Urls-Parser.js
// @grant        none

const dataHandler = () => {
  //RegExp
  const onlySymReg = /[^0-9.]/g;

  //Методы
  const toCamelCase = (string) => {
    string = string.split(" ");
    string = string.map((word, idx) => {
      word = word.split("");
      idx === 0
        ? (word[0] = word[0].toLowerCase())
        : (word[0] = word[0].toUpperCase());
      return word.join("");
    });
    return string.join("");
  };
  const getImageLink = () => {
    let link =
      window
        .$(".zoomWindowContainer > div")[0]
        ?.style.backgroundImage.split('"')[1]
        ?.split("/") || "-";
    if (Array.isArray(link)) {
      link.pop();
      return link.join("/") + "/";
    } else {
      return null;
    }
  };
  const getVariants = () => {
    const imageLink = getImageLink();

    const variants = [];
    if (imageLink) {
      [...window.$(".gallery-slick__thumb")].forEach((variant) => {
        const color = variant.lastElementChild.textContent
          .replace("\n", "")
          .trim();
        const colorImageLink =
          imageLink + variant.firstElementChild.src.split("/").at(-1);

        variants.push({
          color: color,
          imageLink: colorImageLink,
        });
      });
    } else {
      [...$("[option-attr-code='color_name']")].forEach((variant) => {
        const color = variant.getAttribute("option-label");
        variants.push({
          color: color,
          imageLink: "no photos",
        });
      });
    }
    return variants.length ? variants : null;
  };
  const getItemProps = () => {
    const itemPropsHeadersElements = [
      ...window.$(".product-view__property-label"),
    ];
    if (!itemPropsHeadersElements.length) return null;

    let itemProps = {};

    itemPropsHeadersElements.forEach((prop) => {
      const propName = prop?.textContent?.trim() || "error";
      const propContent =
        prop?.nextSibling?.nextSibling?.textContent?.trim() || "error";

      if (propName.toLowerCase() == "care instructions") return;

      itemProps[propName] = propContent;
    });
    return itemProps;
  };
  const getName = () => {
    return (
      window.$("[itemprop='name']")[0]?.textContent?.replace("\n", "").trim() ||
      null
    );
  };
  const getPreOrderPrice = () => {
    return (
      window
        .$(".price__value.price__value--special .price")[0]
        ?.textContent.replace(onlySymReg, "") || null
    );
  };
  const getSizes = () => {
    const sizes = [...window.$("[option-attr-code='size']")].map(
      (size) => size?.textContent || "error"
    );
    return sizes.length ? sizes : null;
  };

  //Данные
  const variants = getVariants();
  const preOrderPrice = getPreOrderPrice();
  const name = getName();
  const sizes = getSizes();
  const itemProps = getItemProps();

  if(!name) return null

  let itemInfo = {
    variants,
    preOrderPrice,
    name,
    sizes,
  };

  //Декомпозиция свойств товара
  for (let prop in itemProps) {
    let name = toCamelCase(prop);
    itemInfo[name] = itemProps[prop]?.replace(/; /g, " - ").trim();
  }
  return itemInfo;
};

window.intializeMethods([getItemInfo])