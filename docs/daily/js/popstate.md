# 监听浏览器返回事件
日常开发中，会遇到一些需求，比如用户在页面返回时给到一些反馈信息的弹窗，这个时候就需要开发者能监听到浏览器的返回事件了   

目前最简单的办法就是
```javascript
window.history.pushState(null, null, document.URL)
window.addEventListener("popstate", function(e) {
  window.history.pushState(null, null, document.URL)
  // 这里进行业务实现
  ...
}, false)

```

目前该办法还没有进行IOS和Android的兼容试验，后续试验过后再进行更新文章。。。
