# Jockey说明
## 背景：
1、客户端与前端通信协议：<a href="https://github.com/tcoulter/jockeyjs">https://github.com/tcoulter/jockeyjs</a>

## 目标：
1. 支持nodejs和window环境
2. 区分app内和app外，app外支持微信分享
3. app内支持回调和promise
4. 支持typescript，ES6
5. 添加代码注释，自动生成文档
6. 支持按业务配置相应jockey，列表直播jockey，社区jockey等
7. 单元测试，自动化测试

## jockey原理
双向通信
<!-- <img src='./imgs/jockey/1.jpg' /> -->

### 前端调用：通过iframe访问特定链接，客户端劫持链接，解析链接获取相应数据
格式：
```js
// type 事件名，envelope.id 事件id, envelope 传递数据
let src = 'jockey://' + type + '/' + envelope.id + '?' + encodeURIComponent(JSON.stringify(envelope))
```
客户端调用：客户端调用全局对象Jockey下的两个方法trigger和triggerCallback
```C#
// 客户端发送消息到前端会调用Jockey.trigger
// 监听
Jockey.on('getPlatformInfoCallback', cb)
// 接收
Jockey.trigger("getPlatformInfoCallback", 6, {
    "data": {
        "X-Auth-Token": "Bearer eyJ0...",
        "appVersion": "4.72.0",
        "channel": "test",
        "cookieToken": "d41d8cd9|1000022409|1624586932|9bea0e22afe992c7",
        "deviceTrait": "M2002J9E",
        "emu": "0",
        "imei": "",
        "isProxy": "0",
        "isRoot": "0",
        "modelName": "M2002J9E",
        "navHeight": 154,
        "oaid": "afaec4f448581bb9",
        "platform": "android",
        "screenHeight": 2287,
        "screenWidth": 1080,
        "shumeiId": "202102122317403c637fafcb902a23a2af94d1af63567a0194ee32b8ddb201",
        "statusBarHeight": 25.09091,
        "ua": "duapp/4.72.0(android;11)",
        "userId": "1000022409",
        "uuid": "41ac4d01ac0a17f8"
    },
    "status": 200
})
// 前端发送消息给客户端，客户端异步执行完成后调用Jockey.triggerCallback
// 发送
Jockey.send('getPlatformInfo', cb)
// 接收
Jockey.triggerCallback("0", {
    "X-Auth-Token": "Bearer eyJ...",
    "appVersion": "4.72.0",
    "channel": "test",
    "cookieToken": "d41d8cd9|1000022409|1624586932|9bea0e22afe992c7",
    "deviceTrait": "M2002J9E",
    "emu": "0",
    "imei": "",
    "isProxy": "0",
    "isRoot": "0",
    "jokeyType": "getPlatformInfo",
    "modelName": "M2002J9E",
    "navHeight": 154,
    "oaid": "afaec4f448581bb9",
    "platform": "android",
    "screenHeight": 2287,
    "screenWidth": 1080,
    "shumeiId": "202102122317403c637fafcb902a23a2af94d1af63567a0194ee32b8ddb201",
    "statusBarHeight": 25.09091,
    "ua": "duapp/4.72.0(android;11)",
    "userId": "1000022409",
    "uuid": "41ac4d01ac0a17f8"
})
```

### jockey使用说明
#### 客户端发送消息到前端：
客户端发送
```Objective-C
// Send an event to JavaScript, passing a payload.
// payload can be an NSDictionary or NSArray, or anything that is serializable to JSON.
// It can be nil.
// 发送一个事件到Javascript并传递一个消息，消息可以是NSDictionary或NSArray，或其他能够被序列化的数据，数据可以包含nil
[Jockey send:@"event-name" withPayload:payload toWebView:webView];

// If you want to send an event and also execute code within the iOS app when all
// JavaScript listeners have finished processing.
// 发送一个事件和消息，并且在Javascript运行完成执行一个回调
[Jockey send:@"event-name" withPayload:payload toWebView:webView perform:^{
  // Respond to callback.
  // 执行回调
}];
```

```java
// Send an event to JavaScript, passing a payload
// 发送一个事件并传递一个消息
jockey.send("event-name", webView, payload);

//With a callback to execute after all listeners have finished
// Javascript运行完成后执行一个回调
jockey.send("event-name", webView, payload, new JockeyCallback() {
        @Override
        public void call() {
                //Your execution code
                // 代码
        }
});
```

