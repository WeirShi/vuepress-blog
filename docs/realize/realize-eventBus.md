### 实现Event Bus

```javascript

class Event {
  constructor() {
    this.events = new Map()
  }

  /* 添加事件
   * key 标识符
   * fn 回调事件
   * isOnce 是否只执行一次
   */
  addEvent(key, fn, inOnce, ...arguments) {
    // 当前标识符的回调是否存在，如果存在，取出缓存中的数据，反之存入缓存
    const value =
      this.events.get(key) 
      ? this.events.get(key)
      : this.events.set(key, new Map()).get(key)
    value.set(fn, (...args) => {
      fn(...arguments, ...args)
      // 如果是只执行一次，卸载改函数
      isOnce && this.off(key, fn)
    })
  }

  // 挂载
  on(key, fn, ...args) {
    if (!fn) {
      throw Error('没有传入回调函数')
      return
    }
    this.addEvent(key, fn, false, ...args)
  }

  fire(key, ...args) {
    if (!this.events.get(key)) {
      throw Error(`没有 ${key} 事件`)
      return;
    }
    for (let [_, cb] of this.events.get(key).entries()) {
      cb(...args);
    }
  }

  // 卸载
  off(key, fn) {
    if (this.events.get(key)) {
      this.events.get(key).delete(fn);
    }
  }

  // 函数只执行一次
  once(key, fn, ...args) {
    this.addEvent(key, fn, true, ...args)
  }
}

export default Event
```