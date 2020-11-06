//axios的一些配置

//引入axios
import axios from "axios";

import store from "../store"

import { removeUser } from "./auth"

//引入loading的加载服务
import { Loading } from "element-ui"

import {Prompt} from "./prompt"

const message = new Prompt();

//通过axios实例配置请求的公共接口
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})


/*
    每次发送请求的时候
        判断 load是否开启 
            没有开启 (this.loadingService == null)
                开启loading加载
            开启
                不能在重复开启了

        判断什么时候关闭loading加载
            开启
                关闭loading加载
 

        
*/

//创建loading加载
const loading = {
    loadingService: null,
    //开启loading加载
    open() {
        if (this.loadingService == null) {
            this.loadingService = Loading.service({
                target: ".main",
                text: "拼命加载中......",
                background: "rgba(0,0,0,0.5)"
            })
        }
    },
    //关闭loading加载
    close() {
        if(this.loadingService != null){
            this.loadingService.close();
        }
        this.loadingService = null;
    }
};



//配置请求 拦截  ---   发送请求的触发,请求也没有
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    loading.open();
    //获取token
    const token = store.getters.token ? store.getters.token : null;
    config.headers.token = token;
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    message.PromptMessage("请求失败","error")
    loading.close();
    // 对请求错误做些什么
    return Promise.reject(error);
});



//配置响应 拦截  ---   响应数据的时候触发,响应没有结束
// 添加响应拦截器
request.interceptors.response.use(function (response) {
    loading.close();
    // 对响应数据做点什么
    if (response.data.code == 401) {

        message.PromptMessage("登录过期,请重新登录","error")


        removeUser();
        router.replace({
            path: '/login' // 到登录页重新获取token
        })
    }
    return response;
}, function (error) {
    loading.close()
    message.PromptMessage("登录过期,请重新登录","error")
    // 对响应错误做点什么
    return Promise.reject(error);
});

//导出axios
export default request;