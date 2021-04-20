# 模拟Vue响应式原理

## 模拟实现的Vue基本结构
我们需要实现Vue如下的结构
```html
...
<body>
  <div id="app">
    <h1>插值表达式</h1>
    <h3>{{ msg }}</h3>
    <h3>{{ count }}</h3>
    <h1>v-text</h1>
    <div v-text="msg"></div>
    <h1>v-model</h1>
    <input type="text" v-model="msg" />
    <input type="text" v-model="count" />
  </div>

  <!-- 这是我们需要实现的vue.js -->
  <script src="vue.js"></script>
  <script>
    let vm = new Vue({
      el: "#app",
      data: {
        msg: "hello wrold",
        count: 100
      }
    })
  </script>
<body>
...
```


## 观察Vue实例中的属性，并简单模拟实现
![vue实例](/assets/images/observe-vm.jpg)
如图所示，vue的实例当中存在很多属性，本文中我们只简单实现红线框出来的内容。       
在Vue实例中，vue会把data中的属性转换到实例中，这样做我们就可以使用`this.xxx`直接访问到该属性。`data`对象被Vue转成的`$data`属性，并设置了`getter`,`setter`方法，用来数据监听，传入的构造函数option对象转成了`$options`对象。

## 实现的Vue的整体结构
![整体结构](/assets/images/observe.jpg)
1. Vue的实例
2. Observer对象对data中的属性进行数据监听，数据发生变化后会通知Dep
3. Compiler是对template中的表达式进行解析，完成数据的转换
4. Dep是用来添加Watcher，当数据发生变化时会通知所有的Watcher
5. Watcher中的update方法，用于更新View视图

### Vue类
- 负责接收初始化的options参数
- 负责把data中的属性注入到实例中，并转换成getter/setter
- 负责调用observer监听data中所有属性的变化
- 负责调用compiler解析指令/插值表达式，在View视图中绑定数据

```javascript
class Vue {
  constructor(options) {
    // 1. 通过属性保存选项的数据
    this.$options = options || {}
    // 2. 把data中的属性注入到实例中，并转换成getter/setter
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    this._proxyData(this.$data)
    // 3. 调用observer对象监听数据变化
    new Observer(this.$data)
    // 4. 调用compiler对象解析指令、插值表达式
    new Compiler(this)
  }

  _proxyData(data) {
    // 遍历data中的所有属性
    Object.keys(data).forEach(key => {
      // 把data中的属性注入到Vue实例中
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newVal) {
          if (data[key] === newVal) {
            return
          }
          data[key] = newVal
        }
      })
    })
  }
}
```
### Observer类
- 负责把data中的属性转成响应式数据
- data中的某个属性也是对象时，需要递归调用把该对象中的所有属性转换成响应式数据
- 当数据发生变化时发送通知
- 内部结构：walk(data)、defineReactive(data, key, value)

```javascript
class Observer {
  constructor(data) {
    this.walk(data)
  }

  // 遍历data所有属性
  walk(data) {
    // 判断data是否为空值，对象
    // 如果是对象，遍历
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  // 定义响应式数据, 把data中的数据属性转成响应式数据
  // defineReactive为什么要传第3个参数？
  // 如果我们将defineReactive中的get方法改成return data[key]时，此时相当于又触发了当前属性的get方法，会造成一个递归循环调用导致堆栈溢出的报错
  defineReactive(data, key, value) {
    // 保存this指向问题
    const self = this
    // 如果value是对象，递归调用将value中的属性转成响应式数据
    this.walk(value)
    // 创建dep对象 收集依赖并发送通知
    let dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 当外部有访问属性的动作时
        // 此处就形成了一个闭包
        
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newVal) {
        if (newVal === value) {
          return
        }
        value = newVal
        // 当数据被赋值为对象时，也需要递归调用将新数据中的属性转成响应式数据
        self.walk(newVal)
        // 当数据变化时发送通知
        dep.notify()
      }
    })
  }
}
```

