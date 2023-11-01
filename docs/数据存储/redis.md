# Redis

## 启动Redis

- docker 方式

```shell
docker run -itd --name redis-test -p 6379:6379 --network my_default --network-alias redis redis:5.0.12 --requirepass "root123"
```

- 进入容器

```shell
docker exec -it redis-test bash
```

- 连接 redis

```shell
redis-cli

auth root123

set key1 value1

get key1
```

## Redis的帮助命令

https://cloud.tencent.com/developer/article/1687027
