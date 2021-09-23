## 前端性能优化原理及实践

提及前端的性能优化的方案，很多人会想到做一些预加载，图片的懒加载，减少Http请求等等....还有可能会想到`雅虎军规`这样的经典之作。    
所谓实践是检验真理的唯一标准，很多理论本身也都是我们在具体的业务场景中实践出来的，因此接下来，便列出了一些前端性能优化方面的方案及在实践中的🌰

### 从一道经典面试题开始

```
从在浏览器中输入URL开始，发生了什么？
```
相信很多人在面试中都有遇到过这个问题。
这道题简单的回答是：

通过DNS域名解析将URL解析为对应的IP地址，然后与这个IP地址确定的那台服务器建立起TCP网络连接，随后向服务端抛出的HTTP请求，服务端处理完请求之后，把目标数据放在HTTP的Response响应中返回给客户端，拿到响应数据的浏览器就开始进行渲染。渲染完成后，页面便呈现给了用户，并等待响应用户的操作。

将这个过程拆分一下：

1. DNS解析
2. TCP连接
3. HTTP请求
4. 服务端处理请求，并返回响应数据
5. 浏览器拿到响应数据，解析响应内容，渲染页面，将页面展示给用户，等待响应用户操作

那么最终，所需要的一些性能优化方案，便可以在这几个过程中不断地考虑，反复权衡，打磨产品。

### 网络相关
上面讲到的过程中，与网络相关的便是`DNS解析`，`TCP连接`，`HTTP请求/响应`。    
前2者中，前端可以做的事情基本没有了，那么也就剩下`HTTP请求/响应`了，这也是前端网络优化的核心。    
HTTP优化有2个方面：
1. 减少请求次数
2. 减少单次请求所花费的时间

我们在日常开发中常见的几个操作----资源的压缩，合并，缓存等

#### HTTP缓存

1. 强缓存
强缓存是利用http头中的`expires`和`cache-control`两个字段来控制的。强缓存中，当请求再次发出时，浏览器会根据其中的`expires`和`cache-control`判断目标资源是否“命中”强缓存，若命中则直接从缓存中获取资源，不会再与服务端发生通信。

- Expires
当服务器返回响应时，在`Response Headers`中会写入`expires`字段，`expires`是一个时间戳，如果再次向服务器请求资源，浏览器会对比本地时间和expires的时间戳，如果本地时间小于`expires`设定的过期时间，那么就会直接去缓存中取这个资源。    
由于时间戳是服务器来定义的，而本地时间的取值却来自客户端，因此 expires 便存在较高的错误率。

- Cache-Control
同样的当服务器返回响应时，在`Response Headers`中会写入`cache-control`字段，在`cache-control`中可以通过`max-age`来控制资源的有效期。`max-age`是一个相对时间，它可以避掉`expires`带来的时差问题，`max-age`机制下，资源的过期判定不再受服务器时间戳的限制。客户端会记录请求到资源的时间点，以此作为相对时间的起点，从而确保参与计算的两个时间节点（起始时间和当前时间）都来源于客户端，由此便能够实现更加精准的判断。

**`cache-control`的`max-age`配置项相对于`expires`的优先级更高。**

2. 协商缓存
- Last-Modified 
  `last-modified`是一个时间戳，如果启用了协商缓存，会在首次请求时在`Response Headers`中返回，
  ```
  Last-Modified: Thu, 23 Sep 2021 17:15:57 GMT
  ```
  随后我们每次请求时，会带上一个`if-modified-since`的时间戳字段，它的值与上次请求返回`last-modified`值相同。
  ```
  If-Modified-Since: Thu, 23 Sep 2021 17:15:57 GMT
  ```
  服务器接收到这个时间戳后，会比对该时间戳和资源在服务器上的最后修改时间是否一致，从而判断资源是否发生了变化。如果发生了变化，就会返回一个完整的响应内容，并在`Response Headers`中添加新的`last-modified` 值；否则，返回304的响应，资源会被重定向到浏览器缓存。

- Etag
`Etag`是由服务器为每个资源生成的唯一的标识字符串，这个标识字符串是基于文件内容编码的，只要文件内容不同，它们对应的`Etag`就是不同的，反之亦然。因此`Etag`更精准。

