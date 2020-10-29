import request from "../utils/request";

export function loginModel(username,password){
    return request({
        url : "/login",
        method : "POST", 
        data: {
            username : username,
            password : password
        }
    })
}