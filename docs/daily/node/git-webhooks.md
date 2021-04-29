# Github配置WebHooks,项目自动部署

## WebHooks
Github的WebHooks可以监测到github上的各种事件，我们可以通过定制它来监测一个push事件，每当我们提交代码时WebHooks会被触发，通过配置一个POST请求到你的接口地址，再根据你的自动化脚本进行`git pull`拉取github最新代码并执行`npm run build`进行打包编译

## 配置WebHooks