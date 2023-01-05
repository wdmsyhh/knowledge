title: Project Background
speaker: Neil Chen

<slide />

# Project Background

Neil Chen

<slide />

## [sre](https://gitlab.maiscrm.com/mai/sre.git)

该项目用于管理 SRE 团队自动化运维脚本、工具，目前主要使用 Ansible（2.7.6）作为自动化运维工具，使用 Terraform（v0.13.5）作为自动化云资源编排工具，在使用前需仔细阅读相关的 READMIN 并严格遵守。

### 项目核心结构

```markdown
├── ansible/ # 管理各种通过 Ansible 自动化安装、配置的服务的脚本
│   ├── ansible.cfg # Ansible 配置文件
│   ├── inventories/ # Ansible inventory 文件所在的目录，每个环境单独一个 inventory 文件
│   │                # 如果环境中包含多个 MongoDB 复制集，则每个复制集也需要单独一个
│   ├── playbooks/ # Ansible playbook 所在的目录
│   ├── README.md # Ansible 开发规范以及各 playbook 使用说明，需仔细阅读并严格遵守，新增 playbook 时也需要在其中记录相应的使用说明
│   └── roles/ # Ansible role 所在的目录。
├── archived/ # 用于归档已过时的脚本
├── README.md # sre 项目介绍
├── terraform/ # 管理各环境的云资源编排脚本，用于在对应的云上创建、更新资源，对于无法提供云控制台权限的客户，目前都是通过这种方式管理云资源
│   ├── clusters/ # 用于管理集群相关的配置，每个集群单独一个目录
│   ├── modules/ # 用于管理云资源配置，每个云平台单独一个目录
│   └── README.md # Terraform 开发规范以及使用说明，需仔细阅读并严格遵守
└── tools # 管理各种运维工具，这些工具通常只针对某种特殊的需求，不需要或者无法使用 Ansible 管理
    ├── aliyun/ # 管理阿里云相关的脚本，其中常用的为 clearOutdatedImages，用于清理镜像仓库
    ├── azure/ # 管理微软云相关的脚本
    ├── blockGitlabUsers/ # 禁用 Gitlab 用户
    ├── buildK8sClusterAutoscalerImages/ # 构建 autoscaler 镜像，用于 k8s node 弹性伸缩
    ├── jenkins/ # 管理 Jenkins 相关的脚本，其中常用的为 addEnv.groovy，每次新增私部环境时都需要使用该脚本创建相应的 Jenkins job
    ├── latestServiceImageTag/ # 用于在每次构建镜像时将最新的 tag 存储到 Redis，以保证部署的是最新的代码
    ├── mongo/ # 管理 MongoDB 相关的脚本，私部 MongoDB 时需要使用其中的 initScrm.js 脚本初始化
    │          # 迁移 MongoDB 时，需要使用其中的 diffIndexes 比对索引是否迁移成功
    ├── syncGrafanaDashboards/ # 用于同步 xdash 配置到其他环境
    └── syncThirdPartyImages/ # 用于同步第三方镜像到群脉的镜像仓库中，以加快拉取速度
```

<slide />

## [k8s](https://gitlab.maiscrm.com/sre/k8s.git)

