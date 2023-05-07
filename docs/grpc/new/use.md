# 使用

:::tip
获取以下内容源码：`git clone git@github.com:wdmsyhh/grpcdemov2.git`
:::

- 新建项目 `grpcdemov2` 并创建 `grpcdemov2/proto/product/product.proto`

```shell
syntax = "proto3";

package grpcdemov2.product;

option go_package = "product";

message GetProductRequest {
  string id = 1;
}

message ProductDetail {
  string id = 1;
  string name = 2;
  int64 price = 3;
}
```

执行命令生成 go 文件：
```shell
# 在 grpcdemov2 目录执行
protoc --go_out=. ./proto/product/product.proto
```

- 定义服务，`grpcdemov2/proto/product/product.proto` 文件中添加 ProductService

```shell
syntax = "proto3";

package grpcdemov2.product;

option go_package = "proto/product";

message GetProductRequest {
  string id = 1;
}

message GetProductResponse {
  string id = 1;
  string name = 2;
  int64 price = 3;
}

service ProductService {
  rpc GetProduct (GetProductRequest) returns (GetProductResponse);
}
```

执行命令生成 go 文件：
```shell
protoc --go_out=.  --go-grpc_out=. ./proto/product/product.proto
```

### Service 和 Message 分文件定义

`grpcdemov2/proto/product/product.proto`：

```shell
syntax = "proto3";

package grpcdemov2.product;

option go_package = "proto/product";

message GetProductRequest {
  string id = 1;
}

message GetProductResponse {
  string id = 1;
  string name = 2;
  int64 price = 3;
}
```

`grpcdemov2/proto//product/service.proto`：

```shell
syntax = "proto3";

package grpcdemov2.product;

option go_package = "proto/product";

import "proto/product/product.proto";

service ProductService {
  rpc GetProduct (GetProductRequest) returns (GetProductResponse);
}
```


执行命令生成 go 文件：
```shell
protoc --go_out=.  --go-grpc_out=. ./proto/product/*.proto
```

### 启动 gRPC 服务

- 新建 `grpcdemov2/service/product/product.go`，ProductService 实现了生成的 go 文件中接口

```go
package product

import (
	"context"
	"grpcdemov2/proto/product"
)

type ProductService struct {
	product.UnimplementedProductServiceServer
}

func (*ProductService) GetProduct(ctx context.Context, req *product.GetProductRequest) (*product.GetProductResponse, error) {
	response := &product.GetProductResponse{
		Id:    req.Id,
		Name:  "商品a",
		Price: 1,
	}
	return response, nil
}

```

- 新建 `grpcdemov2/service/main.go`，并启动服务，监听端口为 1234

```go
package main

import (
	"google.golang.org/grpc"
	"grpcdemov2/proto/product"
	p "grpcdemov2/service/product"
	"log"
	"net"
)

func main() {
	grpcServer := grpc.NewServer()
	product.RegisterProductServiceServer(grpcServer, new(p.ProductService))
	lis, err := net.Listen("tcp", ":1234")
	if err != nil {
		log.Fatal(err)
	}
	log.Fatal(grpcServer.Serve(lis))
	log.Println("Server end")
}
```

- 客户端访问，新建 `grpcdemov2/client/main.go`

```go
package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	product "grpcdemov2/proto/product"
	"log"
)

func main() {
	conn, err := grpc.Dial("localhost:1234", grpc.WithInsecure())
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	client := product.NewProductServiceClient(conn)
	response, err := client.GetProduct(context.Background(), &product.GetProductRequest{Id: "aaa"})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(response)
}
```

进入 `client` 目录，执行 `go run main.go` 查看调用服务结果。
