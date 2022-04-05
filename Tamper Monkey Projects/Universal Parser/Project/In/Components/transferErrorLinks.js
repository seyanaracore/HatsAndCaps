import { getErrors, getLinks } from "./dataGetters"
import { setItemsLinks } from "./dataSetters"

const transferErrorLinks = () => {
	const errorLinks = getErrors()
	const links = getLinks()
	if (errorLinks.length) setItemsLinks([...links, ...errorLinks])
}

export default transferErrorLinks