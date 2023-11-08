# Ubuntu22

## Ubuntu 22.04 Ubuntu 22.10 解决按照官方教程无法使用搜狗输入法

按官网操作：

[https://shurufa.sogou.com/linux/guide](https://shurufa.sogou.com/linux/guide)

按照 官方教程 安装搜狗输入法后依然无法使用

在 /etc/environment 文件中添加

```shell
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
```

参考：https://blog.csdn.net/YoungHong1992/article/details/129561961