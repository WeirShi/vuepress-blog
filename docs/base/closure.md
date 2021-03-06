# 闭包问题

闭包是一个老生常谈的问题了，面试的时候经常会被问到，所以到底什么是闭包？闭包有什么作用？

## 什么是闭包

《JavaScript高级程序设计》第三版中讲到：闭包是指有权访问另一个函数作用域中的变量的函数

简单理解闭包的含义：函数嵌套函数时，内层函数引用了外层函数作用域下的变量，并且内层函数在全局环境下可访问，从而形成闭包


```javascript
function fn() {
  let num = 1

  return function () {
    console.log('this', this) // this -> window
    console.log('num', num)
  }
}

const n = fn();
```
![闭包](/assets/images/closure.jpg)


这个例子中，通过浏览器调试后可以看到，正常情况下函数调用后，作用域环境指到了window对象下，是无法访问函数内部变量的，但是现在依然能够访问到num变量。因为在fn函数中返回了另一个函数，通过调用这个函数获取到了fn内部的num变量，此时浏览器会给num变量打上一个Closure标签(闭包变量)



## 闭包的优缺点
缺点：由于闭包中的变量是不会被回收的，大量使用闭包后有可能会导致内存泄露    
优点：我们可以利用闭包来实现模块化，在很多框架代码中都会使用到闭包的概念


## 扩展
1. MDN对闭包的定义为：**闭包是指那些能够访问自由变量的函数。**
2. 什么是自由变量？**自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。**
3. 《JavaScript权威指南》中讲到：**从技术的角度讲，所有的JavaScript函数都是闭包。**
4. ECMAScript中，闭包指的是：
  - 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
  - 从实践角度：以下函数才算是闭包：
    - 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
    - 在代码中引用了自由变量