`Etag`与`last-modified`类似，首次请求时，会在响应头里拿到一个标识符，类似
```
ETag: W/"5c7f-1613480f480"
```
下一次请求，请求头里就会带上这个相同的值，字段名为`If-None-Match`,
```
If-None-Match: W/"5c7f-1613480f480"
```
`Etag`的生成，对服务端的性能有一定的影响，因此在选择使用时，还是需要慎重考虑。。。。


#### 本地开发工具的优化（Webpack）
1. 提升工具构建速度
  - 通过配置dll，拆分第三方库
  以React举个🌰，配置文件如下
  ```js
  const path = require('path')
  const webpack = require('webpack')
  module.exports = {
    entry: {
      // 依赖的库数组
      vendor: [
        'prop-types',
        'react',
        'react-dom',
        'react-router-dom',
      ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      library: '[name]_[hash]',
    },
    plugins: [
      new webpack.DllPlugin({
        // DllPlugin的name属性与libary保持一致
        name: '[name]_[hash]',
        path: path.join(__dirname, 'dist', '[name]-manifest.json'),
        // context和webpack.config.js保持一致
        context: __dirname,
      }),
    ],
  }
  ```
  配置完成后，`dist`文件夹中会出现2个文件
  ```js
  vendor-manifest.json // 描述每个第三方库对应的具体路径
  vendor.js // 第三方库打包后的文件
  ```

  随后在`webpack.config.js`中做如下配置
  ```js
  const path = require('path');
  const webpack = require('webpack')
  module.exports = {
    mode: 'production',
    // 编译入口
    entry: {
      main: './src/index.js'
    },
    // 目标文件
    output: {
      path: path.join(__dirname, 'dist/'),
      filename: '[name].js'
    },
    // dll相关配置
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        // manifest就是我们第一步中打包出来的json文件
        manifest: require('./dist/vendor-manifest.json'),
      })
    ]
  }
  ```
  这样，DLL相关的配置就完成了。

  - 使用`HappyPack`，多进程的处理`Loader`
  Webpack是单线程的工具，即使有存在多个任务还是需要排队依次执行，然而电脑CPU是多核的，因此便可以使用相应的工具来充分使用多核CPU强大的能力。   
  `HappyPack`的使用也比较简单，只需要将loader的配置转到`HappyPack`中去就好了。
  ```js
  const HappyPack = require('happypack')
  // 创建进程池
  const happyThreadPool =  HappyPack.ThreadPool({ size: os.cpus().length })

  module.exports = {
    module: {
      rules: [
        ...
        {
          test: /\.js$/,
          // 问号后面的查询参数指定了处理这类文件的HappyPack实例的名字
          loader: 'happypack/loader?id=happyBabel'
        },
        ...
      ],
    },
    plugins: [
      ...
      new HappyPack({
        // happyBabel，和上面的查询参数id对应
        id: 'happyBabel',
        // 指定进程池
        threadPool: happyThreadPool,
        loaders: ['babel-loader?cacheDirectory']
      })
    ],
  }
  ```

2. 减少打包文件体积
- 通过使用可视化插件工具`webpack-bundle-analyzer`来分析各个依赖模块的大小
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

- Tree-Shaking 删除冗余代码
Webpack2后，原生支持了ES6的`import/export`语法，基于此，`Tree-Shaking`可以在编译的过程中获悉哪些模块并没有真正被使用，这些没用的代码，在最后打包的时候会被去除。
生产模式下自动开启，
其他模式下开启`Tree-Shaking`配置，如下
```js
module.exports = {
  ...
  optimization: {
    // 只导出外部使用的代码
    usedExports: true,
    // 压缩代码
    minimize: true,
    // 合并模块函数 将所有模块合并到一个函数中，提升运行效率，减小代码体积
    concatenatModules: true
  }
  ...
}
```

- 按需加载，动态导入组件
ESM的方式动态导入组件
```js
import('./src/component').then(({ default: component }) => {
  // 其他代码
  ...
})
```
在使用框架开发业务时，我们一般在router.js中使用import()方法来导入组件，实现按需加载
动态导入组件时，webpack默认会将这些分包的bundle文件以数字来命名，我们也可以在使用动态导入组件时，利用webpack的魔法注释来给这些分包自定义命名，用法：在import()方法中使用行内注释，如下
```js
import(/* webpackChunkName: components */ './src/component')
```

