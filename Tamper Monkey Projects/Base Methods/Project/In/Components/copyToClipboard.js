const copyToClipboard = (clipboardData, notificationConent) => {
   const listener = function(ev) {
      ev.preventDefault();
      ev.clipboardData.setData('text/html', clipboardData);
      ev.clipboardData.setData('text/plain', clipboardData);
   };
   document.addEventListener('copy', listener);
   document.execCommand('copy');
   document.removeEventListener('copy', listener);
   notificationConent && window.notify(notificationConent);
};
export default copyToClipboard;
