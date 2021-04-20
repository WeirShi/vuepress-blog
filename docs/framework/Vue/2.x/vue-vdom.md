# Vue中的Virtual Dom

## 什么是Virtual Dom(虚拟Dom)？
vDom是由普通的JS对象来描述Dom对象，并不是真实的Dom对象，因此称之为虚拟Dom

## 为什么要使用vDom？
我们可以先页面控制台中打印一个真实的Dom对象
```javascript
let el = document.querySelector('#app')
let s = ''
for (var key in el) {
  s += `${key},`
}
console.log(s)
```
![dom](/assets/images/vue-dom.jpg)

我们可以发现一个div中有很多属性，操作一个真实dom的开销是十分巨大的。   

- 在以前jQuery的时代，我们都是通过手动操作Dom，来更新页面视图，但是随着项目越来越复杂，操作Dom的成本也变的越来越大
- 为了简化Dom的复杂操作，就出现了各种MVVM框架，解决了View和Model之间的同步问题
- 为了简化View的操作，我们用了template模板引擎，但是模板引擎没有解决数据变化的问题，由此，诞生了vDom
- vDom的优势是当数据状态改变时不需要立即更新DOM，而是先创建一个vDom-tree来表示Dom的变化，通过vDom内部的比较，弄清楚哪些Dom数据需要更新(diff算法)
  - 虚拟Dom可以维护程序的状态，跟踪上一次的状态
  - 通过比较前后两次状态的差异更新真实Dom

## vDom的作用
- 维护视图和状态的关系
- 复杂视图情况下提升渲染性能
- 除了渲染Dom之外，还可以实现SSR(Nuxt/Next.js)、App应用(Weex/React Native)、小程序(uni-app/Taro/mpvue)等
- vDom库：
  - [snabbdom](https://github.com/snabbdom/snabbdom)
    - Vue2.x内部使用的改造的snabbdom
    - 通过模块可扩展
    - TS开发
    - 最快的vDom之一
  - [virtual-dom](https://github.com/Matt-Esch/virtual-dom)