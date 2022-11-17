const parseItems = () => {
	const itemsList = [...document.querySelectorAll(".j-open-product-popup")]
	.map((el) => {
		 return {
				SKU: el.getAttribute("data-popup-nm-id"),
				Размер: el.childNodes[9]?.textContent.trim() || 0,
				Заказно: el.parentElement.children[1].children[2].children[3].children[1].textContent,
				Доставлено:
					 el.parentElement.children[1].children[2].children[6].children[3]
							.textContent,
				ТипВозврата: el.parentElement.children[1].children[0].children[0].textContent.trim()
		 };
	})

	const csvFormat = window.createCSV({ content: itemsList, headers: "template", sep: '\t' }).replace('sep=\t\n','')
	window.copyToClipboard(csvFormat, 'Данные скопированы')
}

console.log('копироватьДанные() - для того, чтобы скопировать товары со страницы.')

window.копироватьДанные = parseItems