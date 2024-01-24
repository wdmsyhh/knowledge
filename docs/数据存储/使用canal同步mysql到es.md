# 使用canal同步mysql数据到es

## 使用阿里云ECS实例

## 启动ES

```shell
# 创建网络
docker network create my_default

docker run --name elasticsearch -p 9200:9200 -p 9300:9300 \
    -e "discovery.type=single-node" \
    -e "xpack.security.enabled=false" \
    -e "ES_JAVA_OPTS=-Xmx512m -Xms512m" \
    --net my_default \
    docker.elastic.co/elasticsearch/elasticsearch:7.10.2

# 进入容器安装 ik 分词器
./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.10.2/elasticsearch-analysis-ik-7.10.2.zip
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

- 创建索引

```
PUT es_test?include_type_name=true
{

    "settings" : {
      "index" : {
        "number_of_shards" : "5",
        "number_of_replicas" : "1"
      }
    },
    "mappings" : {
        "_doc" : {
            "properties" : {
              "count": {          
                   "type": "text"       
               },
              "id": {
                   "type": "integer"
               },
               "name": {
                    "type" : "text",
                    "analyzer": "ik_smart"                   
                },
                "color" : {
                    "type" : "text"                    
                }
            }
        }
    }
}
```

```
POST _analyze
{
  "analyzer":"ik_max_word",
  "text": "南京市长江大桥"
}

GET /_cat/indices


GET es_test/_search
```

## 启动mysql

```shell
docker run -itd --name mysql-test -p 3306:3306 --network my_default --network-alias mysql -e MYSQL_ROOT_PASSWORD=root123 mysql:5.7

docker exec -it mysql-test bash

mysql -u root -p

show databases;

CREATE DATABASE es;

# 查看是否开启binlog
SHOW VARIABLES LIKE '%log_bin%';
#开启配置binlog日志
# 在centos中mysql的配置文件一般都在/etc/mysql目录下，如果不在可以通过 find / -name "my.cnf" 查找
vi /etc/mysql/my.cnf
# 添加
server-id=1
log_bin = /var/lib/mysql/mysql_bin
binlog_format = ROW
# 重启 mysql
# MySQL添加canal用户并授权,canal的原理是模拟自己为mysql slave，所以需要mysql slave的相关权限
CREATE USER canal IDENTIFIED BY 'canal';    

GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'canal'@'%';  

FLUSH PRIVILEGES; 
# 校验用户对应权限
show master status;
```

## 安装JDK

```shell
sudo yum install java-1.8.0-openjdk-devel.x86_64
```

配置环境变量

```
vim ~/.bash_profile

# 添加
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.362.b08-1.el7_9.x86_64
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin

#使生效
source ~/.bash_profile
```

## 安装canal

- 安装deployer

```
wget https://github.com/alibaba/canal/releases/download/canal-1.1.5/canal.deployer-1.1.5.tar.gz
mkdir canal.deployer-1.1.5
tar -zxvf canal.deployer-1.1.5.tar.gz -C canal.deployer-1.1.5
# 修改配置
vi conf/example/instance.properties
```
需要修改的内容

```text
canal.instance.master.address=8.222.134.206:3306

canal.instance.dbUsername=root
canal.instance.dbPassword=root123
```

启动
```shell
./bin/startup.sh
cat logs/canal/canal.log
```

- 安装adapter

```
wget https://github.com/alibaba/canal/releases/download/canal-1.1.5/canal.adapter-1.1.5.tar.gz
mkdir canal.adapter-1.1.5
tar -zxvf canal.adapter-1.1.5.tar.gz -C canal.adapter-1.1.5

# 修改配置
vi conf/application.yml
```

需要改动的配置
```
  srcDataSources:
    defaultDS:
      url: jdbc:mysql://8.222.134.206:3306/es?useUnicode=true&characterEncoding=utf8&autoReconnect=true&useSSL=false
      # url: jdbc:mysql://8.222.134.206:3306/es?useUnicode=true
      username: canal
      password: canal

      - name: es7
        hosts: 8.222.134.206:9200
        properties:
          mode: rest
          # security.auth: test:123456 #  only used for rest mode
          cluster.name: elasticsearch
```

同样的方式，修改conf/es/*.yml文件，定义MySQL数据到ES数据的映射字段。
```
dataSourceKey: defaultDS
destination: example
groupId: g1
esMapping:
  _index: es_test
  _type: _doc
  _id: _id
  sql: "select t.id as _id,t.id,t.count,t.name,t.color from es_test t"
  commitBatch: 3000
```

- 启动Canal-adapter服务，并查看日志。

```shell
./bin/startup.sh
cat logs/adapter/adapter.log
```

Q：启动Canal-adapter时，adapter.log日志显示异常，如何解决？错误日志为：java.lang.RuntimeException: java.lang.RuntimeException: java.lang.ClassCastException: com.alibaba.druid.pool.DruidDataSource cannot be cast to com.alibaba.druid.pool.DruidDataSource

at com.alibaba.otter.canal.client.adapter.es7x.ES7xAdapter.init(ES7xAdapter.java:54) ~[client-adapter.es7x-1.1.5-jar-with-dependencies.jar:na]

A：将canal.adapter-1.1.5\plugin下的client-adapter.es7x-1.1.5-jar-with-dependencies.jar替换为canal-1.1.5-alpha-2版本下的对应文件。

## 验证增量数据同步

 MySQL数据库中，新增、修改或删除数据库中es_test表的数据。

```
insert `es_test`(`count`,`id`,`name`,`color`) values('11',2,'canal_test2','red');
```

# references

https://help.aliyun.com/zh/es/use-cases/use-canal-to-synchronize-mysql-data-to-alibaba-cloud-elasticsearch

https://weikeqin.com/2018/05/16/canal-notes/

https://blog.csdn.net/weixin_44606481/article/details/133344235

https://github.com/alibaba/canal/issues/3466#issuecomment-1049509123

