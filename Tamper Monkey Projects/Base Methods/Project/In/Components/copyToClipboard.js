const copyToClipboard = (string, notificationConent) => {
   let area = document.createElement("textarea");
   document.body.appendChild(area);
   area.value = string;
   area.select();
   document.execCommand("copy");
   document.body.removeChild(area);
   console.log("copied");
   notificationConent && window.notify(notificationConent);
};
export default copyToClipboard;
