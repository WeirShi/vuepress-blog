# 作用域和作用域链

## 全局作用域和局部作用域

## code
```javascript
var a = 1
function fn() {
  var b = 2
  console.log('a', a) // 1
}
console.log('b', b) // 报错 b in not defined
```
在执行上下文环境中，a是在全局作用域中声明的变量，b是在函数fn作用域中声明的变量
由于作用域链的关系，fn中所处的局部作用域会向上寻找变量a，因此函数中的变量打印为1，而在全局作用域中不存在变量b，因此下面的`console`会进行报错

## 作用域链
上文中其实已经提到了部分作用域链，局部作用域包含在了全局作用域中(有点像洋葱模型)，函数作用域可以访问到全局作用域的变量，反之不可以，但是相邻的函数作用域之间是不可以互相访问内部变量的
## code
```javascript
var a = 1
function fn() {
  var b = 2
  console.log('a', a) // 1
}
fn()
console.log('b', b) // 报错 b in not defined

function fn1() {
  var c = 3
  console.log('a', a) // 1
  console.log('b', b) // 报错 b in not defined
}
fn1()
```

