## 如下代码，写出它们结果打印的先后顺序，并分析出原因
```js
console.log("AAAA");
setTimeout(() => {
  console.log("BBBB")
}, 1000);
const start = new Date();
while (new Date() - start < 3000) {}
console.log("CCCC");
setTimeout(() => {
  console.log("DDDD")
}, 0);
new Promise((resolve, reject) => {
  console.log("EEEE")
  foo.bar(100)
})
  .then(() => console.log("FFFF"))
  .then(() => console.log("GGGG"))
  .catch(() => console.log("HHHH"));
console.log("IIII");
```
