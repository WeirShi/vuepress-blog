## Promise的链式调用和jQuery的链式调用有什么区别？

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


## 如下代码，有何区别
```js
var promise = new Promise((resolve, reject) => {
  ...
})


// 第一种
promise.then(res => {
  console.log('promise then =>', res)
}).catch(error => {
  console.log('promise catch =>', error)
})

// 第二种
promise.then(res => {
  console.log('promise then =>', res)
}, error => {
  console.log('promise catch =>', error)
})
```

### 答案解析
1. 第一种`catch`方法可以捕获到整条`promise`链路上所有抛出的异常。
2. 第二种`then`方法的第二个参数捕获的异常依赖于上一个`Promise`对象的执行结果。
3. `Promise.then(successCallback, failCallback)`接收两个回调函数作为参数，来处理上一个`Promise`对象的结果。`then`方法返回的是一个`Promise`对象。    
第一种链式写法，使用`catch`方法，相当于给前面一个`then`方法返回的`Promise`对象注册回调，可以捕获到前面`then`方法没有处理的异常。     
第二种回调函数写法，仅是给上一个`Promise`对象注册异常回调。     
如果是`Promise`对象内部通过`reject`抛出错误后，`then`方法的第二个回调参数就能捕获得到，如果`then`的第二个参数不存在，则`catch`方法会捕获到。    
如果是`then`的第一个参数函数`resolve`中抛出了异常，即成功回调函数出现异常后，`then`的第二个参数`reject`是捕获不到的，而`catch`方法可以捕获到。