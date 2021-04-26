# 简易理解JSBridge实现原理

## 定义
JSBridge是什么？JSBridge是一种桥接器，通过JS引擎或Webview容器为媒介 ，约定协议进行通信，实现Native端和Web端双向通信的一种机制。   
JSBridge的作用就是让native可以调用web的js代码，让web可以调用原生的代码，实现数据通信，它在做native代码和js代码相互转换的事情。   

## Web调用Native接口