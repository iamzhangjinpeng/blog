# 纯css实现自适应正方形

```html
<div class="box"></div>
```

## 方案一：CSS3 vm 单位

视窗(Viewport)是你的浏览器实际显示内容的区域——换句话说是你的不包括工具栏和按钮的网页浏览器。这些单位是**`vw`,`vh`,`vmin`**和**`vmax`**。它们都代表了浏览器（视窗(Viewport)）尺寸的比例和窗口大小调整产生的规模改变。

- **`vw`**——代表视窗(Viewport)的宽度为`1%`，在我们的例子里`50vw = 500px`。
- **`vh`**——窗口高度的百分比 `50vh = 400px`。
- **`vmin`**——vmin的值是当前`vw`和`vh`中较小的值。在我们的例子里因为是横向模式，所以`50vim = 400px`。
- **`vmax`**——大尺寸的百分比。`50vmax = 500px`。

你可以在任何一个可以使用像素值的地方使用它们，比如`width`,`height`,`margin`,`font-size`等等。它们将通过窗口大小的调整或旋转设备的浏览器来重新计算这些值。

```css
.box {
  background-color: aqua;
  width: 80vmim;
  height: 80vmin;
}
```

## 方案二：设置垂直方向的 padding 撑开容器

```css
.box {
  background-color: aqua;
  width: 80%;
  padding-bottom: 80%;
}
```

## 方案三：利用伪元素的 margin/padding-top 撑开容器

```css
.box {
  background-color: aqua;
  width: 80%;
  overflow: hidden;
}
.box::after {
  content: "";
  display: block;
  margin-top: 100%;
}
```

