//设置常量
const TOKEN_KEY = "token";
const INFO_KEY = "info";

//获取token
export function getUserToken(){
    return sessionStorage.getItem(TOKEN_KEY)
}
//设置token
export function setUserToken(token){
    sessionStorage.setItem(TOKEN_KEY,token);
}
//获取用户信息
export function getUserInfo(){
    return JSON.parse(sessionStorage.getItem(INFO_KEY))
}
//设置用户信息
export function setUserInfo(info){
    sessionStorage.setItem(INFO_KEY,JSON.stringify(info))
}
//删除token和用户信息
export function removeUser(){
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(INFO_KEY)
}