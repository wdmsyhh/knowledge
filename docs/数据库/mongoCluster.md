# Mongodb 集群

## 单节点集群创建（本地测试用）

- 使用 docker compose 启动 Mongodb 容器

```yaml
version: '3'
services:
  mongo:
    image: mongo:4.4
    ports:
      - "27017:27017"
    command: "--replSet rs0"

networks:
  default:
    external:
      name: my_default
```

- 初始化副本集

```shell
docker exec -it <mongo-container-name> mongo --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'mongo:27017'}]})"
```

或者进入容器执行

```shell
mongo

rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'mongo:27017'}]})

rs.status()
```

:::tip
如果在本地代码连接容器中的 mongodb 集群需要在 /etc/hosts 文件中添加 `<mongo容器IP>   mongo`，不然会连接失败。
:::