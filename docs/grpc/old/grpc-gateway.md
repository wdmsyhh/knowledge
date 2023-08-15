---
sidebarDepth: 2
---

# gRPC-Gateway

## Ubuntu 系统

### 安装 gRPC-Gateway 插件

- 方式 1：

```shell
# 可以自己新建一个 go module 的项目
git clone git@github.com:wdmsyhh/grpcdemo.git
cd grpcdemo
# 在任何 go mudule 项目下执行都可
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

### 添加 gateway 服务

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

### 访问接口

[http://localhost:8080/v1/example/hello/get](http://localhost:8080/v1/example/hello/get)
:::tip
注意：这里的端口是 gateway 的端口，会代理请求到 grpc 服务。api.yaml 文件中的 post 接口也可用。
:::

### 脱敏和删除响应字段

处理方式需要改动 gateway 源码：

```go
func genMaiMarshaler(m runtime.Marshaler, hideFields string, sensitiveFields string) runtime.Marshaler {
	return MaiMarshaler{
		Marshaler:          m,
		HideResponseFields: hideFields,
		SensitiveFields:    sensitiveFields,
	}
}

type MaiMarshaler struct {
	runtime.Marshaler
	HideResponseFields string
	SensitiveFields    string
}

func (m MaiMarshaler) deleteFields(data map[string]interface{}) {
	if m.HideResponseFields == "" {
		return
	}

	fields := strings.Split(m.HideResponseFields, ",")
	for _, field := range fields {
		keys := strings.Split(field, ".")

		deleteField(data, keys...)
	}
}

func deleteField(data map[string]interface{}, keys ...string) {
	lens := len(keys)
	switch {
	case lens == 0:
		return
	case lens == 1:
		key := keys[0]
		delete(data, key)
	default:
		key := keys[0]
		value, ok := data[key]
		if !ok {
			return
		}

		arrayValue, ok := value.([]interface{})
		if ok {
			for _, item := range arrayValue {
				mapItem, ok := item.(map[string]interface{})
				if !ok {
					return
				}
				deleteField(mapItem, keys[1:]...)
			}
			return
		}

		mapValue, ok := value.(map[string]interface{})
		if !ok {
			return
		}
		deleteField(mapValue, keys[1:]...)
	}
}


func (m MaiMarshaler) sensitizeFields(data map[string]interface{}) {
	if m.SensitiveFields == "" {
		return
	}

	sensitizers := map[string]func(interface{}) interface{}{
		"name":  sensitizeName,
		"phone": sensitizePhone,
	}

	keys := strings.Split(m.SensitiveFields, ",")
	for k, v := range data {
		if vi, ok := v.([]interface{}); ok {
			needSensitize := true

			nv := []interface{}{}
			for _, viv := range vi {
				if m, ok := viv.(map[string]interface{}); !ok {
					needSensitize = false
					break
				} else {
					sensitizeField(m, keys, sensitizers)
					nv = append(nv, m)
				}
			}

			if needSensitize {
				data[k] = nv
			}

			break
		}
	}

	sensitizeField(data, keys, sensitizers)
}

func sensitizeField(data map[string]interface{}, keys []string, sensitizers map[string]func(interface{}) interface{}) {
	for _, k := range keys {
		if fn, ok := sensitizers[k]; ok {
			if _, ok := data[k]; ok {
				data[k] = fn(data[k])
			}
		}
	}
}

func sensitizeName(v interface{}) interface{} {
	name := cast.ToString(v)
	runeLen := utf8.RuneCountInString(name)
	if runeLen == 0 {
		return ""
	}

	if runeLen == 1 {
		return "*"
	}

	firstRune, _ := utf8.DecodeRuneInString(name)
	return strings.Replace(name, string(firstRune), "*", 1)
}

func sensitizePhone(v interface{}) interface{} {
	phone := cast.ToString(v)
	if len(phone) == 0 {
		return ""
	}

	valid, _ := regexp.MatchString("^[0-9]{11}$", phone)
	if !valid {
		return phone
	}

	return strings.Replace(phone, phone[3:7], "****", 1)
}
```

--------------
<br><br><br>
 <template>
  <Vssue :issue-id="3" />
</template>
