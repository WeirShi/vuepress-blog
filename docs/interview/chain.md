### jQuery的链式调用
如下代码
```js
$('.class')
  .eq(1)
  .click(function() {
    console.log('click')
  })
  .end()
  .eq(2)
```
jQuery的方法都是挂载到原型上的，每次调用方法其内部都会返回`this`本身实例对象，继而可以链式调用原型上的其他方法。

### Promise的链式调用
```js
function syncFn() {
  return new Promise((resolve, reject) => {
    resolve('syncFn')
  })
}
syncFn()
  .then(res => {
    console.log(res)
  })
  .then(
    console.log('then')
  )
```
`Promise`链式调用中的每一个`then`方法都会返回一个全新的`promise`
