## 什么是React高阶组件（HOC）
HOC是 High-Order-Component 的缩写，是React中一种代码组织的手段，不是API。   
高阶组件是经过一个包装函数返回的组件，这类函数接收React组件处理传入的组件，然后再返回一个新的组件。     

高阶组件能够实现：
- 代码的复用，代码的模块化
- 渲染劫持，操作state
- props的增删改（修改props）