前端接收

```js
// Listen for an event from iOS and log the payload.
// 监听客户端发送事件
Jockey.on("event-name", function(payload) {
  console.log(payload);
});

// Listen for an event from iOS, but don't notify iOS we've completed processing
// until an asynchronous function has finished (in this case a timeout).
// 监听事件，调用complete通知客户端执行回调
Jockey.on("event-name", function(payload, complete) {
  // Example of event'ed handler.
  setTimeout(function() {
    alert("Timeout over!");
    complete();
  }, 1000);
});
```
<!-- <img src='./imgs/jockey/2.jpg' /> -->
### 前端发送消息到客户端：
前端发送
```js
// Send an event to iOS.
// 发送事件到iOS
Jockey.send("event-name");

// Send an event to iOS, passing an optional payload.
// 发送事件和一个消息
Jockey.send("event-name", {
  key: "value"
});

// Send an event to iOS, pass an optional payload, and catch the callback when all the
// iOS listeners have finished processing.
// 发送事件和一个消息，在客户端完成后执行回调
Jockey.send("event-name", {
  key: "value"
}, function() {
  alert("iOS has finished processing!");
});
```
客户端接受
```Objective-C
// Listen for an event from JavaScript and log the payload.
// 监听Javascript发送的消息
[Jockey on:@"event-name" perform:^(NSDictionary *payload) {
  NSLog(@"payload = %@", payload);
}];

// Listen for an event from JavaScript, but don't notify the JavaScript that
// the listener has completed until an asynchronous function has finished.
// 监听Javascript发送的消息，调用complete后，javascript执行回调
[Jockey on:@"event-name" performAsync:^(NSDictionary *payload, void (^complete)()) {
  // Do something asynchronously, then call the complete() method when finished.
  // 执行异步操作，调用complete完成
}];

// Stop listening for events from javascript, Jockey is a shared instance after first initialization
// If you're webview controller is initialized and deinitialized, this is useful.
// 取消监听
[Jockey off:@"event-name"];
```

```java
//Listen for an event from JavaScript and log a message when we have receied it.
// 监听Javascript事件
jockey.on("event-name", new JockeyHandler() {
        @Override
        protected void doPerform(Map<Object, Object> payload) {
                Log.d("jockey", "Things are happening");
        }
});
//Listen for an event from JavaScript, but don't notify the JavaScript that the listener has completed
//until an asynchronous function has finished
//Note: Because this method is executed in the background, if you want the method to interact with the UI thread
//it will need to use something like a android.os.Handler to post to the UI thread.
// 监听Javascript事件，异步调用完成后通知javascript执行回调。
jockey.on("event-name", new JockeyAsyncHandler() {
        @Override
        protected void doPerform(Map<Object, Object> payload) {
                //Do something asynchronously
                //No need to called completed(), Jockey will take care of that for you!
                // 执行异步操作，但不需要调用completed()
        }
});

//We can even chain together several handlers so that they get processed in sequence.
//Here we also see an example of the NativeOS interface which allows us to chain some common
//system handlers to simulate native UI interactions.
// 
jockey.on("event-name", nativeOS(this)
                        .toast("Event occurred!")
                        .vibrate(100), //Don't forget to grant permission
                        new JockeyHandler() {
                                @Override
                                protected void doPerform(Map<Object, Object> payload) {
                                }
                        }
);
//...More Handlers

//If you would like to stop listening for a specific event
// 取消监听
jockey.off("event-name");
//If you would like to stop listening to ALL events
// 清除所有监听
jockey.clear();
```
<!-- <img src='./imgs/jockey/3.jpg' /> -->

安全配置
不希望每个页面都调用jockey，需要对页面做域名判断，只在特定域名允许调用jockey

```Objective-C
-(BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    // Get current URL of the webview through Javascript.
    // 获取当前页面的URL
    NSString *urlString = [_webView stringByEvaluatingJavaScriptFromString:@"window.location.href"];
    NSURL *currentURL = [NSURL URLWithString:urlString];

    NSString *host = [currentURL host];

    if ([host isEqualToString:@"mydomain.com") {
        return [Jockey webView:webView withUrl:[request URL]];
    }

    return TRUE;
}
```

```java
jockey.setValidationListener(new OnValidateListener() {
        @Override
        public boolean validate(String host) {
                return "mydomain.com".equals(host);
        }
});
```
