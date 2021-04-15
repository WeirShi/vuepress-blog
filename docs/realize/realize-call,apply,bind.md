### JS实现call,apply,bind方法

#### call
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
