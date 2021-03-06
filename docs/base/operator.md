# 常用运算符

## 数学运算符
|   符号  | 类型  |
|  :----  | ----:  |
|   +    | 加法   |
|   -    | 减法   |
|   *    | 乘法   |
|   /    | 除法   |
|   %    | 取余   |

## 一元运算符

```javascript
var a = 1;
a++  // 返回1   先返回表达式结果, 后自增1
++a  // 返回2  先自增1, 后返回表达式结果

// 减法与加法一致
a-- // 1
--a // 0
```

## 逻辑运算符

```javascript
  1. &&
    - 与逻辑  a&&b 只有当a为true，b也为true时，该表达式返回true
    - 在js中如果当a为false时，该表达式会直接返回false，不会再去检查b是否为true
  2. ||
    - 或逻辑 a||b 只要a与b两者中有一个为true，该表达式返回true
    - 在js中如果当a为true时，该表达式会直接返回true，不会再去检查b是否为true
  3. !
    - 非逻辑，取反  !a，a为true时返回false，反之为true
```

## 比较运算符
|   符号  | 类型  |
|  :----  | ----:  |
|  a > b   | 大于   |
|  a < b   | 小于   |
|  a >= b   | 大于等于   |
|  a <= b  | 小于等于   |
|  a == b   | 比较值是否相等(不考虑类型)   |
|  a === b   | 比较值和类型是否都相等  |
|  a != b  | 比较值是否不相等(不考虑类型)  |
|  a !== b    | 恒不等，比较值和类型是否都不相等  |
|  a ? b : c   | 三元运算符  |

## 赋值运算符

```javascript
  var a = 1;
  a += 5 (a = a + 5) // 6
  a -= 5 (a = a - 5) // -4
  a *= 5 (a = a * 5) // 5
  a /= 5 (a = a / 5) // 0.2
  a %= 5 (a = a % 5) // 1
```

## 运算符的优先级 (从高到低)
```
() 优先级最高
一元运算符
数学运算符
比较运算符 > >= < <=
相等运算符 == != === !==
逻辑运算符 先&& 后||
```

## 位运算: JavaScript 使用 32 位按位运算数
|   符号  | 类型  |
|  :----  | ----:  |
|   &    | 按位与   |
|   \|    | 按位或   |
|   ~    | 按位非   |
|   ^    | 按位异或   |
|   >>    | 零填充左位移   |
|   <<    | 有符号右位移   |
|   >>>    | 零填充右位移   |


## 非空运算符 ??

如果第一个参数不是null或者undefined (只有这2个)，返回第一个参数，否则返回第二个参数    

```javascript
null ?? 5  // => 5
3 ?? 5  // => 3
```

以前我们给变量值设置默认值时，都会用 ||

```javascript
var a = b || 0  // 如果b为false时，则a默认赋值为0
```
这里b可以为null、undefined、''(空字符串)、boolean(false)、NaN、0   
这种方式在一些业务场景下便不太符合，比如一些账户余额，可以为0

## 空赋值运算符 ??=
当第一个参数为null或者undefined时赋值运算才会生效(与上文相关)

```javascript
var a = null
var b = 5

console.log('a', a ??= b)    // 'a' 5
console.log('a',a = a ??= b) // 'a' 5
```

## ?. Optional Chain 链判断运算符
ES11中新增的语法，比如: 
之前我们在获取一个对象中可能嵌套对象的属性时，经常会这样写

```javascript
var a = {}
console.log(a.b.c) // Uncaught TypeError: Cannot read property 'c' of undefined
```
不注意的话，这里就会报错，debug的时候我们就需要这样改

```javascript
console.log(a.b !== undefined ? a.b.c : 0)
```
需要对a对象中的b对象进行undefined的判断(三元表达式)  

ES11提出了`?.`运算符后，就可以简化为

```javascript
var a = {}
console.log(a.b?.c)
```
表示先判断`a.b`是否存在，如果不存在直接返回undefined，js会停止对b.c的获取