### Compiler类
- 负责编译template模板，解析指令/插值表达式
- 负责页面的首次渲染
- 当数据发生变化后重新渲染View视图
- 内部属性结构：`el`、`vm`、`compile(el)`、`compileElement(node)`、`compileText(node)`、`isDirective(attrName)`、`isTextNode(node)`、`isElementNode(node)`

```javascript
class Compiler {
  constructor(vm) {
    this.el = vm.$el
    // vue实例
    this.vm = vm

    this.compile(this.el)
  }

  // 编译模板 处理文本节点和元素节点
  compile(el) {
    console.log(el)
    if (!el) {
      return
    }
    // 伪数组
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      }
      // 处理元素节点
      if (this.isElementNode(node)) {
        this.compileElement(node)
      }

      // 判断node是否有子节点，如果有需要递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 编译元素节点处理指令  这里只模拟 v-text v-model
  compileElement(node) {
    // console.log(node.attributes)
    // 遍历所有的属性节点
    
    Array.from(node.attributes).forEach(attr => {
      // 判断是否为指令
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        // v-text -> text v-model -> model
        attrName = attrName.substr(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })

  }

  update(node, key, attrName) {
    let updateFn = this[`${attrName}Updater`]
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }

  // 处理v-text
  textUpdater(node, value, key) {
    node.textContent = value
    console.log(this)
    // 此处this.vm无法访问, updateFn的this指向问题
    new Watcher(this.vm, key, newVal => {
      node.textContent = newVal
    })
  }

  // 处理v-model
  modelUpdater(node, value, key) {
    node.value = value
    new Watcher(this.vm, key, newVal => {
      node.value = newVal
    })
  }

  // 处理文本节点，插值表达式
  compileText(node) {
    // console.dir(node)
    // {{ msg }} 使用正则来匹配
    let reg = /\{\{(.+?)\}\}/
    // 文本节点内容
    let value = node.textContent
    if (reg.test(value)) {
      // 属性名
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])

      // 创建Watcher对象，数据变化时更新View视图
      new Watcher(this.vm, key, newVal => {
        node.textContent = newVal
      })
    }
  }

  // 判断元素属性是否是指令 v-xxx
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  // 判断是否为文本节点 nodeType === 3 文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }

  // 判断是否为元素节点  nodeType === 1 元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}
```

### Dep(Dependency)类
- 收集依赖，添加观察者(Watcher)，在data的getter中收集依赖，在setter中通知依赖
- 通知所有Watcher
- 内部结构：`subs`、`addSub(sub)`、`notify()`

```javascript
class Dep {
  constructor() {
    // 存储所有的Watcher对象
    this.subs = []
  }

  // 添加Watcher
  addSub(sub) {
    // 判断sub对象是否为Watcher
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }

  // 发送通知
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
```

### Watcher类
![watcher](/assets/images/watcher.jpg)

- 当数据发生变化时触发依赖，dep通知所有的Watcher实例更新View视图
- 自身实例化的时候往dep对象中添加自己
- 内部结构：`vm`、`key`、`callback`、`update()`

```javascript
class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm
    // data中的属性名 key
    this.key = key
    // 回调函数负责更新View视图
    this.cb = callback

    // 把Watcher对象记录到Dep中的target
    // 触发get方法，在get中调用addSub
    Dep.target = this


    // 保存旧值  访问属性就会触发get方法
    this.oldVal = this.vm[this.key]

    // 最后置空，防止重复触发
    Dep.target = null
  }

  // 当数据发生变化时更新View视图
  update() {
    let newVal = this.vm[this.key]
    if (this.oldVal === newVal) {
      return
    }
    this.cb(newVal)
  }
}
```

### 数据双向绑定
1. 当数据发生变化时，View视图也发生变化
2. 当View视图变化时，数据也发生变化

表单元素中v-model绑定的值，默认添加input事件，当视图中值发生变化时，通过input事件将更改后的值赋值给实例中的对应属性，当对应属性值发生变化后就会触发数据响应式机制。    
在Compiler类中处理v-model指令的函数中添加代码
```javascript
 modelUpdater(node, value, key) {
    ...
    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
```

## 完整代码
完整的代码见[github](https://github.com/WeirShi/vue-study)

## 总结
整体流程
![整体流程](/assets/images/summary.jpg)