module.exports = {
    title: 'Vuepress',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            {
                text: 'Languages',
                ariaLabel: 'Language Menu',
                items: [
                    { text: 'Chinese', link: '/language/chinese/' },
                    { text: 'Japanese', link: '/language/japanese/' }
                ]
            },
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/', target:'_blank' },
            { text: 'External', link: 'https://www.baidu.com' },
        ],
        sidebar: [
            {
                title: '侧边栏一',
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
                title: '侧边栏二',
                children: [
                    'grpc/development',
                    'grpc/support',
                    'grpc/tools',
                ],
            },
        ]
    },
}