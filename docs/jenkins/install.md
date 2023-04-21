# 在 Ubuntu 中安装

- 中文官网参考 [https://www.jenkins.io/zh/doc/pipeline/tour/getting-started](https://www.jenkins.io/zh/doc/pipeline/tour/getting-started/)

## 下载并运行 Jenkins

前提条件需要安装 Java，操作目录 `/opt`

安装（下载链接可能会失效，如果失效，需要去官网登录下载，亦或者去其他平台下载
解压）
```shell
# 下载
wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz

# 解压
tar -vxf jdk-17_linux-x64_bin.tar.gz

# 修改名称
mv jdk-17.0.1  jdk17

# 修改环境变量
vim /etc/profile

# 在文件末尾新增以下，jdk目录在opt/jdk17
JAVA_HOME=/opt/jdk17
PATH=$JAVA_HOME/bin:$PATH
export JAVA_HOME PATH

# 重新加载环境变量
source /etc/profile

# 验证 jdk 安装是否成功
java -version

# 安装成功现在如下
java version "17.0.6" 2023-01-17 LTS
Java(TM) SE Runtime Environment (build 17.0.6+9-LTS-190)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.6+9-LTS-190, mixed mode, sharing)
```


- [下载 Jenkins](http://mirrors.jenkins.io/war-stable/latest/jenkins.war)
- 打开终端进入到下载目录
- 运行命令
```shell
java -jar jenkins.war --httpPort=8080
```
- 打开浏览器进入链接 [http://localhost:8080](http://localhost:8080)

## 后台启动

- 以使用以下命令在后台启动 Jenkins 并将日志写入指定文件：
```shell
nohup java -jar jenkins.war --httpPort=8080 >> jenkins.log 2>&1 &
```
其中，nohup 命令用于让进程在后台运行，并忽略 HUP 信号（即终止信号），以避免在关闭终端或者网络断开时停止 Jenkins 进程。> jenkins.log 将 Jenkins 的标准输出重定向到名为 jenkins.log 的文件中，2>&1 则将标准错误输出重定向到与标准输出相同的地方。

执行这个命令之后，Jenkins 会在后台以 HTTP 端口为 8080 的方式启动，并将日志输出到 jenkins.log 文件中。您可以使用 `tail -f jenkins.log` 命令来实时查看 Jenkins 的日志输出。

- 查看 jenkins.log 的大小：
```shell
ls -lh jenkins.log
```

## Docker 方式启动

::: tip
待更新
:::

此方式的 Jenkins 在执行 shell 命令时是执行的 docker 容器内的命令，如果要执行宿主机的 shell 脚本还需要一些配置。
