//设置常量
const TOKEN_KEY = "token";
const INFO_KEY = "info";

//获取token
export function getUserToken(){
    return localStorage.getItem(TOKEN_KEY)
}
//设置token
export function setUserToken(token){
    localStorage.setItem(TOKEN_KEY,token);
}
//获取用户信息
export function getUserInfo(){
    return JSON.parse(localStorage.getItem(INFO_KEY))
}
//设置用户信息
export function setUserInfo(info){
    localStorage.setItem(INFO_KEY,JSON.stringify(info))
}
//删除token和用户信息
export function removeUser(){
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(INFO_KEY)
}