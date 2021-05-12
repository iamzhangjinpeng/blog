# 跨域CORS的OPTIONS

## 服务端设置的header

```javascript
header('Access-Control-Allow-Origin:*');  //支持全域名访问，不安全，部署后需要限制为R.com
header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); //支持的http动作
header('Access-Control-Allow-Headers:x-requested-with,content-type');  //响应头 请按照自己需求添加。

```

## OPTIONS分析

W3C规范：跨域请求中，分为简单请求和复杂请求。

### 简单请求

- GET，HEAD，POST请求中的一种。
- 除了浏览器在请求头上增加的信息（如Connection，User-Agent等），开发者仅可以增加Accept，Accept-Language，Content-Type等。
- Content-Type的取值必须是以下三个：application/x-www-form-urlencoded，multipart/form-data，text/plain

简单请求不需要发送OPTIONS嗅探请求，但只能按发送简单的GET、HEAD或POST请求，且不能自定义HTTP Headers。

复杂请求，XHR会首先发送一个OPTIONS嗅探请求，然后XHR会根据OPTIONS请求返回的Access-Control-*等头信息判断是否有对指定站点的访问权限，并最终决定是否发送实际请求信息。

在发出复杂请求的之前，就会出现一次OPTIONS请求。
OPTIONS请求可以被称作一次嗅探请求，通过这个方法，客户端可以在采取具体的资源请求之前，决定对资源采取何种必要措施。

由于我的问题出现在请求内容为json的时候，所以是复杂请求，提前进行了一次OPTIONS请求。

浏览器会去向 Server 端发送一个 OPTIONS 请求，看 Server 返回的 "Access-Control-Allow-Headers" 是否有自定义的 header 字段。因为我之前没有返回自定义的字段，所以，默认是不允许的，造成了客户端没办法拿到数据。