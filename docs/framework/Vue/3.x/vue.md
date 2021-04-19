# Vue3.x 相关内容

## Vue3中的数据响应式原理
Vue3中的响应式原理，使用ES6中的Proxy属性, Proxy代理的是整个data对象
```javascript
// 模拟Vue中data选项
let data = {
  msg: 'hello'
}
// 模拟Vue实例
let vm = new Proxy(data, {
  get(target, key) {
    console.log('get, key:', key, target[key])
    return target[key]
  },
  set(target, key, newVal) {
     console.log('set, key:', key, target[key])
    if (target[key] === newVal) {
      return
    }
    target[key] = newVal
  }
})

vm.msg = 'Hello World'
console.log(vm.msg) // 'Hello World'
```