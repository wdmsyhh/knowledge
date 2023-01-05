title: Kubernetes
speaker: Byron Zhang

<slide />

# Kubernetes

Byron Zhang

<slide />

## [What is Kubernetes?](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/){target="_blank"}

Kubernetes（简称 k8s），一个可移植的、可扩展的开源平台，用于管理容器化的工作负载和服务，可促进声明式配置和自动化

## [What can it do?](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/#why-you-need-kubernetes-and-what-can-it-do){target="_blank"}

- 服务发现和负载均衡。
- 存储编排。
- 自动部署和回滚。
- 自动完成装箱计算。
- 自我修复。
- 密钥与配置管理。

<slide />

## Agenda

- 安装。
- 基础组件介绍。
- 常见资源类型。
- 资源文件编写规范。
- 常见问题。

<slide />

## 安装（[kubeadm](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/){target="_blank"}）

通过[配置文件](https://pkg.go.dev/k8s.io/kubernetes@v1.21.1/cmd/kubeadm/app/apis/kubeadm/v1beta2){target="_blank"}搭配 kubeadm 命令操作集群。

- 安装 [kubeadm、kubelet、kubectl](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/。install-kubeadm/)。
- [初始化集群（即控制平面组件）：`kubeadm init`](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#%E5%88%9D%E5%A7%8B%E5%8C%96%E6%8E%A7%E5%88%B6%E5%B9%B3%E9%9D%A2%E8%8A%82%E7%82%B9)。
    - [InitConfiguration](https://gitlab.maiscrm.com/mai/sre/-/blob/develop/ansible/roles/k8sMaster/templates/kubeadm-cluster.yml#L2)：引导 token 的配置以及所有特定于当前运行节点的设置。
    - [ClusterConfiguration](https://gitlab.maiscrm.com/mai/sre/-/blob/develop/ansible/roles/k8sMaster/templates/kubeadm-cluster.yml#L30)：集群的设置，包括网络，各个控制平面组件等。
    - [KubeletConfiguration](https://gitlab.maiscrm.com/mai/sre/-/blob/develop/ansible/roles/k8sMaster/templates/kubeadm-cluster.yml#L59)：将传递给集群中部署的所有 kubelet 实例的配置。
- [添加 Node 到集群：`kubeadm join`](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#join-nodes)。
    - [JoinConfiguration](https://gitlab.maiscrm.com/mai/sre/-/blob/develop/ansible/roles/k8sNode/templates/kubeadm-join.yml)：和 InitConfiguration 类似，包含访问集群的连接信息和特定于当前运行节点的设置。

SRE 已经针对上述过程封装了 Ansible 脚本，参考[这里](https://gitlab.maiscrm.com/mai/sre/-/blob/develop/ansible/README.md#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%9B%86%E7%BE%A4){target="_blank"}。

<slide />

## [基础组件介绍](https://kubernetes.io/zh/docs/concepts/overview/components/){target="_blank"}

### 控制平面组件（Control Plane Components）

- kube-apiserver：暴露 Kubernetes API 用于其它服务访问。
- etcd：兼具一致性和高可用性的键值数据库，作为保存 Kubernetes 所有集群数据的后台数据库。
- kube-scheduler：负责监视新创建的、未指定运行节点（node）的 Pods，根据调度决策考虑选择节点让 Pod 在上面运行。
- kube-controller-manager：
    - 节点控制器（Node Controller）: 负责在节点出现故障时进行通知和响应。
    - 任务控制器（Job controller）: 监测代表一次性任务的 Job 对象，然后创建 Pods 来运行这些任务直至完成。
    - 端点控制器（Endpoints Controller）: 填充端点(Endpoints)对象(即加入 Service 与 Pod)。
    - 服务帐户和令牌控制器（Service Account & Token Controllers）: 为新的命名空间创建默认帐户和 API 访问令牌。
- cloud-controller-manager：将部分集群资源与云提供商的资源绑定，共享生命周期（非必须）。

<slide />

### Node 组件

- kubelet：接收一组通过各类机制提供给它的 PodSpecs，确保这些 PodSpecs 中描述的容器处于运行状态且健康，kubelet 不会管理不是由 Kubernetes 创建的容器。
- kube-proxy：集群中每个节点上运行的网络代理， 实现 Kubernetes 服务（Service）概念的一部分。
- 容器运行时（Container Runtime）：任何实现 [Kubernetes CRI (容器运行环境接口)](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-node/container-runtime-interface.md){target="_blank"} 的软件。
    - 当前使用的的 CRI：[Docker](https://docs.docker.com/get-started/){target="_blank"}。
    - 预计会更换为 [Containerd](https://containerd.io/docs/){target="_blank"}：[相较于 docker](https://cloud.tencent.com/document/product/457/35747){target="_blank"} 调用链更短，组件更少，更稳定，占用节点资源更少。

<slide />

### 插件（Addons）

- DNS：
    - Kubernetes 1.13 开始默认安装 [CoreDNS](https://coredns.io/){target="_blank"}。
- 容器资源监控：
    - [kube-metrics-server](https://github.com/kubernetes-sigs/metrics-server){target="_blank"}。
    - [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics){target="_blank"}。
- CNI 组件：
    - [Canal](https://docs.projectcalico.org/getting-started/kubernetes/flannel/flannel){target="_blank"}：Calico 和 Flannel 一起部署被称为 Canal。
        - Flannel：配置第 3 层 IPv4 overlay 网络构成网络层，从而可以在不同的部署环境中运行且无需额外配置。
        - Calico：不仅提供主机和 Pod 之间的网络连接，还涉及网络安全和管理。

<slide />

## 常见资源类型

- Container：通过 CRI 运行的容器。
- Pod：Kubernetes 中创建和管理的最小可部署的计算单元，包含一组 Container，这些 Container 进程独立，存储和网络共享。
- Workload Resources：Kubernetes 内置的管理 Pods 的资源类型。
    - Deployment 和 ReplicaSet：所有 Pod 都是相互等价的，并且在需要的时候被换掉。
    - StatefulSet：Pod name 有规则，是可以跟踪应用状态的一组 Pods。
    - DaemonSet：对于集群中的每个节点，如果该节点与某 DaemonSet 的规约匹配，则 Kubernetes 会为该 DaemonSet 调度一个 Pod 到该节点上运行。
    - Job 和 CronJob： 定义一些一直运行到结束并停止的任务，Job 用来表达的是一次性的任务，而 CronJob 会根据其时间规划反复运行。

<slide />

### [服务和负载均衡](https://kubernetes.io/zh/docs/concepts/services-networking/)

- Service：将运行在一组 Pods 上的应用程序公开为网络服务的抽象方法。
- Ingress：对集群中服务的外部访问进行管理的 API 对象。

<slide />

### [存储](https://kubernetes.io/zh/docs/concepts/storage/)

- Volume：包含可被 Pod 中容器访问的数据的目录。
- Persistent Volume：集群中的一块存储，可以由管理员事先供应，或者 使用存储类（Storage Class）来动态供应。
- Persistent Volume Claim：表达的是用户对存储的请求。概念上与 Pod 类似。 Pod 会耗用节点资源，而 PVC 申领会耗用 PV 资源。
- Storage Class：为管理员提供了描述存储 "类" 的方法。

<slide />

### [配置、密钥](https://kubernetes.io/zh/docs/concepts/configuration/)

- ConfigMap：用来将非机密性的数据保存到键值对中。使用时， Pods 可以将其用作环境变量、命令行参数或者存储卷中的配置文件。
- Secret：用来保存敏感信息，例如密码、OAuth 令牌和 SSH 密钥。

### [鉴权（RBAC）](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/)

- ServiceAccount：为在 Pod 中运行的进程提供标识。
- Role、ClusterRole：Role 或 ClusterRole 中包含一组代表相关权限的规则。
- RoleBinding、ClusterRoleBinding：绑定角色到某 *主体（Subject）*上。 主体可以是组，用户或者服务账户。

<slide />

## [资源文件编写规范](https://kb.maiscrm.com/sre/design/infras.html#k8s)

- 术语（env、cluster、project、service）。
- 命令空间。
- 标签。
- 资源分配。
- 调度策略。
- 命名。
- 排序。

<slide />

## [deploy 脚本工作流程](https://gitlab.maiscrm.com/sre/k8s/-/blob/develop/README.md){target="_blank"}

<slide />

## 常见问题

- [知识库 - 运维 K8S](https://kb.maiscrm.com/sre/howTos/operateK8s.html#%E8%BF%90%E7%BB%B4-k8s){target="_blank"}。
- [知识库 - FAQ](https://kb.maiscrm.com/sre/faq.html#%E5%86%85%E9%83%A8){target="_blank"}。
- [known issues of infras components](https://gitlab.maiscrm.com/mai/sre/issues/1989){target="_blank"}。
