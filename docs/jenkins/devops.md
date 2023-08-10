# 进军 DevOps

## jenkins + GitHub 实现项目自动化部署

### 安装jenkins

[https://www.jenkins.io/zh/doc/pipeline/tour/getting-started/#下载并运行-jenkins](https://www.jenkins.io/zh/doc/pipeline/tour/getting-started/#%E4%B8%8B%E8%BD%BD%E5%B9%B6%E8%BF%90%E8%A1%8C-jenkins)

### 启动jenkins

```shell
java -jar jenkins.war --httpPort=8080
```

参考：

- [Jenkins 系列教程-史上最简单Jenkins教程，教你一天学会使用Jenkins利器](https://blog.csdn.net/qq_32352777/article/details/109267847)
- [jenkins部署go程序(自动编译部署)](https://juejin.cn/post/6952765925388976165)
- [jenkins + GitHub 实现项目自动化部署](https://learnku.com/articles/44764)

## jenkins执行脚本npm: command not found解决

- [https://blog.csdn.net/u011296165/article/details/96110294](https://blog.csdn.net/u011296165/article/details/96110294)

## 如何使用 REST API 和 cURL 构建作业？

:::tip
可用于 gitlab ci 之后执行脚本自动部署项目。
:::

- 示例构建：

```shell
curl --user USER:API_TOKEN -X POST https://localhost:8080/job/test/build
```

代替：

`USER:API_TOKEN` 使用您的用户名和 API 令牌

`localhost:8080` 你的 Jenkins URL

`test` 你的工作名称

- 使用字符串参数构建示例：

```shell
curl --user USER:API_TOKEN -X POST https://localhost:8080/job/test/build --data-urlencode json='{"parameter": [{"name":"paramA", "value":"123"}]}'
```

代替：

`USER:API_TOKEN` 使用您的用户名和 API 令牌

`localhost:8080` 你的 Jenkins URL

`test` 你的工作名称

`paramA` 你的参数名称

`123` 你的参数值
