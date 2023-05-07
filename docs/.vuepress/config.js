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
    title: '笔记（更新中...）',
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
                    'system/linux',
                    'system/ubuntu',
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
                title: 'Docker',
                children: [
                    'docker/安装',
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
                ],
            },
            {
                title: '阿里云',
                children: [
                    'aliyun/域名',
                    'aliyun/容器镜像服务',
                ],
            },
        ]
    },
}
