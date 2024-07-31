module.exports = {
    plugins: [
        '@vuepress/medium-zoom',
        [
            '@vssue/vuepress-plugin-vssue',
            {
                platform: 'github',
                owner: 'wdmsyhh',
                repo: 'comment',
                clientId: '6502126dfc77629a758a',
                clientSecret: 'fd8e05162dd7a178faac9b79e7f3221fbcc20802',
            },
        ]
    ],
    title: 'BLOG（更新中...）',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: '【Home】', link: '/' },
            // { text: 'Guide', link: '/guide/', target:'_blank' },
            // { text: 'External', link: 'https://www.baidu.com' },
            // {
            //     text: '收录',
            //     ariaLabel: '收录 Menu',
            //     items: [
            //         { text: 'Go', link: '/收录/go/' },
            //         { text: 'gRPC', link: '/收录/gRPC/' }
            //     ]
            // },
        ],
        sidebar: [
            'profile',
            {
                title: '系统',
                children: [
                    'system/ubuntu常用命令',
                    'system/ubuntu',
                    'system/ubuntu22',
                    'system/windows',
                    'system/mac',
                ],
            },
            'git/git',
            {
                title: '开发工具',
                children: [
                    '开发工具/vscode',
                    '开发工具/vscode-server',
                    '开发工具/goland',
                    '开发工具/apifox',
                ],
            },
            {
                title: '前端',
                children: [
                    '前端/vue',
                ],
            },
            {
                title: 'Golang',
                children: [
                    'go/readings.md',
                    '/go/install',
                    'go/问题记录',
                    // {
                    //     title: '侧边栏一',
                    //     children: [
                    //         'go/training/',
                    //         'go/training/basics',
                    //         {
                    //             title: '项目知识',
                    //             children: [
                    //                 'go/training/project/',
                    //                 'go/training/project/blogrpc',
                    //             ],
                    //         },
                    //     ],
                    // },
                ],
            },
            {
                title: 'gRPC',
                children: [
                    {
                        title: '老版本',
                        children: [
                            'grpc/old/install',
                            'grpc/old/use',
                            'grpc/old/grpc-gateway',
                        ],
                    },
                    {
                        title: '新版本',
                        children: [
                            'grpc/new/install',
                            'grpc/new/use',
                            'grpc/new/grpc-gateway',
                        ],
                    }
                ],
            },
            {
                title: '数据存储',
                children: [
                    '数据存储/mongodb',
                    '数据存储/mongoCluster',
                    '数据存储/elasticsearch',
                    '数据存储/monstache',
                    '数据存储/redis',
                    '数据存储/mysql',
                    '数据存储/使用canal同步mysql到es',
                ],
            },
            {
                title: '消息队列',
                children: [
                    'mq/rocketmq',
                ],
            },
            {
                title: 'API网关',
                children: [
                    'API网关/apache-apisix',
                ],
            },
            {
                title: 'Docker',
                children: [
                    'docker/安装',
                    'docker/使用',
                ],
            },
            {
                title: '日志采集',
                children: [
                    '日志采集/journalbeat/journalbeat.md',
                    '日志采集/filebeat/filebeat.md',
                    '日志采集/journalctl/journalctl.md',
                ],
            },
            {
                title: 'Nginx',
                children: [
                    'nginx/reverseProxy',
                ],
            },
            {
                title: 'Jenkins',
                children: [
                    'jenkins/install',
                    'jenkins/devops',
                ],
            },
            {
                title: 'Gitlab',
                children: [
                    'gitlab/ubuntu',
                    'gitlab/mac',
                ],
            },
            {
                title: 'K8s',
                children: [
                    'k8s/kubectl',
                    'k8s/kind@v0.11.0',
                    'k8s/kind@v0.18.0',
                    'k8s/minikube',
                    'k8s/tencent',
                    'k8s/helm',
                    'k8s/kubecm'
                ],
            },
            {
                title: '阿里云',
                children: [
                    'aliyun/域名',
                    'aliyun/容器镜像服务',
                    'aliyun/公网IP',
                ],
            },
            '开发工具/内网穿透',
            'chatgpt/chatgpt',
            // {
            //     title: '基础知识',
            //     children: [
            //         '基础知识/计算机',
            //         '基础知识/redis',
            //         '基础知识/题目解析',
            //         '基础知识/golang',
            //     ],
            // },
        ]
    },
}
