# Webpack基础内容

## 快速上手
使用`npm init`初始化一个`package.json`的配置，安装`webpack`的基础依赖`npm install webpack webpack-cli -D`, 完成之后就可以使用`webpack`命令就可以打包你的项目了。    
`webpack`默认入口文件是`src`下的`index.js`，`webpack`就会帮你生成一个`dist`目录文件。

## 基本配置
`webpack`在4.x版本后支持0配置进行打包，默认将入口文件`src/index.js` -> `dist/main.js`。    
当然我们可以自定义设置webpack配置文件，在项目的根目录下设置`webpack.config.js`的配置文件，`webpack`是执行在`node`环境中的，因此我们可以使用`module.exports`来导出配置文件
```js
module.exports = {
  // 指定入口文件，如果是一个相对路径的话  src下的./ 不可省略
  // 多入口文件 entry可以是一个数组['./src/index.js', './about/index.js'] 也可以是一个对象
  entry: './src/index.js',
  // 输出文件 可以是一个字符， 也可以是一个对象，来指定输出文件的名称等内容
  output: 'dist/bundle.js',
  // 打包的模式 development production none
  mode: 'development'
}
```     
设置好之后，`webpack`的基础打包配置就可以正常工作了。

## 资源加载 - loader
`webpack`处理的都是js资源，如果遇到像css，图片这一类的资源，`webpack`就会报错，因此需要配合对应的loader处理成`webpack`认识的js模块    
开发中常用的loader有：`css-loader`、`style-loader`、`file-loader`、`url-loader`、`less-loader`、`sass-loader`等    

### webpack配置loader
```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
```
webpack中加载loader是从下到上的顺序，因此在配置的时候先加载的loader要写在下面     

1. css-loader的作用: 是将css文件通过css-loader转化成js模块
2. style-loader的作用: 将css-loader转化过后的js模块，再通过style-loader 将这个模块转化成style标签添加到body中
3. file-loader的作用: 将项目中用到的图片资源，字体资源等文件进行拷贝打包
4. url-loader的作用: 将资源文件转成dataUrl的base64路径，适用于体积较小的资源，依赖file-loader
5. webpack建议在某一个模块中引用所有该模块需要的资源文件，当前模块如果需要正常工作就必须要加载对应的资源
6. js驱动整个前端应用，在过程中可能用到了各种资源
  - 逻辑合理
  - 确保上线时资源文件不确失，且都是必要的
7. webpack不会处理es6的代码，需要配置`babel-loader(npm install babel-loader @babel/core @babel/preset-env -D)`
8. webpack模块加载方式：ESModule、CommonJS、AMD、样式中的@import和url函数、HTML中图片的src

### loader的工作原理
负责资源文件从输入到输出的转换，同一个资源可以使用多个loader处理
### 开发一个loader
loader都需要导出一个函数, 接受参数source, 最终返回的是一段js代码或者将最终返回的内容交给下一个loader处理成js代码，webpack最终会将loader返回的结果拼接到输出文件的某个模块代码中   
```js
// loader.js
module.exports = source => {
  // 这里可以使用cjs的module.exports，也可以使用ES6Module的export default
  // return `module.exports = ${variable}`
  return `export default ${variable}`
}
```

## 插件机制 - plugin
webpack插件机制：增强webpack自动化能力，插件导出的一般都是一个类，在开发中会有一些常用的plugin
1. 自动清除dist目录（clean-webpack-plugin）
2. 拷贝静态文件（copy-webpack-plugin）一般用于`production`环境
3. 自动引入打包结果的html（html-webpack-plugin）

### webpack配置loader
在`webpack.config.js`中增加一个`plugins`属性，值是一个数组
```js
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin(
      // 插件options参数
      {
        ...
      }
    )
  ]
}
```

