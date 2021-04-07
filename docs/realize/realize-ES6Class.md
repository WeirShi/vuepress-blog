### 用ES5来实现class功能

ES6中提出了class 语法糖来定义类，其本质还是js中的原型prototype，因此用ES5来实现class的功能，也就是prototype的原型继承方法


```
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function (food) {
  console.log(`${this.name} eat: ${food}`);
};

function Cat(name, color) {
  this.color = color;
  Animal.call(this, name);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.getColor = function () {
  console.log(`${this.name}'s color: ${this.color}`);
};

const tom = new Cat("tom", "black");
tom.eat("fish");
tom.getColor();

```