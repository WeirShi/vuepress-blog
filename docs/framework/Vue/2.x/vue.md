# Vue 2.x相关原理

## Vue生命周期
这是Vue2.x官网上Vue2.x版本生命周期的图    
<img src="/assets/images/lifecycle.png" width = "400" alt="Vue生命周期" />

- Vue实例及生命周期钩子函数的初始化
- beforeCreate: 实例初始化之后，数据data观测和event/watcher事件配置之前调用的函数钩子，初始化注入
- created: 实例创建完成后立即被调用，这里实例完成data Observe，prooerty和method的运算，watch/event事件的回调。挂载还未开始
- beforeMount: 实例挂载之前调用，相关render函数第一次被调用
- mounted: 实例挂载完成后调用，这里可以访问到页面元素
- beforeUpdate: 数据更新时调用，发生在VDom打补丁之前
- updated: 数据更新完成后调用，组件Dom已经更新
- actived: 被keep-alive缓存的组件激活时被调用
- deactived: 被keep-alive缓存的组件停用时被调用
- beforeDestroy: 组件实例销毁之前被调用
- destroyed: 组件实例销毁之后被调用
- errorCaptured: 捕获到子孙组件的错误时被调用


## 数据响应式、双向绑定、数据驱动
1. 数据响应式：数据模型仅仅是普通的JS对象，当我们改变数据时，View会进行更新，避免DOM的操作
2. 双向绑定：
  - 数据改变，View视图改变，反之一样
  - v-model在表单中创建双向数据绑定
3. 数据驱动： Vue最独特的特性之一
  - 我们在使用Vue进行开发的时候，只需要关注数据，不需要关心数据如何渲染到View视图中

## 数据响应式的核心原理
Vue会遍历data对象中的所有属性，并使用Object.defineProperty转换setter/getter来实现数据响应式
```javascript
// 模拟Vue中data选项
let data = {
  msg: 'hello'
}
// 模拟Vue实例
let vm = {}

// 使用Object.definedProperty进行数据劫持
// Vue访问或者设置实例中的数据时，进程干预
Object.defineProperty(vm, 'msg', {
  enumerable: true, // 是否可遍历
  configurable: true, // 是否可配置，可以使用 delete删除，可以通过 defineProperty 重新定义
  // 获取值，访问器
  get() {
    return data.msg
  },
  // 设置值，设置器
  set(newVal) {
    if (newVal === data.msg) {
      return
    }
    data.msg = newVal
    // ... 数据更改后，进行操作
  }
})

vm.msg = 'Hello World'
console.log(vm.msg) // 'Hello World'
```
当data对象中存在嵌套对象时，使用**递归**调用来进行数据响应式的绑定


## Vue的设计模式：发布/订阅模式、观察者模式
1. 发布/订阅模式(EventEmitter)
  - 订阅者
  - 发布者
  - 信号中心

Vue的自定义事件以及node中的事件机制都是基于发布/订阅模式

- Vue的自定义事件
```javascript
let vm = new Vue() // 首先注册一个Vue实例

// 通过这个实例注册一个事件
vm.$on('eventName', () => {
  console.log('eventName')
})

// 通过$emit触发事件
vm.$emit('eventName')
```

Vue中兄弟组件或者父子组件中都可以使用`$on`, `$emit`来通信

2. 模拟Vue自定义事件的实现(EventEmitter)
```javascript
class EventEmitter{
  constructor() {
    // {'click': [fn1, fn2]} 同一事件名可以注册多个函数
    this.subs = Object.create(null)
  }

  // 注册时间
  $on(eventName, handler) {
    // 将事件名，事件函数存入subs中
    this.subs[eventName] = this.subs[eventName] || []
    this.subs[eventName].push(handler)
  }

  // 触发事件
  $emit(eventName, ...args) {
    if (this.subs[eventName]) {
      this.subs[eventName].forEach(handler => {
        handler(...args)
      })
    }
  }
}

// Test
let em = new EventEmiter()
em.$on('click', () => {
  console.log('click1')
})

em.$on('click', () => {
  console.log('click2')
})

em.$emit('click')
```

2. 观察者模式
- 观察者(订阅者) - Watcher
  - update()：当事件发生是，具体要做的事情
- 目标(发布者) - Dependency
  - subs数组: 存储所有的观察者
  - addSub(): 添加观察者
  - notify(): 当事件发生时，调用所有的观察者的update方法
- 没有事件中心

**简单模拟观察者模式**
```javascript
// Dependency
class Dep {
  constructor() {
    // 记录所有的订阅者
    this.subs = []
  }

  // 添加订阅者到数组中
  addSub(sub) {
    // sub对象存在且存在update方法才能存进subs数组
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }

  // 发布事件
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}


// Watcher 观察者
class Watcher {
  update() {
    console.log('update')
  }
}

// Test
let dep = new Dep()
let watcher = new Watcher()

dep.addSub(watcher)
dep.notify()
```

总结：
- **观察者模式**是具体目标调用，比如当事件触发，dep就会去调用观察者的方法，所有观察者模式的订阅者与发布者之间是存在依赖的。
- **发布/订阅模式**由统一调度中心调用，因此发布者和订阅者不需要对方的存在。
