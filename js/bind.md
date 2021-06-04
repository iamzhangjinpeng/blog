# bind

## 用法

```javascript
var name = "小王",
  age = 17;
var xz = {
  name: "小张",
  age: 20,
  func: function (from, to) {
    console.log(`${this.name} 年龄${this.age}, 来自${from}, 去往${to}`);
  }
};

var dm = {
  name: "德玛",
  age: 99
};

xz.func.bind(dm, "成都", "上海")();
xz.func.bind(dm, "成都")("北京");
xz.func.bind(dm)("武汉", "北京");
xz.func.bind()("武汉", "北京");
xz.func.bind(null, "成都", "上海")();
xz.func("成都", "上海");
```

## 实现

```javascript
Function.prototype.myBind = function () {
  let ctx = Array.prototype.shift.call(arguments);
  ctx = ctx || window;
  let fn = this;
  var args = arguments;
  return function () {
    return fn.apply(ctx, [...args, ...arguments]);
  };
};
```

## 思考

```javascript
function fn1() {
  console.log("fn1");
}

function fn2() {
  console.log("fn2");
}

fn1.bind(fn2)();
// 输出: fn1
fn1.bind.bind(fn2)()();
// 输出: fn2
```

