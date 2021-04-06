#### 实现string.indexOf

```
function myIndexOf(target, str) {
  const type = typeof str;
  if (type === "symbol") {
    throw Error("Cannot convert a Symbol value to a string at String.indexOf")
  } 
  if (type !== "string") {
    str = str.toString()
  }
  if (str.length === 0) {
    return 0;
  }
  if (str.length > target.length || !str) {
    return -1
  }
  for (let i = 0; i < target.length; i++) {
    if (target[i] === str[0]) {
      // 截取当前位置i 到 i+str.length的字符串与str进行比较
      const s = target.slice(i, i + str.length)
      // 如果相同则返回i，否则返回-1
      if (s === str) {
        return i
      } else {
        return -1
      }
    } 
  }
}

```
