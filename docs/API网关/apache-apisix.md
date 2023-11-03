# Apache APISIX

官网： [https://apisix.apache.org/zh/docs/apisix/getting-started/README/](https://apisix.apache.org/zh/docs/apisix/getting-started/README/)

云原生时代，动态和可观测性成为衡量 API 网关的标准之一。Apache APISIX 自诞生之初就一直跟随着云原生的脚步前行。然而 Apache APISIX 作为一个诞生刚刚三年的新一代网关，为什么可以从诞生 20 多年的 NGINX 与开源 8 年的 Kong 中突出重围，成为云原生时代最流行以及最活跃的网关？我认为其中最重要的原因是解决了开发者和企业在使用 NGINX 和 Kong 中的痛点。

## NGINX 与 Kong 的痛点​

在单体服务时代，使用 NGINX 可以应对大多数的场景，而到了云原生时代，NGINX 因为其自身架构的原因则会出现两个问题：

1.首先是 NGINX 不支持集群管理。几乎每家互联网厂商都有自己的 NGINX 配置管理系统，系统虽然大同小异但是一直没有统一的方案。

2.其次是 NGINX 不支持配置的热加载。很多公司一旦修改了配置，重新加载 NGINX 的时间可能需要半个小时以上。并且在 Kubernetes 体系下，上游会经常发生变化，如果使用 NGINX 来处理就需要频繁重启服务，这对于企业是不可接受的。

而 Kong 的出现则解决了 NGINX 的痛点，但是又带来了新的问题：

1.Kong 需要依赖于 PostgreSQL 或 Cassandra 数据库，这使 Kong 的整个架构非常臃肿，并且会给企业带来高可用的问题。如果数据库故障了，那么整个 API 网关都会出现故障。

2.Kong 的路由使用的是遍历查找，当网关内有超过上千个路由时，它的性能就会出现比较急剧的下降。

而 APISIX 的出现则解决了上述所有问题，成为了云原生时代最完美的 API 网关。那么 Apache APISIX 的优势到底是什么？为什么可以在短短三年的时间里成为全世界最活跃的网关？

## APISIX 的优势

在更新数据上，Kong 采用轮询数据库的方式，但是可能需要 5-10 秒才能获取到最新的配置；而 APISIX 则采用监听 etcd 的配置变更的方式，可以将时间控制在毫秒级，达到实时生效的效果。 而且由于 APISIX 和 etcd 均支持多点部署，因此在 APISIX 当前架构中，任何一个服务出现异常宕机等事故，都不会影响 APISIX 正常对外提供服务的能力。

kong 的路由实现是遍历的，Apache APISIX 的路由是基数树，相差几个数量级。

## 使用

参考官网：

[https://apisix.apache.org/zh/docs/apisix/getting-started/README/](https://apisix.apache.org/zh/docs/apisix/getting-started/README/)

```yml
version: "3"

services:
  apisix-dashboard:
    image: apache/apisix-dashboard:3.0.1-alpine
    restart: always
    volumes:
    - ./dashboard_conf/conf.yaml:/usr/local/apisix-dashboard/conf/conf.yaml
    ports:
    - "9000:9000"
    networks:
      apisix:

  apisix:
    image: apache/apisix:${APISIX_IMAGE_TAG:-3.6.0-debian}
    restart: always
    volumes:
      - ./apisix_conf/config.yaml:/usr/local/apisix/conf/config.yaml:ro
    depends_on:
      - etcd
    ##network_mode: host
    ports:
      - "9180:9180/tcp"
      - "9080:9080/tcp"
      - "9091:9091/tcp"
      - "9443:9443/tcp"
      - "9092:9092/tcp"
    networks:
      apisix:

  etcd:
    image: bitnami/etcd:3.4.15
    restart: always
    volumes:
      - etcd_data:/bitnami/etcd
    environment:
      ETCD_ENABLE_V2: "true"
      ALLOW_NONE_AUTHENTICATION: "yes"
      ETCD_ADVERTISE_CLIENT_URLS: "http://etcd:2379"
      ETCD_LISTEN_CLIENT_URLS: "http://0.0.0.0:2379"
    ports:
      - "2379:2379/tcp"
    networks:
      apisix:

  web1:
    image: nginx:1.19.0-alpine
    restart: always
    volumes:
      - ./upstream/web1.conf:/etc/nginx/nginx.conf
    ports:
      - "9081:80/tcp"
    environment:
      - NGINX_PORT=80
    networks:
      apisix:

  web2:
    image: nginx:1.19.0-alpine
    restart: always
    volumes:
      - ./upstream/web2.conf:/etc/nginx/nginx.conf
    ports:
      - "9082:80/tcp"
    environment:
      - NGINX_PORT=80
    networks:
      apisix:

  prometheus:
    image: prom/prometheus:v2.25.0
    restart: always
    volumes:
      - ./prometheus_conf/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
    networks:
      apisix:

  grafana:
    image: grafana/grafana:7.3.7
    restart: always
    ports:
      - "3000:3000"
    volumes:
      - "./grafana_conf/provisioning:/etc/grafana/provisioning"
      - "./grafana_conf/dashboards:/var/lib/grafana/dashboards"
      - "./grafana_conf/config/grafana.ini:/etc/grafana/grafana.ini"
    networks:
      apisix:

networks:
  apisix:
    driver: bridge

volumes:
  etcd_data:
    driver: local
```
