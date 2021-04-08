实现new，首先就要知道 `new` 操作，里面到底做了些啥？
- 创建一个空对象，将它的引用赋给`this`，继承函数的原型。
- 通过 `this` 将属性和方法添加至这个对象
- 最后返回 `this` 指向的新对象，也就是实例（如果没有手动返回其他的对象）

实现方法
## code
```javascript
function myNew(Parent, ...args) {
  // 创建一个空对象，基础父级的原型
  let obj = Object.create(Parent.prototype)
  // 把this对象和剩余参数给构造函数
  let result = Parent.apply(obj, args)
  // 最后返回对象
  return typeof result === 'object' ? result : obj
}
```
