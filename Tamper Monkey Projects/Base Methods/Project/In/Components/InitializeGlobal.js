const arrayError = "An array is expected";

export const initializeMethods = (methodsList) => {
   if (!Array.isArray(methodsList)) {
      return console.error(arrayError);
   }

   for (let method of methodsList) {
      window[method.name] = method;
   }
};

export const initializeClass = (classList) => {
   if (!Array.isArray(classList)) {
      return console.error(arrayError);
   }

   for (let item of classList) {
      window[item.name] = new item();
   }
};

export const initializeVariables = (variablesList) => {
   if (!Array.isArray(variablesList)) {
      return console.error(arrayError);
   }

   for (let item of variablesList) {
      window[item.name] = item.value;
   }
};
