export function localGet(key) {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }
  return JSON.parse(item);
}

export function localPut(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function localDel(key) {
  localStorage.removeItem(key);
}
