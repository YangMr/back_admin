<template>
 <div>
     <!-- 头部 -->
    <app-header></app-header>
     <!-- 侧边栏 -->
    <app-nav-bar></app-nav-bar>
     <!-- 右侧主体内容 -->
     <app-main></app-main>
 </div>
</template>

<script>
import AppHeader from "./AppHeader"
import AppNavBar from "./AppNavBar"
import AppMain from "./AppMain"
export default {
 name : "", 
 data(){
  return {

  }
 },
 components : {
     AppHeader,
     AppNavBar,
     AppMain
 },
}
</script>


<style scoped>
    .header{
        height: 50px;
        line-height: 50px;
        background-color: #2d3a4b;
        position : absolute;
        left: 0;
        right: 0;
    }
    .navBar{
        width : 230px;
        background-color: #545c64;
        position : absolute;
        top : 50px;
        bottom : 0;
        left: 0;
    }
    .main{
        position : absolute;
        left: 230px;
        top : 50px;
        bottom : 0;
        right : 0;
        background-color: #fff;
        overflow-y: auto;
    }
</style>