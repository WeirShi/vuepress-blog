# React 内容前置知识

## React是什么？(谈谈对React的理解)
1. React是一个网页UI框架，通过组件化的方式解决视图层开发复用的问题，本质是一个组件化框架。
2. 核心思路：声明式，组件化，通用性
3. 声明式的优势在于直观与组合
4. 组件化的优势在于视图的拆分与模块复用，可以更容易做到高内聚低耦合
5. 通用性在于一次学习，随处编写：React Native，React 360等，主要靠VDom来保证实现
6. 使用React的使用范围更广，如Web，Native，VR，Shell应用
7. 劣势：技术选型和学习使用有比较高的成本，在开发大型前端应用时，需要向社区寻找并整合解决方案。

PS：React优化的看法，VDom的看法，React相关的工程架构与设计模式，主导过的React项目

  <!-- - 2005年，jQuery诞生，浏览器兼容性是当时最大的问题，JQ封装了Ajax，链式操作等众多的基础函数，但是JQ并没有解决代码组织问题，甚至JQ不能称为是一个框架，本质上JQ是一个**工具函数合计**。无论从JQ的输入端与输出端来看，一切都是混沌的，jQuery将HTML、CSS、JS组合在了一起，从而组合成了一个Web网页，JQ并没有将这些有序的组合在一起。由于这个时期的网页并不需要很多酷炫的效果，页面结构也并不是很复杂，因此JQ仍是当时较为出色的一个库函数。      
  - 当网页性能越来越好，网页结构越来越复杂，**如何组织代码结构，如何有效提升复用率，成为了大家急迫解决的问题。**    
  - 2009年，诞生了Angular，Angular拥有MAC，数据双向绑定，路由，模板，Controller，表单校验等一系列底层封装，同样拥有Angular庞大复杂的概念，在使用Angular需要编写更多的代码。但是不可否认，Angular的双向绑定是当时最大的特色
  - 2010年，Backbone.js诞生。并没有Angular大量的概念，Backbone非常友好，使得前端工程化的成本变低，开发者的学习成本同样低
  - React的思维模式是完全不同的，概念也极为简单，可简洁为一个公式：`View = fn(props, state, context)`，输入恒定的内容，同样输出恒定的内容；React中**只有组件**，没有页面，没有控制器，也没有模型
  - React中只关心2件事：数据与组件，构建UI视图时，组合组件始终是最优的解决方案；React的用途是构建视图
  - React的核心思路：声明式，组件化，通用性
  - 组件化可以降低系统间功能的耦合性，提高功能内部的聚合性，对前端工程化，代码的复用有极大的好处，React的组件化没有采用模板，而是声明式的JSX
  - Raect将Dom抽象成VDom，开发者不会直接操作Dom，使得React不再局限于Web开发
  - 缺点：技术选型和学习使用有比较高的成本 -->


## 什么是JSX? 
JSX是一种javaScript的语法扩展，React使用JSX来描述用户的UI界面，语法上JSX像HTML，但是它是JS，在React执行之前，babel会将JSX编译为React API.
```jsx
<div className='container'>
  <h1>Hello React</h1>
  <p>React</p>
</div>
```
上述JSX代码，最终会被编译成`React.createElement`的函数调用
```js
React.createElement(
  'div',
  {
    className: 'container',
  },
  React.createElement('h1', null, 'Hello React')
  React.createElement('p', null, 'React')
)
```
`React.createElement`接受的参数：标签名，标签属性：如class类，style等，子元素（可能还是一个是VDom：递归调用`React.createElement`）

## React中的VDom
`React`中是创建了一个`createElement`函数方法来创建每一个`VDom`对象。      
`React`中的所有`JSX`语法内容，最后都会被`babel`编译成`React.createElement`函数调用，返回一个`VDom`对象。  

```js
/*
 * type 元素的类型 div
 * props 元素的属性 class等
 * 元素中的子节点
 * @return 描述一个标签的对象  vdom
 */
function createElement(type, props, ...children) {

}


```

<!-- 

1. 数组的concat方法, 将一个数组中的元素连接到另一个数组中，并返回一个全新的数组
如：[].concat(...array)
相当于copy了一个array数组


 -->
