module.exports = {
    //开发服务器
    devServer : {
        //配置端口号
        port : 8888,
        //配置启动成功时候浏览器自动打开
        open : true,
        //设置是否开启https协议
        https : false,
        //设置主机名
        host : "localhost"
    },
    //关闭esLint
    lintOnSave : false,
    // 打包时不会生成 .map 文件，加快打包速度
    productionSourceMap: false
}