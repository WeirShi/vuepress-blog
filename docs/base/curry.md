# 柯里化函数

## 什么是柯里化
是一种将使用多个参数的一个函数转换成一系列使用一个参数函数的技术.    
比如：
```js
function add(a, b) {
  return a + b
}
add(1, 2) // 3

// 假设有一个curry函数可以做到柯里化
var addCurry = curry(add)
addCurry(1)(2) // 3
```