### 开发一个plugin
webpack的plugin内部可以是一个函数或者是一个包含apply方法的对象
```js
class MyPlugin {
  apply(compiler) {
    // apply方法会在webpack启动时自动被调用
    // emit 在webpack即将输出文件时
    compiler.hooks.emit.tap('Myplugin', compilation => {
      // compilation => 此次打包的上下文
      // compilation.assets // 打包的所有资源  
      for (const name in compilation.assets) {
        // name 资源文件名称
        // compilation.assets[name].source() 资源文件中的内容
        const contents = compilation.assets[name].source()
        const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
        // webpack 要求对外暴露的对象
        compilation.assets[name] = {
          source: () => withoutComments,
          size: () => withoutComments.length
        } 
      }
    })
  }
}
```
[官方Plugin APIs地址](https://webpack.js.org/api/compiler-hooks/#hooks)

## webpack的核心工作原理
<img src="/assets/images/webpack.jpg" alt="Webpack" />

从图上也可以看出来webpack是用来打包我们项目中各种各样的资源文件，如：png，js，css等   
那从项目中看，webpack是根据我们的配置找到入口文件，一般情况下都是一个js文件，顺着入口文件的代码，找到其中的 `import`或者`require`语句，分别解析每个模块对应的依赖，形成如下图所示的依赖关系树
<img src="/assets/images/webpack1.jpg" alt="Webpack" />

webpack会递归这个依赖树，找到对应的资源文件，最后根据我们配置的loader，将资源文件交给对应的loader去处理，最后将处理后的模块拼接到最后的bundle文件中。

<!-- ## Webpack实现自动编译
使用webpack进行项目开发时，每一次都需要手动重新进行项目打包，这种体验并不好，非常的耗时耗力。因次在webpack中可以使用watch模式进行监听文件的变化，当文件中代码发生变化时，webpack会帮我们自动重新打包。    
使用方法，在启动webpack时在后面加上`--watch`的参数即可，即：`webpack --watch`， 启动之后webpack就会以watch模式工作。

## Webpack实现自动刷新浏览器
实现了自动打包编译后，我们仍需要手动的刷新浏览器，如此的体验依旧有些累赘，如果在打包编译后可以自动帮我们刷新浏览器，开发体验就会更好一些。     
因次我们可以配置 -->

## Webpack Dev Server
集成了自动编译和自动刷新浏览器。
安装依赖 `npm install webpack-dev-server -D`   
运行命令 `webpack-dev-server`，也可以使用`webpack-dev-server --open`，自动打开浏览器展示页面    
本地开发时，webpack-dev-server为了提高工作效率，将打包结果暂时存放在内存中，减少磁盘的读写操作

```js
module.exports = {
  ...
  devServer: {
    // 开发环境中访问静态资源文件目录
    contentBase: '',
    // 代理API配置
    proxy: {
      // 请求以api为前缀的接口地址时
      '/api': {
        // http://localhost:8080/api/users -> https://api.github.com/api/users
        target: 'https://api.github.com',
        // http://localhost:8080/api/users -> https://api.github.com/users
        pathRewrite: {
          '^api': ''
        },
        // 不能使用 localhost:8080 作为请求 Github 的主机名， HTTP协议
        changeOrigin: true
      }
    }
  }
}
```

### Hot Module Replacement 模块热更新
实时替换更新修改的内容模块    
webpack-dev-server已经集成了HMR   
配置HMR
```js
const webpack = require('webpack')
module.exports = {
  ...
  devServer: {
    ...
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

## Webpack打包优化

### DefinePlugin
为代码注入全局成员`process.env.NODE_ENV`，判断运行环境
```js
const webpack = require('webpack')
module.exports = {
  ...
  devServer: {
    ...
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      API_BASE_URL: '"https://api.example.com"'
    })
  ]
}
```

### Tree-shaking
检测出未引用的代码并移除掉，在生产模式下自动开启Tree-shaking     
**在其他模式下开启Tree-shaking**
```js
module.exports = {
  ...
  optimization: {
    // 只导出外部使用的代码
    usedExports: true,
    // 压缩代码
    minimize: true,
    // 合并模块函数 将所有模块合并到一个函数中，提升运行效率，减小代码体积
    concatenatModules: true
  }
}
```

### Tree-shaking & Babel
使用Tree-shaking必须使用ES Modules，由webpack打包的代码必须使用ESM    
在代码中会使用到ES6的新特性，那我们就会使用`babel-loader`来处理这些ES6的新特性，`babel-loader`就会将ES Modules转换成CommenJS，会导致Tree-shaking失效    
**在最新的`babel-loader`中不会导致Tree-shaking失效，因为最新的`babel-loader`中默认支持ESM，因此`babel-loader`不会将ES Modules转换成CommenJS**     
最安全的配置，将`babel-loader`中的插件`@babel/preset-env`中的`modules`属性置为`false`m，保证Tree-shaking一定会生效
```js
module.exports = {
  ...
  module: {
    rules: {
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
        options: {
          presets: [
            ['@babel/preset-env', { modules: false }]
          ]
        }
      }
    }
  }
}
```

### 代码分割（Code Splitting）
- 多入口打包，适用于多页应用
- ESM动态导入

```js
module.exports = {
  // 多入口 entry必须是一个对象
  entry: {
    index: './src/index.js',
    about: './src/about.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  // 输出的Html指定bundle
  plugins: [
    new HtmlWebpackPlugin({
      title: '',
      template: '',
      filename: '',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      ...
      chunks: ['about']
    }),
  ]
}
```
### 提取公共模块
多入口打包时，会使用到部分公共模块，分别加载的话就会比较浪费资源， 我们可以在配置文件中添加`optimization`属性，再添加`splitChunk`属性，提取公共模块
```js
module.exports = {
  ...
  optimization: {
    splitChunk: {
      // 提取所有的公共模块
      chunks: 'all'
    }
  }
}
```

### 按需加载，动态导入组件
ESM的方式动态导入组件
```js
import('./src/component').then(({ default: component }) => {
  // 其他代码
  ...
})
```
在使用框架开发业务时，我们一般在`router.js`中使用`import()`方法来导入组件，实现按需加载     
动态导入组件时，`webpack`默认会将这些分包的bundle文件以数字来命名，我们也可以在使用动态导入组件时，利用webpack的魔法注释来给这些分包自定义命名，用法：在`import()`方法中使用行内注释，如下
```js
import(/* webpackChunkName: components */ './src/component')
```
动态加载的组件如果命名一样的话，webpack就会将这些组件打包到一个bundle文件中

### CSS文件的按需加载 - MiniCssExtractPlugin
配置该插件后，webpack会将css代码提取到一个文件中，通过`link`标签来加载css文件，配置方式
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 提取css文件，就不需要style-loader
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
}
```
压缩CSS文件：`OptimizeCssAssetsWebpackPlugin`，配置方式
```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  ...
  plugins: [
    new OptimizeCssAssetsWebpackPlugin()
  ]
}
```
官方文档中，将该插件配置在了`optimization`属性中，原因：**如果将该插件配置在`plugins`中，webpack在任何情况下都会工作，配置在`optimization`属性中，就只会在`minimize`属性开启时才会工作**
```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
  ...
  optimization: {
    // 配置该属性时，需要再手动添加压缩js的插件
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  }
}
```

### 输出文件名Hash
在部署时，我们都会开启静态资源缓存，当访问同一资源时，客户端就可以直接访问缓存，但是同样会有一定问题，当我们重新打包更新文件后，文件名一致时，就会出现无法访问到最新的资源文件，因此我们需要给资源文件配置hash值
```js
module.exports = {
  ...
  output: {
    filename: '[name].[hash:6].bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:6].bundle.css'
    })
  ]
}
```
另外还有`chunkhash`和`contenthash`2种hash模式
- `chunkhash`能够精确定位文件的变化
- `contenthash`能够精确定位文件内容的变化
