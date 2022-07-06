const id = "tamperMonkeyNotify";

const initBlock = () => {
   const elem = document.createElement("div");
   elem.innerHTML(`<div id=${id} style="
	position: fixed;
	transition: all 0.5s ease 0s;
	right: 10px;
	bottom: 10px;
	opacity: 1;
	width: auto;"></div>`);
   document.body.insertAdjacentHTML("afterend", elem);
};
const getNotifyBlock = (content) => {
   const elem = document.createElement("div");
   return elem.innerHTML`<div id=${id} style="
	position: fixed;
	transition: 0.5s;
	opacity: 0;
	right: 10px;
	bottom: 10px;
	width: auto;
	font-size: 16px;
	padding: 6px 12px;
	background-color: #00000021;
	border-radius: 12px;
	max-width: 400px;
	z-index: 99999;
	border: 1px solid #00000063;">${content}</div>`;
};

const notify = async (text, duration = 2) => {
   const container = document.getElementById(id);
   const notifyContent = getNotifyBlock(text);

   container.insertAdjacentHTML("beforeend", notifyContent);
   block.style.opacity = 1;
   await window.sleep(duration);
   block.style.opacity = 0;
   container.removeChild(notifyContent);
};

initBlock();

export default notify;
