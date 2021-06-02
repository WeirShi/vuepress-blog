# JS中创建对象的多种方式及优缺点

## 工厂模式
```js
function createPerson(name) {
  var obj = new Object()
  o.name = name
  o.getName = function() {
    return this.name
  }
  return o
}

var person = createPerson('Tom')
```
缺点：对象无法识别，因为所有的实例都指向一个原型

## 构造函数模式
```js
function Person(name) {
  this.name = name
  this.getName = function() {
    return this.name
  }
}

var person = new Person('Tom')
```
优点：实例可以识别为一个特定的类型     
缺点：每次创建实例时，每个方法都要被创建一次

### 构造函数模式1
```js
function Person(name) {
  this.name = name
  this.getName = getName
}

function getName() {
  return this.name
}

var person = new Person('Tom')
```
优点：解决了每个方法都要被创建一次的问题      
缺点：封装性有点差。。。。

## 原型模式
```js
function Person(name) {}
Person.prototype.name = 'Tom'
Person.prototype.getName = function() {
  return this.name
}

var person = new Person()
```
优点：方法不会重复创建    
缺点：所有的属性和方法都是共享的；不能初始化参数

### 原型模式1
```js
function Person(name) {}
Person.prototype = {
  name: 'Tom',
  getName: function() {
    return this.name
  }
}
var person = new Person()
```
优点：增强了封装性     
缺点：重写了原型，丢失了constructor属性

### 原型模式2
```js
function Person(name) {}

Person.prototype = {
  constructor: Person,
  name: 'kevin',
  getName: function () {
    return this.name
  }
}
var person = new Person()
```
优点：实例可以通过constructor属性找到所属的构造函数      
缺点：继承了原型模式的缺点

## 组合模式
构造函数模式与原型模式结合
```js
function Person(name) {
  this.name = name
}

Person.prototype = {
  constructor: Person,
  getName: function () {
    return this.name
  }
}

var person = new Person()
```
优点：该共享的共享，该私有的私有，使用最广泛的方式      
缺点：更好的封装性

