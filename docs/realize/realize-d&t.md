### 防抖
触发事件后不立即执行，在一定时间内如果再次触发，重新计时，计时结束后执行事件


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

带有立即执行的防抖函数
```javascript

function debounce(fn, interval = 300, immediate = true) {
  let timer, context, args
  
  // 延迟执行函数
  const later = () => setTimeout(() => {
    // 延迟函数执行完毕，清空缓存的定时器序号
    timer = null
    // 延迟执行的情况下，函数会在延迟函数中执行
    // 使用到之前缓存的参数和上下文
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  // 这里返回的函数是每次实际调用的函数
  return function(...params) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
    // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}

```

### 节流
一个事件一直不断的触发时，只有当前时间与上一次执行的时间在一个设定时间才会再次执行该事件

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

看下大佬实现的节流函数
```javascript
/**
 * 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数   
 */
function throttle(func, wait, options = {}) {
  var context, args, result;
  var timeout = null;
  // 之前的时间戳
  var previous = 0;
  // 定时器回调函数
  var later = function() {
    // 如果设置了 leading，就将 previous 设为 0
    // 用于下面函数的第一个 if 判断
    previous = options.leading === false ? 0 : +new Date();
    // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  }
  return function() {
    // 获得当前时间戳
    var now = +new Date();
    // 首次进入前者肯定为 true
    // 如果需要第一次不执行函数
    // 就将上次时间戳设为当前的
    // 这样在接下来计算 remaining 的值时会大于0
    if (!previous && options.leading === false) {
      previous = now;
    }
    // 计算剩余时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果当前调用已经大于上次调用时间 + wait
    // 或者用户手动调了时间
    // 如果设置了 trailing，只会进入这个条件
    // 如果没有设置 leading，那么第一次会进入这个条件
    // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
    // 其实还是会进入的，因为定时器的延时
    // 并不是准确的时间，很可能你设置了2秒
    // 但是他需要2.2秒才触发，这时候就会进入这个条件
    if (remaining <= 0 || remaining > wait) {
      // 如果存在定时器就清理掉否则会调用二次回调
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和 trailing
      // 没有的话就开启一个定时器
      // 并且不能不能同时设置 leading 和 trailing
      timeout = setTimeout(later, remaining);
    }
    return result;
  }
}
```
