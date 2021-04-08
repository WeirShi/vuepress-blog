### 防抖
触发事件后不立即执行，在一定时间内如果再次触发，重新计时，计时结束后执行事件

## code
```javascript
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

### 节流
一个事件一直不断的触发时，只有当前时间与上一次执行的时间在一个设定时间才会再次执行该事件
## code
```javascript
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
