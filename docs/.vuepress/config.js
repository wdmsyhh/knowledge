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
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/', target:'_blank' },
            { text: 'External', link: 'https://www.baidu.com' },
            {
                text: '收录',
                ariaLabel: '收录 Menu',
                items: [
                    { text: 'Go', link: '/收录/go/' },
                    { text: 'gRPC', link: '/收录/gRPC/' }
                ]
            },
        ],
        sidebar: [
            {
                title: '简介',
                children: [
                    'profile/profile',
                ],
            },
            {
                title: '系统',
                children: [
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
                    //     title: '侧边栏一(1)',
                    //     children: [
                    //         'go/training/',
                    //         'go/training/basics',
                    //         {
                    //             title: '项目知识',
                    //             children: [
                    //                 'go/training/project/',
                    //                 'go/training/project/frontend',
                    //                 'go/training/project/blogrpc',
                    //                 'go/training/project/vue',
                    //             ],
                    //         },
                    //     ],
                    // },
                    // {
                    //     title: '知识分享',
                    //     children: [
                    //         'go/share/',
                    //         'go/share/sessions',
                    //     ],
                    // },
                    // {
                    //     title: '开发',
                    //     children: [
                    //         'go/shanghai/remote.md',
                    //         'go/shanghai/performance',
                    //     ],
                    // },
                ],
            },
            {
                title: 'gRPC',
                children: [
                    'grpc/install',
                    'grpc/use',
                    'grpc/grpc-gateway',
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
                ],
            },
        ]
    },
}
