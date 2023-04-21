# 反向代理

## Docker 方式启动 nginx

- 获取镜像
```shell
# 下载最新版Nginx镜像 (其实此命令就等同于 : docker pull nginx:latest )
docker pull nginx
# 下载指定版本的Nginx镜像 (xxx指具体版本号)
docker pull nginx:xxx
```

- 启动容器
```shell
docker run -itd --name nginx -p 80:80 nginx
```

- 进入容器
```shell
docker exec -it nginx bash
```
配置文件是 `/etc/nginx/nginx.conf`

执行 `cat /etc/nginx/nginx.conf` 可以看到最后一行是 `include /etc/nginx/conf.d/*.conf;`

默认的 server 配置在 `/etc/nginx/conf.d` 中

反向代理配置，把 `/etc/nginx/conf.d/default.conf` 内容改成：
```
server {
    listen       80;
    server_name  www.get123.xyz;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
server {
    listen       80;
    server_name  ${域名 或者 IP}; # 看你实际访问的时候在浏览器输入的是域名还是 IP

    location / {
       # proxy_pass http://www.get123.xyz:8000;
       proxy_pass http://8.222.191.29:8000;
    }
}
```

修改配置后执行：
```shell
nginx -s reload
```
或者退出容器重启容器

我的简单实践：
```
server {
    listen       80;
    server_name  www.get123.xyz;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
server {
    listen       80;
    server_name  note.get123.xyz;

    location / {
       # proxy_pass http://www.get123.xyz:8000;
       proxy_pass http://8.222.191.29:8000;
    }
}
server {
    listen       80;
    server_name  gpt.get123.xyz;

    location / {
        proxy_pass http://www.get123.xyz:1000;
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```
