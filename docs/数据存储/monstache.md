# Monstache

:::tip
用于从 Mongodb 同步数据到 Elasticsearch
:::

- 启动 Mongodb

**monstache 是根据 mongodb 的 oplog 来同步数据的，所以 mongodb 需要使用集群的方式，以下方式启动一个单节点集群**

新建 docker-compose.yml

```yml
version: '3'
services:
  mongo:
    image: mongo:4.4
    ports:
      - "27016:27017"
    # 容器启动时需要的参数配置
    command: "--replSet rs0 --bind_ip_all"

networks:
  default:
    external:
      name: my_default

# 启动后执行以下：
# 1.进入容器初始化副本集执行 mongo --host mongo --eval 'rs.initiate({_id: "rs0", members: [{_id: 0, host: "mongo:27017"}]})'
# 2.进入容器查看副本集状态执行 mongo --host mongo --eval 'rs.status()'
```

- 启动 Elasticsearch

    参考： [docker compose 启动 es](/数据存储/elasticsearch.md#docker-compose方式启动)

新建 docker-compose.yml

```yml
version: "3.7"
services:
  elasticsearch:
    image: "docker.elastic.co/elasticsearch/elasticsearch:7.10.2"
    container_name: elasticsearch_001
    ports:
      - "9200:9200"
      - "9300:9300"
    environment:
      node.name: es01
      discovery.type: single-node
      cluster.name: mycluster
      ES_JAVA_OPTS: -Xms512m -Xmx512m
    volumes:
      - "es-data-es01:/usr/share/elasticsearch/data"
    ulimits:
      memlock:
        soft: -1
        hard: -1
  kibana:
    image: docker.elastic.co/kibana/kibana:7.10.2
    container_name: kibana_001
    depends_on:
      - elasticsearch
    ports:
      - "5601:5601"
      - "9600:9600"
    environment:
      SERVERNAME: kibana
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200
      ES_JAVA_OPTS: -Xmx512m -Xms512m
volumes:
  es-data-es01: {}

# 如果不加会自动创建出 elasticsearch_default 网络
networks:
  default:
    external:
      name: my_default
```

执行 `docker-compose up`

- 启动 monstache

新建docker-compose.yml

```yml
version: '3'
services:
  monstache:
    image: rwynn/monstache:rel6
    volumes:
      - ./config_for_docker.toml:/app/config.toml
    command: -f /app/config.toml

networks:
  default:
    external:
      name: my_default
```

新建 config_for_docker.toml

```toml
# connection settings
# connect to MongoDB using the following URL
mongo-url = "mongodb://mongo:27017"

# connect to the Elasticsearch REST API at the following node URLs
elasticsearch-urls = ["http://elasticsearch:9200"]

# frequently required settings
# if you don't want to listen for changes to all collections in MongoDB but only a few
# e.g. only listen for inserts, updates, deletes, and drops from mydb.mycollection
# this setting does not initiate a copy, it is a filter on the oplog change listener only
#namespace-regex = '^aaa\.bbb$'      #aaa表示mongodb的数据库，bbb表示集合，表示要匹配的名字空间
namespace-regex = '^testdb\.member$'

# additionally, if you need to seed an index from a collection and not just listen for changes from the oplog
# you can copy entire collections or views from MongoDB to Elasticsearch
# direct-read-namespaces = ["mydb.mycollection", "db.collection", "test.test"]

# if you want to use MongoDB change streams instead of legacy oplog tailing add the following
# in this case you don't need regexes to filter collections.
# change streams require MongoDB version 3.6+
# change streams can only be combined with resume, replay, or cluster-name options on MongoDB 4+
# if you have MongoDB 4+ you can listen for changes to an entire database or entire deployment
# to listen to an entire db use only the database name.  For a deployment use an empty string.
# change-stream-namespaces = ["mydb.mycollection", "db.collection", "test.test"]

# additional settings
# compress requests to Elasticsearch
# gzip = true
# generate indexing statistics
# stats = true
# index statistics into Elasticsearch
# index-stats = true
# use the following PEM file for connections to MongoDB
# mongo-pem-file = "/path/to/mongoCert.pem"
# disable PEM validation
# mongo-validate-pem-file = false
# use the following user name for Elasticsearch basic auth
#elasticsearch-user = "someuser"
# use the following password for Elasticsearch basic auth
#elasticsearch-password = "somepassword"
# use 4 go routines concurrently pushing documents to Elasticsearch
# elasticsearch-max-conns = 4
# use the following PEM file to connections to Elasticsearch
# elasticsearch-pem-file = "/path/to/elasticCert.pem"
# validate connections to Elasticsearch
# elastic-validate-pem-file = true
# propogate dropped collections in MongoDB as index deletes in Elasticsearch
dropped-collections = true
# propogate dropped databases in MongoDB as index deletes in Elasticsearch
dropped-databases = true
# do not start processing at the beginning of the MongoDB oplog
# if you set the replay to true you may see version conflict messages
# in the log if you had synced previously. This just means that you are replaying old docs which are already
# in Elasticsearch with a newer version. Elasticsearch is preventing the old docs from overwriting new ones.
# replay = false
# resume processing from a timestamp saved in a previous run
resume = true #从上次同步的时间开始同步
# do not validate that progress timestamps have been saved
# resume-write-unsafe = false
# override the name under which resume state is saved
# resume-name = "default"
# exclude documents whose namespace matches the following pattern
# namespace-exclude-regex = '^mydb\.ignorecollection$'
# turn on indexing of GridFS file content
# index-files = true
# turn on search result highlighting of GridFS content
# file-highlighting = true
# index GridFS files inserted into the following collections
# file-namespaces = ["users.fs.files"]
# print detailed information including request traces
verbose = true
# enable clustering mode
cluster-name = 'mycluster'  #es集群名
# do not exit after full-sync, rather continue tailing the oplog
# exit-after-direct-reads = false
```

执行：

```shell
docker-compose up
```

观察日志连接成功后去创建 `testdb` 数据库和 `member` 表，添加一条数据，es 中会新增一个 `testdb.member` 的索引，其中有新增的数据。
