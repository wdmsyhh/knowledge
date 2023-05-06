# 使用

:::tip
以下内容源码：[https://github.com/wdmsyhh/grpcdemo](https://github.com/wdmsyhh/grpcdemo)
:::

- 新建项目 `grpcdemo` 并创建 `grpcdemo/proto/hello.proto`

```shell
syntax = "proto3";

package grpcdemo.hello;

option go_package = "hello";

message StringMessage {
  string value = 1;
  message Member {
    string Name = 1;
    int64 age = 2;
  };
  User User = 2;
}

message User {
  string userName = 1;
}
```

执行命令生成 go 文件：
```shell
protoc --go_out=. ./proto/hello.proto
```

- 定义服务，`grpcdemo/proto/hello.proto` 文件中添加 HelloService

```shell
syntax = "proto3";

package grpcdemo.hello;

option go_package = "hello";

message StringMessage {
  string value = 1;
  message Member {
    string Name = 1;
    int64 age = 2;
  };
  User User = 2;
}

message User {
  string userName = 1;
}

service HelloService {
  rpc Hello (StringMessage) returns (StringMessage);
}
```

执行命令生成 go 文件：
```shell
protoc --go_out=plugins=grpc:. ./proto/hello.proto
```

### Service 和 Message 分文件定义

`grpcdemo/proto/hello.proto`：

```shell
syntax = "proto3";

package grpcdemo.hello;

option go_package = "hello";

message StringMessage {
  string value = 1;
  message Member {
    string Name = 1;
    int64 age = 2;
  };
  User User = 2;
}

message User {
  string userName = 1;
}
```

`grpcdemo/proto/service.proto`：

```shell
syntax = "proto3";

package grpcdemo.hello;

option go_package = "hello";

import "proto/hello.proto";

service HelloService {
  rpc Hello (StringMessage) returns (StringMessage);
}
```


执行命令生成 go 文件：
```shell
protoc --go_out=plugins=grpc:. ./proto/*.proto
```

### 启动 gRPC 服务

- 新建 `grpcdemo/service/hello/hello.go`，HelloServiceImpl 实现了生成的 go 文件中接口

```go
package hello

import (
	"context"
	hello "grpcdemo/proto"
)

type HelloServiceImpl struct{}

func (p *HelloServiceImpl) Hello(ctx context.Context, args *hello.StringMessage) (*hello.StringMessage, error) {
	reply := &hello.StringMessage{Value: "hello:" + args.GetValue()}
	return reply, nil
}
```

- 新建 `grpcdemo/service/main.go`，并启动服务，监听端口为 1234

```go
package hello

import (
	"google.golang.org/grpc"
	hello "grpcdemo/proto"
	"log"
	"net"
)

func main() {
	grpcServer := grpc.NewServer()
	hello.RegisterHelloServiceServer(grpcServer, new(HelloServiceImpl))

	lis, err := net.Listen("tcp", ":1234")
	if err != nil {
		log.Fatal(err)
	}
	grpcServer.Serve(lis)
}
```

- 客户端访问，新建 `grpcdemo/client/main.go`

```go
package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	hello "grpcdemo/proto"
	"log"
)

func main() {
	conn, err := grpc.Dial("localhost:1234", grpc.WithInsecure())
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	client := hello.NewHelloServiceClient(conn)
	reply, err := client.Hello(context.Background(), &hello.StringMessage{Value: "hello"})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(reply.GetValue())
}
```

进入 `client` 目录，执行 `go run main.go` 查看调用服务结果。
