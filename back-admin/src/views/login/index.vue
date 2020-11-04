<template>
  <div class="login-wrapper">
    <div class="login-center">
      <h2 class="login-title">积云会员管理系统</h2>
      <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tologin('loginForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import {Prompt} from "../../utils/prompt"
const message = new Prompt();
import { login, getInfo } from "../../api/login";
export default {
  name: "",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    //节流
    tologin: _.throttle(function(formName) {
      this.onLogin(formName);
    }, 5000),
    //登录
    onLogin(formName) {
      this.$refs[formName].validate(async valid => {
        //如果验证通过,则调用登录接口,进行登录,否在,给用户一个提示信息
        if (valid) {
          //获取登录接口的数据
          const res = await this.$store.dispatch("UserLogin",this.form);
          //如果登录成功,跳转到首页
          if(res.flag){
            this.$router.push("/home");
          }else{
            message.PromptMessage("登录失败","error")
          }
        } else {
          return false;
        }
      });
    }
  }
};


//  const response = await login(this.form.username, this.form.password);
//           const res = response.data;
//           if (res.flag && res.flag == true) {
//             //获取用户信息的数据
//             const response =  await getInfo();
//             const res = response.data;
//               if (res.flag) {
//                 //跳转到主页
//                 this.$router.push("/");
//               }
//           }      
</script>


<style scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("http://mengxuegu.com:9999/img/login.b665435f.jpg") no-repeat;
}
.login-center {
  width: 350px;
  background: rgba(255, 255, 255, 0.8);
  margin: 160px auto;
  padding: 28px;
  border-radius: 20px;
}
.login-title {
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin: 20px 0;
}
</style>