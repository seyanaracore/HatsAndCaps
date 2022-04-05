class PageDataHandler {
   static #dataHandler

   static set(handler) {
      if (typeof handler !== "function") throw new Error("Handler setting error. Excepted function.")

      this.#dataHandler = handler
   }
   static get() {
      if (!this.#dataHandler) throw new Error("Handler is null")
      return this.#dataHandler
   }
}

export default PageDataHandler

