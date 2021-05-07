# Github配置WebHooks,项目自动部署

## WebHooks
Github的WebHooks可以监测到github上的各种事件，我们可以通过定制它来监测一个push事件，每当我们提交代码时WebHooks会被触发，通过配置一个POST请求到你的接口地址，再根据你的自动化脚本进行`git pull`拉取github最新代码并执行`npm run build`进行打包编译

## 配置WebHooks
`Github`项目`setting`中找到`Webhooks`选项，新增一个`Webhooks`配置
```js
Payload URL // 填写你的服务器接口地址

Content type // 接口ContentType格式 可选json和form， 我选用的是`application/json`

Secret // 秘钥，自己生成一个，后面要在部署脚本中用到，我随机生成的字符串

// 剩下的都是默认配置
```
然后保存，添加就可以了

## 部署脚本编写
[deploy.js](https://github.com/WeirShi/vuepress-blog/blob/main/deploy.js): API 接口代码  
[deploy.sh](https://github.com/WeirShi/vuepress-blog/blob/main/deploy.sh): 部署脚本     
[pm2.json](https://github.com/WeirShi/vuepress-blog/blob/main/pm2.json): node服务端进程管理


## 配置nginx接口地址

配置API接口访问的地址

## 最后
进程启动后，就是尝试一下push代码进行测试了



<!-- 
大数相加
let a = "9007199254740991";
let b = "1234567899999999999";

function add(a ,b){
   //取两个数字的最大长度
   let maxLength = Math.max(a.length, b.length);
   //用0去补齐长度
   a = a.padStart(maxLength , 0);//"0009007199254740991"
   b = b.padStart(maxLength , 0);//"1234567899999999999"
   //定义加法过程中需要用到的变量
   let t = 0;
   let f = 0;   //"进位"
   let sum = "";
   for(let i=maxLength-1 ; i>=0 ; i--){
      t = parseInt(a[i]) + parseInt(b[i]) + f;
      f = Math.floor(t/10);
      sum = t%10 + sum;
   }
   if(f == 1){
      sum = "1" + sum;
   }
   return sum;
}

 -->