# new

```javascript
function new1() {
  let F = Array.prototype.shift.call(arguments);
  let obj = Object.create(F.prototype);
  /*
  function create(o) {
    let F = function () {};
    F.prototype = o;
    return new F();
  }
  */
  F.apply(obj, arguments);
  return obj;
}


function Dog(name) {
  this.name = name;
}
let xiaohei = newFake(Dog, "小黑");
```

