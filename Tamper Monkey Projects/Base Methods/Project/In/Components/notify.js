const id = "tamperMonkeyNotify";
const duration = 2;

const initBlock = () => {
   const elem = `<div id=${id} style="
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
	border: 1px solid #00000063;"></div>`;
   document.body.insertAdjacentHTML("afterend", elem);
};

const notify = async (text) => {
   const block = document.getElementById(id);

   block.innerText = text;

   block.style.opacity = 1;
   await window.sleep(duration);
   block.style.opacity = 0;
};

initBlock();

export default notify