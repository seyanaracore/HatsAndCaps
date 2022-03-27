const sleep = (sec = 0.5) => {
   return new Promise((res) => {
      setTimeout(() => res(), sec * 1000);
   });
};

export default sleep;