- Code-Spliting
  - 多页应用
  - ESM动态导入
  ```js
  module.exports = {
    entry: {
      index: './src/index.js',
      about: './src/about.js'
    },
    output: {
      filename: '[name].bundle.js'
    },
    // 输出的Html指定bundle
    plugins: [
      new HtmlWebpackPlugin({
        title: '',
        template: '',
        filename: '',
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        ...
        chunks: ['about']
      }),
    ]
  }
  ```

#### Lazy-Load 懒加载
懒加载主要针对图片加载时机的优化。
在用户打开页面的时候，就把所有的图片资源加载完毕，那么很可能会造成白屏、卡顿等现象，同时加载完所有图片，流量的消耗也是巨大的。

因此可以在页面打开的时候，只把首屏的图片资源加载出来，用户就会认为页面是没问题的。至于下面的图片，完全可以等用户下拉的瞬间再即时去请求、即时呈现给他。这样一来，性能的压力变小了，用户的体验也没有变差。

实现懒加载的方式：
1. 原生JS利用元素offsetTop值与页面当前滚动的scrollTop值计算，比较页面clientHeight值，来判断当前元素是否在可视区域内
```js
const imgs = document.querySelectorAll('img')
//offsetTop是元素与offsetParent的距离，循环获取直到页面顶部
function getTop(el) {
  let top = el.offsetTop
  while(el = el.offsetParent) {
    top += el.offsetTop
  }
  return top
}
function lazyLoad() {
  const clientHeight = document.documentElement.clientHeight //获取可视区域高度
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  for (let i = 0; i < imgs.length; i++) {
    if (clientHeight + scrollTop > getTop(imgs[i])) {
      imgs[i].src = imgs[i].getAttribute('data-src')
    }
  }
}
// 页面滚动事件
window.addEventListener("scroll", lazyload)
```

2. 利用`getBoundingClientRect`API实现
```js
getBoundingClientRect() // 可获取元素的大小及位置，返回的是DOMRect对象
```

```js
const imgs = document.querySelectorAll('img')

function lazyload() {
  const clientHeight = document.documentElement.clientHeight
  for (let i = 0; i < imgs.length; i++) {
    // 元素现在已经出现在视口中 客户视口高度大于图片高度
    const imgTop = imgs[i].getBoundingClientRect().top
    if (imgTop <= clientHeight) {
      imgs[i].src = imgs[i].getAttribute("data-src")
    }
  }
}

// 页面滚动事件
window.addEventListener("scroll", lazyload)
```

3. 利用`IntersectionObserver`API实现
这是浏览器内置的一个 API，实现了监听 window scroll 事件、判断是否在视口中以及节流三大功能
```js
const imgs = document.querySelectorAll('img')
function lazyLoad() {
  const observer = new IntersectionObserver(nodes => {
    nodes.forEach(node => {
      if (node.isIntersecting) {
        node.target.src = node.target.dataset.src // 开始加载图片,把data-src的值放到src
        observer.unobserve(node.target) // 停止监听已开始加载的图片
      }
    })
  })
  imgs.forEach(img => observer.observe(img))
}
// 页面滚动事件
window.addEventListener("scroll", lazyload)
```


#### 防抖&节流
在一些滚动事件，resize事件，鼠标操作事件，键盘事件中，都会存在频繁触发回调函数的问题，频繁触发回调导致的大量计算会引发页面的抖动甚至卡顿。因此throttle（节流）和 debounce（防抖）出现了。

1. 什么是防抖？
在一定时间内，不管触发了多少次回调，都只触发最后一次。
```js
// 防抖函数
// 间隔时间 默认300ms
function debounce(fn, interval = 300) {
  let timer // 保存定时器变量
  return function() {
    timer && clearTimeout(timer) // 上一个定时器存在则清除，并重新计时
    const context = this // 保存上下文
    // 保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    const args = arguments
    // 开始计时
    timer = setTimeout(function() {
      fn.call(context, args)
    }, interval)
  }
}
```
2. 什么是节流？
一个事件一直不断的触发时，只有当前时间与上一次执行的时间在一个设定时间才会再次执行该事件
```js
// 节流函数
// 间隔时间，默认300ms
function throttle(fn, interval = 300) {
  // 节流函数进入的时间
  let enterTime = 0
  return function() {
    // 保存上下文
    const context = this
    let startTime = 0 // 第一次函数return即触发的时间
    if (startTime - enterTime > interval) {
      // 再次触发事件函数
      fn.call(context, arguments)
      // 赋值给第一次触发的时间，这样就保存了第二次触发的时间
      enterTime = backTime;
    }
  }
}
```
防抖和节流无论是在日常开发中，还是在面试中都是属于比较高频的。



