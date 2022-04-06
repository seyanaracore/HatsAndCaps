import { getErrors, getLinks } from "./DataGetters"
import { setItemsLinks } from "./DataSetters"

const transferErrorLinks = () => {
	const errorLinks = getErrors()
	const links = getLinks()
	if (errorLinks.length) setItemsLinks(links.concat(errorLinks))
}

export default transferErrorLinks