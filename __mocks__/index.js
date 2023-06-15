class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  
    clear() {
      this.store = {};
    }
  }
  
  export default new LocalStorageMock();
  