# nacos

## 使用

- 下载项目

```shell
git clone https://github.com/nacos-group/nacos-docker.git
cd nacos-docker
```

- docker方式启动

单机模式

```shell
docker-compose -f example/standalone-derby.yaml up
```

- 访问

[http://127.0.0.1:8848/nacos/](http://127.0.0.1:8848/nacos/)

- 新建命名空间
![](./images/image.png)

- 新建配置
![](./images/image-1.png)

- 获取配置

这里使用的是v2的接口
```shell
curl -X GET 'http://127.0.0.1:8848/nacos/v2/cs/config?dataId=test.data.id&group=default&namespaceId=1b2565c2-b3c9-473e-9d7d-ccbda12731fa'
```

- 开启认证

在文件`standalone-derby.yaml`环境变量中添加 `NACOS_AUTH_ENABLE=true` 

执行
```shell
docker-compose -f example/standalone-derby.yaml up
```

打开页面 [[http://127.0.0.1:8848/nacos/](http://127.0.0.1:8848/nacos/)]([http://127.0.0.1:8848/nacos/](http://127.0.0.1:8848/nacos/))

首次登陆填写密码会初始化密码

新增命令空间和配置后获取配置：

```shell
#先获取accessToken
curl -X POST '127.0.0.1:8848/nacos/v1/auth/login' -d 'username=nacos&password=123456'
# 返回
{"accessToken":"eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6MTcyMzA0Mjc1MH0.fD7UEVolRS30y9a_Fh9lun77yM99XVvjW3JTOFHYnLAvzCwlkzxT5QmuPcwWz9-C","tokenTtl":18000,"globalAdmin":true,"username":"nacos"}

#获取配置
curl -X GET 'http://127.0.0.1:8848/nacos/v2/cs/config?dataId=test.data.id&group=default&namespaceId=b893c60d-55f3-405f-ae70-3329ca33be39&accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6MTcyMzA0Mjc1MH0.fD7UEVolRS30y9a_Fh9lun77yM99XVvjW3JTOFHYnLAvzCwlkzxT5QmuPcwWz9-C'
#返回
{"code":0,"message":"success","data":"app:\n  name: \"aa\"\n  dev: env"}
```