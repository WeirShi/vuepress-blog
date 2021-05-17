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

## Proxy 对比 Object.defineProperty
1. `Object.defineProperty`只能监听对象属性的读写，`Proxy`可以监听到更多操作，例如：对象属性的delete，对对象中方法的调用
```js
// 监听对象属性的删除
const person = {
  name: 'Tom',
  age: 20
}

const personProxy = new Proxy(person, {
  deleteProperty(target, property) {
    console.log('delete', property)
    delete target[property]
  }
})

delete personProxy.age
```
2. `Proxy`可以监听数组的操作，`Object.defineProperty`要监听到数组的操作，需要重写修改原数组的操作方法
```js
const list = []
const listProxy = new Proxy(list, {
  set(target, prop, value) {
    console.log('set', prop, value)
    target[prop] = value
    return true
  }
})
listProxy.push(1)
```
3. `Proxy`是以非侵入的方式来监听对象的读写
Proxy不需要写特定的属性来监听该属性的变化，而Object.defineProperty需要写特定属性的方法来监听
```js
const person = {}
Object.defineProperty(person, 'name', {
  get() {
    return person['name']
  },
  set(value) {
    person['name'] = value
  }
})

Object.defineProperty(person, 'age', {
  get() {
    return person['age']
  },
  set(value) {
    person['age'] = value
  }
})

// Proxy写法 只需要写一次 方法即可， 更为合理
const person1 = {}

const personProxy = new Proxy(person1, {
  set(target, prop, value) {
    target[prop] = value
  },
  get(target, prop) {
    return target[prop]
  }
})
```
4. 使用`Proxy`建立响应式是对原对象进行了拷贝，创建了对象的响应式，如果修改原对象数据时是无法展示响应式的；而`Object.defineProperty`是在原对象上将对象中的属性值变成响应式

