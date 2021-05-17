# pm2常用命令集合
pm2 是一个带有负载均衡功能的Node应用的进程管理器.当你要把你的独立代码利用全部的服务器上的所有CPU,并保证进程永远都活着,0秒的重载

## 常用命令
```bash
pm2 start app.js                     # 启动app.js应用程序
pm2 start app.js -i 4                # cluster mode 模式启动4个app.js的应用实例     # 4个应用程序会自动进行负载均衡
pm2 start app.js --name="api"        # 启动应用程序并命名为 "api"
pm2 start app.js --watch             # 当文件变化时自动重启应用
pm2 start script.sh                  # 启动 bash 脚本
pm2 list                             # 列表 PM2 启动的所有的应用程序
pm2 monit                            # 显示每个应用程序的CPU和内存占用情况
pm2 show [app-name]                  # 显示应用程序的所有信息
pm2 logs                             # 显示所有应用程序的日志
pm2 logs [app-name]                  # 显示指定应用程序的日志
pm2 flush                            # 清理日志
pm2 stop all                         # 停止所有的应用程序
pm2 stop 0                           # 停止 id为 0的指定应用程序
pm2 restart all                      # 重启所有应用
pm2 reload all                       # 重启 cluster mode下的所有应用
pm2 gracefulReload all               # Graceful reload all apps in cluster mode
pm2 delete all                       # 关闭并删除所有应用
pm2 delete [app-id]                  # 删除指定应用 id 0
pm2 scale api 10                     # 把名字叫api的应用扩展到10个实例
pm2 reset [app-name]                 # 重置重启数量
pm2 startup                          # 创建开机自启动命令
pm2 save                             # 保存当前应用列表
pm2 resurrect                        # 重新加载保存的应用列表
pm2 update                           # 保存进程，移除pm2，重启进程
pm2 generate                         # 生成一个简单的JSON配置文件
pm2 deploy app.json prod setup       # 部署‘prod’远程服务设置
pm2 deploy app.json prod             # 更新‘prod’远程服务设置
pm2 deploy app.json prod revert 2    # 回滚‘prod’远程服务设置
pm2 module:generate [name]           # 生成命名的模块
pm2 install pm2-logrotate            # 安装模块依赖
pm2 uninstall pm2-logrotate          # 卸载模块依赖
pm2 publish                          # 发布
```
