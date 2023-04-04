## 打包部署步骤：

- 使用SSH传输文件/文件夹: https://blog.csdn.net/bedisdover/article/details/51622133
- 本地连接服务器： ssh root@ip
  - 从服务器下载文件
    命令格式如下：
    ```shell
    scp <用户名>@<ssh服务器地址>:<文件路径> <本地文件名>
    ```

  - 示例，下载文件到本地桌面
    ```shell
    scp root@127.0.0.1:~/test.txt ~/Desktop/test.txt
    ```

  - 上传文件到服务器
    命令格式如下：
    ```shell
    scp <本地文件名> <用户名>@<ssh服务器地址>:<上传保存路径即文件名>
    ```

  - 文件夹操作

    上传/下载文件夹操作与文件操作类似，只需加入参数 -r 即可。
    例如：
    ```shell
    scp -r /home/user/workspace/knowledge/docs/.vuepress root@ip:/opt/vuepress
    ```
    上传完成后登录服务器进入 /opt/vuepress 目录，执行：
    ```shell
    docker build -t nginxwithdist .
    ```
- 启动容器：

    ```
    docker run --name kb -p 8000:80 -itd nginxwithdist
    ```
