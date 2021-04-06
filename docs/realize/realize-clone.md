### 浅拷贝
只遍历第一层
```
function shadowClone(obj) {
  let cloneData = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    cloneData[key] = obj[key];
  }
  return cloneData;
}
```


### 深拷贝

简单实现，递归
```
function deepClone(obj) {
  // 设置数据类型
  let cloneData = Array.isArray(obj) ? [] : {};
  if(obj && typeof obj === "object"){
    for(key in obj){
      if(obj.hasOwnProperty(key)){
        // 判断子元素是否为对象，如果是，递归复制
        if(obj[key] && typeof obj[key] === "object"){
          objClone[key] = deepClone(obj[key]);
        }else{
          // 如果不是，简单复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return cloneData;
}
```

```
/* 实现深拷贝函数, 要满足以下要求
 * 1. 支持数组，正则，函数以及JSON支持的数据类型
 * 2. 解决循环引用的问题
 */
function isType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}
function deepClone(obj) {
  switch (isType(obj)) {
    case 'Null':
    case 'Undefined':
    case 'Symbol':
    case 'String':
    case 'Number':
    case 'Boolean':
      return obj
  }
  const map = new WeakMap()
  const temp = map.get(obj)
  if (temp) {
    return temp
  }

  // 其他包装类型
  switch (isType(obj)) {
    case 'RegExp':
    case 'Date':
    case 'Error':
      return new obj.constructor(obj.valueOf())
  }

  const resObj = Array.isArray(obj)  ? [] : {}
  map.set(obj, resObj)
  // for in 会遍历到原型链上的属性
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      resObj[k] = deepClone(obj[k], map)
    }
  }
  return resObj
}
```