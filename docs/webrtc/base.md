# WebRTC入门
WebRTC全称是Web Real-Time Communication，网页即时通信。WebRTC在2011年6月1日开源，并在Google、Mozilla、Opera等各家巨头公司的支持下被纳入W3C 推荐标准，给浏览器和移动应用提供了即时通信的能力。

## 优势和应用场景
### 优势
- 跨平台(Web、Windows、MacOS、Linux、iOS、Android)
- 实时传输
- 音视频引擎
- 免费、免插件、免安装
- 主流浏览器支持
### 应用场景
- 音视频会议
- 即时通讯工具 IM
- 直播
- 共享远程桌面
- 等等

## 如何基于WebRTC搭建实时通信
搭建实时通信使用到的主要的API：getUserMedia, RTCPeerConnection

### getUserMedia 获取音视频
使用获取本地音视频流的API：`navigator.mediaDevices.getUserMedia`，老版的是`navigator.getUserMedia`，可以引入[adapter.js](https://webrtc.github.io/adapter/adapter-latest.js)来做一下适当的适配。

该方法传入的是一个约束对象参数：`constraints`，来指定获取音频流还是视频流
```js
// 获取音视频流
const mediaStreamConstraints = {
  video: true,
  audio: true,
  // 对于移动设备，还需要指定使用的是前置还是后置摄像头
  // video: {
  //   facingMode: 'user', // 前置摄像头
  //   facingMode: { exact: 'enviroment' },
  //   // 或者是指定支持的音视频设备
  //   // navigator.mediaDevices.enumerateDevices() // 获取支持的设备
  //   deviceId: customCameraDeviceId
  // }
}

navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
  .then(gotLocalMediaStream)
  .catch((err) => {
    console.log('getUserMedia获取流失败: ', err)
  })
```

### RTCPeerConnection
使用WebRTC实现实时通信最核心的API就是`RTCPeerConnection`，它代表一个由本地计算机到远端的WebRTC连接，该接口提供了创建、保持、监控及关闭连接的方法的实现，有点类似于`socket`。

相关的API
- createOffer 创建Offer方法
- setLocalDescription 设置本地SDP描述信息
- peer.onicecandidate 设置完本地SDP描述信息后会触发该方法，打开一个连接，开始运转媒体流
- setRemoteDescription 设置远端的SDP描述信息，由本地发送
- peer.ontrack 设置完远端SDP描述信息后会触发该方法，接收对方的媒体流
- createAnswer 远端创建应答Answer方法
- RTCIceCandidate RTC网络信息，IP、端口等
- addIceCandidate 连接添加对方的网络信息


### 浏览器本地实现端对端的通信建立
通过`new RTCPeerConnection()`创建2个`RTCPeerConnection`对象，来模拟本地和远端。
```js
// 本地host创建RTC实例时，可以为空
// 实际应用中，需要中间代理设备服务
const server = null

// 创建本地 RTCPeerConnection 对象
const localPeerConnection = new RTCPeerConnection(server)
// 监听返回的 Candidate
localPeerConnection.addEventListener('icecandidate', handleConnection)

// 创建远端 RTCPeerConnection 对象
const remotePeerConnection = new RTCPeerConnection(server)
// 监听远端返回的Candidate
remotePeerConnection.addEventListener('icecandidate', handleConnection)

// 将音视频流添加到 RTCPeerConnection 对象中
// 遍历本地流的所有轨道
// localStream 是上文中获取本地的音视频流得到，并保存
localStream.getTracks().forEach(track => {
  localPeerConnection.addTrack(track, localStream)
})

// 2.交换媒体描述信息

// 设置需要交换的音频流/视频流
const offerOptions = {
  offerToReceiveVideo: 1,
  offerToReceiveAudio: 1
}
localPeerConnection.createOffer(offerOptions).then(createOffer)

// 创建双端offer
const createOffer = desc => {
  // 本地设置描述并将它发送给远端
  // 将 offer 保存到本地
  localPeerConnection.setLocalDescription(desc) 
    .then(() => {
      console.log('本地描述信息设置成功')
    }).catch(err => {
      console.log('本地描述信息设置失败: ', err)
    })
  // 远端将本地给它的描述设置为远端描述
  // 远端将 offer 保存
  remotePeerConnection.setRemoteDescription(desc) 
    .then(() => { 
      console.log('远端描述信息设置成功')
    }).catch(err => {
      console.log('远端描述信息设置失败: ', err)
    })
  // 远端设置描述信息成功后 创建应答 answer
  remotePeerConnection.createAnswer() 
    .then(createAnswer)
    .catch(err => {
      console.log('远端创建应答 answer 失败', err)
    })
}

// 创建远端 answer
const createAnswer = desc => {
  // 远端设置本地描述并将它发给本地
  // 远端保存 answer
  remotePeerConnection.setLocalDescription(desc)
    .then(() => { 
      console.log('远端设置本地描述信息成功')
    }).catch(err => {
      console.log('远端设置本地描述信息失败: ', err)
    })
  // 本地将远端的应答描述设置为远端描述
  // 本地保存 answer
  localPeerConnection.setRemoteDescription(desc) 
    .then(() => { 
      console.log('本地设置远端描述信息成功')
    }).catch(err => {
      console.log('本地设置远端描述信息失败: ', err)
    })
}


// 处理连接
const handleConnection = (e) => {
  // 获取到触发 icecandidate 事件的 RTCPeerConnection 对象 
  // 获取到具体的Candidate
  const peerConnection = e.target
  const iceCandidate = e.candidate

  if (iceCandidate) {
    // 创建 RTCIceCandidate 对象
    const newIceCandidate = new RTCIceCandidate(iceCandidate)
    // 得到对端的 RTCPeerConnection
    const peer = (peerConnection === localPeerConnection) ? remotePeerConnection : localPeerConnection

    // 将本地获得的 Candidate 添加到远端的 RTCPeerConnection 对象中
    // 为了简单，这里并没有通过信令服务器来发送 Candidate，直接通过 addIceCandidate 来达到互换 Candidate 信息的目的
    peer.addIceCandidate(newIceCandidate)
  }
}
```

### 建立信令通信实现P2P的实时通信
通过Node建立服务端WebSocket通信。
主要的流程是，发起方点击发起，获取本地设备音视频流后，创建offer，将本地的oferr、SDP描述通过WS进行传输，接收方接收到消息之后，接收方设置本地的SDP和创建answer，从而建立双端的通信。

服务端代码：
```js
// node 服务端主要建立websocket服务
// 使用了koa和ws 模块
// 主要代码 如下

// index.js
const Koa = require('koa')
const http = require('http')
const ws = require('ws')
const app = new Koa()

const WebSocket = require('./ws')
const server = http.createServer(app.callback())

// 同一个端口监听不同的服务
const wss = new ws.Server({
  server
})
WebSocket(wss)

const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`Server is ready on http://localhost:${port}`)
})

