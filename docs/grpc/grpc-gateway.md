---
sidebarDepth: 2
---

# gRPC-Gateway

## Ubuntu 系统

### 安装 gRPC-Gateway 插件

- 方式 1：

在 [grpcdemo](https://github.com/wdmsyhh/grpcdemo)（只要是 go module 项目就可以） 项目目录中执行：
```
go install github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway@v1.10.0
```
会直接生成 protoc-gen-grpc-gateway 可执行文件到 GOBIN 目录

- 方式 2：

```shell
# 下载
https://github.com/grpc-ecosystem/grpc-gateway/archive/refs/tags/v1.10.0.tar.gz
# 解压
tar -vxf grpc-gateway-1.10.0.tar.gz
# 重命令
mv grpc-gateway-1.10.0 grpc-gateway
# 进入 `protoc-gen-grpc-gateway` 目录执行 go install，会直接生成 protoc-gen-grpc-gateway 可执行文件到 GOBIN 目录
```

方式三：

[https://github.com/grpc-ecosystem/grpc-gateway/releases/download/v1.10.0/protoc-gen-grpc-gateway-v1.10.0-linux-x86_64](https://github.com/grpc-ecosystem/grpc-gateway/releases/download/v1.10.0/protoc-gen-grpc-gateway-v1.10.0-linux-x86_64)
直接下载可执行文件放到 GOBIN 目录或者 /usr/local/bin 目录中改名为 protoc-gen-grpc-gateway，需要 chmod +x protoc-gen-grpc-gateway 赋予可执行权限


### 定义 http 接口

- 新建 `grpcdemo/proto/api.yaml` 文件

```yaml
type: google.api.Service
config_version: 3

http:
  rules:
    - selector: grpcdemo.hello.HelloService.Hello
      post: /v1/example/hello
      body: "*"
      additional_bindings:
        - get: /v1/example/hello/get
```

### 生成 gateway 代码

```shell
# 在 grpcdemo 目录执行
protoc --grpc-gateway_out=. --grpc-gateway_opt grpc_api_configuration=./proto/api.yaml ./proto/service.proto
```

### 测试 http 接口

修改 `grpcdemo/service/main.go` 文件如下：

```go
package main

import (
	"context"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"google.golang.org/grpc"
	hello "grpcdemo/proto"
	hello2 "grpcdemo/service/hello"
	"log"
	"net"
	"net/http"
)

func main() {
	go startGRPCGateway()

	grpcServer := grpc.NewServer()
	hello.RegisterHelloServiceServer(grpcServer, new(hello2.HelloServiceImpl))
	lis, err := net.Listen("tcp", ":1234")
	if err != nil {
		log.Fatal(err)
	}
	log.Fatal(grpcServer.Serve(lis))
	log.Println("Server end")
}

func startGRPCGateway() {
	c := context.Background()
	c, cancel := context.WithCancel(c)
	defer cancel()
	mux := runtime.NewServeMux(runtime.WithMarshalerOption(runtime.MIMEWildcard, &runtime.JSONPb{
		OrigName:     true,
		EmitDefaults: true,
	}))
	err := hello.RegisterHelloServiceHandlerFromEndpoint(c, mux, ":1234", []grpc.DialOption{grpc.WithInsecure()})
	if err != nil {
		log.Fatalf("cann't start grpc gateway: %v", err)
	}
	err = http.ListenAndServe(":8080", mux) // grpc gateway 的端口
	if err != nil {
		log.Fatalf("cann't listen and serve: %v", err)
	}
	log.Println("Gateway end")
}

```

### 启动服务

```shell
cd service
go run main.go
```

- 访问接口

[http://localhost:8080/v1/example/hello/get](http://localhost:8080/v1/example/hello/get)
:::tip
注意：这里的端口是 gateway 的端口，会代理请求到 grpc 服务。api.yaml 文件中的 post 接口也可用。
:::

--------------
<br><br><br>
 <template>
  <Vssue :issue-id="3" />
</template>
