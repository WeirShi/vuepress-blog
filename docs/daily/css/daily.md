# 日常开发CSS样式类

## 文本超出显示省略号
```scss
.ellipsis {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 这里控制几行显示省略号
  -webkit-box-orient: vertical;
}


/* scss中可以用mixin来扩展 */
@mixin ellipsis($line: 1) {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: $line;
  -webkit-box-orient: vertical;
}
```

## 三角形
```scss
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 25px 40px 25px;
  border-color: transparent transparent red transparent;
}


/* mixin混入 */
@use "sass:meta"; // 注意这一句不要忘了
@mixin triangle($width, $rest...) {
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: middle;
  border: $width solid transparent;
  @each $key, $color in meta.keywords($rest) {
    border-#{$key}-color: $color;
  }
}

.triangle {
  @include triangle(15px, $top: red);
}


```

## 卡券
```scss
.coupon {
  width: 300px;
  height: 100px;
  line-height: 100px;
  margin: 50px auto;
  text-align: center;
  position: relative;
  background: radial-gradient(circle at right bottom, transparent 10px, #ffffff 0) top right /50% 51px no-repeat,
  radial-gradient(circle at left bottom, transparent 10px, #ffffff 0) top left / 50% 51px no-repeat,
  radial-gradient(circle at right top, transparent 10px, #ffffff 0) bottom right / 50% 51px no-repeat,
  radial-gradient(circle at left top, transparent 10px, #ffffff 0) bottom left / 50% 51px no-repeat;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, .2));
}
.coupon span {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  color: red;
  font-size: 50px;
  font-weight: 400;
}
```
