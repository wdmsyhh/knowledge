---
sidebarDepth: 2
---

# 安装

## Ubuntu 安装

### 安装 protoc 可执行文件

- 进入 [https://github.com/protocolbuffers/protobuf/releases](https://github.com/protocolbuffers/protobuf/releases) 页面

- 这里下载 [https://github.com/protocolbuffers/protobuf/releases/download/v22.3/protoc-22.3-linux-x86_64.zip](https://github.com/protocolbuffers/protobuf/releases/download/v22.3/protoc-22.3-linux-x86_64.zip)

- 解压后把其中的 protoc 文件拷贝到 `/usr/local/bin` 中

- 打开终端输入 `protoc --version` 或 `protoc` 执行，查看结果


### 安装 protoc-gen-go 可执行文件

- 下载 [https://github.com/golang/protobuf/archive/refs/tags/v1.0.0.tar.gz](https://github.com/golang/protobuf/archive/refs/tags/v1.0.0.tar.gz)

- 进入项目根目录执行
```shell
go mod init github.com/golang/protobuf
```

:::tip
这里选择 v1.0.0 版本的原因是，定义 proto 文件中 go_package 的值前面不用加 `/`，且生成的 go 文件中比较干净没有多余的字段。（当然还是建议用较新的稳定版，如果是为了实现 web 项目的一些功能，1.0.0 版本也足够了）
:::

```go
// v1.0.0 版本生成大致如下
type StringMessage struct {
	Value                string   `protobuf:"bytes,1,opt,name=value" json:"value,omitempty"`
	User                 *User    `protobuf:"bytes,2,opt,name=User" json:"User,omitempty"`
}

// v1.0.0 版本以上版本生成大致如下
type StringMessage struct {
	Value                string   `protobuf:"bytes,1,opt,name=value" json:"value,omitempty"`
	User                 *User    `protobuf:"bytes,2,opt,name=User" json:"User,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}
```

- 解压并 `cd protoc-gen-go`

- 执行 `go build` 将在当前目录生成 `protoc-gen-go` 可执行文件，并拷贝该文件到 GOBIN 目录或 `/usr/local/bin` 中。也可执行 `go install` 直接将可执行文件安装到 GOBIN 目录
