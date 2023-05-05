# Ubuntu18.04 系统配置

## 科学上网

### 方式一

- 购买墙外服务器，如新加坡服务器（可以在阿里云购买按量付费 ECS 服务器，很便宜）。

- 创建 proxy 文件，写入如下内容。

```shell
#! /bin/bash -e

main() {
if [ -z $2 ]; then
    usage
fi
if [ -z $3 ]; then
    usage
fi
case "$1" in
    start)
      trap 'onCtrlC' INT
      function onCtrlC () {
          echo -e '\nCtrl+C is captured'
          gsettings set org.gnome.system.proxy mode 'none'
      }
      gsettings set org.gnome.system.proxy mode 'manual'
      sshpass -p $3 ssh -ND 1080 root@$2
    ;;
    down)
      gsettings set org.gnome.system.proxy mode 'none'
    ;;
    *)
      usage
    ;;
  esac
}

usage() {
  echo "Scientific Internet Access"
  echo "USAGE: $0 option"
  echo -e "\nOptions:"
  echo "    start [墙外服务器 IP] [墙外服务器 Password]"
  echo "    down"
  echo "Ctrl+C can also close agent"
  exit 1
}

main $@
```

- 赋予可执行权限。

```shell
chmod 777 proxy
```

- 安装 sshpass（用于直接输入密码）。

```shell
sudo apt-get install sshpass
```

- 打开终端，执行脚本。

```shell
./proxy start ${服务器 ip} ${服务器 password}
```
然后访问 Google，成功。

- 关闭科学上网代理。

    - 方式一：在终端按 Ctrl+C。
    - 方式二：执行 `./proxy down`。
    - 方式三：直接点击终端右上角的 x 关闭，但是记得要去设置中把网络代理改成禁用，因为你在执行 `./proxy start ${服务器 ip} ${服务器 password}` 的时候会自动把代理改成手动，这里要关闭，不然上不了网。


## 搜狗输入法安装

:::tip
我的是 Win11 + Ubuntu18.04双系统
如果按照按照官网的教程直接安装，大概率安装好以后是无法使用的，可尝试如下方法修复。虚拟机或 Ubuntu 单系统也可参考。
:::

- 先卸载掉fcitx，及其所有相关的软件。

```shell
sudo apt -y --purge remove fcitx
sudo apt clean fcitx
```

- 然后安装一些依赖。

```shell
sudo apt -y install fcitx fcitx-bin fcitx-table fcitx-table-all
sudo apt -y install fcitx-config-gtk
sudo apt -y install fcitx-libs libfcitx-qt0 libopencc2 libopencc2-data libqt4-opengl libqtwebkit4
```

- 下载搜狗拼音。
:::tip
只能下载2.3版本（或者其他2.x版本）的，不要下载官网3.x或者4.x版本，不然安装了也用不了，这是最关键的一点，切记！！！
:::
```shell
wget http://cdn2.ime.sogou.com/dl/index/1571302197/sogoupinyin_2.3.1.0112_amd64.deb
```

- 安装搜狗拼音。

可以直接双击 .deb 文件，也可以执行下面命令安装

```shell
sudo dpkg -i sogoupinyin_2.3.1.0112_amd64.deb

# 如果安装失败，请执行如下命令安装依赖，然后再执行上面的安装命令
sudo apt -f install
```

- 安装完以后，重启电脑，在语言支持里将输入法改为 fcitx。

    ![](./images/image1.png)

    ![](./images/image2.png)

- 打开 Fcitx Configure，添加搜狗输入法。

    ![](./images/image3.png)

- 至此，应该就可以使用搜狗输入法了。



## 安装 VScode


:::tip
Ubuntu 的应用市场安装的 VSCode 是 snap 的削减版本，不支持中文。如果是从 Ubuntu 应用市场安装的，卸载之后从官网下载安装。
:::

- 卸载 snap 版本。
```shell
 sudo snap remove code
```

- 官网下载安装。

官网：[https://code.visualstudio.com/Download](https://code.visualstudio.com/Download)

下载后可以直接双击 .deb 文件，也可以执行下面命令安装

```shell
sudo dpkg -i xxxxx
```

## 磁盘清理

- 进入根路径。
```shell
cd /
```

- 查看磁盘挂载和占用情况。

```shell
df -hl
```

- 排查哪些目录占用空间较大。

```shell
du -h --max-depth=1
```
![](./images/image4.png)

- 继续进入较大的目录执行如上命令。

![](./images/image5.png)

- 所有文件从大到小展示。
```shell
ls -lhS
```
![](./images/image6.png)

- 清空日志。
```shell
sudo truncate -s 0 /var/log/syslog.1
```

--------------
<br><br><br>
 <template>
  <Vssue :issue-id="2" />
</template>
