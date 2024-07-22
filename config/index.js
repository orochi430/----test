"use strict"
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require("path")

// const config = require('./config') //接口配置
const proxyList = [
  //"http://192.168.1.54:8399/"//归土临港环境
  // "http://116.236.111.158:8086/" //140外网
  // "http://s10.z100.vip:21320/"//皖政通考勤打卡
  // "http://xxyy.bac.gov.cn"//北京市委党校内网
  // "http://124.70.61.182:8080/" //黑龙江医药  2300000001/111111
  //   "http://192.168.1.140:8089/" //发改委疫情上报
  // "http://116.236.111.158:8572/"//发改委复工复产
  //"http://116.236.111.158:9030/"//办公厅疫情上报
  // "http://116.236.111.158:9091/"//上海地产
  // "http://210.22.97.108:8083/"//上海地产210
  // "https://app.shfxdx.net/"//上海奉贤
  // "http://zhxy.jxdx.gov.cn:8080/"//江西省委OA 正式勿动
  // "http://dreamsoft.tpddns.cn:18091/"//淮安市政务外网OA
  //"https://ydbg.forestry.gov.cn/"//国家林业和草原局
  // "http://116.236.111.158:18088/"//陕西值班管理
  // "http://192.168.1.140:7070" //江西一件事
  //"http://117.184.59.230:7788/"//期交所
  // "http://192.168.2.17:8080/" //李小兵
  // "http://59.63.125.148:8080/" //江西人大测试环境
  //"http://222.85.163.193:9120/"//贵州党校oa测试环境
  //"http://192.168.1.39:5901/",
  // "http://116.230.14.120:9998",//统一待办
  // "http://192.168.1.39:9031",//外网
  // "http://116.230.14.120:9090",//外网
  // "http://192.168.1.39:9031/",
  //"http://8.129.125.115:8081/"//西藏
  //"http://192.168.1.73:8088"//西藏VPN内网
  // "http://192.168.160.2:6888/"//西藏VPN内网  正式环境//勿动
  // "http://202.103.111.12:8081/"//西藏办公厅外网测试环境
  //"http://dreamsoft.tpddns.cn:50011"//南通外网测试环境
  //"http://218.91.223.23:8086"//南通外网正式环境，勿动~
  // "http://180.164.161.7:9031/",
  // "http://116.230.14.120:9031",
  //"http://116.236.111.156:8085"//公司内部使用的OA-正式
  //"http://116.236.111.158:12680"//公司OA测试环境
  // "https://ipb.dreamdt.cn",
  //"http://192.168.1.77:9090",//临港77环境
  //"http://220.163.118.99:8080/"//江西省府办
  // "http://130.14.2.83:8088/"江西省府办
  // "http://192.168.1.29:9090"//江西府办临港测试环境 xuyx  /DreamMobile
  // "http://192.168.1.216:8080"//开发内部测试环境 /DreamWeb
  //"http://122.224.189.224:9080" //浙江省委党校 daijianhua
  // "http://8.129.125.115:8081"
  //"http://116.236.111.158:8011"//30外网
  // "http://116.236.111.158:5050/"//民政部1
  //"http://202.108.98.65/"//民政部2
  // "http://116.236.111.158:18085/"
  //  "http://192.168.1.140:8080/"
  // "https://hwxt.jxrd.gov.cn/" // 会务系统外网环境
  //"http://116.236.111.158:8089/"//人民日报演示外网
  // "http://192.168.0.107:8080"
  // "http://192.168.1.250"        //内网 im
  // "http://116.236.111.158:4888"   //外网 im
  // "http://116.236.111.155:8088"//中小企业的临港外网环境
  //"http://192.168.1.249:8088"//中小企业的临港内网环境
  //"http://101.227.181.71:8080"//中小企业的外网正式环境，请勿乱动
  // "http://192.168.1.181:8080"
  //"http://hml-cd.vaiwan.com"//胡明璐
  //  "http://192.168.1.39:9031",
  //"http://192.168.1.20:9090"//肖佳伦
  //  "http://10.2.70.62/", //赣政通正式
  //  "http://10.5.17.220/", //赣政通江西测试
  //  "http://192.168.1.39:9031",
  // "https://oa.hzswdx.gov.cn/"//杭州市委党校//正式环境  勿动
  //  "http://122.224.203.155:8080", //杭州党校
  // "http://122.224.189.224:9080/"//浙江省委党校
  // "http://116.230.14.120:5901/",
  //   "http://116.236.111.158:9031",
  //"http://192.168.1.77:59070", //内网 浦东两会
  // "http://116.236.111.158:59070" //外网 浦东两会
  //"http://dreamsoft.tpddns.cn:50011"//安徽省直机关
  // "http://42.193.16.82:8399" //四川党校 fuxm
  // "http://202.108.98.109:8080/" // 民政部外网 sunjiabin Abcd1234..
  // "http://192.168.1.239:8081/ " // 督办
  // "http://10.40.9.65:8080" // 江苏烟草
  // "http://130.14.2.52/" // 江西府办
  // " http://dreamsoft.vaiwan.com/" // 气象局 daigang
  // "http://karma-cd.vaiwan.com/"
  // "http://192.168.2.17:7070/"
  // "http://58.240.153.220:6888"
  // "http://192.168.1.54:8399"
  // "http://oa.eszwdx.com/"
  // "http://10.40.32.200:18080/"
  // "http://221.226.148.101:8085/"
  //   "http://116.236.111.158:8382/" // 山东烟草
  //"http://130.14.2.57:8080/" // 江西府办
  // "http://61.129.0.172:8080/" // 防疫生产
  //"http://116.236.111.158:18053/" // 防疫测试
  //"http://192.168.1.140:8088/" // 防疫开发
  //   "http://dreamsoft.tpddns.cn:40014/" // 中共徐州市委党校
  // "http://192.168.2.87:8080/" //大事务二期
  // "http://dreamsoft.tpddns.cn:48081" // 再担保OA与财务系统对接项目
  // "http://81.71.124.121:7766"//珠海市统计局电子公文系统
  // "http://111.61.239.208:6888"//  民政部信创项目
  // "http://192.168.1.77:9090"
  // "http://192.168.1.140:312"
  // "http://192.168.0.30:2284" //陕西省政务值班综合应用系统
  //"http://116.236.111.158:39006/"
  // "http://116.236.111.158:3500/"
  // "http://39.165.213.227:10033/"
  // "http://192.168.1.131:8080/"
  // "http://www.jiangzf.top:9999/"
  // "http://192.168.1.124:8085/"
   "http://61.129.192.41:8088/"
  // "http://192.168.1.77:342"
  // "http://192.168.1.196:9090"
  // "http://192.168.1.196:39006"
  // "http://116.236.111.158:2588/"
  // "http://116.236.111.158:2588/"
  // "https://ywxt.jingan.gov.cn/"
  // "http://10.1.214.47:6001/"
  // "http://www.jiangzf.top:9009"
  // "http://59.218.239.173:28080/"
]
let ifSourceMap
if (process.argv.splice(2)[0] == 'noSource') {
    ifSourceMap = false
} else {
    ifSourceMap = true
}
let proxyUrl = proxyList[0];
module.exports = {
    dev: {
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        proxyTable: {
            "*": {
                changeOrigin: true,
                target: proxyUrl,
                secure: false
            },
            "/file": {
                changeOrigin: true,
                target: proxyUrl,
                secure: false
            },
            "/DreamMobile/*": {
                changeOrigin: true,
                target: proxyUrl,
                secure: false
            },
            "/DreamWeb/*": {
                changeOrigin: true,
                target: proxyUrl,
                secure: false
            },



        },
        // Various Dev Server settings
        host: "0.0.0.0", // can be overwritten by process.env.HOST
        port: 8006, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: "eval-cheap-module-source-map",

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, ifSourceMap ? "../dist/index.html" : "../distRelease/index.html"),

        // Paths
        assetsRoot: path.resolve(__dirname, ifSourceMap ? "../dist" : "../distRelease"),
        assetsSubDirectory: "static",
        assetsPublicPath: "./",

        /**
         * Source Maps
         */

        productionSourceMap: ifSourceMap,
        // https://webpack.js.org/configuration/devtool/#production
        // devtool: '#source-map',
        devtool: "eval-cheap-module-source-map",
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: !ifSourceMap,
        productionGzipExtensions: ["js", "css"],
        //压缩DistZip文件
        productionDistZip: true,
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
};
