class Configuration {
   static #config = {
      itemsLinksListName: "itemsLinksList",
      itemsInfoListName: "itemsInfoList",
      itemsErrorsListName: "itemsErrorsList",
      initialPage: "",
      sleepTime: 3,
      writePageUrl: true,
      validatePageUrl: false,
   };

   static set(configObject) {
      if (configObject && typeof configObject !== "object") {
         throw new Error("Excepted settings object");
      }

      if (configObject) {
         for (let prop in configObject) {
            this.#config[prop] = configObject[prop];
         }
         console.log(`Config setted: ${this.get()}`);
      }
   }
   static get = () => this.#config;
}

export default Configuration;
