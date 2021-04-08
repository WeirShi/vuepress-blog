#### 实现Promise.all

- Promise.all 传入的参数是一个 每一项都是Promise对象的数组数据
- 输出是一个新的Promise实例value（2种情况 reslove一个数组 或reject第一个错误）
- 要做的工作：
  1. 检查是否传入的为数组
  2. 检查传入的每一项是否为Promise实例，如果不是，创建一个新的Promise实例
  3. 执行每一个Promise实例，获取resolve的value，并组成一个数组Arr，作为新创建Promise实例的reslove的对象，如果其中有不合法的错误或者reject, Promise实例会立即抛出第一个错误

```javascript
function isPromise(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Promise';
}


function myPromiseAll(list) {
  // 数组类型检查
  if (!Array.isArray(arr)) {
    throw new Error('argument is not Array')
  }
  return new Promise(function (reslove, reject) {
    try {
      let result = []
      for (let item of arr) {
        // 检查实例是否为Promises实例
        if (!isPromise(item)) {
            // 没有的话返回当前值（为了保证按顺序执行，自己封装一个Promise实例）
            item = new Promise(function (reslove, reject) {
              reslove(item)
            })
        }
        item.then((res, err) => {
          if (err) {
            throw new Error(err)
          } else {
            result.push(res)
            if (arr.indexOf(item) == arr.length - 1) {
              reslove(result)
            }
          }
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});
const promise4 = function name(params) {
    
};
_all([promise2, promise1, promise4,promise3]).then(res => {
    console.log(res, 'cc');
})
//[ 42, 3, [Function: name], 'foo' ] cc
```