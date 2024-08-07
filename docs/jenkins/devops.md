# 自动部署

## jenkins + GitHub 实现项目自动化部署

### 安装jenkins

[https://www.jenkins.io/zh/doc/pipeline/tour/getting-started/#下载并运行-jenkins](https://www.jenkins.io/zh/doc/pipeline/tour/getting-started/#%E4%B8%8B%E8%BD%BD%E5%B9%B6%E8%BF%90%E8%A1%8C-jenkins)

### 启动jenkins

```shell
java -jar jenkins.war --httpPort=8080
```

### 配置

- 设置用户名密码和安装默认插件

- github上生成token并保存
![alt text](./images/image-2.png)
![alt text](./images/image-3.png)

- 配置项目回调
![alt text](./images/image-4.png)

- 新建任务
![alt text](./images/image-5.png)

- 进入系统配置
![alt text](./images/image-1.png)

- 添加github服务器
![alt text](./images/image-6.png)
![alt text](./images/image-7.png)

- 进入项目配置
![alt text](./images/image-8.png)
![alt text](./images/image-9.png)
![alt text](./images/image-10.png)
![alt text](./images/image-11.png)
![alt text](./images/image-12.png)

配置的脚本：
```shell
pwd
cd docs/.vuepress
docker build -t nginxwithdist .
# 容器名称
CONTAINER_NAME="kb"
# 检查容器是否存在
if docker ps -a | grep -q "${CONTAINER_NAME}"; then
    echo "Container ${CONTAINER_NAME} exists. Removing it..."
    # 停止并删除容器
    docker stop ${CONTAINER_NAME}
    docker rm ${CONTAINER_NAME}
else
    echo "Container ${CONTAINER_NAME} does not exist."
fi
# 重新创建容器
echo "Creating a new container named ${CONTAINER_NAME}..."
docker run --name ${CONTAINER_NAME} -p 8000:80 -itd nginxwithdist
```

#### 参考：

- [Jenkins 系列教程-史上最简单Jenkins教程，教你一天学会使用Jenkins利器](https://blog.csdn.net/qq_32352777/article/details/109267847)
- [jenkins部署go程序(自动编译部署)](https://juejin.cn/post/6952765925388976165)
- [jenkins + GitHub 实现项目自动化部署](https://learnku.com/articles/44764)

:::tip
在配置项目时候 Source Code Management 中 Git 的 Credentials 配置老是失败，还没找到原因，解决办法是在服务器生成 ssh key 添加到了 github，然后就 Credentials 就选择了 none
:::

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

### 我的实践：

- 添加参数：

![](./images/jenkins-6.png)

- 添加 shell 脚本

![](./images/jenkins-5.png)

- 调用 api:

```shell
curl -X POST http://jenkins.get123.xyz/job/test/build \
    --user myUser:xxxxxxxxx \
    --data-urlencode json='{"parameter": [{"name":"BRANCH", "value":"master"},{"name":"SERVICES", "value":"order product"}]}'
```

- 查看参数：

![](./images/jenkins-3.png)

- 查看输出：

![](./images/jenkins-4.png)
