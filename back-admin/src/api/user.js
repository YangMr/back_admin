//引入封装request文件
import request from "../utils/request";

//登录接口
export function login(){
    return request({
        url : "/user/login", 
        method : "POST", 
        data : {
            username,
            password
        }
    })
}
//获取用户信息接口
export function getInfo(){
    return request({
        url : "user/info"
    })
}

//修改密码接口
export function changePass(userId,password){
    return request({
        url : "/user/pwd",
        method : "PUT",
        data : {
            userId,
            password
        }
    })
}

//退出登录接口
