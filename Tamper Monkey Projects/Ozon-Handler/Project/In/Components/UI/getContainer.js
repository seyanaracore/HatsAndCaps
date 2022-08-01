export default getContainer = () => {
   const container = document.createElement("div");
   container.style.position = "fixed"
   container.style.bottom = "10px";
   container.style.left = "10px";
   container.style.zIndex = "9999";
   container.style.padding = "10px";
   container.style.background = "aliceblue";
   container.style.border = "1px solid black";
   container.style.borderRadius = "12px";
   return container;
};