## 字节面试题，画一个45度的钟摆并来回摆动

前同事之前在面试字节遇到的手写题，想了一下，使用CSS的animation动画实现效果

1. 先画个钟摆
```html
<div class="clock">
  <div class="clock-dial"></div>
	<div class="line">
		<div class="ball"></div>
	</div>
</div>
```
2. 再来加上样式
```CSS
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #000;
  height: 100%;
  width: 100%;
}
.border {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #ff6a61;
  border: 15px solid #fff;
  margin: 0 auto;
}
.line{
  width: 15px;
  height: 400px;
  background-color: #fff;
  margin: 0 auto 20px;
  transform-origin: center top;
  position: relative;
  top: -4px;
}
.ball{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ff6a61;
  border: 6px solid #fff;
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
}

```

呈现出来的样子是这样的

![钟摆](/assets/images/clock.jpg)

剩下的就是让钟摆动起来了，用到的就是CSS的动画，animation属性, 直接贴代码
```CSS
.line {
  ....
  animation: swing 3s;
  animation-iteration-count:infinite;
  animation-timing-function: linear;
}
@keyframes swing {
  0% {
    transform: rotate(45deg);
  }
  25%{
    transform:rotate(0deg);
  }
  50%{
    transform:rotate(-45deg);
  }
  75%{
    transform:rotate(0deg);
  }
  100%{
    transform:rotate(45deg);
  }
}
```
最终完成的效果就是这样的

![钟摆](/assets/images/clock.gif)
