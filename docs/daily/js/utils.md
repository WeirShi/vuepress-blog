# 日常开发工具函数

## 随机ID值
```javascript
const randomId = function() {
  return Math.random().toSring(36).substring(2)
}
```

## 生成一个范围内的随机数
```javascript
const rangeRandomNum = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

## 倒计时
```javascript
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
```javascript
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
