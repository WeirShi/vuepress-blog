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