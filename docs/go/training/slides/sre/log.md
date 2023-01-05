title: Kubernetes 日志收集
speaker: Zack Sun

<slide />

# Kubernetes 中的日志收集

Zack Sun

<slide />

## Agenda

- 需求分析
- 方案介绍
- 日志规范
- SLS 查询分析语法
- 常见问题

<slide />

## 需求分析

### 哪些日志需要收集？

对于 Kubernetes 集群而言，日志来源可以分为两大类：

- 容器产生的日志，如 access，service 等。
- kern，MongoDB，kubelet 等不在容器内产生的日志。

而针对不在容器内产生的日志，可以通过容器读取文件并输出将其转为容器产生的日志。

<slide />

### 收集到哪里及怎么用？

- 阿里云日志服务（SLS）：方便搜索（排查问题）与分析（提供可视化图表）。
- InfluxDB：用于报警。
- Elasticsearch：当阿里云日志服务不可用时，可使用其替代，缺少统计功能。

<slide />

### 需要做什么处理？

- 数据清洗：过滤掉不需要的日志。
- 分类、格式化：方便搜索，增加可读性。
- 脱敏：如密码，手机号，身份证号等。

<slide />

## 方案介绍

### 设计原则

- 非侵入式：日志输出到控制台，由容器服务统一收集处理。
- 日志规范化：所有使用日志系统的项目遵循统一的日志规范。
- [cloud native（云原生）](https://12factor.net/zh_cn/logs)。

<slide />

### 目前的收集流程

[docker -> journald -> journalbeat -> logstash -> influxdb/SLS](https://kb.maiscrm.com/sre/design/infras.html#%E6%97%A5%E5%BF%97%E6%94%B6%E9%9B%86)

<slide />

### 后续演进

Kubernetes 后续使用 Containerd 替换 Docker，日志将不再传给 journald 而是存在文件中，因此会使用 [Fluentd](https://docs.fluentd.org/) 替换 journald + journalbeat + logstash。

<slide />

## 日志规范

[务必仔细阅读](https://open.maiscrm.com/docs/app/devSpec.html#%E6%97%A5%E5%BF%97)

<slide />

## [SLS 查询语法](https://help.aliyun.com/document_detail/29060.html?spm=5176.2020520112.help.dexternal.4b1134c0H97g9I)

- `and/or/not` 等常规运算符。
- `:`：用于字段查询（Key:Value）。
- 支持通配符 `*/?`。
- 使用技巧：
    - 查询不存在 remote_user 字段的日志：`not remote_user:*`。

<slide />

## [SLS 分析语法](https://help.aliyun.com/document_detail/53608.html?spm=5176.2020520112.help.dexternal.4b1134c0H97g9I)

- 基本语法：`${查询语法} | ${分析语法}`
- 示例：[@namespace: "scrm" AND @service: "weconnect-consumer-webhook" AND type: accessout AND responseStatus >= 500 | select "@formattedUrl", responseStatus, count(*) as c group by "@formattedUrl", responseStatus order by c desc](https://staging-sreadmin.quncrm.com/logs/browser?from=2021-06-01T01%3A11%3A28.142Z&pageCurrent=1&pageSize=20&query=QG5hbWVzcGFjZTogInNjcm0iIEFORCBAc2VydmljZTogIndlY29ubmVjdC1jb25zdW1lci13ZWJob29rIiBBTkQgdHlwZTogYWNjZXNzb3V0IEFORCByZXNwb25zZVN0YXR1cyA%2BPSA1MDAgfCBzZWxlY3QgIkBmb3JtYXR0ZWRVcmwiLCByZXNwb25zZVN0YXR1cywgY291bnQoKikgYXMgYyBncm91cCBieSAiQGZvcm1hdHRlZFVybCIsIHJlc3BvbnNlU3RhdHVzIG9yZGVyIGJ5IGMgZGVzYw%3D%3D&sortOrder=descend&to=2021-06-01T02%3A45%3A28.142Z)
- 进阶技巧：
    - [正则式函数](https://help.aliyun.com/document_detail/63453.html?spm=a2c4g.11186623.6.852.21654824BUCBQX)
    - [IP 地理函数](https://help.aliyun.com/document_detail/63458.html?spm=a2c4g.11186623.6.853.256f37aaZEbY2H)
    - 其他函数
- [统计结果展示](https://xdash.quncrm.com/d/000000048/access?orgId=1&refresh=1m)

<slide />

## 常见问题

- [日志延迟](https://kb.maiscrm.com/sre/howTos/debugLogCollecting.html)
- [日志保留时间](https://kb.maiscrm.com/sre/faq.html#%E7%BE%A4%E8%84%89%E7%B3%BB%E7%BB%9F%E5%86%85%E7%9A%84%E6%97%A5%E5%BF%97%E4%BC%9A%E4%BF%9D%E7%95%99%E5%A4%9A%E4%B9%85%EF%BC%9F)
- [脱敏规则](https://open.maiscrm.com/docs/app/devSpec.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9-4)
