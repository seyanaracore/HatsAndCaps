const defaultConfig = {
   itemsLinksListName: "itemsLinksList",
   itemsInfoListName: "itemsInfoList",
   itemsErrorsListName: "itemsErrorsList",
   sleepTime: 3,
   writePageUrl: true,
   validatePageUrl: true,
   rmDuplicateUrls: true,
}

class Configuration {
   static #config = defaultConfig

   static set(configObject) {
      if (configObject && typeof configObject !== "object") {
         throw new Error("Excepted settings object");
      }

      if (configObject) {
         for (let prop in configObject) {
            this.#config[prop] = configObject[prop];
         }
         console.log("Config succesful setted:", (() => this.get())());
      }
   }
   static get = () => this.#config;
}

export default Configuration;
