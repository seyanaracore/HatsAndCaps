const arrayError = "An array is expected";

export const initializeMethods = (methodsList) => {
   if (!Array.isArray(methodsList)) {
      throw new Error(arrayError);
   }

   for (let method of methodsList) {
      window[method.name] = method;
   }
};

export const initializeClass = (classList) => {
   if (!Array.isArray(classList)) {
      throw new Error(arrayError);
   }

   for (let item of classList) {
      window[item.name] = new item();
   }
};

export const initializeVariables = (variablesList) => {
   if (!Array.isArray(variablesList)) {
      throw new Error(arrayError);
   }
   if (
      variablesList.some((varItem) => {
         return (
            typeof varItem !== "object" ||
            !varItem.hasOwnProperty("name") ||
            !varItem.hasOwnProperty("value")
         );
      })
   ) {
      throw new Error(
         "An array of objects {name: string, value: any} is expected"
      );
   }

   for (let item of variablesList) {
      window[item.name] = item.value;
   }
};
