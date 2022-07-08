initBlock();
const id = "tamperMonkeyNotify";
const container = document.getElementById(id);

function initBlock() {
   const elem = `<div id=${id} style="
	position: fixed;
	right: 10px;
	bottom: 10px;
	width: auto;"></div>`;
   document.body.insertAdjacentHTML("afterend", elem);
}

const deleteNotify = (notify) => {
   try {
      container.removeChild(notify);
   } catch (e) {}
};

const getNotifyBlock = (content) => {
   const elem = document.createElement("div");
   const styleElem = elem.style;

   styleElem.right = "10px";
   styleElem.bottom = "10px";
   styleElem.width = "auto";
   styleElem.fontSize = "16px";
   styleElem.padding = "6px 12px";
   styleElem.backgroundColor = "#fff3cd";
   styleElem.borderRadius = "12px";
   styleElem.maxWidth = "400px";
   styleElem.zIndex = "99999";
   styleElem.border = "1px solid #ffeeba";
   styleElem.margin = "4px 0";

   elem.innerText = content;

   return elem;
};

const notify = async (text, duration = 3) => {
   const notifyContent = getNotifyBlock(text);
   notifyContent.addEventListener("click", (e) => deleteNotify(e.target));
   container.insertAdjacentElement("beforeend", notifyContent);

   await window.sleep(duration);

   deleteNotify(notifyContent);
};

export default notify;
