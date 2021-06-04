# 继承的多种方式及优缺点

## 原型链继承
```js
function Parent() {
  this.name = 'Tom'
}
Parent.prototype.getName = function() {
  return this.name
}
function Child() {}

Child.prototype = new Parent()

var child = new Child()
console.log(child.getName()) // Tom
```

这种方式会有2个问题：       
1. 引用类型的属性会被所有实例共享，比如：
```js
function Parent() {
  this.names = ['Tom', 'Jerry']
}

function Child() {}

Child.prototype = new Parent()
var child = new Child()

child.names.push('Cherry')
console.log(child.names) // ['Tom', 'Jerry', 'Cherry']

var child1 = new Child()
console.log(child1.names) // ['Tom', 'Jerry', 'Cherry']
```
2. 创建Child实例时，不能向Parent传参

## 借用构造函数(经典继承)
```js
function Parent() {
  this.names = ['Tom', 'Jerry']
}

function Child() {
  Parent.call(this)
}

var child = new Child()
child.names.push('Cherry') 
console.log(child.names) // ['Tom', 'Jerry', 'Cherry']

var child1 = new Child()
console.log(child1.names) // ['Tom', 'Jerry']
```

优点：    
1. 避免了引用类型的属性被所有实例共享
2. 可以在Child中向Parent传参，比如：
```js
function Parent(name) {
  this.name = name
}

function Child() {
  Parent.call(this)
}

var child = new Child('Tom')
console.log(child.name) // 'Tom'

var child1 = new Child('Jerry')
console.log(child1.name) // 'Jerry'
```
缺点： 方法都在构造函数中定义了，每次创建实例都会创建一遍方法

## 组合继承
原型链继承和经典继承相结合
```js
funtion Parent(name) {
  this.name = name
  this.colors = ['green', 'red', 'yellow']
}
Parent.prototype.getName = function() {
  return this.name
}
function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}
Child.prototype = new Parent
Child.prototype.constructor = Child

var child = new Child('Tom', 18)
console.log(child.name) // 'Tom'
console.log(child.age) // 18
console.log(child.colors) // ['green', 'red', 'yellow']

var child1 = new Child('Jerry', 10)
console.log(child1.name) // 'Jerry'
console.log(child1.age) // 10
console.log(child1.colors) // ['green', 'red', 'yellow']
```
缺点：调用了两次父构造函数    
优点：继承了原型链继承和构造函数的有点，是JS中最常用的继承模式

## 原型式继承
就是ES5`Object.create`方法的模拟实现，将传入的对象作为创建对象的原理
```js
function createObjedt(o) {
  function F() {}
  F.prototype = o
  return new F()
}
```
缺点：包含引用类型的属性值会被共享，这点和原型链继承一样
```js
var person = {
  name: 'Tom'
  friends: ['Jerry']
}

var person1 = createObject(person)
var person2 = createObject(person)

person1.name = 'person1'
console.log(person2.name) // 'Tom'

person1.friends.push('person2')
console.log(person2.friends) // ['Jerry', 'person2']
```
这里修改了`person1.name`的值，`person2.name`并未发生改变，是因为`person1`并没有修改原型上的`name`值     


## 寄生式继承
创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象
```js
function createObject(o) {
  var obj = Object.create(o)
  obj.getName = function() {
    console.log('this.name', this.name)
    return this.name
  }

  return obj
}
```
缺点：和经典继承一样，每次创建对象都会创建一遍方法

## 寄生组合式继承
之前提到组合继承最大的缺点是会调用两次父构造函数        
一次是设置子类型实例原型的时候
```js
Child.prototype = new Parent()
```
一次是在创建子类型实例的时候
```js
var child = new Child('Tom', 18)
```
在`new`操作的时候，会执行
```js
Parent.call(this)
```
这里，又调用了一次`Parent`构造函数.     
因此，在这里我们可以发现`child`对象里和`Child.prototype`里都有同一个属性.    
所以为了避免重复调用，我们可以这样实现：
```js
funtion Parent(name) {
  this.name = name
  this.colors = ['green', 'red', 'yellow']
}
Parent.prototype.getName = function() {
  return this.name
}
function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

// 重点来了
funtion F() {}
F.prototype = Parent.prototype
Child.prototype = new F()

var child = new Child('Tom', 18)
console.log(child)
```
这里我们可以封装一下继承方法：
```js
function createObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function prototype(child, parent) {
  var proto = createObject(parent,prototype)
  prototyoe.constructoer = child
  child.prototype = proto
}

// 调用
prototype(Child, Parent)
```
**JS高程中对寄生组合式继承**是这么说的：它只调用了一次`Parent`构造函数，因此避免了在`Parent.prototypr`上面创建不必要的，多余的属性。同时原型链还能保持不变；因此，还能正常使用`instanceof`和`isPrototypeOf`，认为这种方式是引用类型最理想的继承方式