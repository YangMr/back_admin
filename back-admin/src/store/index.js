import Vue from "vue";
import Vuex from "vuex";
import {SET_TOKEN,SET_INFO} from "./types/type-mutations"
import {getUserToken,setUserToken,getUserInfo,setUserInfo,removeUser} from "../utils/auth"
import {login,getInfo,logout} from "../api/login"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token : getUserToken(),
    info : getUserInfo()
  },
  getters : {
    token(state){
      return state.token;
    },
    info(state){
      return state.info;
    }
  },
  mutations: {
    SET_TOKEN(state,token){
      state.token = token;
      setUserToken(token)
    },
    SET_INFO(state,info){
      state.info = info;
      setUserInfo(info);
    }  
  },
  actions: {
    //登录
    UserLogin({commit},form){
      return new Promise((resolve, reject) =>{
        login(form.username.trim(),form.password.trim()).then(response=>{
          const res = response.data;
          if(res.flag){
            //获取token
            const token  = res.data.token;
            //将登录成功接口通过promise的resolve方法把结果返回,调用的组件就知道有没有登录成功
            resolve(res);
            //将获取到的token保存到vuex和本地
            commit("SET_TOKEN",token);
          }
        })
      })
    },
    //获取用户信息
    GetUserInfo({commit}){
      return new Promise((resolve, reject) => {
        getInfo().then(response=>{
          const res = response.data;
          if(res.flag){
            //获取具体的用户信息
            const info = res.data;
            //把获取的用户信息返回出去
              resolve(res);
            // 把用户信息存储到本地 以及vuex里面
            commit("SET_INFO",info);
          }
        })
      })
    },
    //退出
    UserLogout({commit}){
      return new Promise((resolve, reject) => {
        logout().then(response=>{
          const res = response.data;
          if(res.flag){
            commit("SET_TOKEN",null);
            commit("SET_INFO",null);
            removeUser();
            resolve(res)
          }
        })
      })
    }
  },
  modules: {}
});
