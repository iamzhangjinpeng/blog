# new

```javascript
// 手写new
function new1(constructor, ...args) {
  const F = function () {};
  F.prototype = constructor.prototype;
  const obj = new F();
  constructor.apply(obj, args);
  return obj;
}
```

```javascript
// 1. 隐式返回
function Dog(name) {
  this.name = name;
}
let xiaohei = new Dog("小黑");
xiaohei.__proto__ === Dog.prototype; // true
xiaohei.constructor === Dog; // true
```

```javascript
// 2. 显示返回 非对象类型
function Dog(name) {
  this.name = name;
  return 1;
}
let xiaohei = new Dog("小黑");
xiaohei.__proto__ === Dog.prototype; // true
xiaohei.constructor === Dog; // true
```

```javascript
// 3. 显示返回 对象类型
function Dog(name) {
  this.name = name;
  return {
    name: "小红",
    age: 18
  };
}
let xiaohei = new Dog("小黑");
xiaohei.__proto__ === Dog.prototype; // false
xiaohei.constructor === Dog; // false
xiaohei.__proto__ === Object.prototype; // true
xiaohei.constructor === Object; // true
```

```javascript
// Object.create
function create(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```
