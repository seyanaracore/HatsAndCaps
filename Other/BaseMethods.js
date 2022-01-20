window.sleep = (sec = 0.5) => {
    return new Promise((res) => {
      setTimeout(() => res(), sec * 1000);
    });
  };
  window.toBottomElement = async (elementSelector = "html", offset = 0) => {
    const element = document.querySelector(elementSelector);
    return new Promise(async (res) => {
      let actualScroll = 1;
      let maxScroll = 0;
      while (actualScroll != maxScroll) {
        await sleep(0.5);
        actualScroll = element.scrollTop;
        element.scrollTop += 9999;
        maxScroll = element.scrollTop;
      }
      element.scrollTop -= offset;
      res();
    });
  };
  window.copyToClipboard = (string) => {
    let area = document.createElement("textarea");
    document.body.appendChild(area);
    area.value = string;
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
    console.log("\ncopied");
  };
  window.findSrollingElement = (selector = "div") => {
    document
      .querySelectorAll(selector)
      .forEach((e) => e.addEventListener("scroll", (e) => console.log(e)));
  };
  window.downloadData = (dataString, fileName, fileFormat) => {
    let a = document.createElement("a");
    a.href = dataString;
    a.setAttribute("download", fileName + "." + fileFormat);
    a.click();
  };
  