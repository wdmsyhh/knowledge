module.exports = {
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
                title: 'Golang',
                children: [
                    '/go/study',
                    {
                        title: '侧边栏一(1)',
                        children: [
                            'go/training/',
                            'go/training/basics',
                            {
                                title: '项目知识',
                                children: [
                                    'go/training/project/',
                                    'go/training/project/frontend',
                                    'go/training/project/blogrpc',
                                    'go/training/project/vue',
                                ],
                            },
                        ],
                    },
                    {
                        title: '知识分享',
                        children: [
                            'go/share/',
                            'go/share/sessions',
                        ],
                    },
                    'go/readings.md',
                    {
                        title: '开发',
                        children: [
                            'go/shanghai/remote.md',
                            'go/shanghai/performance',
                        ],
                    },
                ],
            },
            {
                title: 'gRPC',
                children: [
                    'grpc/development',
                    'grpc/support',
                    'grpc/tools',
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
                    'jenkins/other',
                ],
            },
        ]
    },
}
