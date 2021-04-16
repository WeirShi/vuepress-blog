# 什么是BFC？
定义：BFC(Block Formatting Context) 块级格式化上下文，一个独立的渲染区域，与区域外部不相干。

## BFC的布局规则
- 内部的块级元素会在垂直方向一个接一个的放置
- 块级元素垂直方向之间的间距有margin决定，属于同一个BFC的2个相邻的块级元素margin会发生重叠
- BFC的区域不会和浮动的块级元素重叠
- BFC的区域是一个独立的容器，容器内的元素不会影响到外面的元素，反之一样
- 计算BFC的高度时，浮动的元素也会计算在内

## 如何创建BFC
- float不为none
- position的值不为static或relative
- display的值是inline-block、table-cell、flex、table-caption或者inline-flex
- overflow的值不为visible

## BFC的作用
- 避免margin重叠
- 自适应的两栏布局
- 清除浮动


PS：清除浮动的几种方式？
1. 父元素直接设置高度 height: 200px;
2. 父元素内添加一个元素，给该元素设置属性clear: both;
```html
<div class="outter">
  <div class="inner"></div>
  <div class="inner"></div>
  <div class="inner"></div>
  <div class="clear"></div>
</div>
```
```css
.clear{
  clear:both;
  height: 0;
  line-height: 0;
  font-size: 0;
}
```
3. 父级元素加overflow: hidden属性，触发BFC
4. 使用after伪元素, 父元素添加该类
```css
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
```
5. 使用before和after双伪元素，添加在父元素上
```css
.clearfix:before, .clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
/* 兼容ie */
.clearfix {
  zoom: 1;
}
```
