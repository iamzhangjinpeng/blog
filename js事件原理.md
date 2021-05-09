# js 事件原理

## 事件捕获/冒泡

我们点击一个span，我可能就想点击一个span，事实上他是先点击document，然后点击事件传递到span的，而且并不会在span停下，span有子元素就会继续往下，最后会依次回传至document，我们这里偷一张图：

![img](/Users/zhang/blog/07132637-3ecf3bb32e3b45968f27d21bf1fe3aa5.png)

我们这里偷了一张图，这张图很好的说明了事件的传播方式。

```bash
事件冒泡即由最具体的元素（文档嵌套最深节点）接收，然后逐步上传至document
事件捕获会由最先接收到事件的元素然后传向最里边（我们可以将元素想象成一个盒子装一个盒子，而不是一个积木堆积）
```

## 测试

```html
<div id="p">
  parent
  <a id="c" href="./aaaa" target="_blank">child</a>
</div>
```

```javascript
/*
capture 捕获
bubble 冒泡

target.addEventListener(type, listener, useCapture);
useCapture 默认 false
useCapture = false, 当前事件冒泡时触发
useCapture = true, 当前事件捕获时触发

e.preventDefault();
a 标签会有默认事件跳转，e.preventDefault() 阻止默认事件。

e.stopPropagation();
阻止后面的捕获，冒泡

propagation: 传播，繁殖，增值，蔓延
*/
let p = document.getElementById("p");
let c = document.getElementById("c");

c.addEventListener(
  "click",
  function (e) {
    console.log("子节点冒泡");
  },
  false
);

c.addEventListener(
  "click",
  function (e) {
    console.log("子节点捕获");
    e.preventDefault();
    e.stopPropagation();
  },
  true
);

p.addEventListener(
  "click",
  function (e) {
    console.log("父节点捕获");
  },
  true
);

p.addEventListener(
  "click",
  function (e) {
    console.log("父节点冒泡");
  },
  false
);
```

