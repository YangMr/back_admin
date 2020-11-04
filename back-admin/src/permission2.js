/*
    部分页面鉴权: 
        核心: 判断将要跳转的页面是否是鉴权的页面 
        识别: 进入的页面是需要鉴权的页面
            auth : true

        
*/

import router from "./router"

import store from "./store"

router.beforeEach(async (to,form,next) => {
    //获取token
    const token = store.getters.token;

    //判断是否进入的是鉴权的页面
    if(to.meta.auth){
        if(!token){
            if(to.path == "/login"){
                next();
            }else{
                next("/login")
            }
        }else{
            const info = store.getters.info;
            if(info){
                next()
            }else{
                const res = await store.dispatch("GetUserInfo");
                if(res.flag){
                    next()
                }else{
                    next("/login")
                }
            }
        }
    }else{
        next();
    }
})

