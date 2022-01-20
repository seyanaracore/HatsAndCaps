const checkArticles = () => {
    document.querySelectorAll(".j-card-link").forEach(link => {
        if (window.articles.includes(link.href.split("/")[4])) {
            link.parentElement.parentElement.style.display = "none"
        }
    })
}
let windowUrl = null
setInterval (async() => {
    let actualUrl = window.location.href
    if(actualUrl != windowUrl) {
        windowUrl = actualUrl
        await window.sleep(1.5)
        checkArticles()
    }
}, 1000)