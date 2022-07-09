export class LocalStorage {
  storage: any;

  constructor(globalWindow: any) {
    this.init(globalWindow);
  }

  init(globalWindow: any) {
    if (globalWindow.localStorage) {
      this.storage = globalWindow.localStorage;
    } else {
      this.storage = {
        items: [],
        getItem: function (key: string) {
          return this.items[key];
        },
        setItem: function (key: string, value: string) {
          this.items[key] = value;
        },
      };
    }
  }

  get(key: string) {
    return this.storage.getItem(key);
  }

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }
}
