# VNode

## VNode是什么？

**VNode是JavaScript对象**。VNode表示`Virtual DOM`，用`JavaScript`对象来描述真实的`DOM`把`DOM`标签，属性，内容都变成对象的属性。

## VNode作用

通过`render`将`template`模版描述成`VNode`，然后进行一系列操作之后形成真实的`DOM`进行挂载。

VNode优点

- 兼容性强，不受执行环境的影响。`VNode`因为是`JS`对象，不管`Node`还是浏览器，都可以统一操作，从而获得了服务端渲染、原生渲染、手写渲染函数等能力。
- 减少操作`DOM`，任何页面的变化，都只使用`VNode`进行操作对比，只需要在最后一步挂载更新`DOM`，不需要频繁操作`DOM`，从而提高页面性能。

## VNode构造函数

```javascript
export default class VNode {
  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }
}
```

`VNode`构造函数看起来十分简单，先走一遍`VNode`的生成过程。

```html
<!-- 模版 -->
<a class="demo" style="color: red" href="#">
    generator VNode
</a>
```

```javascript
// VNode描述
{
  tag: 'a',
  data: {
    calss: 'demo',
    attrs: {
      href: '#'
    },
    style: {
      color: 'red'
    }
  },
  children: ['generator VNode']
}
```

