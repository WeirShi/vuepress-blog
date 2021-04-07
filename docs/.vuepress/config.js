module.exports = {
  title: '前端封神之路',
  description: '记录学习的前端知识',
  dest: 'blog',
  port: '9090',
  // 监听文件，并实时更新
  // extraWatchFiles: {}
  serviceWorker: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    //增加manifest.json
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    smoothScroll: true, // 页面滚动
    lastUpdated: 'Last Updated', // string | boolean
    search: false, //搜索
    searchMaxSuggestions: 10,
    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端',
        items: [
          { text: 'JS基础', link: '/base/operator.md' },
          { text: '手写题', link: '/realize/realize-indexof.md' },
          { text: '面试问题', link: '/interview/variable.md' },
        ]
      },
      // {
      //   text: '框架源码解读',
      //   items: [
      //     {text: 'JQuery', link: ''},
      //     {text: 'Vue', link: ''},
      //     {text: 'React', link: ''},
      //     {text: 'Webpack', link: ''}
      //   ]
      // },
      { text: '关于我', link: '/about/me.md' },
      { text: 'Github', link: 'https://github.com/WeirShi/vuepress-blog' },
      { text: '苏ICP备19022770号-1', link: 'https://beian.miit.gov.cn/#/Integrated/index'}
    ],
    // 侧边栏
    sidebar: {
      '/base/': [
        {
          title: 'JS基础',
          children: [
            ['/base/operator.md', '常用运算符'],
            ['/base/datatype.md', '数据类型'],
            ['/base/type-conversion.md', '类型转换'],
            ['/base/this.md', 'this指向问题'],
            ['/base/scope.md', '作用域'],
            ['/base/closure.md', '闭包问题'],
            ['/base/prototype.md', '原型和继承'],
            ['/base/clone.md', '深浅拷贝'],
          ]
        }
      ],
      '/about/': [
        {
          title: '关于我',
          children: [
            ['/about/me.md', '个人简介']
          ]
        }
      ],
      '/realize/': [
        {
          title: '手写题',
          children: [
            ['/realize/realize-indexof.md', '实现indexOf方法'],
            ['/realize/realize-d&t.md', '实现防抖和节流'],
            ['/realize/realize-clone.md', '实现深浅拷贝'],
            ['/realize/realize-new.md', '实现new方法'],
            ['/realize/realize-ES6Class.md', '实现ES6 Class方法'],
            ['/realize/realize-promiseAll.md', '实现Promise.all'],
          ]
        }
      ],
      '/interview/': [
        {
          title: '面试遇到过的问题',
          children: [
            ['/interview/variable.md', 'var、const、let'],
            ['/interview/Object.prototype.toString.md', 'Object.prototype.toString'],
          ]
        }
      ]
    },
    sidebarDepth: 2, // 默认 1 提取到 h2，0 为禁用，2 为 h2，h3
  }
}