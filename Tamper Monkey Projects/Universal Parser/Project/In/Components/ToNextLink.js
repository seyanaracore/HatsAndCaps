import { getLinks } from "./dataGetters";

const toNextLink = () => {
   const handleUrl = getLinks()?.[0];
   if (handleUrl) {
      window.location.href = handleUrl;
   } else {
      throw new Error("Links list is empty.");
   }
};

export default toNextLink;
