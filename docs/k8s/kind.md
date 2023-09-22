# kind

## 官网

[https://kind.sigs.k8s.io/](https://kind.sigs.k8s.io/)

## 使用

- 安装

```
# 默认会安装到 /home/user/go/bin 中 也就是 GOPATH 的 bin 中
# 这里使用 v0.11.0 版本的 kind，对应的 k8s 版本是 v1.21，选用这个版本为了使用负载均衡器 MetalLB，过高的版本将不能使用。
go install sigs.k8s.io/kind@v0.11.0
```

- 创建集群

```shell
kind create cluster

# 创建结果
Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.21.1) 🖼
 ✓ Preparing nodes 📦
 ✓ Writing configuration 📜
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
Set kubectl context to "kind-kind"
You can now use your cluster with:

kubectl cluster-info --context kind-kind

Not sure what to do next? 😅  Check out https://kind.sigs.k8s.io/docs/user/quick-start/
```

- 查看集群信息

```shell
kubectl cluster-info --context kind-kind
# 或
kubectl cluster-info

## 查看结果，可以看到是跑在本地
kubectl cluster-info --context kind-kind
Kubernetes master is running at https://127.0.0.1:39107
KubeDNS is running at https://127.0.0.1:39107/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

这里安装的是 0.11.0 版本的 kind，所对应的 kubernetes 版本是 1.21

版本对应关系：[https://github.com/kubernetes-sigs/kind/releases?page=2](https://github.com/kubernetes-sigs/kind/releases?page=2)

- 本地 kubeconfig

查看：

```shell
kind get kubeconfig
```

kind（Kubernetes IN Docker）是一种在本地环境中运行 Kubernetes 集群的工具。在默认情况下，kind 将集群的 kubeconfig 文件保存在以下路径：

```shell
$HOME/.kube/config
```

如果你想在操作 kind 集群时使用自定义的 kubeconfig 文件，可以通过设置 KUBECONFIG 环境变量来指定 kubeconfig 文件的路径。例如，可以使用以下命令设置环境变量：

```shell
export KUBECONFIG=/path/to/custom/kubeconfig
```

## 查看 pod

- 查看 kind 默认的 pod 是否都处于 running 状态。

```shell
kubectl get pods -A
```

## 部署服务

如果你的镜像仓库需要用户名和密码进行访问，你可以在 Kubernetes Pod 的配置中使用 Secret 对象来指定凭据。以下是一个示例，展示如何在你提供的 Pod 配置中集成该凭据：

- 创建一个 Secret 对象：

首先，创建一个含有用户名和密码的 Secret 对象。你可以使用 kubectl create secret docker-registry 命令来创建该 Secret 对象。示例如下：

```shell
kubectl create secret docker-registry my-registry-secret \
  --docker-server=<registry-server> \
  --docker-username=<username> \
  --docker-password=<password> \
  --docker-email=<email>
```

- Deployment 和 Service 配置

新建 apps.yaml

```yaml
#apiVersion: v1
#kind: Pod
#metadata:
#  name: openapi-business
#spec:
#  # 定义容器，可以多个
#  containers:
#    - name: openapi-business # 容器名字
#      image: registry.ap-southeast-1.aliyuncs.com/yhhnamespace/blogrpc-openapi-business:local # 镜像
#      # 如果修改了 imagePullPolicy，需要删除 pod 重新创建
#      imagePullPolicy: Always # Always: 每次都重新拉取镜像。IfNotPresent（默认值）：仅当本地没有该镜像时才会拉取。Never：仅使用本地已有的镜像，不会拉取新的镜像。
#  imagePullSecrets:
#    - name: my-registry-secret-1

---
apiVersion: apps/v1
kind: Deployment
metadata:
  # 部署名字
  name: openapi-business
spec:
  replicas: 4
  # 用来查找关联的 Pod，所有标签都匹配才行
  selector:
    matchLabels:
      app: openapi-business
  # 定义 Pod 相关数据
  template:
    metadata:
      labels:
        app: openapi-business
    spec:
      # 定义容器，可以多个
      containers:
        - name: openapi-business # 容器名字
          image: registry.ap-southeast-1.aliyuncs.com/yhhnamespace/blogrpc-openapi-business:local # 镜像
          imagePullPolicy: Always
      imagePullSecrets:
        - name: my-registry-secret-1

---
apiVersion: v1
kind: Service
metadata:
  name: openapi-business
spec:
  selector:
    app: openapi-business
  # 默认 ClusterIP 集群内可访问，NodePort 节点可访问，LoadBalancer 负载均衡模式（需要负载均衡器才可用）
  type: NodePort
  ports:
    - port: 9091        # 本 Service 的端口
      targetPort: 9091  # 容器端口
      nodePort: 31111   # 节点端口，范围固定 30000 ~ 32767

---
apiVersion: apps/v1
kind: Deployment
metadata:
  # 部署名字
  name: blogrpc-hello
spec:
  replicas: 2
  # 用来查找关联的 Pod，所有标签都匹配才行
  selector:
    matchLabels:
      app: blogrpc-hello
  # 定义 Pod 相关数据
  template:
    metadata:
      labels:
        app: blogrpc-hello
    spec:
      # 定义容器，可以多个
      containers:
        - name: blogrpc-hello # 容器名字
          image: registry.ap-southeast-1.aliyuncs.com/yhhnamespace/blogrpc-hello:local # 镜像
          imagePullPolicy: Always
      imagePullSecrets:
        - name: my-registry-secret-1

---
apiVersion: v1
kind: Service
metadata:
  name: blogrpc-hello
spec:
  selector:
    app: blogrpc-hello
  # 默认 ClusterIP 集群内可访问，NodePort 节点可访问，LoadBalancer 负载均衡模式（需要负载均衡器才可用）
  type: ClusterIP
  ports:
    - port: 1701        # 本 Service 的端口
      targetPort: 1701  # 容器端口
#      nodePort: 31000   # 节点端口，范围固定 30000 ~ 32767

---
apiVersion: apps/v1
kind: Deployment
metadata:
  # 部署名字
  name: blogrpc-member
spec:
  replicas: 2
  # 用来查找关联的 Pod，所有标签都匹配才行
  selector:
    matchLabels:
      app: blogrpc-member
  # 定义 Pod 相关数据
  template:
    metadata:
      labels:
        app: blogrpc-member
    spec:
      # 定义容器，可以多个
      containers:
        - name: blogrpc-member # 容器名字
          image: registry.ap-southeast-1.aliyuncs.com/yhhnamespace/blogrpc-member:local # 镜像
          imagePullPolicy: Always
      imagePullSecrets:
        - name: my-registry-secret-1

---
apiVersion: v1
kind: Service
metadata:
  name: blogrpc-member
spec:
  selector:
    app: blogrpc-member
  # 默认 ClusterIP 集群内可访问，NodePort 节点可访问，LoadBalancer 负载均衡模式（需要负载均衡器才可用）
  type: ClusterIP
  ports:
    - port: 1701        # 本 Service 的端口
      targetPort: 1701  # 容器端口
#      nodePort: 31001   # 节点端口，范围固定 30000 ~ 32767
```

- 部署

```shell
kubectl apply -f apps.yaml
```

## 访问服务

### 节点外访问 openapi-business 服务。

- 查看 kind 节点的 ip

```shell
docker inspect kind-control-plane
```

- 访问

```shell
curl 172.18.0.2:31111/ping
{"hostname":"openapi-business-56c695c975-m8ctl","ip":"10.244.0.17"}
curl 172.18.0.2:31111/ping
{"hostname":"openapi-business-56c695c975-6zvxn","ip":"10.244.0.23"}
curl 172.18.0.2:31111/ping
{"hostname":"openapi-business-56c695c975-jgpj2","ip":"10.244.0.19"}
```

可以看到每次访问获取的 hostname 和 ip 会改变，这是由于 service 的负载均衡（只能对单节点的 pod 负载均衡，如果要实现跨节点则需要负载均衡器）

### 节点上访问

由于使用的是 Kind 起的 k8s，这个 k8s 是跑在 docker 中的。

```shell
# 进入容器
docker exec -it kind-control-plane bash
# 进入之后访问
root@kind-control-plane:/# curl localhost:31111/ping
# 多次请求结果
{"hostname":"openapi-business-56c695c975-2g6pr","ip":"10.244.0.18"}
root@kind-control-plane:/# curl localhost:31111/ping
{"hostname":"openapi-business-56c695c975-6zvxn","ip":"10.244.0.23"}
root@kind-control-plane:/# curl localhost:31111/ping
{"hostname":"openapi-business-56c695c975-6zvxn","ip":"10.244.0.23"}
```

### 集群内访问

- 查看有哪些 pod

```shell
kubectl get pods
# 结果
NAME                                READY   STATUS    RESTARTS   AGE
blogrpc-hello-67b7ff5b96-5sblb      1/1     Running   0          55m
blogrpc-hello-67b7ff5b96-m9wm5      1/1     Running   0          55m
blogrpc-member-74454ff4f6-2x74t     1/1     Running   0          55m
blogrpc-member-74454ff4f6-7lwlc     1/1     Running   0          55m
openapi-business-56c695c975-2g6pr   1/1     Running   0          55m
openapi-business-56c695c975-6zvxn   1/1     Running   0          55m
openapi-business-56c695c975-jgpj2   1/1     Running   0          55m
openapi-business-56c695c975-m8ctl   1/1     Running   0          55m
```

- 查看有哪些 service

```shell
kubectl get service
# 查看结果
NAME               TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)          AGE
blogrpc-hello      ClusterIP      10.96.39.150   <none>         1701/TCP         56m
blogrpc-member     ClusterIP      10.96.96.35    <none>         1701/TCP         56m
kubernetes         ClusterIP      10.96.0.1      <none>         443/TCP          57m
openapi-business   NodePort       10.96.81.8     <none>         9091:31111/TCP   56m
```

- 进入其中一个 pod

```shell
kubectl exec -it blogrpc-hello-67b7ff5b96-5sblb bash
# 结果
kubectl exec [POD] [COMMAND] is DEPRECATED and will be removed in a future version. Use kubectl exec [POD] -- [COMMAND] instead.
root@blogrpc-hello-67b7ff5b96-5sblb:/app/hello#
# 通过 service name 访问
curl openapi-business:9091/ping
# 通过 service ip 访问
curl 10.96.81.8:9091/ping
```

也可以正常访问，多次访问返回不同的 hostname。

## 使用负载均衡器 MetalLB

参考：

- [https://todoit.tech/k8s/metallb/](https://todoit.tech/k8s/metallb/)
- [https://developer.aliyun.com/article/1000971](https://developer.aliyun.com/article/1000971)

- 安装

```shell
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.12.1/manifests/namespace.yaml
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.12.1/manifests/metallb.yaml
```

:::tip
如果存在网络问题无法 apply 可以访问上面的地址把内容拷贝，可能需要翻墙。

Kubernetes 1.6.x 到 Kubernetes 1.21.x：PodSecurityPolicy 是 Kubernetes 核心的一部分，可以在这些版本中使用。

Kubernetes 1.25 版本之后：Kubernetes 社区宣布 PodSecurityPolicy 将被弃用。自 Kubernetes 1.25 版本开始，PodSecurityPolicy 功能被移除，并且不再推荐使用。
:::

内容如下：

- namespace.yaml

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: metallb-system
  labels:
    app: metallb
```

