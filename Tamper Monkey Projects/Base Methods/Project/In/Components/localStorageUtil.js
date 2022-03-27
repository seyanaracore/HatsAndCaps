class LocalStorageUtil {
   get(key = null) {
      if (!key) return;
      try {
         return JSON.parse(localStorage.getItem(key));
      } catch (error) {
         console.error(error);
      }
   }
   set(key = null, value) {
      if (!key) return;
      localStorage.setItem(key, JSON.stringify(value));
   }
   delete(key = null) {
      if (!key) return;
      localStorage.removeItem(key);
   }
}

export default LocalStorageUtil;
