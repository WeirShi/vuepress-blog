# 日常开发工具函数

## 随机ID值
```js
const randomId = function() {
  const n = Math.random();
  return n.toString(36).substring(2);
}
```
## 随机uuid
```js
const uuid = function (len = 8, radix = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const value = []
  let i = 0
  radix = radix || chars.length

  if (len) {
    for (i = 0; i < len; i++) value[i] = chars[0 | (Math.random() * radix)]
  } else {
    let r
    value[8] = value[13] = value[18] = value[23] = '-'
    value[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!value[i]) {
        r = 0 | (Math.random() * 16)
        value[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return value.join('')
}
```

## 生成一个范围内的随机数
```js
const rangeRandomNum = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

## delay延迟
```js
const delay = function(delayTime = 25) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delayTime)
  })
}
```

## 倒计时
```js
/**
 * 倒计时
 * @param diff 倒计时时间/s
 * @param loadTime 运行时的当前时间
 * @param item 倒计时对象
 * @param callback 回调
 */
const countDown = function(diff, loadTime, item, callback) {
  function round($diff) {
    let dd = parseInt($diff / 1000 / 60 / 60 / 24, 10);// 计算剩余的天数
    let hh = parseInt($diff / 1000 / 60 / 60 % 24, 10);// 计算剩余的小时数
    let mm = parseInt($diff / 1000 / 60 % 60, 10);// 计算剩余的分钟数
    let ss = parseInt($diff / 1000 % 60, 10);// 计算剩余的秒数

    function checkTime(_a) {
      let a = _a;
      if (a < 10) {
        a = '0' + a;
      }
      return a.toString();
    }

    item.conttainer = {
      ddhh: checkTime(dd * 24 + hh),
      dd: checkTime(dd),
      hh: checkTime(hh),
      mm: checkTime(mm),
      ss: checkTime(ss)
    };

    if (
      item.conttainer.dd > 0 ||
      item.conttainer.hh > 0 ||
      item.conttainer.mm > 0 ||
      item.conttainer.ss > 0
    ) {
      item.t = setTimeout(function () {
        let $diff = diff + 2000 - (new Date() - loadTime);
        round($diff);
      }, 1000);
    } else {
      if (callback) {
        callback();
      }
    }
  }

  round((diff + 2000 - (new Date() - loadTime)));
}
```

## 时间日期格式化
```js
/** 时间格式化
 * @param {dateTime} date 标准时间格式 -> new Date()
 * @param {string} format 时间格式化的格式 'yyyy-MM-dd hh:mm:ss'
 * @returns {string} 格式化后的时间  '2017-01-01 01:00:00'
*/
const dateFmt = function(date = new Date(), format  = 'yyyy-MM-dd hh:mm:ss') {
  var o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      'S': date.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;
};
```

## 版本号比对
```js
/**
 * @export versionStringCompare
 * @param {String} preVersion
 * @param {String} lastVersion
 * @returns {Number}
 */
const versionStringCompare = function(preVersion = '', lastVersion = '') {
  const sources = preVersion.split('.');
  const dests = lastVersion.split('.');
  const maxL = Math.max(sources.length, dests.length);
  let result = 0;
  for (let i = 0; i < maxL; i++) {
    const preValue = sources.length > i ? sources[i] : 0;
    const preNum = isNaN(Number(preValue)) ? preValue.charCodeAt() : Number(preValue);
    const lastValue = dests.length > i ? dests[i] : 0;
    const lastNum = isNaN(Number(lastValue)) ? lastValue.charCodeAt() : Number(lastValue);
    if (preNum < lastNum) {
      result = 0;
      break;
    } else if (preNum > lastNum) {
      result = 1;
      break;
    }
  }
  return result;
}
```

## url参数(k-v)的序列化及反序列化
```js
/*
 * 反序列化URL参数
 * { age: "25", name: "Tom" }
 */
const parseUrlSearch = function(location) {
    return location.search.replace(/(^\?)|(&$)/g, "").split("&").reduce((t, v) => {
        const [key, val] = v.split("=");
        t[key] = decodeURIComponent(val);
        return t;
    }, {});
}

/*
 * getQueryParams('id')
 * 获取url上某个key的值
 */

const getParam = function(param) {
  // 获取浏览器参数
  const r = new RegExp(`\\?(?:.+&)?${param}=(.*?)(?:&.*)?$`)
  const m = window.location.toString().match(r)
  return m ? decodeURI(m[1]) : ''
}

/*
 * queryStringify
 * 将k-v的对象序列化转成 url?k=v&k1=v1;
 */
const queryStringify = function(search = {}) {
  return Object.entries(search).reduce(
    (t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,
    Object.keys(search).length ? "?" : ""
  ).replace(/&$/, "");
}
```

<!-- ```
// const getQueryParams = function(key, location) {
//   const search = location.indexOf('?') > -1 ? location.split('?')[1].split('&') : [];
//   const len = search.length;
//   const params = Object.create(null);
//   let pos;
//   for (let i = 0; i < len; i++) {
//     pos = search[i],indexOf('=')
//     if (pos > 0) {
//       params[search[i].substring(0, pos)] = decodeURIComponent(search[i].substring(pos + 1));
//     }
//   }
//   return params[key] ? params[key] : undefined;
// }
``` -->
