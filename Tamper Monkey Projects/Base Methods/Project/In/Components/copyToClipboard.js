const copyWithRich = (data) => {
   const listener = function(ev) {
      ev.preventDefault();
      ev.clipboardData.setData('text/html', data);
      ev.clipboardData.setData('text/plain', data);
   };
   document.addEventListener('copy', listener);
   document.execCommand('copy');
   document.removeEventListener('copy', listener);
};
const baseCopy = (data) => {
   let area = document.createElement("textarea");
   document.body.appendChild(area);
   area.value = data;
   area.select();
   document.execCommand("copy");
   document.body.removeChild(area);
}

const copyToClipboard = (data, notificationConent, richText = false) => {
   if (richText) copyWithRich(data)
   else baseCopy(data)

   console.log("copied");
   if (notificationConent) window.notify(notificationConent);
};

export default copyToClipboard;