```shell
kubectl apply -f namespace.yaml
```

- metallb.yaml

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  labels:
    app: metallb
  name: controller
spec:
  allowPrivilegeEscalation: false
  allowedCapabilities: []
  allowedHostPaths: []
  defaultAddCapabilities: []
  defaultAllowPrivilegeEscalation: false
  fsGroup:
    ranges:
    - max: 65535
      min: 1
    rule: MustRunAs
  hostIPC: false
  hostNetwork: false
  hostPID: false
  privileged: false
  readOnlyRootFilesystem: true
  requiredDropCapabilities:
  - ALL
  runAsUser:
    ranges:
    - max: 65535
      min: 1
    rule: MustRunAs
  seLinux:
    rule: RunAsAny
  supplementalGroups:
    ranges:
    - max: 65535
      min: 1
    rule: MustRunAs
  volumes:
  - configMap
  - secret
  - emptyDir
---
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  labels:
    app: metallb
  name: speaker
spec:
  allowPrivilegeEscalation: false
  allowedCapabilities:
  - NET_RAW
  allowedHostPaths: []
  defaultAddCapabilities: []
  defaultAllowPrivilegeEscalation: false
  fsGroup:
    rule: RunAsAny
  hostIPC: false
  hostNetwork: true
  hostPID: false
  hostPorts:
  - max: 7472
    min: 7472
  - max: 7946
    min: 7946
  privileged: true
  readOnlyRootFilesystem: true
  requiredDropCapabilities:
  - ALL
  runAsUser:
    rule: RunAsAny
  seLinux:
    rule: RunAsAny
  supplementalGroups:
    rule: RunAsAny
  volumes:
  - configMap
  - secret
  - emptyDir
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app: metallb
  name: controller
  namespace: metallb-system
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app: metallb
  name: speaker
  namespace: metallb-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  labels:
    app: metallb
  name: metallb-system:controller
