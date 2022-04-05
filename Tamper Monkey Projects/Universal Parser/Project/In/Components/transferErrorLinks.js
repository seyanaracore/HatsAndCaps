import { getErrors } from "./dataGetters"
import { setItemsLinks } from "./dataSetters"

const transferErrorLinks = () => {
	const errorLinks = getErrors()
	setItemsLinks(errorLinks)
}

export default transferErrorLinks