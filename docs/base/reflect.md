# Reflect

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

## 静态方法
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