rules:
- apiGroups:
  - ''
  resources:
  - services
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ''
  resources:
  - services/status
  verbs:
  - update
- apiGroups:
  - ''
  resources:
  - events
  verbs:
  - create
  - patch
- apiGroups:
  - policy
  resourceNames:
  - controller
  resources:
  - podsecuritypolicies
  verbs:
  - use
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  labels:
    app: metallb
  name: metallb-system:speaker
rules:
- apiGroups:
  - ''
  resources:
  - services
  - endpoints
  - nodes
  verbs:
  - get
  - list
  - watch
- apiGroups: ["discovery.k8s.io"]
  resources:
  - endpointslices
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ''
  resources:
  - events
  verbs:
  - create
  - patch
- apiGroups:
  - policy
  resourceNames:
  - speaker
  resources:
  - podsecuritypolicies
  verbs:
  - use
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  labels:
    app: metallb
  name: config-watcher
  namespace: metallb-system
rules:
- apiGroups:
  - ''
  resources:
  - configmaps
  verbs:
  - get
  - list
  - watch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  labels:
    app: metallb
  name: pod-lister
  namespace: metallb-system
rules:
- apiGroups:
  - ''
  resources:
  - pods
  verbs:
  - list
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  labels:
    app: metallb
  name: controller
  namespace: metallb-system