#### 减少对真实DOM的操作处理
在前端研发中，经常能听到要尽可能少的去操作真实的DOM节点，因为操作DOM的开销实在是太大。
这边涉及到浏览器运行机制（JS引擎和渲染引擎），当我们用JS去操作真实DOM时，本质上是JS引擎和渲染引擎之间的通信，因此减少这些不必要的通信也就成了前端性能优化中的一部分。
这也是当下前端框架中引入了`VirtualDom`的重要原因。

#### 减少DOM的回流和重绘
1. 什么是回流？
当对DOM进行样式的修改时，导致了DOM几何尺寸的变化（比如修改元素的宽、高或隐藏元素等），浏览器需要重新计算元素的几何属性，其他元素的几何属性和位置也会因此受到影响，然后再将计算的结果绘制出来。这个过程就是回流（也叫重排）。
2. 什么是重绘？
当对DOM进行样式的修改时、没有影响其几何属性（比如修改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式。这个过程叫做重绘。
3. 哪些操作会导致回流与重绘？
- 触发重绘：改变背景色，文字颜色，可见度（visibility属性），不改变元素大小，位置的操作
- 触发回流：改变`width、height、padding、margin、left、top、border`属性，使用JS通过`offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight`这些属性计算时，改变元素大小，位置的这些操作
4. 如何减少回流与重绘
- 避免频繁的计算元素位置
例如，需要循环计算元素位置时，使用变量缓存，最后一次性将结果赋给DOM
```js
const el = document.getElementById('el') 
let elOffLeft = el.offsetLeft
let elOffTop = el.offsetTop
for(let i = 0; i < 10; i++) {
  elOffLeft += 10
  elOffTop  += 10
}
el.style.left = elOffLeft + "px"
el.style.top = elOffTop  + "px"
```
- 避免频繁使用JS修改元素样式
例如，每次单独操作，会频繁触发渲染树的更改，从而导致相应的回流与重绘过程
```js
const container = document.getElementById('container')
container.style.width = '100px'
container.style.height = '200px'
container.style.border = '10px solid red'
container.style.color = 'red'
```
针对这一段代码，可以直接给元素赋值一个新的类名，比如
```css
.style {
  width: 100px;
  height: 200px;
  border: 10px solid red;
  color: red;
}
```
```js
const container = document.getElementById('container')
container.classList.add('style')
```
将所有的操作一次性触发来减少渲染树的更改


### PS: 性能优化之35条雅虎军规
1. 尽量减少 HTTP 请求个数——须权衡
2. 使用 CDN（内容分发网络）
3. 为文件头指定 Expires 或 Cache-Control ，使内容具有缓存性。
4. 避免空的 src 和 href
5. 使用 gzip 压缩内容
6. 把 CSS 放到顶部
7. 把 JS 放到底部
8. 避免使用 CSS 表达式
9. 将 CSS 和 JS 放到外部文件中
10. 减少 DNS 查找次数
11. 精简 CSS 和 JS
12. 避免跳转
13. 剔除重复的 JS 和 CSS
14. 配置 ETags
15. 使 AJAX 可缓存
16. 尽早刷新输出缓冲
17. 使用 GET 来完成 AJAX 请求
18. 延迟加载
19. 预加载
20. 减少 DOM 元素个数
21. 根据域名划分页面内容
22. 尽量减少 iframe 的个数
23. 避免 404
24. 减少 Cookie 的大小
25. 使用无 cookie 的域
26. 减少 DOM 访问
27. 开发智能事件处理程序 (事件代理)
28. 用 `<link>` 代替 `@import`
29. 避免使用滤镜
30. 优化图像
31. 优化 CSS Spirite
32. 不要在 HTML 中缩放图像——须权衡
33. `favicon.ico`要小而且可缓存
34. 保持单个内容小于25K
35. 打包组件成复合文本