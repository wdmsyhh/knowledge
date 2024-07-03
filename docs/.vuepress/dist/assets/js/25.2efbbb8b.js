(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{424:function(t,a,s){t.exports=s.p+"assets/img/image-1.a64116d0.png"},425:function(t,a,s){t.exports=s.p+"assets/img/image-2.8612b3b3.png"},426:function(t,a,s){t.exports=s.p+"assets/img/image-3.a207d9c4.png"},427:function(t,a,s){t.exports=s.p+"assets/img/image-4.9385882a.png"},500:function(t,a,s){"use strict";s.r(a);var e=s(17),n=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"filebeat"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#filebeat"}},[t._v("#")]),t._v(" filebeat")]),t._v(" "),a("h2",{attrs:{id:"采集docker容器日志"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#采集docker容器日志"}},[t._v("#")]),t._v(" 采集docker容器日志")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.elastic.co/guide/en/beats/filebeat/7.16/filebeat-installation-configuration.html#filebeat-installation-configuration",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.elastic.co/guide/en/beats/filebeat/7.16/filebeat-installation-configuration.html#filebeat-installation-configuration"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"type为container方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#type为container方式"}},[t._v("#")]),t._v(" type为container方式")]),t._v(" "),a("ul",[a("li",[t._v("下载")])]),t._v(" "),a("div",{staticClass:"language-txt extra-class"},[a("pre",{pre:!0,attrs:{class:"language-txt"}},[a("code",[t._v("curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.16.3-linux-x86_64.tar.gz\ntar xzvf filebeat-7.16.3-linux-x86_64.tar.gz\n")])])]),a("ul",[a("li",[t._v("启动Elasticsearch和Kibana")])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("注意版本需要跟filebeat保持一致。")])]),t._v(" "),a("ul",[a("li",[t._v("使用测试镜像")])]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--name")]),t._v(" test-container-log hello-world\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看日志")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" logs test-container-log\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看容器id")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" inspect test-container-log\n")])])]),a("ul",[a("li",[t._v("修改配置filebeat.yml")])]),t._v(" "),a("div",{staticClass:"language-yml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("filebeat.inputs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" container\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("paths")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# - /var/lib/docker/containers/*/*.log")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" /var/lib/docker/containers/070141253b501906018894c971ecddae1d53b9a61a78448976227dbdacf0ec13/"),a("span",{pre:!0,attrs:{class:"token important"}},[t._v("*.log")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("filebeat.config")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("modules")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("path")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("path.config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/modules.d/"),a("span",{pre:!0,attrs:{class:"token important"}},[t._v("*.yml")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("reload.enabled")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("setup.kibana")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("output.elasticsearch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("hosts")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'localhost:9200'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("ul",[a("li",[t._v("启动filebeat")])]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 非root用户测试需要加sudo，因为没有/var/lib/docker/containers的访问权限")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("chown")]),t._v(" root:root filebeat.yml\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" ./filebeat "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-e")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-c")]),t._v(" filebeat.yml\n")])])]),a("ul",[a("li",[t._v("再次启动容器测试")])]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" start test-container-log\n")])])]),a("ul",[a("li",[t._v("Kibana中查看多了一条索引")])]),t._v(" "),a("p",[a("img",{attrs:{src:s(424),alt:""}})]),t._v(" "),a("ul",[a("li",[t._v("创建Index Pattern")])]),t._v(" "),a("p",[a("img",{attrs:{src:s(425),alt:""}})]),t._v(" "),a("ul",[a("li",[t._v("查看Discover")])]),t._v(" "),a("p",[a("img",{attrs:{src:s(426),alt:""}})]),t._v(" "),a("ul",[a("li",[t._v("输入词条查询")])]),t._v(" "),a("p",[a("img",{attrs:{src:s(427),alt:""}})]),t._v(" "),a("h3",{attrs:{id:"type为journalid方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#type为journalid方式"}},[t._v("#")]),t._v(" type为journalId方式")]),t._v(" "),a("ul",[a("li",[t._v("指定container启动时的存储引擎（测试时候可以使用该方式）")])]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--name")]),t._v(" journald_logging --log-driver journald hello-world\n")])])]),a("ul",[a("li",[t._v("更改docker的默认存储引擎（全部容器日志输出到journal）")])]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("vim")]),t._v(" /etc/docker/daemon.js\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 添加")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"log-driver"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"journald"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 重启docker服务")]),t._v("\nsystemctl restart "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v("\n")])])]),a("ul",[a("li",[t._v("修改配置filebeat.yml")])]),t._v(" "),a("div",{staticClass:"language-yml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("filebeat.inputs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" journald\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("include_matches")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" _SYSTEMD_UNIT=docker.service\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("seek")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" tail\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("setup.kibana")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("output.elasticsearch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("hosts")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'localhost:9200'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("ul",[a("li",[a("p",[t._v("启动filebeat")])]),t._v(" "),a("li",[a("p",[t._v("启动docker容器")])])]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--name")]),t._v(" journald_logging --log-driver journald hello-world\n")])])]),a("h2",{attrs:{id:"用法升级"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#用法升级"}},[t._v("#")]),t._v(" 用法升级")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("可以以docker方式运行filebeat，采集容器日志并发送到logstash，再通过logstash发送到阿里云或腾讯云的日志服务。")])]),t._v(" "),a("h2",{attrs:{id:"references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[t._v("#")]),t._v(" references")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.tizi365.com/archives/723.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.tizi365.com/archives/723.html"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://segmentfault.com/a/1190000039410506",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://segmentfault.com/a/1190000039410506"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://developer.aliyun.com/article/790565",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://developer.aliyun.com/article/790565"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"http://docs.lvrui.io/2017/02/19/%E6%9B%B4%E6%94%B9docker%E7%9A%84%E6%97%A5%E5%BF%97%E5%BC%95%E6%93%8E%E4%B8%BA-journald/",target:"_blank",rel:"noopener noreferrer"}},[t._v("更改docker的日志引擎为 journald"),a("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=n.exports}}]);