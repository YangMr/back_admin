<template>
  <div class="header">
    <router-link to="/">
      <img
        class="logo"
        src="http://mengxuegu.com:9999/img/logo.7156be27.png"
        alt="logo"
      />
      <h3 class="title">积云会员管理系统</h3>
    </router-link>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        admin <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="change-pass" icon="el-icon-edit">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout" icon="el-icon-s-fold">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods : {
     handleCommand(command){
         switch (command){
             case "change-pass" :
                 this.changePass();
                 break;
             case "logout" :
                 this.logout();
                 break;    
         }
     },
     //修改密码的方法
     changePass(){
         alert("修改密码")
     },   
     //退出登录的方法
     logout(){
         alert("退出登录")
     }
  },
  components: {}
};
</script>


<style scoped>
.header {
  padding: 0 40px;
}
.logo {
  vertical-align: middle;
  width: 25px;
  height: 25px;
}
.title {
  display: inline;
  text-decoration: none;
  color: #fff;
  margin-left: 5px;
  position: relative;
  top: 1px;
}
.el-dropdown{
    float: right;
    color : #fff;
}
</style>