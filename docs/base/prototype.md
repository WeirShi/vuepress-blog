# 原型和继承

先看一张图片，如果能理解这张图的话，那原型和原型链基本也就没有什么问题了！
![原型和原型链](/assets/images/proto.jpg)



看到一句话：JS中一切引用类型都是对象，对象就是属性的集合。
`Array`, `Function`, `Object`, `Date`, `RegExp`都是引用类型

## 原型
正常我们创建的对象和函数
```
var obj = { a: 1 }
var func = function () {}
```

它们中都存在属性 `__proto__` 和 `constructor`, `constructor`中还有一个 `prototype`属性，并且
`variable.__proto__ === obj.constructor.prototype`

## 原型链

当访问一个对象的属性时，先在对象的本身找，找不到就去对象的原型上找，如果还是找不到，就去对象的原型（原型也是对象，也有它自己的原型）的原型上找，如此继续，直到找到为止，或者查找到最顶层的原型对象中也没有找到，就结束查找，返回undefined。
**这条由对象及其原型组成的链就叫做原型链。**

很多时候，我们定义的函数方法能够使用call，bind等方法，数组可以使用push，slice等方法，都是因为原型链上找到对应的方法，继而能够访问

## 继承

1. 原型继承
## code
```javascript
function Parent(){
  this.color = 'red'
}
Parent.prototype.getName = function(){
  console.log(this.name)
}
 
function Child(){}
// 将父类的实例赋给子类的原型
Child.prototype = new Parent();
new Child();
```

2. 构造函数继承
## code
```javascript
function Parent(name){
  this.name = name;
  this.colors = ['red','green','pink'];
}
Parent.prototype.getName = function(){
  console.log(this.name)
}
function Child(value){
  //使用call()方法继承父类构造函数中的属性
  Parent.call(this, value);
  this.age = '18';
}
new Child();
```
3. 组合继承
结合原型和构造函数的继承方式
## code
```javascript
function Parent(){
  this.color = 'red'
}
Parent.prototype.getName = function(){
  console.log(this.name)
}
 
function Child(name){
  Parent.call(this, name);
}
Child.prototype = new Parent();
new Child();
```
4. 寄生组合继承
对组合继承进行优化
## code
```javascript
function Parent(){
  this.color = 'red'
}
Parent.prototype.getName = function(){
  console.log(this.name)
}
 
function Child(name){
  Parent.call(this, name);
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    emumerable: false,
    writable: true,
    configurable: true
  }
});
new Child();
```

5. Class 继承
ES6中，提出了 `class` 实现类的方式，继承的方式也就变成了 `extends`
## code
```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(this.name)
  }
}

class Child extends Parent {
  constuctor(name) {
    // super 相当于是 Parent.call(this, name)
    super(name)
  }
}

new Child()
```