(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{349:function(s,a,t){s.exports=t.p+"assets/img/image1.59e97957.png"},350:function(s,a,t){s.exports=t.p+"assets/img/image2.097e1f91.png"},351:function(s,a,t){s.exports=t.p+"assets/img/image3.1cf6fb44.png"},352:function(s,a,t){s.exports=t.p+"assets/img/image4.907aaedf.png"},353:function(s,a,t){s.exports=t.p+"assets/img/image5.111d67bf.png"},354:function(s,a,t){s.exports=t.p+"assets/img/image6.1ce0e188.png"},383:function(s,a,t){"use strict";t.r(a);var e=t(17),n=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"ubuntu18-04-系统配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ubuntu18-04-系统配置"}},[s._v("#")]),s._v(" Ubuntu18.04 系统配置")]),s._v(" "),a("h2",{attrs:{id:"搜狗输入法安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#搜狗输入法安装"}},[s._v("#")]),s._v(" 搜狗输入法安装")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),a("p",[s._v("我的是 Win11 + Ubuntu18.04双系统\n如果按照按照官网的教程直接安装，大概率安装好以后是无法使用的，可尝试如下方法修复。虚拟机或 Ubuntu 单系统也可参考。")])]),s._v(" "),a("ul",[a("li",[s._v("先卸载掉fcitx，及其所有相关的软件。")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-y")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--purge")]),s._v(" remove fcitx\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" clean fcitx\n")])])]),a("ul",[a("li",[s._v("然后安装一些依赖。")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-y")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" fcitx fcitx-bin fcitx-table fcitx-table-all\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-y")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" fcitx-config-gtk\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-y")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" fcitx-libs libfcitx-qt0 libopencc2 libopencc2-data libqt4-opengl libqtwebkit4\n")])])]),a("ul",[a("li",[s._v("下载搜狗拼音。")])]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),a("p",[s._v("只能下载2.3版本（或者其他2.x版本）的，不要下载官网3.x或者4.x版本，不然安装了也用不了，这是最关键的一点，切记！！！")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" http://cdn2.ime.sogou.com/dl/index/1571302197/sogoupinyin_2.3.1.0112_amd64.deb\n")])])]),a("ul",[a("li",[s._v("安装搜狗拼音。")])]),s._v(" "),a("p",[s._v("可以直接双击 .deb 文件，也可以执行下面命令安装")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" dpkg "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-i")]),s._v(" sogoupinyin_2.3.1.0112_amd64.deb\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果安装失败，请执行如下命令安装依赖，然后再执行上面的安装命令")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-f")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n")])])]),a("ul",[a("li",[a("p",[s._v("安装完以后，重启电脑，在语言支持里将输入法改为 fcitx。")]),s._v(" "),a("p",[a("img",{attrs:{src:t(349),alt:""}})]),s._v(" "),a("p",[a("img",{attrs:{src:t(350),alt:""}})])]),s._v(" "),a("li",[a("p",[s._v("打开 Fcitx Configure，添加搜狗输入法。")]),s._v(" "),a("p",[a("img",{attrs:{src:t(351),alt:""}})])]),s._v(" "),a("li",[a("p",[s._v("至此，应该就可以使用搜狗输入法了。")])])]),s._v(" "),a("h2",{attrs:{id:"安装-vscode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装-vscode"}},[s._v("#")]),s._v(" 安装 VScode")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),a("p",[s._v("Ubuntu 的应用市场安装的 VSCode 是 snap 的削减版本，不支持中文。如果是从 Ubuntu 应用市场安装的，卸载之后从官网下载安装。")])]),s._v(" "),a("ul",[a("li",[s._v("卸载 snap 版本。")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" snap remove code\n")])])]),a("ul",[a("li",[s._v("官网下载安装。")])]),s._v(" "),a("p",[s._v("官网："),a("a",{attrs:{href:"https://code.visualstudio.com/Download",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://code.visualstudio.com/Download"),a("OutboundLink")],1)]),s._v(" "),a("p",[s._v("下载后可以直接双击 .deb 文件，也可以执行下面命令安装")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" dpkg "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-i")]),s._v(" xxxxx\n")])])]),a("h2",{attrs:{id:"安装-zsh-和-oh-my-zsh"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装-zsh-和-oh-my-zsh"}},[s._v("#")]),s._v(" 安装 zsh 和 oh my zsh")]),s._v(" "),a("ul",[a("li",[s._v("参考：")])]),s._v(" "),a("p",[a("a",{attrs:{href:"https://juejin.cn/post/7023578642156355592",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://juejin.cn/post/7023578642156355592"),a("OutboundLink")],1)]),s._v(" "),a("p",[a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/19556676",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://zhuanlan.zhihu.com/p/19556676"),a("OutboundLink")],1)]),s._v(" "),a("h2",{attrs:{id:"磁盘清理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#磁盘清理"}},[s._v("#")]),s._v(" 磁盘清理")]),s._v(" "),a("ul",[a("li",[s._v("进入根路径。")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /\n")])])]),a("ul",[a("li",[s._v("查看磁盘挂载和占用情况。")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("df")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-hl")]),s._v("\n")])])]),a("ul",[a("li",[s._v("排查哪些目录占用空间较大。")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("du")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-h")]),s._v(" --max-depth"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n")])])]),a("p",[a("img",{attrs:{src:t(352),alt:""}})]),s._v(" "),a("ul",[a("li",[s._v("继续进入较大的目录执行如上命令。")])]),s._v(" "),a("p",[a("img",{attrs:{src:t(353),alt:""}})]),s._v(" "),a("ul",[a("li",[s._v("所有文件从大到小展示。")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-lhS")]),s._v("\n")])])]),a("p",[a("img",{attrs:{src:t(354),alt:""}})]),s._v(" "),a("ul",[a("li",[s._v("清空日志。")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" truncate "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-s")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" /var/log/syslog.1\n")])])]),a("h2",{attrs:{id:"ubuntu-安装-vscode-server"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ubuntu-安装-vscode-server"}},[s._v("#")]),s._v(" Ubuntu 安装 Vscode server")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 映射的端口最好是对应的，如果是 vue 项目启动后它会再调 http://${服务器 ip}:${容器内端口}/sockjs-node/info?t=1684373820388，假如端口不一致的话，它就访问不到容器内了。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--privileged")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("code-server "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-e")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PUID")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1000")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-e")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PGID")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1000")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-e")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("TZ")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("Etc/UTC "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-e")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PASSWORD")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("ken123 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-e")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("SUDO_PASSWORD")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("ken123 "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#optional")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-e")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("DEFAULT_WORKSPACE")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/config/workspace "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8443")]),s._v(":8443 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9090")]),s._v(":9090 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9091")]),s._v(":9091 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$HOME")]),s._v("/code-server/config:/config "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--restart")]),s._v(" unless-stopped "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  lscr.io/linuxserver/code-server:latest\n")])])]),a("ul",[a("li",[s._v("进入容器内部安装 vue-cli")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-it")]),s._v(" code-server "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" update\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" build-essential\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v("\n\nnvm "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16.19")]),s._v(".1\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--global")]),s._v(" vue-cli\n")])])]),a("ul",[a("li",[s._v("容器内查看防火墙")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" ufw\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw status\n")])])]),a("ul",[a("li",[s._v("访问容器内启动的 vue 项目")])]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),a("p",[s._v("要把项目目录中 /config/index.js 中的 host:'localhost' 改成  host: '0.0.0.0' 才能从宿主机访问到内部的服务端口")])]),s._v(" "),a("h2",{attrs:{id:"杀掉进程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#杀掉进程"}},[s._v("#")]),s._v(" 杀掉进程")]),s._v(" "),a("ul",[a("li",[s._v("安装 lsof")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("lsof")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 可能需要先更新一下")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" update\n")])])]),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("kill")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-9")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("lsof")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-i:9000")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-t")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v("\n")])])]),a("hr"),s._v(" "),a("p",[a("br"),a("br"),a("br"),s._v(" "),[a("Vssue",{attrs:{"issue-id":2}})]],2)])}),[],!1,null,null,null);a.default=n.exports}}]);