### 实现并发请求队列

```javascript
function requestQueue(thisArg, limit = 0) {
  return new Promise((resolve, reject) => {
    try {
      const queue = [];
      const result = [];
      const copier = [...thisArg];

      queue.uuid = -1;
      queue.run = function () {
        let times = 0;
        const len = thisArg.length;
        limit < 0 && (limit = 0);
        limit = limit < len ? limit : len;
        while (times++ < limit) {
          this.createTask();
        }
      };

      queue.createTaskModel = function (promise) {
        return Object.freeze({
          id: ++this.uuid,
          promise
        });
      };

      queue.createTask = function () {
        const promiseFunc = copier.shift();
        const promise = promiseFunc();
        const task = this.createTaskModel(promise);
        this.add(task);
      };

      queue.add = async function (task) {
        try {
          this.push(task);
          const value = await task.promise;
          result[task.id] = value;
          this.remove(task);
          copier.length && this.createTask();
          console.log(`当前并发数：${this.length < 10 ? '0' : ''}${this.length}, 当前值：${value};`);
            !this.length && resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      queue.remove = function (task) {
        const postion = this.indexOf(task);
        this.splice(postion, 1);
      };

      queue.run();

    } catch (error) {
        reject(error);
    }
  })
}

function test() {
  function sleep(value) {
    value = value + 1;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`[${value < 10 ? '0' + value : value}]`);
      }, Math.random() * 1000);
    });
  }

  function createTask(max) {
    const ret = [];
    for (let i = 0; i < max; i++) {
      ret.push(() => sleep(i))
    }
    return ret;
  };


  requestQueue(
    createTask(99),
    10
  ).then(res => {
    console.log(res);
  })
}

test()

```