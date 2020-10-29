module.exports = {
    //配置路径
    publicPath:  "./",
    //开发服务器
    devServer : {
        //配置端口号
        port : 8888,
        //配置启动成功时候浏览器自动打开
        open : true,
        //设置是否开启https协议
        https : false,
        //设置主机名
        host : "localhost",
        //配置跨域
        proxy : {
            // http://localhost:8888/dev-api/login
            [process.env.VUE_APP_BASE_API] : {
                //跨域的地址 / 代理的地址
                target : process.env.VUE_APP_SERVICE_URL,
                //开启代理
                changOrigin : true,
                //重写路径
                pathRewrite : {
                    ["^" + process.env.VUE_APP_BASE_API] : ""
                }
            }
        }
    },
    //关闭esLint
    lintOnSave : false,
    // 打包时不会生成 .map 文件，加快打包速度
    productionSourceMap: false
}