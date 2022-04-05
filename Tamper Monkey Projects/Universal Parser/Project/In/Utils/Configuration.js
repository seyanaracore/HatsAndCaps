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
		if (configObject && typeof configObject !== "object") throw new Error("Excepted settings object")

		if (configObject) {
			for (let prop in configObject) {
				this.#config[prop] = configObject[prop]
			}
		}
	}
	static get = () => this.#config
}

export default Configuration

export const {
	itemsLinksListName,
	itemsInfoListName,
	itemsErrorsListName,
	initialPage,
	sleepTime,
	writePageUrl,
	validatePageUrl
} = Configuration.get();