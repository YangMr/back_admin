import request from "../utils/request"

//验证原密码接口
export function checkPassword(id,oldPass){
    return request({
        url : "/user/pwd",
        method : "POST",
        data : {
            userId : id,
            password : oldPass
        }
    })
}

//修改密码接口
export function updatePassword(id,newPass){
    return request({
        url : "/user/pwd",
        method : "PUT",
        data : {
            userId : id,
            password : newPass
        }
    })
}