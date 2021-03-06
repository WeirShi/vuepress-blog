# 类型转换


在js中转换的情况只有3种
1. 转成Boolean
2. 转成Number
3. 转成String

### 转换的规则

- 转Boolean
在条件判断时，除了 `undefined`、`null`、`false`、`NaN`、`''`、`0`、`-0`，其他所有值都转为 `true`，包括所有对象

- 四则运算
  - 加法运算
    1. 运算中其中一方为字符串，那么就会把另一方也转换为字符串
    
    ```javascript
    1 + '1' // '11'
    ```
    2. 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串
    
    ```javascript
    true + true // 2 -> true会转成1
    4 + [1, 2, 3] // '41,2,3' -> 数组转成了字符串
    ```
    3. 注意这个表达式： 'a' + + 'a' 
    
    ```javascript
    'a' + + 'a'  // 'aNaN'
    ```
    但是如果是数字字符串的话结果又会不一样
    
    ```javascript
    '1' + + '1'   // '11'
    ```
  - 减、乘、除、取余运算
    与加法最大的不同在于，在做这些运算时都会转成数字
  
  <!-- - 比较运算
    1. 如果是对象，就通过 `toPrimitive` 转换对象
    2. 如果是字符串，就通过 `unicode` 字符索引来比较 -->
