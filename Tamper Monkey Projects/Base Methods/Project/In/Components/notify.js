const id = "tamperMonkeyNotify";
const animDuration = 0.5;

const initBlock = () => {
   const elem = `<div id=${id} style="
	position: fixed;
	transition: all 0.5s ease 0s;
	right: 10px;
	bottom: 10px;
	width: auto;"></div>`;
   document.body.insertAdjacentHTML("afterend", elem);
};
const getNotifyBlock = (content) => {
   const elem = document.createElement("div");
   const styleElem = elem.style;

   styleElem.transition = `${animDuration}s`;
   styleElem.opacity = "0";
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

const notify = async (text, duration = 2) => {
   const container = document.getElementById(id);
   const notifyContent = getNotifyBlock(text);
   container.insertAdjacentElement("beforeend", notifyContent);

	await window.sleep(animDuration);
   notifyContent.style.opacity = 1;
	
   await window.sleep(duration);

   notifyContent.style.opacity = 0;
   await window.sleep(animDuration);
   container.removeChild(notifyContent);
};

initBlock();

export default notify;