// ws.js
// 这里没有通过用户id来区分业务场景
// 暂时只支持2端通信，
// wesocket 通过连接成功的client端，直接遍历进行广播
// 通过判断当前server是否为当前client端发起的，广播消息不返回给自身
module.exports = wss => {
  wss.on('connection', function connection(ws) {
    ws.on('message', data => {
      data = JSON.parse(data)
      wss.clients.forEach(server => {
        if (server !== ws) {
          switch(data.type) {
            case 'ping':
              server.send(JSON.stringify({ type: 'pong' }))
              break
            default:
              server.send(JSON.stringify(data))
              break
          }
        }
      })
    })
  })
}

```

客户端代码：使用了React脚手架搭建，
主要是2个页面： `connect?type=offer`表示为发起方；`connect?type=answer`表示为接收方。
双方页面加载初始化，创建`peer`实例，并监听`track`和`icecandidate`事件，确保都接入了`socket`服务，然后由发起方点击`start`按钮获取本地音视频媒体流，创建本地offer并创建本地SDP，通过`socket`服务将offer传送给接收方，接收方接收到offer信息后，设置接收方本地SDP，创建answer信息，并传输，发起方接收到answer信息后，即可建立通信。
```js
  // 设置 需要获取的音视频媒体流
  const mediaStreamConstraints = {
    video: true,
    audio: true,
  }

  const { type } = getRouterQuery()
  const localStream = useRef(null)
  const remoteVideo = useRef(null)
  const localVideo = useRef(null)
  const socket = useRef(null)
  const peer = useRef(null)

  const startLive = async (offerSdp) => {
    let stream
    try {
      console.log('获取本地摄像头/麦克风...')
      stream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
      console.log('本地摄像头/麦克风获取成功！')
      localStream.current = stream
      if (localVideo.current) {
        localVideo.current.srcObject = stream
      }
    } catch(error) {
      console.log(error)
      console.error('本地摄像头/麦克风获取失败!')
      return
    }

    console.log(`------ WebRTC ${type === 'offer' ? '发起方' : '接收方'}流程开始 ------`)
    console.log('将媒体轨道添加到轨道集')
    stream.getTracks().forEach(track => {
      peer.current.addTrack(track, stream)
    })

    if (!offerSdp) {
      console.log('创建本地SDP')
      const offer = await peer.current.createOffer()
      await peer.current.setLocalDescription(offer)
      console.log(`传输发起方本地SDP`)
      socket.current.send(JSON.stringify(offer))
    } else {
      console.log('接收到发送方SDP')
      await peer.current.setRemoteDescription(offerSdp)
      console.log('创建接收方（应答）SDP')
      const answer = await peer.current.createAnswer()
      console.log('answer', answer)
      console.log(`传输接收方（应答）SDP`)
      socket.current.send(JSON.stringify(answer))
      await peer.current.setLocalDescription(answer)
    }
  }

  const endLive = () => {
    socket.current.send(JSON.stringify({ type: 'end' }))
    if (type === 'offer') {
      disconnect()
    }
  }

  // socket 心跳监测
  const heartCheck = {
    time: 10000,
    timeout: null,
    start: function() {
      this.timeout && clearInterval(this.timeout)
      this.timeout = setInterval(function(){
        socket.current.send(JSON.stringify({ type: 'ping' }))
      }, this.time)
    },
    stop: function() {
      this.timeout && clearInterval(this.timeout)
    }
  }


  const connect = () => {
    const PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
    if (!PeerConnection) {
      console.error('浏览器不支持 WebRTC!!!')
      return
    }
		peer.current = new PeerConnection()
    console.log('peer', peer.current)

    console.log('WebSocket创建中......')
    socket.current = new WebSocket(wsHost)
		socket.current.onopen = () => {
			console.log('WebSocket创建成功！')
      heartCheck.start()
		}
    socket.current.onerror = () => console.error('WebSocket创建失败！')
    socket.current.onclose = () => {
      console.log('WebSocket关闭成功！')
      // 停止socket心跳
      heartCheck.stop()
    }
    socket.current.onmessage = e => {
			const { type: msgType, sdp, iceCandidate } = JSON.parse(e.data)
			if (msgType === 'answer') {
				peer.current.setRemoteDescription(new RTCSessionDescription({ type: msgType, sdp }))
			} else if (msgType === 'answerIce') {
				peer.current.addIceCandidate(iceCandidate)
			} else if (msgType === 'offer') {
				startLive(new RTCSessionDescription({ type: msgType, sdp }))
			} else if (msgType === 'offerIce') {
				peer.current.addIceCandidate(iceCandidate)
			} else if (msgType === 'pong') {
        // console.log('WebSocket 心跳监测中...')
      } else if (msgType === 'end') {
        disconnect()
      }
		}

    // 设置远端SDP后会触发
    peer.current.ontrack = e => {
      console.log('peer ontrack', e)
			if (e && e.streams) {
				console.log('收到对方音频/视频流数据...')
				remoteVideo.current.srcObject = e.streams[0]
			}
		}

    // 创建 SDP offer并调用setLocalDescription后才会触发
    // 打开一个连接，开始运转媒体流
		peer.current.onicecandidate = e => {
      console.log('peer onicecandidate', e)
			if (e.candidate) {
				console.log('搜集并发送接受方')
				socket.current.send(JSON.stringify({
					type: `${type}Ice`,
					iceCandidate: e.candidate
				}))
			} else {
				console.log('接受方收集完成！')
			}
		}
  }

  // 断开本地音视频连接
  const disconnect = () => {
    // 断开socket连接
    socket.current?.close()
    // 停止本地媒体流
    localStream.current?.getTracks().forEach(track => {
      track.stop()
    })
    peer.current?.close()
    peer.current = null
  }

  useEffect(() => {
    document.title = type === 'offer' ? '发起方' : '接收方'
    connect()
    return () => {
      disconnect()
    }
  }, [])
```

## 总结
RTC功能强大，还有很多值得研究的地方，比如通过webrtc协议进行推拉流直播服务，多端视频会议，桌面共享等等。
