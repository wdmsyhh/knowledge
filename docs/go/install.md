# 安装

## Ubuntu

- 下载安装包

从 go 语言中文网下载 [https://studygolang.com/dl](https://studygolang.com/dl)

或者使用 wget 命令下载：
```shell
wget https://mirrors.ustc.edu.cn/golang/go1.19.3.linux-amd64.tar.gz
```

- 解压到 /usr/local 目录下
```shell
tar -C /usr/local -xzf go1.14.3.linux-amd64.tar.gz
```

- 配置环境变量

`sudo vim` 打开 `/etc/profile` 文件，追加导出命令
```shell
export PATH=$PATH:/usr/local/go/bin
```

- 生效环境变量
```shell
source /etc/profile
```

:::tip
当你在当前窗口中运行 source /etc/profile 命令时，它仅在当前会话中生效，关闭会话后失效。如果你希望 /etc/profile 文件中的环境变量在每个终端会话中都生效，可以将命令添加到当前用户的配置文件中，例如 ~/.bashrc 或 ~/.bash_profile。

你可以按照以下步骤进行操作：
:::

1.打开你的终端，并编辑 ~/.bashrc 文件（如果不存在则创建它）。

```shell
vim ~/.bashrc
```

2.为了立即使更改生效，可以运行以下命令来重新加载 ~/.bashrc 文件。

```shell
source ~/.bashrc
```


- 验证是否生效
```shell
go version
```

- 其他环境变量设置
除了go程序外，还有 GOPATH 和GOBIN 环境变量

:::tip
GOPATH：代表 Go 语言项目的工作目录，在 Go Module 模式之前非常重要，现在基本上用来存放使用 go get 命令获取的项目。

GOBIN：代表 Go 编译生成的程序的安装目录，比如通过 go install 命令，会把生成的 Go 程序安装到 GOBIN 目录下，以供你在终端使用。
:::

如果不配置 GOBIN 使用 go install 默认好像是会安装到 $GOPATH/bin 中，如果不配置 GOPATH 默认好像是会用 /home/user/go 作为 GOPATH。具体可以执行 `go env` 查看 go 的环境变量。


- 综合上面的配置方案如下
```shell

# 方案 1
export PATH=$PATH:/usr/local/go/bin

# 方案 2
export GOROOT=/usr/local/go
export GOPATH=/home/user/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH

# 方案 3
export GOROOT=/usr/local/go
export GOPATH=/home/user/go
export GOBIN=$GOPATH/bin
export PATH=$PATH:$GOROOT/bin
export PATH=$PATH:$GOPATH/bin
```