rules:
- apiGroups:
  - ''
  resources:
  - secrets
  verbs:
  - create
- apiGroups:
  - ''
  resources:
  - secrets
  resourceNames:
  - memberlist
  verbs:
  - list
- apiGroups:
  - apps
  resources:
  - deployments
  resourceNames:
  - controller
  verbs:
  - get
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  labels:
    app: metallb
  name: metallb-system:controller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: metallb-system:controller
subjects:
- kind: ServiceAccount
  name: controller
  namespace: metallb-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  labels:
    app: metallb
  name: metallb-system:speaker
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: metallb-system:speaker
subjects:
- kind: ServiceAccount
  name: speaker
  namespace: metallb-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  labels:
    app: metallb
  name: config-watcher
  namespace: metallb-system
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: config-watcher
subjects:
- kind: ServiceAccount
  name: controller
- kind: ServiceAccount
  name: speaker
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  labels:
    app: metallb
  name: pod-lister
  namespace: metallb-system
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: pod-lister
subjects:
- kind: ServiceAccount
  name: speaker
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  labels:
    app: metallb
  name: controller
  namespace: metallb-system
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: controller
subjects:
- kind: ServiceAccount
  name: controller
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  labels:
    app: metallb
    component: speaker
  name: speaker
  namespace: metallb-system
spec:
  selector:
    matchLabels:
      app: metallb
      component: speaker
  template:
    metadata:
      annotations:
        prometheus.io/port: '7472'
        prometheus.io/scrape: 'true'
      labels:
        app: metallb
        component: speaker
    spec:
      containers:
      - args:
        - --port=7472
        - --config=config
        - --log-level=info
        env:
        - name: METALLB_NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        - name: METALLB_HOST
          valueFrom:
            fieldRef:
              fieldPath: status.hostIP
        - name: METALLB_ML_BIND_ADDR
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        # needed when another software is also using memberlist / port 7946
        # when changing this default you also need to update the container ports definition
        # and the PodSecurityPolicy hostPorts definition
        #- name: METALLB_ML_BIND_PORT
        #  value: "7946"
        - name: METALLB_ML_LABELS
          value: "app=metallb,component=speaker"
        - name: METALLB_ML_SECRET_KEY
          valueFrom:
            secretKeyRef:
              name: memberlist
              key: secretkey
        image: quay.io/metallb/speaker:v0.12.1
        name: speaker
        ports:
        - containerPort: 7472
          name: monitoring
        - containerPort: 7946
          name: memberlist-tcp
        - containerPort: 7946
          name: memberlist-udp
          protocol: UDP
        livenessProbe:
          httpGet:
            path: /metrics
            port: monitoring
          initialDelaySeconds: 10
          periodSeconds: 10
          timeoutSeconds: 1
          successThreshold: 1
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /metrics
            port: monitoring
          initialDelaySeconds: 10
          periodSeconds: 10
          timeoutSeconds: 1
          successThreshold: 1
          failureThreshold: 3
        securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            add:
            - NET_RAW
            drop:
            - ALL
          readOnlyRootFilesystem: true
      hostNetwork: true
      nodeSelector:
        kubernetes.io/os: linux
      serviceAccountName: speaker
      terminationGracePeriodSeconds: 2
      tolerations:
      - effect: NoSchedule
        key: node-role.kubernetes.io/master
        operator: Exists
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: metallb
    component: controller
  name: controller
  namespace: metallb-system
