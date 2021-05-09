# new

```javascript
function newFake() {
  // 构造函数 constructor
  const constructor = Array.prototype.shift.call(arguments);
  const obj = new Object();
  obj.__proto__ = constructor.prototype;
  // var obj = Object.create(constructor.prototype);
  constructor.apply(obj, arguments);
  return obj;
}

function Dog(name) {
  this.name = name;
}
let xiaohei = newFake(Dog, "小黑");
```

