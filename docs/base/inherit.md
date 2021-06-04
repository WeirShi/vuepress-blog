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

