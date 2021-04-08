# JS数据类型

- 8种数据类型
Number、String、Boolean、Null、Undefined、Object、Symbol、BigInt
  1. ES5中确定的是前6种类型
  2. 在ES6中加入了一种新的数据类型:  Symbol
  3. 在ES11中加入了一种新的数据类型: BigInt

- 基本数据类型：Number、String、Boolean、Null、Undefined、Symbol、BigInt
  1. BigInt和Number的区别
    - 在JS中Number是双精度浮点数，精确表示的最大整数是 2^53, 这也就导致了运算时的一些精度问题  
    - BigInt 可以表示任意大的整数
      `BigInt(value)` 也可以是用 在一个整数后面加n的方式定义一个BigInt, 比如: 10n
    - BigInt 和 Number 不是严格相等的，但是宽松相等的。
      
      ```javascript
        10n === 10 // false
        10n == 10  // true
      ```
- 引用数据类型：Object
  1. 包含Function、Array、Date

- 如何判断数据类型
  1. typeof
  
  ```javascript
    typeof 1                // "number"
    typeof "1"              // "string"
    typeof []               // "object"
    typeof function() {}    // "function"
    typeof {}               // "object"
    typeof Symbol("")       // "symbol"
    typeof BigInt(1)        // "bigint"
    typeof null             // "object"
    typeof undefined        // "undefined"
    typeof NaN              // "number"
  ```

  2. Object.prototype.toString.call
  
  ```javascript
    const isType = value => {
      return Object.prototype.toString.call(value).slice(8, -1)
    }
    isType(1)               // "Number"
    isType("1")             // "String"
    isType([])              // "Array"
    isType(function() {})   // "Function"
    isType({})              // "Object"
    isType(Symbol(""))      // "Symbol"
    isType(BigInt(1))       // "Bigint"
    isType(null)            // "Null"
    isType(undefined)       // "Undefined"
    isType(NaN)             // "Number"
  ```
  3. instanceof
    并不能准确判断 如：`[] instanceof Array // true`, `[] instanceof Object // true`
  4. constructor
  5. Array.isArray 可以判断数组
