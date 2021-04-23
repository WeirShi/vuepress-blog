# JS中的EventLoop

## 浏览器中的EventLoop
1. JS是单线程的，比如在操作Dom的时候，不能删除一个Dom节点的同时再去操作同一个Dom节点。或者在进行一个网络请求的时候，我们往往需要等待这个请求完成之后才能对请求回来的数据进行Dom的渲染。    
那浏览器到底是如何协调这些事件、交互的呢？这个时候就要用到EventLoop-事件循环机制了。

2. 任务队列
  - JS中有个任务队列的概念
  - JS中将任务主要分为宏任务(macrotask)和微任务(microtask)
    - 宏任务(macrotask): script脚本，request回调，event事件回调，setTimeour, setInterval, setImmediate(node环境)、I/O、UI rendering
    - 微任务(microtask): Promise，process.nextTick(node)

3. 执行步骤
  - 同一个上下文中，执行顺序是同步代码 -> 微任务 -> 宏任务
  
## 代码解析
```javascript
console.log("start")
setTimeout(()=>{
    console.log("timer1")
    new Promise(function(resolve){
     console.log("promise start")
      resolve();
}).then(function() {
        console.log("promise1")
    })
}, 0)

setTimeout(()=>{
    console.log("timer2")
    Promise.resolve().then(function() {
        console.log("promise2")
    })
}, 0)
console.log("end")

// 浏览器输出
// start
// end
// timer1
// promise start
// promise1
// timer2
// promise2
```
结果分析：   
在同一个上下文中，从上到下依次执行，首先遇到`console.log("start")`同步代码，先执行同步代码，所以第一个输出`start`，向下遇到第一个`setTimeout`为宏任务，塞进宏任务队列，第二个`setTimeout`同理，最后又遇到`console.log("end")`同步代码，执行并输入`end`。     
同步任务完成后，JS执行栈为空，检查微任务也为空，检查宏任务中存在需要执行的任务，所以按先进先出的规则执行宏任务队列，首先执行第一个`setTimeout`，进来首先是`console.log("timer1")`同步代码，所以执行并输入`timer1`，然后执行`new Promise`, `new Promise`中首先是`console.log("promise start")`，输出`promise start`，接着执行了`resolve`, `Promise.then`同样属于微任务，塞入微任务中挂起。这一轮宏任务执行完成，检查微任务，存在`Promise.then`,执行并输出`promise1`。
执行完成后，JS执行栈为空，继续查找宏任务，执行第二个`setTimeout`，输出`timer2`，遇到`Promise.resolve.then`微任务，塞入微任务挂起，`setTimeout`执行完成，检查微任务,执行输出`promise2`。

## async/await    

`async/await` 是ES7中推出的语法糖，是针对ES6`generate/yield`的语法糖，`async`返回的同样是一个Promise对象，遇到`await`就会等待异步操作完成，再继续执行后面的语句。**注意：`await`命令后面的`Promise`对象，运行结果可能是`rejected`，所以最好把`await`命令放在`try...catch`代码块中。**
