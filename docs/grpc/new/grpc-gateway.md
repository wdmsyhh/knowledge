---
sidebarDepth: 2
---

# gRPC-Gateway

## Ubuntu 系统

### 安装 gRPC-Gateway 插件

```shell
# 可以自己新建一个 go module 的项目
git clone git@github.com:wdmsyhh/grpcdemov2.git
cd grpcdemov2
# 导入如下包
import (
    _ "github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway"
)
# 执行
go mod tidy

go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway
```
会直接生成 protoc-gen-grpc-gateway 可执行文件到 GOBIN 目录


### 定义 http 接口

- 新建 `grpcdemo/proto/api.yaml` 文件

```yaml
type: google.api.Service
config_version: 3

http:
  rules:
    - selector: grpcdemov2.product.ProductService.GetProduct
      get: /v2/products/{id}
      additional_bindings:
        - post: /v2/product/get
          body: "*"
```

### 生成 gateway 代码

```shell
# 在 grpcdemov2 目录执行
protoc --grpc-gateway_out=. --grpc-gateway_opt grpc_api_configuration=./proto/product/api.yaml ./proto/product/*.proto
```

### 添加 gateway 服务

修改 `grpcdemov2/service/main.go` 文件如下：

```go
package main

import (
	"context"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/encoding/protojson"
	"grpcdemov2/proto/product"
	p "grpcdemov2/service/product"
	"log"
	"net"
	"net/http"
)

func main() {
	go startGRPCGateway()

	grpcServer := grpc.NewServer()
	product.RegisterProductServiceServer(grpcServer, new(p.ProductService))
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
		MarshalOptions: protojson.MarshalOptions{
			UseEnumNumbers: true,
			UseProtoNames:  true,
		},
	}))
	err := product.RegisterProductServiceHandlerFromEndpoint(c, mux, ":1234", []grpc.DialOption{grpc.WithInsecure()})
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

### 访问接口

[http://localhost:8080/v2/products/aaaa](http://localhost:8080/v2/products/aaaa)
:::tip
注意：这里的端口是 gateway 的端口，会代理请求到 grpc 服务。api.yaml 文件中的 post 接口也可用。
:::

