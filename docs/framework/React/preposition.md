# React 内容前置知识

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
