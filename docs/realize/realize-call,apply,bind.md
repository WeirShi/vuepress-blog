### JS实现call,apply,bind方法

#### call
简单介绍：call方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法        

实现步骤：
1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数
```javascript
Function.prototype.myCall = function(context = window, ...args) {
  let fn = Symbol()
  context[fn] = this
  let result = context[fn](...args)
  delete context[fn]
  return result
}
```

#### apply
apply的实现与call类似
```javascript
Function.prototype.myApply = function(context = window) {
  let fn = Symbol()
  context[fn] = this
  let result = arguments[1] ? context[fn](arguments[1]) : context[fn]()
  delete context[fn]
  return result
}
```

#### bind
```javascript
Function.prototype.myBind = function (context) {
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function Fn() {
    // bind方法 在new 操作后 this的指向不会改变, 所以需要判断一下
    if (this instanceof Fn) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```
