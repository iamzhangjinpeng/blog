

# HTTP Cache

## 为什么需要 Cache

节省流量，节省时间，宏观来说，减少资源的损耗。

## Expires

```bash
Expires: Wed, 21 Oct 2017 07:28:00 GMT
```

**HTTP Response Header** 里面加上 __Expires__ 字段，也就是 __Cache__ 的过期时间。浏览器收到这个 __Response__ 之后，就会把这个资源缓存起来，下一次客户端再请求这个资源，浏览器会检查 __当前时间__ 时候超过 __Expres__ 。如果没有超过，浏览器不发送任何 __Request__ ,而是直接从浏览器缓存里拿资源。

如果打开__Chrome dev tool__ ，__Request Status Code: 200 (from disk cache)__ ，代表这个请求没有发出去，资源直接从 __disk cache__ 里面拿的。

![img](https://static.coderbridge.com/img/techbridge/images/huli/cache/p1.png)

会碰到一个问题，浏览器检测 __Expires__ 的时间用的是电脑本身的时间，如果把电脑时间改成 __2100__ 年，浏览器会觉得所有 __Cache__ 都是过期的，就会重新发送 __Reqeust__ 。

## Cache-Control 与 max-age

__Expires__ 是 __HTTP 1.0__ 就存在的 __Header__ ，为了解决上面遇见的问题，__HTTP 1.1__ 增加了一个新的 __header: Cache-Control__ 。

```bash
Cache-Control: max-age=30
```

代表这个响应的过期时间是 __30__ 秒。假设使用者在收到这个响应之后的第 __10__ 秒重新请求，就会从浏览器缓存里读取 __Status code 200 (from memory cache)__ 。假设使用者过 __60__ 秒之后才请求，浏览器会发送新的请求。

__Expires__ 跟 __max-age__ 同时出现，__max-age__ 会覆盖 __Expires__ 。

新的问题，过期时间到了，不代表资源不能用，过期时间到重新请求时，希望服务端不返回新的资源，而是告诉浏览器，缓存的资源可以继续使用一段时间。

## Last-Modified 与 If-Modified-Since

__Server__ 返回资源的时候，加上 __Last-Modified__ 的头，表示这个资源上一次修改时什么时候。当浏览器缓存过期，浏览器下次再请求时，请求头：__If-Modified-Since__ 来跟服务端请求这个时间之后更新的资源。

第一次请求资源，服务端响应资源的最近修改时间和可以使用多长时间。

```bash
Last-Modified: 2017-01-01 13:00:00
Cache-Control: max-age=31536000
```

当缓存资源过期，重新请求，加上询问所请求文件是否有过更新。

```bash
If-Modified-Since: 2017-01-01 13:00:00
```

服务端接受到，对比两个时间，如果有修改，返回新的文件；如果没有更新，返回 __Status code: 304 (Not Modified)__ ，可以继续用缓存里面的资源。

## Etag 与 If-None-Match

上面说的是文件有没有被编辑过，打开文件，重新保存，编辑时间改变了，但文件并没有改变。比起编辑时间，如果能用资源内容是否改变当作是否更新缓存的条件，再好不过了。

__Etag__ 就是这样的一个东西。可以把它想成资源内容的 __hash__ 值。服务端返回会带上这个资源的 __Etag__ ，等缓存过期之后，浏览器拿着这个 __Etag__ 去询问服务端资源是否被改动过。

__Server__ 再返回 __Response__ 的时候带上 __Etag__ 表示这个资源独有的 __hash__ ，缓存过期后浏览器发送 __If-None-Match__ 询问 __Server__ 是否有改动，服务端判断 __If-None-Match__ 和资源的 __Etag__ 是否匹配，有更新返回新的资源，没有就返回 __304__ 状态码。