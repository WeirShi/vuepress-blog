## 经典函数柯里化面试题

```javascript
// 实现一个add方法, 使计算结果能够满足以下预期
add(1)(2)(3) = 6
add(1,2,3)(4) = 10
add(1)(2)(3)(4)(5) = 15


function add() {
  // 定义一个数组进行参数的存储
  var _args = Array.prototype.slice.call(arguments)

  // 存储所有参数
  var _adder = function() {
    _args.push(...arguments)
    return _adder
  }

  // 利用toString的隐式转换的特性，进行结果计算并返回
  _adder.toString = function() {
    return _args.reduce((a, b) => a + b)
  }

  return _adder
}

add(1)(2)(3)        // 6
add(1)(2, 3, 4)     // 10
add(1, 2)(3, 4, 5)  // 15

```

## 实现通用的柯里化函数
```javascript
function currying(fn) {
  let _args = [], max = fn.length
  let closure = function (...args) {
    // 先把参数加进去
    _args.push(...args)
    // 如果参数没满，返回闭包等待下一次调用
    if (_args.length < max) return closure
    // 传递完成，执行
    return fn(..._args)
  }
  return closure
}
function add(x, y, z) {
  return x+y+z
}

var curryAdd = currying(add)
curryAdd(1, 2)(3) // 6
```