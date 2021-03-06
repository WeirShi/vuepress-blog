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
        text: '随笔',
        items: [
          { text: '面经', link: '/internate/base/interview.md' },
        ]
      },
      {
        text: '日常开发记录',
        items: [
          { text: '随记', link: '/internate/network/http.md' },
          { text: 'CSS相关', link: '/daily/css/daily.md' },
          { text: 'JS相关', link: '/daily/js/utils.md' },
          { text: 'node相关', link: '/daily/node/pm2.md' }
        ]
      },
      {
        text: '前端',
        items: [
          { text: 'HTML', link: '/html/html5.md' },
          { text: 'CSS', link: '/css/bfc.md' },
          { text: 'JS基础', link: '/base/operator.md' },
          { text: '手写题', link: '/realize/realize-indexof.md' },
          { text: '面试题', link: '/interview/this.md' },
          { text: 'WebRTC', link: '/webrtc/base.md' },
          // { text: 'http协议', link: '/http/http.md' },
        ]
      },
      {
        text: '框架工具',
        items: [
          // {text: 'JQuery', link: ''},
          {text: 'Vue', link: '/framework/Vue/2.x/vue.md'},
          {text: 'React', link: '/framework/React/preposition.md'},
          {text: 'Webpack', link: '/framework/Webpack/webpack.md'}
        ]
      },
      // { text: '关于我', link: '/about/me.md' },
      { text: 'Github', link: 'https://github.com/WeirShi/vuepress-blog' },
      { text: '苏ICP备19022770号-1', link: 'https://beian.miit.gov.cn/#/Integrated/index'}
    ],
    // 侧边栏
    sidebar: {
      '/internate/base/': [
        {
          title: '面经',
          children: [
            ['/internate/base/interview.md', '得物(已过)'],
            ['/internate/base/work.md', '工作法'],
            // ['/internate/base/okr.md', 'OKR'],
          ]
        }
      ],
      '/internate/network/': [
        {
          title: '基础随记',
          children: [
            ['/internate/network/hash-table.md', '哈希表'],
            ['/internate/network/http.md', 'http请求'],
          ]
        }
      ],
      '/daily/js/': [
        {
          title: 'JS相关',
          children: [
            ['/daily/js/utils.md', '日常开发工具函数'],
            ['/daily/js/popstate.md', '监听浏览器返回事件'],
            ['/daily/js/useragent.md', '判断浏览器函数'],
          ]
        }
      ],
      '/daily/node/': [
        {
          title: 'node相关',
          children: [
            ['/daily/node/git-webhooks.md', 'Github配置WebHooks'],
            ['/daily/node/pm2.md', 'pm2常用命令集合']
          ]
        }
      ],
      '/daily/css/': [
        {
          title: 'css相关',
          children: [
            ['/daily/css/daily.md', '日常css合集']
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
            ['/base/param.md', '参数传递'],
            ['/base/prototype.md', '原型和继承'],
            ['/base/create-object.md', '创建对象的多种方式'],
            ['/base/inherit.md', '继承的多种方式'],
            ['/base/clone.md', '深浅拷贝'],
            ['/base/curry.md', '函数柯里化'],
            ['/base/eventloop.md', 'EventLoop事件循环机制'],
            ['/base/jsbridge.md', 'JsBridge'],
            ['/base/jockey.md', 'JsBridge - jockey'],
            ['/base/es6.md', 'ES6的新特性'],
          ]
        }
      ],
      '/html/': [
        {
          title: 'HTML基础',
          children: [
            ['/html/html5.md', 'HTML5相关内容']
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
            ['/interview/this.md', 'this、作用域相关题目'],
            ['/interview/variable.md', 'var、const、let'],
            ['/interview/Object.prototype.toString.md', 'Object.prototype.toString'],
            ['/interview/decimals.md', '0.1+0.2!==0.3'],
            ['/interview/curry.md', '函数柯里化'],
            ['/interview/clock-swing.md', '45度钟摆来回摆动'],
            ['/interview/url.md', '用户输入url后，浏览器发生了什么？'],
            ['/interview/promise.md', 'Promise'],
            ['/interview/event-loop.md', 'EventLoop'],
            ['/interview/performance.md', '前端性能优化'],
            // ['/interview/spa.md', 'SPA单页应用原理'],
          ]
        }
      ],
      '/webrtc/': [
        {
          title: 'WebRTC相关记录',
          children: [
            ['/webrtc/base.md', 'WebRTC入门'],
          ]
        }
      ],
      '/http/': [
        {
          title: '前端需要知道的网络协议',
          children: [
            ['/http/http.md', '网络协议']
          ]
        }
      ],
      '/framework/Vue/': [
        {
          title: '框架源码解读',
          children: [
            {
              title: 'Vue2.x',
              children: [
                ['/framework/Vue/2.x/vue.md', 'Vue2原理'],
                ['/framework/Vue/2.x/vue-vdom.md', '虚拟Dom'],
                ['/framework/Vue/2.x/vue-observe.md', 'Vue2响应式原理'],
                ['/framework/Vue/2.x/vue-nextTick.md', 'Vue.nextTick原理'],
                ['/framework/Vue/2.x/vue-router.md', 'VueRouer原理'],
              ]
            },
            {
              title: 'Vue3.x',
              children: [
                ['/framework/Vue/3.x/vue.md', 'Vue3原理'],
                ['/framework/Vue/3.x/ref,reactive.md', 'Vue3中ref和reactive的区别'],
              ]
            }
          ]
        }
      ],
      '/framework/React/': [
        {
          title: 'React',
          children: [
            // ['/framework/React/lifecircle.md', 'React生命周期'],
            ['/framework/React/preposition.md', 'React基础内容'],
            ['/framework/React/hoc.md', 'React 高阶组件'],
            ['/framework/React/hooks.md', 'React Hooks'],
          ]
        }
      ],
      '/framework/Webpack/': [
        {
          title: 'Webpack',
          children: [
            ['/framework/Webpack/webpack.md', 'Webpack基础内容'],
            ['/framework/Webpack/performance.md', 'Webpack性能调优']
          ]
        }
      ]
    },
    sidebarDepth: 2, // 默认 1 提取到 h2，0 为禁用，2 为 h2，h3
  }
}