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
        text: '日常开发记录',
        items: [
          { text: 'JS相关', link: '/daily/js/popstate.md' }
        ]
      },
      {
        text: '前端',
        items: [
          { text: 'JS基础', link: '/base/operator.md' },
          { text: 'CSS', link: '/css/bfc.md' },
          { text: '手写题', link: '/realize/realize-indexof.md' },
          { text: '面试题', link: '/interview/variable.md' },
          { text: 'http协议', link: '/http/http.md' },
        ]
      },
      {
        text: '框架源码解读',
        items: [
          // {text: 'JQuery', link: ''},
          {text: 'Vue', link: '/framework/Vue/2.x/vue.md'},
          // {text: 'React', link: ''},
          // {text: 'Webpack', link: ''}
        ]
      },
      { text: '关于我', link: '/about/me.md' },
      { text: 'Github', link: 'https://github.com/WeirShi/vuepress-blog' },
      { text: '苏ICP备19022770号-1', link: 'https://beian.miit.gov.cn/#/Integrated/index'}
    ],
    // 侧边栏
    sidebar: {
      '/daily/': [
        {
          title: 'JS相关',
          children: [
            ['/daily/js/popstate.md', '监听浏览器返回事件'],
            ['/daily/js/utils.md', '日常开发工具函数'],
          ]
        }
      ],
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
            ['/base/curry.md', '函数柯里化'],
            ['/base/eventloop.md', 'EventLoop事件循环机制'],
          ]
        }
      ],
      '/css/': [
        {
          title: 'CSS',
          children: [
            ['/css/bfc.md', '什么是BFC？'],
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
            ['/realize/realize-eventBus.md', '实现Event Bus'],
            ['/realize/realize-instanceof.md', '实现instanceof'],
            ['/realize/realize-queue.md', '实现并发请求队列'],
            ['/realize/realize-call,apply,bind.md', '实现call,apply,bind方法'],
          ]
        }
      ],
      '/interview/': [
        {
          title: '面试遇到过的问题',
          children: [
            ['/interview/variable.md', 'var、const、let'],
            ['/interview/Object.prototype.toString.md', 'Object.prototype.toString'],
            ['/interview/decimals.md', '0.1+0.2!==0.3'],
            ['/interview/curry.md', '函数柯里化'],
            ['/interview/clock-swing.md', '45度钟摆来回摆动'],
            ['/interview/url.md', '用户输入url后，浏览器发生了什么？']
          ]
        }
      ],
      '/http/': [
        {
          title: '前端需要知道的http协议',
          children: [
            ['/http/http.md', 'http协议']
          ]
        }
      ],
      '/framework/': [
        {
          title: '框架源码解读',
          children: [
            {
              title: 'Vue2.x',
              children: [
                ['/framework/Vue/2.x/vue.md', 'Vue2原理'],
              ]
            },
            {
              title: 'Vue3.x',
              children: [
                ['/framework/Vue/3.x/vue.md', 'Vue3原理'],
              ]
            },
            // {
            //   title: 'React',
            //   children: []
            // }
          ]
        }
      ]
    },
    sidebarDepth: 2, // 默认 1 提取到 h2，0 为禁用，2 为 h2，h3
  }
}