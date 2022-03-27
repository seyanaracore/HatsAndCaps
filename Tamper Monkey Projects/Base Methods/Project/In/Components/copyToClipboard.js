const copyToClipboard = (string) => {
   let area = document.createElement("textarea");
   document.body.appendChild(area);
   area.value = string;
   area.select();
   document.execCommand("copy");
   document.body.removeChild(area);
   console.log("\ncopied");
};
export default copyToClipboard;
