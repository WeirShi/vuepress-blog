# 作用域和作用域链

## 全局作用域和局部作用域


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

## 扩展
作用域是指程序源代码中定义变量的区域。   
作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。     
JavaScript采用词法作用域(lexical scoping)，也就是静态作用域。     
```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```
```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```
这两段代码输出的都是`local scope`。    
《JavaScript权威指南》中的回答是：JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f()，这种绑定在执行 f() 时依然有效。     
**这两段代码有什么不同？**    
答案：执行的上下文栈不一样      
解析：第一段代码中，先把`checkscope`函数压入了执行栈，然后把`f`函数压入了执行栈，最后依次出栈；而第二段代码中，先把`checkscope`函数压入了执行栈，执行`checkscope`函数，出栈，然后把`f`函数压入了执行栈，再执行，出栈。      
我们可以用一段伪代码来模拟这个过程，
```js
// 上下文执行栈
Stack = []
// 第一段
Stack.push(<checkscope>);
Stack.push(<f>);
Stack.pop();
Stack.pop();

// 第二段
Stack.push(<checkscope>);
Stack.pop();
Stack.push(<f>);
Stack.pop();
```
