# ES6的新特性

## Map、Set、WeakMap、WeakSet
### Set
类似于传统的数组，但是`Set`中的成员不允许重复
### Map
传统的对象的key只能是字符串，如果使用对象作为key值的话，js会优先使用toString的方法转成string来作为key值      
Map的数据结构可以使用任意类型的数据作为key

### WeakMap
`WeakMap`只能使用对象作为key值，而被引用的key值是弱引用，因此该对象可能在任意时刻被回收掉。     
`WeakMap`无法被遍历，没有`Object.keys()`、`Object.values()`、`Object.entries()`方法，只有`get`、`set`、`has`、`delete`4个方法。  
### WeakSet
类似于`WeakMap`， 内部成员只能是对象，对其中的对象也是弱引用，当没有其他对`WeakSet`中的对象的引用的话，这些对象会被回收掉，`WeakSet`同样无法被遍历


## Symbol
ES6中新增了一种数据类型，`Symbol`，不是构造函数，在使用时不需要`new`，用来表示一个独一无二的数据，对象的key可以是`Symbol`。     
`Symbol`也可以用来标识对象中的私有成员，因为`Symbol`的唯一性，外部访问时无法创建同一个`Symbol`数据，因此可以用来表示对象中的私有成员。正因如此，如果对象的key是一个`Symbol`类型的话，是无法遍历得到这个key值的，既无法使用`Object.keys`或者`for of`遍历，只能使用`Object.getOwnPropertySymbols`方法来获取`Symbol`类型的key值。



如果需要使用同一个`Symbol`类型的数据，我们可以使用`Symbol.for`方法，传入同一个字符串时，返回的`Symbol`类型的数据也会是一样的，
```js
const s1 = Symbol.for('symbol')
const s2 = Symbol.for('symbol')

console.log(s1 === s2)   // true
```
需要注意的是该方法如果传入的值不是字符串的话，Symbol内部会先将其传值字符串，因此传入一个`true`和字符串`'true'`，返回的Symbol数据也会是同一个

## Reflect

`Reflect`是ES6中引入的对象操作方法，一个静态类，不能使用`new Reflect()`来进行调用，类似于`Math`，内置的静态方法与`proxy`的方法相同。      
**个人感觉 `Reflect`的引入是对ES5中操作对象方法的规范处理**    

比如，在ES5中需要获取对象中的某一个属性，或者删除对象中某一个属性，我们都会使用到`'name' in obj`, `delete obj['name']`，既使用到`delete`操作符又用到了`in`运算符，看起来很不规范，但是在`Reflect`中我们就可以统一使用`Reflect`的内置方法，`Reflect.has(obj, 'name')`和`Reflect.deleteProperty(obj, 'name')`，这样看起来就比较统一规范。如下：
```js
var obj = {
  name: 'Tom'
  age: 100
}

// ES5方法
'name' in obj
delete obj.name
Object.keys(obj)

// Reflect
Reflect.has(obj, 'name')
Reflect.deleteProperty(obj, 'name')
Reflect.ownKeys(obj)
```

### Reflect的静态方法
1.  `Reflect.get()` 获取对象中的某一个属性，类似于执行`obj['name']`
2.  `Reflect.set` 给对象设置属性和值
3.  `Reflect.has()` 判断对象中是否存在某一个属性，类似于`in`运算符
4.  `Reflect.ownKeys()` 获取对象中所有的属性值，返回一个数组，类似于`Object.keys()`
5.  `Reflect.deleteProperty()` 删除对象中的某一个属性，类似于`delete`操作符
6.  `Reflect.apply()` 对一个函数的调用，类似于`Function.prototype.apply()`
7.  `Reflect.construct()` 创建一个构造函数，类似于`new`操作符
8.  `Reflect.defineProperty()` 设置一个响应式对象，类似于`Object.defineProperty()`
9.  `Reflect.getOwnPropertyDescriptor()` 获取对象中的某一个属性的描述，类似于`Object.getOwnPropertyDescriptor()`
10. `Reflect.getPropertyOf()` 获取指定对象的原型，类似于`Object.getPropertyOf()`
11. `Reflect.setPropertyOf()` 给对象设置原型
12. `Reflect.preventExtensions()` 设置一个对象无法添加新的属性，类似与`Object.preventExtensions()`
13. `Reflect.isExtensible()` 判断对象是否可以添加新的属性，类似与`Object.isExtensible()`