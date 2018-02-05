const Headers = function Headers () {};

Headers.prototype.set = function (key, val) {
  this[key] = val;
}
Headers.prototype.get = function (key) {
  return this[key];
}

Object.defineProperty(window, 'Headers', { value: Headers });