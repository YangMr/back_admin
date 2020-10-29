<template>
 <div>
     我是login组件
     <button @click="login">登录</button>
 </div>
</template>

<script>
import {loginModel} from "../api/test"
export default {
 name : "", 
 data(){
  return {

  }
 },
 methods : {
    login(){
        loginModel("admin","admin").then(response=>{
            console.log(response)
        })
    }
 },
 components : {

 },
}
</script>


<style scoped>

</style>