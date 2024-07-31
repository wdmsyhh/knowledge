# Mac

网址：https://docs.gitlab.cn/jh/install/docker.html

## docker方式搭建gitlab

参考网址配置好环境变量：

```shell
export GITLAB_HOME=$HOME/gitlab
```

执行：

我在 mac mini M1 芯片执行未指定 --platform linux/amd64 时，报错：`docker: no matching manifest for linux/arm64/v8 in the manifest list entries.`

:::tip
Mac Mini 很可能是基于 Apple Silicon（如 M1 或 M2 芯片），它们使用的是 arm64 架构。而你尝试拉取的镜像 registry.gitlab.cn/omnibus/gitlab-jh:latest 可能只支持 amd64 架构。

解决这个问题的方法有几种：
1. 找到支持 arm64 架构的镜像
2. 使用 --platform 参数
可以尝试使用 --platform 参数来指定架构，不过这可能会导致运行效率低下，因为它可能会使用 QEMU 来模拟 amd64 架构。
3. 使用 Rosetta 2
如果你使用的是 Mac M1 或 M2，可以尝试通过 Rosetta 2 来运行 amd64 的 Docker 镜像。不过，这需要在 Docker Desktop 中进行设置，启用 Rosetta 2 支持。
:::

```shell
docker run --detach \
  --platform linux/amd64 \
  --hostname gitlab.example.com \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab \
  --volume $GITLAB_HOME/logs:/var/log/gitlab \
  --volume $GITLAB_HOME/data:/var/opt/gitlab \
  --shm-size 256m \
  registry.gitlab.cn/omnibus/gitlab-jh:latest
```