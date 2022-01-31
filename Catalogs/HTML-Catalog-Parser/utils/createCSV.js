const createFile = (content, headers) => {
    let fileData = `sep=${csvSep}\n`
    if(headers) fileData+=`${headers}\n`
    content.forEach(item => {
        for(prop in item) {
            fileData+=`${item[prop]}${csvSep}`
        }
        fileData += `\n`
    });
    return fileData
}
const downloadFile = (data, name, fileFormat) => {
    let element = document.createElement("a");
    element.style.display = "none";
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(data)
    );
    element.setAttribute("download", `${name}.${fileFormat}`);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}