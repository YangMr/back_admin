//引入配置的axios文件
import request from "../utils/request";

//登录接口
export function login(username, password){
    return request({
        url : "/user/login",
        method : "POST",
        data : {
            username,
            password
            // username : username,
            // password : password
        }
    })
}

//获取用户信息接口
export function getInfo(){
    return request({
        url : "/user/info"
    })
}

//退出登录接口
export function logout(){
    return request({
        url : "/user/logout",
        method : "POST"
    })
}