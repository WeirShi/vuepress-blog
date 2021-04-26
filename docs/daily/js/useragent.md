# 判断UserAgent

```javascript

const browser = function() {
  const u = navigator.userAgent.toLowerCase()
  return {
    txt: u, // userAgent 信息
    version: (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // 版本号
    msie: /msie/.test(u) && !/opera/.test(u), // IE内核
    mozilla: /mozilla/.test(u) && !/(compatible|webkit)/.test(u), // 火狐浏览器
    safari: /safari/.test(u) && !(u.indexOf('android') > -1) && !/chrome/.test(u), //是否为safair
    chrome: /chrome/.test(u), //是否为chrome
    opera: /opera/.test(u), //是否为oprea
    presto: u.indexOf('presto/') > -1, //opera内核
    webKit: u.indexOf('applewebkit/') > -1, //苹果、谷歌内核
    gecko: u.indexOf('gecko/') > -1 && u.indexOf('khtml') == -1, //火狐内核
    mobile: !!u.match(/applewebkit.*mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
    android: u.indexOf('android') > -1, //android终端
    iPhone: u.indexOf('iphone') > -1, //是否为iPhone
    iPad: u.indexOf('ipad') > -1, //是否为iPad
    weixin: /micromessenger/.test(u), //微信
    QQBrowse: u.indexOf(' QQ') > -1 || u.indexOf(' qq') > -1, // QQ浏览器
    isApp: (u.indexOf('jscp/ios') > -1 || u.indexOf('jscp/android') > -1) || getParamsCode('source') == 'app',
  }
}

```