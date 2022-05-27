const initButtonLinksCollector = () => {
   const collectLinks = () => {
      const links = [
         ...new Set(
            [
               ...document.querySelectorAll(
                  ".widget-search-result-container a.tile-hover-target"
               ),
            ].map((el) => el.href.split("/?")[0])
         ),
      ];

      window.copyToClipboard(
         links.join("\n"),
         `Ссылки скопированы в буфер обмена. ${links.length} шт.`
      );
   };

   const pageHead = document.querySelector('[data-widget="column"]');
   const collectLinksBtn = document.createElement("button");
   collectLinksBtn.innerText = "Собрать ссылки";
   collectLinksBtn.addEventListener("click", collectLinks);

   pageHead.insertAdjacentElement("beforeend", collectLinksBtn);
};
