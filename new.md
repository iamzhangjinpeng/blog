# new

```javascript
function newFake() {
  var constructor = Array.prototype.shift.call(arguments);

  var obj = Object.create(constructor.prototype);
  /*
  var obj = new Object();
  obj.__proto__ = constructor.prototype;
  */
  var result = constructor.apply(obj, arguments);

  return typeof result === "object" ? result : obj;
}
```

