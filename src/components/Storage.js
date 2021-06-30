const StorageHelper = {
    get: (key) => {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return undefined;
      }
    },
    set: (key, value) => {
      localStorage.setItem(key, value);
    },
    clear: (key) => {
      localStorage.removeItem(key);
    },
  };

  export default StorageHelper;