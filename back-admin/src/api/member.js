//引入request.is
import request from '../utils/request'

//查询会员数据接口
export function getMember(page,pageSize,form) {
    return request({
        url: `/member/list/search/${page}/${pageSize}`,
        method: "POST",
        data : form
    })
}


//删除会员数据接口
export function removeMember(id) {
    return request({
        url: `/member/${id}`,
        method: 'DELETE'
    })
}

//增加会员数据接口
export function addMember(form) {
    return request({
        url: "/member",
        method: 'POST',
        data: form
    })
}

//修改会员数据接口
export function updateMember(id,form) {
    return request({
        url : `/member/${id}`,
        method : "PUT",
        data : form
    })
}

//查询单条数据接口
export function findMember(id){
    return request({
        url : `/member/${id}`,
        method : 'GET'
    })
}
