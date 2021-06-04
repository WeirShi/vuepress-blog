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

<!-- ## 组合继承 -->
