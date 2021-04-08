## var、let、const的区别
浏览器遇到var声明的变量时，会进行变量提升的情况，
## code
```javascript
console.log(a) // 打印undefined
var a = 1
```
这里可以看出，变量a还没有被声明就已经可以访问这个变量，只是这个变量还没有被赋值，这种情况，可以看作
## code
```javascript
var a
console.log(a) // 打印undefined
a = 1
```
变量会声明提前，函数也一样

如果使用`let`和`const`
## code
```javascript
console.log(a)
let a = 1;
```
## code
```javascript
console.log(b)
const b = 1;
```
![](/assets/images/variable.jpg)   
就会出现报错

- var 存在提升，我们能在声明之前使用。let、const 因为暂时性死区的原因，不能在声明前使用
- var 在全局作用域下声明变量会导致变量挂载在 window 上，其他两者不会
- let 和 const 作用基本一致，但是后者声明的变量不能再次赋值

## ES6中提出的块级作用域 `{}` 是为了解决什么问题？

块级作用域：保护了局部变量不会污染全局变量
ES6中声明变量的方式新增了let和const关键字，这2种方式都会被限制在块级作用域中

在ES5之前，作用域只被分为了函数作用域和全局作用域
有时候如果想在函数内添加一些临时的变量，我们会将局部代码封装到IIFE(自执行函数)中
## code
```javascript
function fn() {
  fn(a, b)
  (function fn(a, b) {
    var temp
    temp = a
    a = b
    b = temp
  })(a, b)
}
```
有了块级作用域后，上面的代码就不需要进行封装
## code
```javascript
function fn() {
  let a, b
  {
    var temp
    temp = a
    a = b
    b = temp
  }
}
```
