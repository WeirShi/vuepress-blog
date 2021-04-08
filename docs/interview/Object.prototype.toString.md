## `Object.prototype.toString.call` 在使用该API时，为什么要加call方法？

我们都知道call方法是用来改变this指向的，也就是讲传入的数据最终this都指到Object上去。

然而我们都知道很多数据都有`toString`方法，比如`Object`对象自己本身也是有`toString`方法的，然而只有`Object.prototype.toString.call`才会返回数据的类型。

![toString](/assets/images/tostring.jpg)

从控制台的打印输出来看，每种数据的`toString`方法都是将传入的数据转成字符串后输出，而`obj`调用了`toString`方法转变后的格式和`Object.prototype.toString`是一样的，可以说明`obj`很有可能调用的就是`Object.prototype`上的`toString`方法
然而我们纯粹的调用了一下`Object.toString()`，却发现输出的结果是`function Object() { [native code] }`，说明`Object`对象中的`toString`函数与其原型链上的`toString`函数并不是同一个函数.

在JS中，所有的类或者构造函数，向上追溯原型链时，我们可以发现最终都会是`Object`，但是由于`Array`,`Function`等改写了`toString`方法，因此在我们想做类型判断时只能使用`Object.prototype.toString.call`方法，使用call函数改变this指向后正确输出了类型字符串。

我们可以做如下操作来进行验证

## code
```javascript
// 定义一个数组
var arr = [1, 2, 3]

// 检查数组原型上是否具有 toString() 方法
console.log(Array.prototype.hasOwnProperty('toString')) //true

// 使用数组的 toString() 方法
console.log(arr.toString()) // '1,2,3'

// delete操作符删除数组原型上的 toString()
delete Array.prototype.toString

// 删除后，再检查数组原型上是否还具有 toString() 方法
console.log(Array.prototype.hasOwnProperty('toString')) //false

// 删除后的数组再次使用 toString() 时，会向上层访问这个方法，即 Object 的 toString()
console.log(arr.toString()) // '[object Array]'

```
