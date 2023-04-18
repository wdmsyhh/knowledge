(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{337:function(e,r,t){"use strict";t.r(r);var a=t(13),s=Object(a.a)({},(function(){var e=this,r=e._self._c;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("p",[e._v("title: Kubernetes 日志收集\nspeaker: Zack Sun")]),e._v(" "),r("slide"),e._v(" "),r("h1",{attrs:{id:"kubernetes-中的日志收集"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes-中的日志收集"}},[e._v("#")]),e._v(" Kubernetes 中的日志收集")]),e._v(" "),r("p",[e._v("Zack Sun")]),e._v(" "),r("slide"),e._v(" "),r("h2",{attrs:{id:"agenda"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#agenda"}},[e._v("#")]),e._v(" Agenda")]),e._v(" "),r("ul",[r("li",[e._v("需求分析")]),e._v(" "),r("li",[e._v("方案介绍")]),e._v(" "),r("li",[e._v("日志规范")]),e._v(" "),r("li",[e._v("SLS 查询分析语法")]),e._v(" "),r("li",[e._v("常见问题")])]),e._v(" "),r("slide"),e._v(" "),r("h2",{attrs:{id:"需求分析"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#需求分析"}},[e._v("#")]),e._v(" 需求分析")]),e._v(" "),r("h3",{attrs:{id:"哪些日志需要收集"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#哪些日志需要收集"}},[e._v("#")]),e._v(" 哪些日志需要收集？")]),e._v(" "),r("p",[e._v("对于 Kubernetes 集群而言，日志来源可以分为两大类：")]),e._v(" "),r("ul",[r("li",[e._v("容器产生的日志，如 access，service 等。")]),e._v(" "),r("li",[e._v("kern，MongoDB，kubelet 等不在容器内产生的日志。")])]),e._v(" "),r("p",[e._v("而针对不在容器内产生的日志，可以通过容器读取文件并输出将其转为容器产生的日志。")]),e._v(" "),r("slide"),e._v(" "),r("h3",{attrs:{id:"收集到哪里及怎么用"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#收集到哪里及怎么用"}},[e._v("#")]),e._v(" 收集到哪里及怎么用？")]),e._v(" "),r("ul",[r("li",[e._v("阿里云日志服务（SLS）：方便搜索（排查问题）与分析（提供可视化图表）。")]),e._v(" "),r("li",[e._v("InfluxDB：用于报警。")]),e._v(" "),r("li",[e._v("Elasticsearch：当阿里云日志服务不可用时，可使用其替代，缺少统计功能。")])]),e._v(" "),r("slide"),e._v(" "),r("h3",{attrs:{id:"需要做什么处理"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#需要做什么处理"}},[e._v("#")]),e._v(" 需要做什么处理？")]),e._v(" "),r("ul",[r("li",[e._v("数据清洗：过滤掉不需要的日志。")]),e._v(" "),r("li",[e._v("分类、格式化：方便搜索，增加可读性。")]),e._v(" "),r("li",[e._v("脱敏：如密码，手机号，身份证号等。")])]),e._v(" "),r("slide"),e._v(" "),r("h2",{attrs:{id:"方案介绍"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#方案介绍"}},[e._v("#")]),e._v(" 方案介绍")]),e._v(" "),r("h3",{attrs:{id:"设计原则"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#设计原则"}},[e._v("#")]),e._v(" 设计原则")]),e._v(" "),r("ul",[r("li",[e._v("非侵入式：日志输出到控制台，由容器服务统一收集处理。")]),e._v(" "),r("li",[e._v("日志规范化：所有使用日志系统的项目遵循统一的日志规范。")]),e._v(" "),r("li",[r("a",{attrs:{href:"https://12factor.net/zh_cn/logs",target:"_blank",rel:"noopener noreferrer"}},[e._v("cloud native（云原生）"),r("OutboundLink")],1),e._v("。")])]),e._v(" "),r("slide"),e._v(" "),r("h3",{attrs:{id:"目前的收集流程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#目前的收集流程"}},[e._v("#")]),e._v(" 目前的收集流程")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://kb.maiscrm.com/sre/design/infras.html#%E6%97%A5%E5%BF%97%E6%94%B6%E9%9B%86",target:"_blank",rel:"noopener noreferrer"}},[e._v("docker -> journald -> journalbeat -> logstash -> influxdb/SLS"),r("OutboundLink")],1)]),e._v(" "),r("slide"),e._v(" "),r("h3",{attrs:{id:"后续演进"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#后续演进"}},[e._v("#")]),e._v(" 后续演进")]),e._v(" "),r("p",[e._v("Kubernetes 后续使用 Containerd 替换 Docker，日志将不再传给 journald 而是存在文件中，因此会使用 "),r("a",{attrs:{href:"https://docs.fluentd.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Fluentd"),r("OutboundLink")],1),e._v(" 替换 journald + journalbeat + logstash。")]),e._v(" "),r("slide"),e._v(" "),r("h2",{attrs:{id:"日志规范"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#日志规范"}},[e._v("#")]),e._v(" 日志规范")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://open.maiscrm.com/docs/app/devSpec.html#%E6%97%A5%E5%BF%97",target:"_blank",rel:"noopener noreferrer"}},[e._v("务必仔细阅读"),r("OutboundLink")],1)]),e._v(" "),r("slide"),e._v(" "),r("h2",{attrs:{id:"sls-查询语法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#sls-查询语法"}},[e._v("#")]),e._v(" "),r("a",{attrs:{href:"https://help.aliyun.com/document_detail/29060.html?spm=5176.2020520112.help.dexternal.4b1134c0H97g9I",target:"_blank",rel:"noopener noreferrer"}},[e._v("SLS 查询语法"),r("OutboundLink")],1)]),e._v(" "),r("ul",[r("li",[r("code",[e._v("and/or/not")]),e._v(" 等常规运算符。")]),e._v(" "),r("li",[r("code",[e._v(":")]),e._v("：用于字段查询（Key:Value）。")]),e._v(" "),r("li",[e._v("支持通配符 "),r("code",[e._v("*/?")]),e._v("。")]),e._v(" "),r("li",[e._v("使用技巧：\n"),r("ul",[r("li",[e._v("查询不存在 remote_user 字段的日志："),r("code",[e._v("not remote_user:*")]),e._v("。")])])])]),e._v(" "),r("slide"),e._v(" "),r("h2",{attrs:{id:"sls-分析语法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#sls-分析语法"}},[e._v("#")]),e._v(" "),r("a",{attrs:{href:"https://help.aliyun.com/document_detail/53608.html?spm=5176.2020520112.help.dexternal.4b1134c0H97g9I",target:"_blank",rel:"noopener noreferrer"}},[e._v("SLS 分析语法"),r("OutboundLink")],1)]),e._v(" "),r("ul",[r("li",[e._v("基本语法："),r("code",[e._v("${查询语法} | ${分析语法}")])]),e._v(" "),r("li",[e._v("示例："),r("a",{attrs:{href:"https://staging-sreadmin.quncrm.com/logs/browser?from=2021-06-01T01%3A11%3A28.142Z&pageCurrent=1&pageSize=20&query=QG5hbWVzcGFjZTogInNjcm0iIEFORCBAc2VydmljZTogIndlY29ubmVjdC1jb25zdW1lci13ZWJob29rIiBBTkQgdHlwZTogYWNjZXNzb3V0IEFORCByZXNwb25zZVN0YXR1cyA%2BPSA1MDAgfCBzZWxlY3QgIkBmb3JtYXR0ZWRVcmwiLCByZXNwb25zZVN0YXR1cywgY291bnQoKikgYXMgYyBncm91cCBieSAiQGZvcm1hdHRlZFVybCIsIHJlc3BvbnNlU3RhdHVzIG9yZGVyIGJ5IGMgZGVzYw%3D%3D&sortOrder=descend&to=2021-06-01T02%3A45%3A28.142Z",target:"_blank",rel:"noopener noreferrer"}},[e._v('@namespace: "scrm" AND @service: "weconnect-consumer-webhook" AND type: accessout AND responseStatus >= 500 | select "@formattedUrl", responseStatus, count(*) as c group by "@formattedUrl", responseStatus order by c desc'),r("OutboundLink")],1)]),e._v(" "),r("li",[e._v("进阶技巧：\n"),r("ul",[r("li",[r("a",{attrs:{href:"https://help.aliyun.com/document_detail/63453.html?spm=a2c4g.11186623.6.852.21654824BUCBQX",target:"_blank",rel:"noopener noreferrer"}},[e._v("正则式函数"),r("OutboundLink")],1)]),e._v(" "),r("li",[r("a",{attrs:{href:"https://help.aliyun.com/document_detail/63458.html?spm=a2c4g.11186623.6.853.256f37aaZEbY2H",target:"_blank",rel:"noopener noreferrer"}},[e._v("IP 地理函数"),r("OutboundLink")],1)]),e._v(" "),r("li",[e._v("其他函数")])])]),e._v(" "),r("li",[r("a",{attrs:{href:"https://xdash.quncrm.com/d/000000048/access?orgId=1&refresh=1m",target:"_blank",rel:"noopener noreferrer"}},[e._v("统计结果展示"),r("OutboundLink")],1)])]),e._v(" "),r("slide"),e._v(" "),r("h2",{attrs:{id:"常见问题"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#常见问题"}},[e._v("#")]),e._v(" 常见问题")]),e._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://kb.maiscrm.com/sre/howTos/debugLogCollecting.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("日志延迟"),r("OutboundLink")],1)]),e._v(" "),r("li",[r("a",{attrs:{href:"https://kb.maiscrm.com/sre/faq.html#%E7%BE%A4%E8%84%89%E7%B3%BB%E7%BB%9F%E5%86%85%E7%9A%84%E6%97%A5%E5%BF%97%E4%BC%9A%E4%BF%9D%E7%95%99%E5%A4%9A%E4%B9%85%EF%BC%9F",target:"_blank",rel:"noopener noreferrer"}},[e._v("日志保留时间"),r("OutboundLink")],1)]),e._v(" "),r("li",[r("a",{attrs:{href:"https://open.maiscrm.com/docs/app/devSpec.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9-4",target:"_blank",rel:"noopener noreferrer"}},[e._v("脱敏规则"),r("OutboundLink")],1)])])],1)}),[],!1,null,null,null);r.default=s.exports}}]);