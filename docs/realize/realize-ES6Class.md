### 用ES5来实现class功能

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