spec:
  revisionHistoryLimit: 3
  selector:
    matchLabels:
      app: metallb
      component: controller
  template:
    metadata:
      annotations:
        prometheus.io/port: '7472'
        prometheus.io/scrape: 'true'
      labels:
        app: metallb
        component: controller
    spec:
      containers:
      - args:
        - --port=7472
        - --config=config
        - --log-level=info
        env:
        - name: METALLB_ML_SECRET_NAME
          value: memberlist
        - name: METALLB_DEPLOYMENT
          value: controller
        image: quay.io/metallb/controller:v0.12.1
        name: controller
        ports:
        - containerPort: 7472
          name: monitoring
        livenessProbe:
          httpGet:
            path: /metrics
            port: monitoring
          initialDelaySeconds: 10
          periodSeconds: 10
          timeoutSeconds: 1
          successThreshold: 1
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /metrics
            port: monitoring
          initialDelaySeconds: 10
          periodSeconds: 10
          timeoutSeconds: 1
          successThreshold: 1
          failureThreshold: 3
        securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - all
          readOnlyRootFilesystem: true
      nodeSelector:
        kubernetes.io/os: linux
      securityContext:
        runAsNonRoot: true
        runAsUser: 65534
        fsGroup: 65534
      serviceAccountName: controller
      terminationGracePeriodSeconds: 0
```

```shell
kubectl apply -f metallb.yaml
```

- 查看 metallb-system

```shell
kubectl get pods -n metallb-system
# 结果
NAME                          READY   STATUS    RESTARTS   AGE
controller-66445f859d-rlb5z   1/1     Running   0          96m
speaker-4c8cd                 1/1     Running   0          96m
```

- 把 apps.yaml 中的 openapi-business 的 Service type 改成 `LoadBalancer`

```shell
kubectl apply -f apps.yaml
```

- 查看 service

```shell
kubectl get svc
NAME               TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)          AGE
blogrpc-hello      ClusterIP      10.96.39.150   <none>         1701/TCP         96m
blogrpc-member     ClusterIP      10.96.96.35    <none>         1701/TCP         96m
kubernetes         ClusterIP      10.96.0.1      <none>         443/TCP          96m
openapi-business   LoadBalancer   10.96.81.8     <pending>      9091:31111/TCP   96m
```

此时再检查 LoadBalancer Service 的状态仍然是 Pending 的，嗯？因为，MetalLB 要为 Service 分配 IP 地址，但 IP 地址不是凭空来的，而是需要预先提供一个地址库。

- 使用 Layer 2 模式，通过 ConfigMap 为其提供一个 IP 段：

config.yaml

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: metallb-system
  name: config
data:
  config: |
    address-pools:
    - name: default
      protocol: layer2
      addresses:
        - 192.168.1.30-192.168.1.49
```

```shell
kubectl apply -f config.yaml
```

- 此时再查看 service，可以看到 MetalLB 为 Service openapi-business 分配了地址 192.168.1.30

```shell
kubectl get svc
# 结果
NAME               TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)          AGE
blogrpc-hello      ClusterIP      10.96.39.150   <none>         1701/TCP         96m
blogrpc-member     ClusterIP      10.96.96.35    <none>         1701/TCP         96m
kubernetes         ClusterIP      10.96.0.1      <none>         443/TCP          96m
openapi-business   LoadBalancer   10.96.81.8     192.168.1.30   9091:31111/TCP   96m
```

- 到节点上访问

```shell
docker exec -it kind-control-plane bash
# 使用 CLUSTER-IP
root@kind-control-plane:/# curl 10.96.81.8:9091/ping
{"hostname":"openapi-business-56c695c975-jgpj2","ip":"10.244.0.19"}
root@kind-control-plane:/# curl 10.96.81.8:9091/ping
{"hostname":"openapi-business-56c695c975-2g6pr","ip":"10.244.0.18"}
# 使用 EXTERNAL-IP （MetalLB 分配的 ip）
root@kind-control-plane:/# curl 192.168.1.30:9091/ping
{"hostname":"openapi-business-56c695c975-m8ctl","ip":"10.244.0.17"}
root@kind-control-plane:/# curl 192.168.1.30:9091/ping
{"hostname":"openapi-business-56c695c975-6zvxn","ip":"10.244.0.23"}
```
