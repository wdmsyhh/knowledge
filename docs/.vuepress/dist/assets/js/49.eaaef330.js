(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{462:function(a,t,s){"use strict";s.r(t);var e=s(17),r=Object(e.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"mac"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mac"}},[a._v("#")]),a._v(" Mac")]),a._v(" "),t("p",[a._v("网址：https://docs.gitlab.cn/jh/install/docker.html")]),a._v(" "),t("h2",{attrs:{id:"docker方式搭建gitlab"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker方式搭建gitlab"}},[a._v("#")]),a._v(" docker方式搭建gitlab")]),a._v(" "),t("p",[a._v("参考网址配置好环境变量：")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("GITLAB_HOME")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$HOME")]),a._v("/gitlab\n")])])]),t("p",[a._v("执行：")]),a._v(" "),t("p",[a._v("我在 mac mini M1 芯片执行未指定 --platform linux/amd64 时，报错："),t("code",[a._v("docker: no matching manifest for linux/arm64/v8 in the manifest list entries.")])]),a._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),t("p",[a._v("Mac Mini 很可能是基于 Apple Silicon（如 M1 或 M2 芯片），它们使用的是 arm64 架构。而你尝试拉取的镜像 registry.gitlab.cn/omnibus/gitlab-jh:latest 可能只支持 amd64 架构。")]),a._v(" "),t("p",[a._v("解决这个问题的方法有几种：")]),a._v(" "),t("ol",[t("li",[a._v("找到支持 arm64 架构的镜像")]),a._v(" "),t("li",[a._v("使用 --platform 参数\n可以尝试使用 --platform 参数来指定架构，不过这可能会导致运行效率低下，因为它可能会使用 QEMU 来模拟 amd64 架构。")]),a._v(" "),t("li",[a._v("使用 Rosetta 2\n如果你使用的是 Mac M1 或 M2，可以尝试通过 Rosetta 2 来运行 amd64 的 Docker 镜像。不过，这需要在 Docker Desktop 中进行设置，启用 Rosetta 2 支持。")])])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--detach")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--platform")]),a._v(" linux/amd64 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--hostname")]),a._v(" gitlab.example.com "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--publish")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("443")]),a._v(":443 "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--publish")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("80")]),a._v(":80 "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--publish")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("22")]),a._v(":22 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" gitlab "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--restart")]),a._v(" always "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--volume")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$GITLAB_HOME")]),a._v("/config:/etc/gitlab "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--volume")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$GITLAB_HOME")]),a._v("/logs:/var/log/gitlab "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--volume")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$GITLAB_HOME")]),a._v("/data:/var/opt/gitlab "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  --shm-size 256m "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  registry.gitlab.cn/omnibus/gitlab-jh:latest\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);