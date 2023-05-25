# Vscode server

## 使用 docker hub 上的

```shell
# 映射的端口最好是对应的，如果是 vue 项目启动后它会再调 http://${服务器 ip}:${容器内端口}/sockjs-node/info?t=1684373820388，假如端口不一致的话，它就访问不到容器内了。
docker run --privileged -d \
  --name=code-server \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -e PASSWORD=ken123 \
  -e SUDO_PASSWORD=ken123 `#optional` \
  -e DEFAULT_WORKSPACE=/config/workspace \
  -p 8443:8443 \
  -p 9090:9090 \
  -p 9091:9091 \
  -v $HOME/code-server/config:/config \
  --restart unless-stopped \
  lscr.io/linuxserver/code-server:latest
```

- 进入容器内部安装 vue-cli
```shell
docker exec -it code-server bash

sudo apt-get update

sudo apt-get install build-essential

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

nvm install 16.19.1

npm install --global vue-cli
```

- 容器内查看防火墙
```shell
sudo apt-get install ufw

sudo ufw status
```

- 访问容器内启动的 vue 项目
:::tip
要把项目目录中 /config/index.js 中的 host:'localhost' 改成  host: '0.0.0.0' 才能从宿主机访问到内部的服务端口
:::

## 自己构建

参考：

docker-compose.yml
```shell
version: '3'
services:
  vscode-web:
    build:
      context: .
      # dockerfile: ./Dockerfile
    image: 'registry.cn-hangzhou.aliyuncs.com/alomerry/vscode-web:latest'
    container_name: vscode-web
    restart: always
    ports:
      - '4000:8000' # 8000/8080/4000 vscode-web
    volumes:
      - './extensions:/root/.vscode-server/extensions'
```

Dockerfile
```shell
FROM phusion/baseimage:focal-1.1.0

ENV DEBIAN_FRONTEND noninteractive
ENV HOME /root
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

ARG NODE_VERSION=19.2.0

ENV NVM_DIR /root/.nvm
ARG name=vscode-web
#COPY sources.list /etc/apt/sources.list

RUN apt-get update; \
  DEBIAN_FRONTEND="noninteractive" apt-get install --no-install-recommends -y \
  git \
  wget \
  zsh; \
  apt-get clean; \
  rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

# on-my-zsh and plugs
RUN REMOTE=https://gitee.com/mirrors/oh-my-zsh.git sh -c "$(curl -fsSL https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh)"; \
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions; \
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

RUN chsh -s $(which zsh)

RUN curl -s https://cdn.alomerry.com/packages/nvm/install.sh | bash; \
  . ${NVM_DIR}/nvm.sh && \
  NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node/ nvm install ${NODE_VERSION} && \
  nvm alias default ${NODE_VERSION} && nvm use default ${NODE_VERSION}

ENV NODE_PATH $NVM_DIR/versions/node/v${NODE_VERSION}/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v${NODE_VERSION}/bin:$PATH

RUN npm config set registry https://registry.npmmirror.com; \
  npm install -g pnpm; \
  pnpm config set registry https://registry.npmmirror.com \
  git config --global user.name "${user name}"; \
  git config --global user.email "${email}"

RUN rm -rf /etc/cron.daily/apt; \
  sed -i 's/#force_color_prompt/force_color_prompt/' /root/.bashrc

VOLUME /root/workspace
VOLUME /root/.vscode-server/extensions

WORKDIR /root/app
RUN wget -q https://update.code.visualstudio.com/latest/server-linux-x64-web/stable; \
  tar -xf stable; \
  rm stable;

# ENV VSCODE_TOKEN [your token]

WORKDIR /root/app/vscode-server-linux-x64-web
RUN wget http://cdn.alomerry.com/vscode/web/server.sh && chmod +x ./server.sh

# 8000/8080/4000 vscode
EXPOSE 8000
EXPOSE 8080


# if want no token, use `--without-connection-token`
# CMD ./server.sh --accept-server-license-terms --host 0.0.0.0 --connection-token ${VSCODE_TOKEN}
CMD ./server.sh --accept-server-license-terms --host 0.0.0.0 --without-connection-token

EXPOSE 8000
```
