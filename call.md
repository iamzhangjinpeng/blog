# call

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

xz.func.call(dm, "成都", "上海");
xz.func.call(null, "成都", "上海");
xz.func("成都", "上海");
```

## 实现

```javascript
Function.prototype.myCall = function (ctx) {
  ctx = ctx || window;
  ctx.fn = this;
  var args = [...arguments].slice(1);
  var result = ctx.fn(...args)
  delete ctx.fn
  return result
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

fn1.call(fn2);
// 输出: fn1
fn1.call.call(fn2);
// 输出: fn2
```

