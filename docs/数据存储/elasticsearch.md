# Elasticsearch

## 启动 es

### 无密码启动

- 启动 ES 容器

```shell
docker run --name elasticsearch --rm -p 9200:9200 -p 9300:9300 \
    -e "discovery.type=single-node" \
    -e "xpack.security.enabled=false" \
    -e "ES_JAVA_OPTS=-Xmx512m -Xms512m" \
    --net my_default \
    docker.elastic.co/elasticsearch/elasticsearch:7.10.2
```

- 访问测试

```shell
curl localhost:9200
```

## 启动 kibana

默认可以直接连接容器名为 elasticsearch 的 es

```shell
docker run \
    --rm \
    --name kibana \
    --net my_default \
    -p 5601:5601 \
    docker.elastic.co/kibana/kibana:7.10.2
```

### 启动并设置密码

- es

```shell
docker run -d --name elasticsearch \
  -p 9200:9200 \
  -e "discovery.type=single-node" \
  -e "ELASTIC_PASSWORD=root123" \
  -e "ES_JAVA_OPTS=-Xmx512m -Xms512m" \
  --net my_default \
  docker.elastic.co/elasticsearch/elasticsearch:7.10.2
```

- kibana

```shell
docker run --rm --name kibana \
  -p 5601:5601 \
  -e "ELASTICSEARCH_HOSTS=http://elasticsearch:9200" \
  -e "ELASTICSEARCH_USERNAME=elastic" \
  -e "ELASTICSEARCH_PASSWORD=root123" \
  --net my_default \
  docker.elastic.co/kibana/kibana:7.10.2
```

```shell
# 这将在需要时递归创建 dockerdata、kibana 和 config 这些目录，以确保它们都存在。
sudo mkdir -p /home/dockerdata/kibana

ls dockerdata/kibana/config

#docker cp kibana:/usr/share/kibana/config/kibana.yml /home/dockerdata/kibana/config/kibana.yml
sudo docker cp kibana:/usr/share/kibana/config /home/dockerdata/kibana/config
```

- 挂载

`/host/path:/container/path`

```shell
#   -v /home/dockerdata/kibana/config:/usr/share/kibana/config \
docker run --rm --name kibana \
  -p 5601:5601 \
  -e "ELASTICSEARCH_HOSTS=http://elasticsearch:9200" \
  -e "ELASTICSEARCH_USERNAME=elastic" \
  -e "ELASTICSEARCH_PASSWORD=root123" \
  --net my_default \
  docker.elastic.co/kibana/kibana:7.10.2
```

### docker-compose方式启动

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

# 会自动创建出 elasticsearch_default 网络
```

- Elasticsearch-head 连接 ES

```shell
# elasticsearch 需要开启跨域
docker run --rm --name es-head \
  -p 9100:9100 \
  mobz/elasticsearch-head:5
```

- chrome extension

这种方式，es 容器不用开启跨域。

[https://chrome.google.com/webstore/search/elasticsearch%20head?utm_source=ext_app_menu](https://chrome.google.com/webstore/search/elasticsearch%20head?utm_source=ext_app_menu)

## Nested 嵌套型

nested类型是一种对象类型的特殊版本，它允许索引对象数组，独立地索引每个对象。

### 如何使对象数组变扁平

内部类对象数组并不以你预料的方式工作。Lucene没有内部对象的概念，所以Elasticsearch将对象层次扁平化，转化成字段名字和值构成的简单列表。比如，以下的文档：

```shell
curl -XPUT 'localhost:9200/my_index/my_type/1?pretty' -d'
{
  "group" : "fans",
  "user" : [    # 1
    {
      "first" : "John",
      "last" :  "Smith"
    },
    {
      "first" : "Alice",
      "last" :  "White"
    }
  ]
}'
```

| 1 | user字段作为对象动态添加 |
|-----|-----|

在内部被转化成如下格式的文档：

```json
{
  "group" :        "fans",
  "user.first" : [ "alice", "john" ],
  "user.last" :  [ "smith", "white" ]
}
```

user.first和 user.last 扁平化为多值字段，alice 和 white 的关联关系丢失了。导致这个文档错误地匹配对 alice 和 smith 的查询

```shell
curl -XGET 'localhost:9200/my_index/_search?pretty' -d'
{
  "query": {
    "bool": {
      "must": [
        { "match": { "user.first": "Alice" }},
        { "match": { "user.last":  "Smith" }}
      ]
    }
  }
}'
```

返回的两条数据

```json
{
  "took": 18,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 1,
    "max_score": 0.51623213,
    "hits": [
      {
        "_index": "range_index",
        "_type": "my_type",
        "_id": "1",
        "_score": 0.51623213,
        "_source": {
          "group": "fans",
          "user": [
            {
              "first": "John",
              "last": "Smith"
            },
            {
              "first": "Alice",
              "last": "White"
            }
          ]
        }
      }
    ]
  }
}
```

- 使用nested字段对应object数组

如果你需要索引对象数组，并且保持数组中每个对象的独立性，你应该使用nested对象类型而不是object类型。nested对象将数组中每个对象作为独立隐藏文档来索引，这意味着每个嵌套对象都可以独立被搜索：

```shell
curl -XPUT 'localhost:9200/my_index?pretty' -d'
{
  "mappings": {
    "my_type": {
      "properties": {
        "user": {
          "type": "nested"  # 1
        }
      }
    }
  }
}'
curl -XPUT 'localhost:9200/my_index/my_type/1?pretty' -d'
{
  "group" : "fans",
  "user" : [
    {
      "first" : "John",
      "last" :  "Smith"
    },
    {
      "first" : "Alice",
      "last" :  "White"
    }
  ]
}'
curl -XGET 'localhost:9200/my_index/_search?pretty' -d'
{
  "query": {
    "nested": {
      "path": "user",
      "query": {
        "bool": {
          "must": [
            { "match": { "user.first": "Alice" }},
            { "match": { "user.last":  "Smith" }}   # 2
          ]
        }
      }
    }
  }
}'
curl -XGET 'localhost:9200/my_index/_search?pretty' -d'
{
  "query": {
    "nested": {
      "path": "user",
      "query": {
        "bool": {
          "must": [
            { "match": { "user.first": "Alice" }},
            { "match": { "user.last":  "White" }}   # 3
          ]
        }
      },
      "inner_hits": {   # 4
        "highlight": {
          "fields": {
            "user.first": {}
          }
        }
      }
    }
  }
}'
```

| 1 | user字段映射为nested类型而不是objec t类型 |
|-----|-----|
| 2 | 该查询没有匹配，因为Alice和Smith不在同一个嵌套类中 |
| 3 | 该查询有匹配，因为Alice和White在同一个嵌套类中 |
| 3 | inner_hits可以高亮匹配的嵌套文档 |

## terms

- 在 Elasticsearch 中，要查询某个字段是否存在于字符串数组中，你可以使用 terms 查询，结合 bool 查询和 must 条件来实现。

以下是一个示例查询的结构：

```json
{
  "query": {
    "bool": {
      "must": [
        {
          "terms": {
            "your_field_name": ["value1", "value2", "value3"]
          }
        }
      ]
    }
  }
}
```
