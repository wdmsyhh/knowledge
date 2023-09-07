# kubectl

## 安装

[https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/](https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/)

```
curl -LO https://dl.k8s.io/release/v1.18.0/bin/linux/amd64/kubectl
```

或者在浏览器地址栏输入 `https://dl.k8s.io/release/v1.18.0/bin/linux/amd64/kubectl`

:::tip
注意版本和 k8s 的版本不要相差 1

Before you begin
You must use a kubectl version that is within one minor version difference of your cluster. For example, a v1.28 client can communicate with v1.27, v1.28, and v1.29 control planes. Using the latest compatible version of kubectl helps avoid unforeseen issues.
:::