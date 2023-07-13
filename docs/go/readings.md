# 阅读推荐

- [go 学习](https://www.runoob.com/go/go-tutorial.html)

- [gin 学习](https://www.w3cschool.cn/golang_gin/golang_gin-t1lh3lru.html)

- [Go语言高级编程](https://chai2010.cn/advanced-go-programming-book/index.html)

## Multiple modules

- 解决gopls was not able to find modules in your workspace.

参考：

[https://blog.csdn.net/wsi__/article/details/127348785](https://blog.csdn.net/wsi__/article/details/127348785)

[https://github.com/golang/tools/blob/master/gopls/doc/workspace.md](https://github.com/golang/tools/blob/master/gopls/doc/workspace.md)

```shell
go work init ./ethdemo ./gotask
```

## WebSocket 使用

- 服务端：

```go
var (
	counter = 0
)

func main() {
	http.HandleFunc("/websocket", handleWebSocket)
	log.Println("WebSocket服务器启动成功，监听端口：9090")
	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		log.Fatal("WebSocket服务器启动失败：", err)
	}
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	var upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		// 解决跨域问题
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("升级WebSocket连接失败：", err)
		return
	}

	defer conn.Close()

	for {
		counter++
		message := []byte(strconv.Itoa(counter))
		err := conn.WriteMessage(websocket.TextMessage, message)
		if err != nil {
			log.Println("发送消息失败：", err)
			break
		}
		// 控制递增速度
		time.Sleep(time.Second)
	}
}
```

- 前端:

在 main.js 中加入

```js
import VueNativeSock from 'vue-native-websocket';

Vue.use(VueNativeSock, '', {
  connectManually: true, // 手动连接
  format: 'json', // json格式
  reconnection: true, // 是否自动重连
  reconnectionAttempts: 5, // 自动重连次数
  reconnectionDelay: 2000, // 重连间隔时间
});
```

```vue
<template>
  <div>
    <button @click="onClick">计数</button>
    <p>{{ count }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  created() {
    this.$connect('ws://localhost:9090/websocket');
  },
  mounted() {
    this.initWebSocket();
  },
  methods: {
    // 初始化weosocket
    initWebSocket() {
      this.$options.sockets.onopen = this.websocketonopen;//连接成功方法
      this.$options.sockets.onerror = this.websocketonerror;//报错方法
      this.$options.sockets.onmessage = this.websocketonmessage;// 接收端返回或推送信息的方法
      this.$options.sockets.onclose = this.websocketclose;//关闭
    },
    websocketonopen(e) {
      console.log('websocketonopen', e);
    },
    // 接收端发送过来的信息，整个项目接收信息的唯一入口
    websocketonmessage(e) {
      console.log('websocketonmessage', e);
       this.count = parseInt(event.data);
    },
    websocketonerror(e) {
      console.log('websocketonerror', e);
    },
    websocketclose(e) {
      console.log('websocketclose', e);
    },
    onClick() {
      this.$connect('ws://localhost:9090/websocket');
    }
  },
};
</script>
```

参考： [https://www.jianshu.com/p/64ca73f5d25d](https://www.jianshu.com/p/64ca73f5d25d)
