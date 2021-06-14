/**
 * LocalStorage
 */

const get = (key: string) => {
  return localStorage.getItem(key);
};

const set = (key: string, data: string | Record<string, any> | boolean) => {};
