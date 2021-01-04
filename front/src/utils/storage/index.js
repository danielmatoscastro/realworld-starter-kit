const PREFIX = '@realworld';

export class Storage {
  static setItem(key, item) {
    localStorage.setItem(`${PREFIX}/${key}`, JSON.stringify(item));
  }

  static getItem(key) {
    return JSON.parse(localStorage.getItem(`${PREFIX}/${key}`));
  }
}

export default Storage;
