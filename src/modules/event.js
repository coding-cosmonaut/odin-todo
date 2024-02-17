export function addEvent(el, type, listener) {
  if (Array.isArray(el)) {
    el.forEach((item) => item.addEventListener(type, listener));
  } else {
    el.addEventListener(type, listener);
  }
}
