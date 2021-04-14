# 实现instanceof

```javascript

var myInstanceOf = function(target, source) {
  // 目标对象的原型
  let proto = target.prototype
  // 资源的原型
  source = source.__proto__

  // 判断目标对象的原型是否等于资源的原型
  while (true) {
    if (source === null) {
      return false
    }
    if (prototype === source) {
      return true
    }
    source = source.__proto__
  }
}

```