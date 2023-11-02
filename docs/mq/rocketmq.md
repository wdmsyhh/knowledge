# RocketMQ

## 使用Docker-Compose启动

- 配置文件

```shell
#创建broker1的配置文件
mkdir -p /opt/rocketmq/broker/conf && cd /opt/rocketmq/broker/conf
vim broker.conf
```

```conf
brokerClusterName = DefaultCluster
brokerName = broker-1
brokerId = 0
deleteWhen = 04
fileReservedTime = 72
brokerRole = ASYNC_MASTER
flushDiskType = ASYNC_FLUSH
#写上运行主机的IP，公网调用得使用公网IP，宿主机IP。
brokerIP1 = 192.168.10.104
```

- 调整挂载目录权限

```shell
mkdir -p /opt/rocketmq/broker/logs && mkdir -p /opt/rocketmq/broker/store
#容器内是rocketmq用户运行，对应得gid:uid就是3000:3000
chmod -R 755 /opt/rocketmq && chown -R 3000:3000 /opt/rocketmq
```

- 定义docker-compose.yml

```yml
version: '3'
services:
  namesrv:
    image: apache/rocketmq:4.9.4
    container_name: rmqnamesrv
    ports:
      - 9876:9876
    environment:
      JAVA_OPT_EXT: "-server -Xms512m -Xmx512m"
    volumes:
      - /opt/rocketmq/namesrv/logs:/home/rocketmq/logs
    command: sh mqnamesrv
    restart: always
  broker1:
    image: apache/rocketmq:4.9.4
    container_name: rmqbroker
    links:
      - namesrv
    ports:
      - 10909:10909
      - 10911:10911
      - 10912:10912
    environment:
      NAMESRV_ADDR: namesrv:9876
      JAVA_OPT_EXT: "-server -Xms512m -Xmx512m"
    volumes:
      - /opt/rocketmq/broker/logs:/home/rocketmq/logs
      - /opt/rocketmq/broker/store:/home/rocketmq/store
      - /opt/rocketmq/broker/conf/broker.conf:/opt/rocketmq-4.9.4/conf/broker.conf
    command: sh mqbroker -c /opt/rocketmq-4.9.4/conf/broker.conf
    restart: always
  dashbord:
    image: apacherocketmq/rocketmq-dashboard:1.0.0
    ports:
      - 8080:8080
    environment:
      JAVA_OPTS: "-Drocketmq.namesrv.addr=namesrv:9876"
    restart: always
```

- 启动

```shell
docker-compose up
```

## 使用Golang生产和消费

- 生产消息

```go
package main

import (
	"context"
	"fmt"
	"strconv"

	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/apache/rocketmq-client-go/v2/producer"
)

func main() {

	p, _ := rocketmq.NewProducer(
		producer.WithNsResolver(primitive.NewPassthroughResolver([]string{"127.0.0.1:9876"})),
		producer.WithRetry(2),
	)
	err := p.Start()
	if err != nil {
		fmt.Printf("start producer error: %s", err.Error())
		return
	}
	topic := "testmq"

	for i := 0; i < 3; i++ {
		msg := &primitive.Message{
			Topic: topic,
			Body:  []byte("Hello RocketMQ Go Client! " + strconv.Itoa(i)),
		}
		res, err := p.SendSync(context.Background(), msg)

		if err != nil {
			fmt.Printf("send message error: %s\n", err)
		} else {
			fmt.Printf("send message success: result=%s\n", res.String())
		}
	}
	err = p.Shutdown()
	if err != nil {
		fmt.Printf("shutdown producer error: %s", err.Error())
	}
}

```

- 消费消息

```go
package main

import (
	"context"
	"fmt"
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/consumer"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"log"
	"time"
)

func main() {
	c, err := rocketmq.NewPushConsumer(
		consumer.WithNameServer(primitive.NamesrvAddr{"127.0.0.1:9876"}),
		consumer.WithRetry(2),
		consumer.WithGroupName("GID_a"),
	)
	if err != nil {
		log.Fatal(err)
	}
	c.Subscribe("testmq", consumer.MessageSelector{}, func(ctx context.Context, ext ...*primitive.MessageExt) (consumer.ConsumeResult, error) {
		for i := range ext {
			fmt.Printf("获取到：%+v\n", string(ext[i].Body))
		}
		return consumer.ConsumeSuccess, nil
	})
	err = c.Start()
	defer c.Shutdown()
	time.Sleep(5 * time.Second)
}

```
