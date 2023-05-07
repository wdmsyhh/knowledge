---
sidebarDepth: 2
---

# 安装

## Ubuntu 安装

### 安装 protoc 可执行文件

- 进入 [https://github.com/protocolbuffers/protobuf/releases](https://github.com/protocolbuffers/protobuf/releases) 页面

- 这里下载 [https://github.com/protocolbuffers/protobuf/releases/download/v22.4/protoc-22.4-linux-x86_64.zip](https://github.com/protocolbuffers/protobuf/releases/download/v22.4/protoc-22.4-linux-x86_64.zip)

- 解压后把其中的 protoc 文件拷贝到 `/usr/local/bin` 中

- 打开终端输入 `protoc --version` 或 `protoc` 执行，查看结果


### 安装编译插件

```shell
# github 地址 https://github.com/protocolbuffers/protobuf-go
go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
# gihub 地址  https://github.com/grpc/grpc-go
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
```