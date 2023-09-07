# Kind

## 官网

[https://kind.sigs.k8s.io/](https://kind.sigs.k8s.io/)


## 使用

- 安装

```
# 默认会安装到 /home/user/go/bin 中 也就是 GOPATH 的 bin 中
go install sigs.k8s.io/kind@v0.8.0

kind create cluster
```

这里安装的是 0.8.0 版本的 kind，所对应的 kubernetes 版本是 1.18.2

版本对应关系：https://github.com/kubernetes-sigs/kind/releases?page=2