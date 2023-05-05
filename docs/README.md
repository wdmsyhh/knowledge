# 文档主页

## ChatGPT

- 试用地址：[点我](http://gpt.get123.xyz)

- 自己搭建 ChatGPT：

  - 首先买一个境外（比如：新加坡）服务器，在阿里云或腾讯云购买按量付费就行

  - 服务器安装 Docker，可以参考：[https://www.runoob.com/docker/ubuntu-docker-install.html](https://www.runoob.com/docker/ubuntu-docker-install.html)

  - 使用开源项目 [ChatGPT-web](https://github.com/Chanzhaoyu/chatgpt-web) 项目中提供的镜像 `chenzhaoyu94/chatgpt-web`

    连接服务器：
    ```shell
    ssh root@8.219.xxx.xxx
    ```
    然后执行：
    ```shell
    docker run --name chatgpt-web -itd -p 1000:3002 --env OPENAI_API_KEY=sk-xxxx chenzhaoyu94/chatgpt-web
    ```
    ::: tip
    注意上面的 OPENAI_API_KEY 的值替换成自己在 openai 官网创建的 key。没有的话去创建一个 [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    容器运行起来后访问：[8.219.xxx.xxx:1000](8.219.xxx.xxx:1000)
    :::


--------------
<br><br><br><br><br>
 <template>
  <Vssue :issue-id="1" />
</template>
