# deepClone

```javascript
function deepClone(data) {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  /*
  data instanceof Array
  -------------------------
  Array.isArray = function(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
  }
  -------------------------
  Array.isArray(data)
  */
  let result = Array.isArray(data) ? [] : {};
  for (let key in data) {
    result[key] = deepClone(data[key]);
  }
  return result;
}
```

