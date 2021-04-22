# Vue3中ref和reactive的区别

Vue3正式发布以后，已经有很多同学都开始投入使用了，在使用的过程中，我们发现Vue3中有2种声明响应式数据的方法`ref()`、`reactive()`。    
那这两种方式有什么不一样的呢？


```javascript
import { ref, reactive } from 'vue'
export default {
  setup() {
    const num = 10
    const num1 = ref(10)
    const num2 = reactive(100)

    console.log('num', num)
    console.log('num1', num1)
    console.log('num2', num2)

    return {
      num,
      num1,
      num2
    }
  }
}
```

如上，我们通过变量声明，ref和reactive的方式定义了3个变量，控制台输出打印

![打印](/assets/images/vue3-reactive.jpg)

发现用`reactive`定义number变量时，vue给出了一个警告，提示这个值不能被reactive创建，这是为什么呢？   
于是去查看了一下vue3源码

![reactive源码](/assets/images/vue3-reactive1.jpg)

从源码中可以看到，当使用`reactive`定义数据时，会先进行判断定义的数据是否是对象，是对象的话才会继续进行数据响应式的处理，反之就直接被return出来了。    
由此我们可以看出来官方在使用`reactive`这个API的时候更推荐用来定义对象类型的数据。

因此上面的代码，我们可以改成
```javascript
const num2 = reactive({ num: 100 })
```
这样控制台就不会有警告信息了。    

另外一个区别就是在使用的过程中，`ref`定义的数据都要使用`.value`来访问，而`reactive`不需要。


## 总结
1. `reactive`和`ref`都是用来定义响应式数据的，而`reactive`更推荐用来定义对象，`ref`更推荐定义基础数据类型，但是`ref`也可以定义数组和对象
2. 在访问数据的时候，`ref`需要使用`.value`，而`reactive`不需要

