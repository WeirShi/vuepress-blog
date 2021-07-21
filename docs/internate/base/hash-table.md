# 哈希表

## 什么是哈希表
哈希表（Hash table，也叫散列表），是根据关键码值(Key value)而直接进行访问的数据结构。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做散列函数，存放记录的数组叫做散列表(哈希表)。

1. **可以根据一个key值来直接访问数据，因此查找速度快**

2. **哈希表是一个数据结构**

3. **哈希表本质上是一个数组** 底层是用数组实现的

4. 实现哈希表我们可以采用两种方法：数组 + 链表 ； 数组 + 二叉树

- 第一种数组+链表的形式，本质上是出现哈希冲突的一种解决办法，使用链表存放，所以综合起来叫做数组+链表的方式来实现一个哈希表，另外数组中一般就是存放的单一的数据，而哈希表中存放的是一个键值对


## JS模拟实现 HashTable
通过构造函数，ES6中的Map实例来实现HashTable

```js
function HashTable() {
  // 创建对象用于接受键值对
  var map = new Map()
  // 添加关键字，无返回值
  this.add = function (key, value) {
    //判断哈希表中是否存在key，若不存在，赋值 
    // if (!this.hasKey(key)) {
    //   map.set(key, value)
    // }
    // 存在 则需要处理hash冲突， 这里直接覆盖
    map.set(key, value)
  }

  // 删除关键字, 如果哈希表中包含key，并且delete返回true则删除，并使得size减1
  this.remove = function (key) {
    return map.delete(key)
  }

  // 哈希表中是否包含key，返回一个布尔值
  this.hasKey = function (key) {
    return map.get(key)
  }

  // 哈希表中是否包含value，返回一个布尔值
  this.hasValue = function (value) {
    return map.get(key) === value
  }

  // 根据键获取value,如果不存在就返回null
  this.getValue = function (key) {
    return this.hasKey(key) ? map.get(key) : null
  }

  // 获取哈希表中的所有value, 返回一个数组
  this.getAllValues = function () {
    var values = []
    for (let [_, value] of map) {
      values.push(value)
    }
    return values
  }

  // 根据值获取哈希表中的key，如果不存在就返回null
  this.getKey = function (value) {
    for (let [k, v] of map) {
      if (v === value) {
        return k
      }
    }
    // 遍历结束没有return，就返回null
    return null
  }

  // 获取哈希表中所有的key,返回一个数组
  this.getAllKeys = function () {
    var keys = []
    for (let [k, _] of map) {
      keys.push(k)
    }
    return keys
  }

  // 获取哈希表中记录的条数，返回一个数值
  this.getSize = function () {
    return map.size
  }

  // 清空哈希表，无返回值
  this.clear = function () {
    map.clear()
  }
}
```