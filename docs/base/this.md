# this指向问题

## 理解this

this问题在很多面试中都会被提到，那到底什么是this，如何去理解this？

- 首先我们要知道在JS中有一个最基本的概念：执行上下文
- 关于this的指向，我们可以先记住以下几条规律
  1. 在函数的简单中，严格模式下(use strict)，函数内的this会被指向undefined，在非严格模式下，this会指向window/global
  2. 使用new方法调用的构造函数，构造函数内的this一般指向到创建的对象上
  3. 函数通过call/apply/bind方法调用后，函数内的this会指向到传入的指定参数的对象上
  4. 在上下文对象调用函数时，函数内的this一般都指向该对象
  5. 箭头函数中的this，一般都是由外层作用域继承而来(函数体，对象，或者全局window/global)


## 举例说明
1. 全局环境(浏览器环境)

```javascript
// 非严格模式
function a () {
  console.log(this)
}
// 严格模式
function b () {
  'use strict'
  console.log(this)
}
a() // window
b() // undefined

变式1：
var f = {
  a: 1,
  fn: function() {
    console.log(this.a)
  }
}
var f1 = f.fn
f1() // undefined
/* 
  原因:
  f对象中fn函数 赋值给了变量f1，最终调用f1函数的仍为全局环境window
  此时this指向window，即为window.a
  window对象下没有a变量，所以最终打印出来的是undefined
*/

变式2：
var f = {
  a: 1,
  fn: function() {
    console.log(this.a)
  }
}
f.fn() // 1
/* 
  原因:
  此时通过调用f.fn函数，那调用fn的宿主对象为f，这个时候this指向的是f对象：{ a: 1, fn: function }
  因此打印出来的是f.a的值 1
*/
```

2. 执行上下文
 - 上文中最后一个例子其实就是执行上下文中的this
 - 存在嵌套关系时，也要查看调用的上下文

```javascript
var a = {
  name: 'Tom',
  b: {
    name: 'Jerry',
    fn: function() {
      return this.name
    }
  }
}

console.log(a.b.fn()) // 'Jerry'
/* 
  原因:
  调用fn函数的对象是b，所以这个时候this指向的是b对象,
  因此打印出来的是f.a的值 1
*/
```

- 复杂情况

```javascript
const o1 = {
  text: 'o1',
  fn: function() {
    return this.text
  }
}
const o2 = {
  text: 'o2',
  fn: function() {
    return o1.fn()
  }
}
const o3 = {
  text: 'o3',
  fn: function() {
    var fn = o1.fn
    return fn()
  }
}
console.log(o1.fn())
console.log(o2.fn())
console.log(o3.fn())

/* 
  题解:
  1. console.log(o1.fn())  // 'o1'
    第1个console不过多解释，执行上下文，this指向的是o1对象，所以打印出来的是o1
  2. console.log(o2.fn()) // 'o1'
    第2个console, o2.fn 返回的是 o1.fn函数执行后的结果，o1.fn执行后结果与第1个相同，this依旧指向的是o1对象，所以打印出来的还是o1
  3. console.log(o3.fn()) // 'undefined'
    第3个console, 此时执行上下文发生了变化，this指向到了window下，因此打印出来的是undefined
    (将o1.fn复制给了变量fn，而o3.fn执行时返回了一个匿名函数，最终调用函数的上下文为window)
*/
```

3. 通过call、bind、apply修改this的指向
一般情况下，如果我们需要进行this指向的改变，我们可以使用call、bind和apply函数进行调用   
考察的点也是这3者之间的区别
- bind方法最大的不同在于，经过bind调用，返回的是一个全新的，this已经指向目标对象的函数，需要开发者自己进行调用；而call和apply都会进行函数调用
- call和apply的区别仅在于，arg参数的不同，apply传入的是(target, [arg])，call传入的是(target, arg1, agr2, ...)

4. 构造函数中的this
根据之前讲的规则中，一般情况下构造函数中的this指向的都会是这个构造函数，比如

```javascript
var Fn = function() {
  this.name = 'Tom'
}
var instance = new Fn()
console.log(instance.name) // 'Tom'
```
PS: 这里会问到new操作符做了什么事情？如何手写一个new方法？

另外构造函数中this的指向还会存在一种情况，比如

```javascript
var Fn = function() {
  this.name = 'Tom'
  this.num = 1
  return this.num
}
var instance = new Fn()
console.log(instance.name) // 'Tom'

var Fn = function() {
  this.name = 'Tom'
  this.obj = {
    name: 'Jerry'
  }
  return this.obj
}
var instance = new Fn()
console.log(instance.name) // 'Jerry'
/*
 * 这边第1中情况下，构造函数返回了一个数字，此时this依然指向的是Fn这个构造函数，而第2中情况下，返回了一* 个对象，此时this的指向已经发生了变化，指到了obj这个对象，所以第2个打印出来的是'Jerry'
 */
```
所以当构造函数返回的是一个基本数据类型时，this依旧指向当前实例，如果构造函数返回的是一个对象(复杂类型)时，则this就会指到这个对象

5. 箭头函数中的this
在箭头函数中，this的指向都是由函数的作用域来决定的(箭头函数中的this是继承而来)

```javascript
var a = {
  fn: function () {
    setTimeout(function() {
      console.log(this);
    }, 0)
  }
}
console.log(a.fn()) // this指向window

var a = {
  fn: function () {
    setTimeout(() => {
      console.log(this)
    }, 0)
  }
}
console.log(a.fn()) // this指向对象a

/*
 * JavaScript高级程序设计中的一句话：超时调用的代码都是在全局作用域中执行的，因此函数中的this的值在非严格模式下指向window对象，在严格模式下是undefined。因此前者的this指向window
 * 而后者通过箭头函数的调用，当前函数作用域为a对象，所以this的指向为a { fn: funtion }
 */
```