该项目用于向 k8s 集群中部署服务，项目中定义了各服务的配置信息以及对应的 k8s 资源的编排信息，其中包含大量敏感信息，切不可泄露给无关人员。每个 production 环境单独一个分支，所有 staging 环境共用 develop 分支，新增服务需遵循此[规范](https://kb.maiscrm.com/sre/design/infras.html#k8s)。

<slide />

### 项目核心结构

```markdown
├── clusters/ # 用于管理 k8s 集群配置信息，每个集群单独一个同名子目录，每个子目录中包含该集群所有的 namespace 的配置文件
│   │         # 每个 namespace 配置文件按 group、project、service 的结构定义了该 namespace 所部署的服务以及服务所使用的各种环境变量
│   ├── scrm-production/
│   │   ├── danoneinternational.yml # danoneinternational namespace 配置文件，其中定义了 danone hosting 相关的服务
│   │   │                           # 这些服务所使用的资源创建在群脉阿里云账户，由群脉管理，与群脉环境共享 k8s 集群
│   │   ├── danoneri.yml # danoneri namespace 配置文件，其中也是定义了 danone hosting 相关的服务
│   │   ├── istio-system.yml # istio-system namespace 配置文件，其中定义了 istio 相关的服务，目前主要用在 sreadmin 相关的服务上了
│   │   ├── kube-system.yml # kube-system namespace 配置文件，其中定义了 k8s 集群所使用的核心插件
│   │   ├── scrm.yml # scrm namespace 配置文件，其中定义了群脉所使用的各种服务
│   │   ├── sre.yml # sre namespace 配置文件，其中定义了群脉基础架构相关的服务，主要有 admin 和 infras 两个 project
│   │   │           # 其中 admin 中主要为 sreadmin 相关的服务，infras 中主要为各种基础服务，比如：xdash、logstash、prometheus 等
│   │   ├── vault.yml # vault namespace 配置文件，其中定义了 vault-server 服务，用于加、解密 MongoDB 敏感数据
│   │   └── vela-system.yml # vela-system namespace 配置文件，其中定义了 KubeVela 管理的服务，目前只有 frontend-backendv2
├── common/
│   └── deployment.yml # 用于给 k8s deployment 资源添加 project 和 service 标签
├── helmCharts/ # 用于管理各种通过 helm 方式部署的服务的 chart，通过 `helm pull` 将这些 chart 下载并解压到这个目录中
│   │           # 所有对 chart 的定制化操作，都需要在 k8s 项目下的 README 中记录，以方便后续更新、升级
├── scrm/ # scrm group 目录，其下按 project/service_without_project 的目录结构定义了各 project 下的 service 的 k8s 资源编排文件
│   ├── admin/ # admin project，对应 scrm namespace 配置文件中的 project: admin
│   │   └── web/ # 该目录名由 service 名去掉 project 名得到的
│   │       ├── admin-web.deployment.yml # admin-web 服务的 deployment 资源编排文件，格式为 ${service 名}.${k8s 资源名}.yml
│   │       ├── admin-web.ingress.yml # admin-web 服务的 ingress 资源编排文件
│   │       └── admin-web.service.yml # admin-web 服务的 service 资源编排文件
│   ├── blogrpc/ # blogrpc project，对应 scrm namespace 配置文件中的 project: blogrpc
│   │   └── template/ # template 目录下的资源编排文件可提供给多个 service 使用，定义 service 时通过 clone 关键字来引用即可
│   │       │         # 通常 project 下多个服务的配置相似时，可以使用这种方式来定义其资源编排文件，以简化配置
│   │       │         # 此处表示 blogrpc project 下的各服务可以共用 template 下的 k8s 资源编排文件
│   │       ├── blogrpc-template.deployment.yml
│   │       ├── blogrpc-template.hpa.yml
│   │       ├── blogrpc-template.pdb.yml
│   │       └── blogrpc-template.service.yml
│   ├── production.yml # scrm production 环境各服务的 CPU、内存资源的配置，在 scrm namespace 的配置文件中通过 extends 关键字引用
│   └── staging.yml # scrm staging 环境各服务 CPU、内存资源的配置
├── sre/ # sre group 目录
│   ├── admin/ # admin project，定义了 sreadmin 各服务的资源编排文件
│   ├── infras/ # infras project，定义了基础架构相关的各服务的资源编排文件
│   ├── production.yml
│   └── staging.yml
├── tls/ # 该目录下定义了各种证书的 crt 和 key 信息，会创建为 k8s secret
├── cherryPick.sh # 该脚本用来将 Git commit 同步到其他分支，所有的改动都是先到 develop 分支，然后必须通过该脚本 cherry pick 到其他分支
├── deploy # 该脚本用于部署服务，务必仔细阅读 READMIN 掌握其用法，通常在本地配合 `--dry-run` 参数，以检查对服务的修改是否生效
├── deployAllServices.sh # 该脚本用于部署指定集群中的所有服务
├── jenkinsDeploy.sh # 该脚本用于通过 Jenkins 来部署服务，需要在相应的集群中放行 Jenkins 公网 IP 的 6443 端口
├── pollResource.sh # 该脚本目前用于 frontend migration，对应的 Jenkins job 为：`${env}-frontend-migration-poll`
├── README.md # k8s 项目介绍，需仔细阅读并遵守其中的规范
└── top # 该脚本用于计算指定集群的 namespace 下所有服务的 CPU、内存的 requests/limits
```

<slide />

## [base-ubuntu](https://gitlab.maiscrm.com/mai/docker/base-ubuntu.git)

该项目修改于开源项目 baseimage-docker，用于构建基础镜像 base-ubuntu，每个环境单独一个，构建规范参考[这里](https://kb.maiscrm.com/sre/buildImages.html#%E9%95%9C%E5%83%8F%E6%9E%84%E5%BB%BA%E8%A7%84%E8%8C%83)，该镜像为群脉的基础镜像，目前使用的 Ubuntu 版本为 18.04.1 LTS。

<slide />

### 项目核心结构

base-ubuntu 的项目结构严格遵守我们的镜像构建规范，其他 docker base、service 相关的项目结构基本与之类似（部分项目可能复制于开源项目，包含项目源码，但是其镜像构建相关的目录结构也是与我们的规范一致的），务必理解并掌握。

```markdown
├── bin/ # 用于管理容器中用到的可执行文件
│   ├── apt-install # 封装 apt-get update、apt-get install、apt-get clean 命令
│   │                # 容器中所有通过 apt 源来安装的包都必须使用该命令，以清理不必要的缓存，减小镜像的体积
│   ├── confd # 用于根据模板生成配置文件
│   ├── consul # containerpilot 会在本地使用此程序启一个 Consul client
│   ├── consul-template # 根据模板文件从 Consul 实例查询到值，替换并生成新的配置文件
│   ├── containerpilot # 用来管理服务到 Consul 的注册、解注册、健康检查、配置文件动态更新等
│   ├── jq # 用于在命令行中解析 json
│   ├── ossutil # 阿里云 OSS 命令行工具，封装了 ossutil64 部分选项
│   ├── ossutil64
│   ├── rclone # 对象存储命令行工具，用来管理所有支持 S3 协议的对象存储，比如阿里云 OSS、Azure blob
│   └── rcloneutil # 封装了 rclone 工具
├── conf/ # 用于管理容器中用到的配置文件
│   ├── containerpilot/ # 用于管理 Containerpilot 配置文件
│   ├── aptSources.list # 容器所使用的 apt 源
│   ├── consulClient.conf # Consul Client 配置文件
│   └── inputrc # 用于优化容器 Bash
├── my_init.d/ # 用于管理容器启动时要执行的初始化脚本，脚本命名应该用数字指明执行顺序，数字越小优先级越高
│   ├── 01_setTimezone.sh # 用于设置容器的时区
│   ├── 02_updateResolveConf.sh # 用于设置容器的 DNS 选项
│   ├── 03_enableNscd.sh # 用于开启 NSCD 服务缓存
│   └── 99_waitIstioSidecarReady.sh
├── service/ # 用于管理容器中通过 runit 运行的服务，每个服务单独一个子目录，目录名同服务名
│   └── nscd/
├── buildImage.sh* # 用于构建镜像
├── Dockerfile # 镜像构建所使用的 Dockerfile
└── README.md # 项目说明
```

<slide />

## [base-phpcli](https://gitlab.maiscrm.com/mai/docker/base-phpcli.git)

该项目用于构建 base-phpcli 镜像，为 PHP 环境的基础镜像，其 base 镜像为 base-ubuntu，镜像中通过源码的方式安装了 php，通过 pecl 的方式安装了各种 PHP 扩展，目前支持的 PHP 版本为 7.1.32 和 7.2.22（danone hosting 专用）。

## [base-phpfpm](https://gitlab.maiscrm.com/mai/docker/base-phpfpm.git)

该项目用于构建 base-phpfpm 镜像，内置了 php-fpm-exporter 用于暴露 phpfpm 相关 metrics，以方便监控 phpfpm 以及根据 phpfpm 水平扩容 k8s pod，其 base 镜像为 base-phpcli，目前支持的 PHP 版本为 7.1.32 和 7.2.22。

## [base-openresty](https://gitlab.maiscrm.com/mai/docker/base-openresty.git)

该项目用于构建 base-openresty 镜像，以用于提供 web 服务，其 base 镜像为 base-ubuntu，其配置文件中自定义了 access log 日志格式，目前支持的 openresty 版本为 1.13.6.2。

## [base-nginx-phpfpm](https://gitlab.maiscrm.com/mai/docker/base-nginx-phpfpm.git)

该项目用于构建 base-nginx-phpfpm 镜像，通过在 base-phpfpm 镜像中安装 openresty 来为 PHP 项目提供 web 服务，目前支持的 PHP 版本为 7.1.32 和 7.2.22。

<slide />

## [base-python](https://gitlab.maiscrm.com/mai/docker/base-python.git)

该项目用于构建 base-python 镜像，为 Python 环境基础镜像，其 base 镜像为 base-ubuntu，镜像中安装有 pip、setuptools 工具，目前支持的 python 版本为 3.6.9。

## [base-nginx-python](https://gitlab.maiscrm.com/mai/docker/base-nginx-python.git)

该项目用于构建 base-nginx-python 镜像，以用于为 Python 环境提供 web 服务，其 base 镜像为 base-python，目前支持的 python 版本为 3.6.9。

<slide />

## [base-golang](https://gitlab.maiscrm.com/mai/docker/base-golang.git)

该项目用于构建 base-golang 镜像，为 Golang 环境基础镜像，其 base 镜像为 base-ubuntu，目前支持的 go 版本为 1.12.4、1.13.4、1.16.5、1.19.3。

<slide />

## [base-nodejs](https://gitlab.maiscrm.com/mai/docker/base-nodejs.git)

该项目用于构建 base-nodejs 镜像，为 NodeJs 环境基础镜像，其 base 镜像为 base-ubuntu，支持 npm 和 yarn 两种包管理工具，目前支持的 node 版本为 8.1.2、8.9.0、10.15.3、14.16.1。

<slide />

## [base-java](https://gitlab.maiscrm.com/mai/docker/base-java.git)

该项目用于构建 base-java 镜像，为 Java 环境基础镜像，其 base 镜像为 base-ubuntu，使用 OpenJDK，目前支持的 JDK 版本为 8u292。

## [base-tomcat](https://gitlab.maiscrm.com/mai/docker/base-tomcat.git)

该项目用于构建 base-tomcat 镜像，以用于为 Java 环境提供 web 服务，其 base 镜像为 base-java，目前支持的 Tomcat 版本为 8.0.53。

## [base-spark](https://gitlab.maiscrm.com/mai/docker/base-spark.git)

该项目用于构建 base-spark、service-spark、service-spark-history-server、service-hive-metastore、service-spark-zeppelin 镜像，这些镜像用于 bigdata 相关的服务，其中 base-spark 镜像的 base 镜像为 base-java，其余镜像的 base 镜像为 base-spark。

<slide />

## [service-chat](https://gitlab.maiscrm.com/mai/docker/service-chat.git)

该项目复制于开源项目 RocketChat，根据我们的需求做了定制化，用于构建和部署 rocketchat 和 hubot 服务，其中 rocketchat 为群脉内部技术团队主要的沟通工具，使用时需仔细阅读并遵守[规范](https://chat.maiscrm.com/home)，目前使用的版本为 3.16.0，hubot 用于监听各种频道消息并做出响应。

<slide />

## [service-consul](https://gitlab.maiscrm.com/mai/docker/service-consul.git)

该项目用于构建 service-consul-server、service-consul-client 镜像，分别用于 consul-server 和 consul-client 的部署，以实现服务注册与服务发现功能，其中 consul-server 通过 ansible 脚本以 docker 容器的方式部署在指定的节点上，consul-clinet 部署在 k8s 集群中，服务名为 infras-consul。

<slide />

## [service-k8s-autoscaler](https://gitlab.maiscrm.com/mai/docker/service-k8s-autoscaler.git)

该项目复制于开源项目 Kubernetes Autoscaler，根据我们的需求做了定制化，增加了对阿里云的支持以及修改了微软云的部分配置，用于 k8s node 的弹性伸缩，其对应的 k8s 服务名为 infras-k8s-cluster-autoscaler。

<slide />

## [service-elasticsearch](https://gitlab.maiscrm.com/mai/docker/service-elasticsearch.git)

该项目基于社区的 Elasticsearch 镜像做了部分修改，以用于构建、运行 Elasticsearch 服务，主要用于本地开发，目前支持的版本为 5.3.2。

## [service-redis](https://gitlab.maiscrm.com/mai/docker/service-redis.git)

该项目用于构建、运行 Redis 服务，主要用于本地开发以及 CI 上存储镜像 tag，目前支持的版本为 5.0.12。

## [service-mongodb](https://gitlab.maiscrm.com/mai/docker/service-mongodb.git)

该项目用于构建、运行 MongoDB 服务，支持单机和复制集模式，主要用于本地开发，目前使用的版本为 4.2.10。

<slide />

## [service-kibana](https://gitlab.maiscrm.com/mai/docker/service-kibana.git)

该项目基于社区的 Kibana 镜像做了部分修改，以用于构建、运行 Kibana 服务，从而实现 Elasticsearch 数据的可视化，其对应的 k8s 服务名为 infras-kibana。

<slide />

## [service-monstache](https://gitlab.maiscrm.com/mai/docker/service-monstache.git)

该项目复制于开源项目 Monstache，根据我们的需求做了定制化，用于实时同步 frontend MongoDB 的 product、chatsession、offlinesession、member 表的数据到 Elasticsearch，其对应的 k8s 服务名为 `infras-monstache-${MongoDB 数据库名}`，所有 frontend MongoDB 数据库都需要单独部署该服务。

<slide />

## [service-telegraf](https://gitlab.maiscrm.com/mai/docker/service-telegraf.git)

该项目复制于开源项目 Telegraf，根据我们的需求做了定制化，用于收集 k8s 集群的各种 metrics（比如 node 的 CPU、memory），并将其写入到 Influxdb 中，其对应的 k8s 服务名为 infras-telegraf，以 DaemonSet 的方式部署于各 node 上。

## [service-journalbeat](https://gitlab.maiscrm.com/mai/docker/service-journalbeat.git)

该项目用于读取 journald 中的日志并发送到 logstash，其对应的 k8s 服务为 infras-journalbeat，以 DaemonSet 的方式部署于各 node 上。

## [service-logstash](https://gitlab.maiscrm.com/mai/docker/service-logstash.git)

该项目用于解析转换日志并发送到统一的日志存储中心（阿里云日志服务、Elasticsearch 等），其对应的 k8s 服务名为 infras-logstash。

## [service-influxdata](https://gitlab.maiscrm.com/mai/docker/service-influxdata.git)

该项目下有 influxdb、kapacitor 两个目录，分别用于构建 service-influxdb、service-kapacitor 镜像，其中 service-influxdb 用于在 k8s 集群中部署 infras-influxdb 服务，以存储各种监控数据，service-kapacitor 用于部署 infras-kapacitor 服务，以提供根据监控数据报警的功能。

## [service-grafana](https://gitlab.maiscrm.com/mai/docker/service-grafana.git)

该项目基于社区的 Grafana 镜像做了部分修改，以实现 k8s 集群监控数据的可视化，其对应 k8s 服务为 infras-xdash。

<slide />

## [service-https-redirector](https://gitlab.maiscrm.com/mai/docker/service-https-redirector.git)

该项目用来将 http 的请求重定向到 https（部分云平台的负载均衡不能直接配置 80 到 443 端口的重定向，需要通过该服务实现），其对应的 k8s 服务名为 infras-https-redirector。

## [service-www-redirector](https://gitlab.maiscrm.com/mai/docker/service-www-redirector.git)

该项目用于将一级域名重定向到有 www. 前缀的二级域名，并且托管一级域名的微信小程序域名验证文件，其对应的 k8s 服务名为 infras-www-redirector。

<slide />

## [service-request-interceptor](https://gitlab.maiscrm.com/mai/docker/service-request-interceptor.git)

该项目用于拦截请求，被拦截的请求会返回 responseStatus 503，消息为：系统繁忙，请稍后再试，其对应的 k8s 服务名为 infras-request-interceptor，在流量高峰期服务不可用时，可通过该服务来拦截某些租户的请求，避免影响其他租户。

## [service-maintenance](https://gitlab.maiscrm.com/mai/docker/service-maintenance.git)

该项目用于定义系统维护时的显示界面，其对应的 k8s 服务名为 infras-maintenance。

<slide />

## [service-openvpn](https://gitlab.maiscrm.com/mai/docker/service-openvpn.git)

该项目用于让部署于微软云欧洲的 medela 环境内的 ONS TCP 客户端能够访问到阿里云欧洲 region 内的资源，其对应的 k8s 服务名为 infras-openvpn，目前只部署于 medela 环境。

<slide />

## [service-oss-proxy](https://gitlab.maiscrm.com/mai/docker/service-oss-proxy.git)

该项目复制于开源项目 ImageProxy，根据我们的需求做了定制化，对于非阿里云环境的私部需求，可以使用该服务来实现 url 重写、回源、图片裁剪等功能。

<slide />

## [service-puppeteer](https://gitlab.maiscrm.com/mai/docker/service-puppeteer.git)

该项目用基于社区的 Puppeteer 镜像做了部分修改，用于生成海报，其对应的 k8s 服务名为 infras-puppeteer。

<slide />

## [service-yapi](https://gitlab.maiscrm.com/mai/docker/service-yapi.git)

该项目用于为 danone hosting 项目提供 api 管理平台，其对应的 k8s 服务名为 infras-yapi-danoneri。

<slide />

## [tool-ci](https://gitlab.maiscrm.com/mai/docker/tool-ci.git)

该项目用来构建各语言的 linter 和其它 CI 工具镜像。

<slide />

## [tool-maven-builder](https://gitlab.maiscrm.com/mai/docker/tool-maven-builder.git)

该项目用于构建和运行 Maven 项目。

<slide />

## [tool-proto-builder](https://gitlab.maiscrm.com/mai/docker/tool-proto-builder.git)

该项目用于生成 grpc stub 文件，以用于 blogrpc 项目的构建、部署。

<slide />

## [tool-web-builder](https://gitlab.maiscrm.com/mai/docker/tool-web-builder.git)

该项目用于构建 PHP web 项目，目前 frontend frontend、backend、h5 镜像的构建会使用该镜像来初始化。

<slide />

## [CI](https://ci.maiscrm.com/)

群脉使用 Jenkins 实现自动化构建、测试和部署服务，配合 Ｇitlab 使用，开发可以很方便的将自己的代码部署到指定的环境中，所有的镜像的构建以及服务的部署都是通过它来完成的。每新增一个私部环境，都需要执行 [addEnv.groovy](https://gitlab.maiscrm.com/mai/sre/-/blob/develop/tools/jenkins/addEnv.groovy) 脚本在相关的 base、service 的 job 中添加新的 env 变量以及创建新的 view 并在该 view 下创建新的 job，以用于该环境的部署。

<slide />

## Gitlab

群脉使用 Gitlab 来管理代码，以及追踪内部 issue，在使用时需遵守相关的[规范](https://kb.maiscrm.com/grpc/tools.html#gitlab)。

<slide />

## 环境介绍

目前群脉所有的环境信息可参考[这里](https://kb.maiscrm.com/others/lists/environments.html#%E7%8E%AF%E5%A2%83%E8%AF%B4%E6%98%8E)，其中 unilever-staging、unilever-production、masterkong-production、bsd-production 环境共享了群脉 production 环境的 weconnect 服务，在做变更或者压测时，需要注意对这些环境的影响。
