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
        {{ $store.getters.info.name }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="change-pass" icon="el-icon-edit"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item command="logout" icon="el-icon-s-fold"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
      <el-form ref="updatePassForm" status-icon :rules="rules" :model="updatePassForm" label-width="100px" style="width:300px">
        <el-form-item label="原密码" prop="oldPass">
          <el-input
          type="password"
            v-model.trim="updatePassForm.oldPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input
            type="password"
            v-model.trim="updatePassForm.newPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkNewPass">
          <el-input
            type="password"
            v-model.trim="updatePassForm.checkNewPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpdatePass"
          >提交</el-button
        >
        <el-button type="reset" @click="$refs['updatePassForm'].resetFields()">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {removeUser} from "../../utils/auth"
import {checkPassword,updatePassword} from "../../api/password"
import { Prompt } from "@/utils/prompt";
const message = new Prompt();
export default {
  name: "",
  data() {
    //校验原密码
    const oldPass = async (rule, value, callback)=>{
      const userId = this.$store.getters.info.id;
      const response = await checkPassword(userId,this.oldPass);
      const res = response.data;
      if(res.flag){
        callback();
      }else{
        callback(new Error("原密码不正确"))
      }
    };
    //校验新密码与确认密码是否一致
    const checkNewPass = (rule, value, callback) =>{
      if(value == this.updatePassForm.newPass){
        callback();
      }else{
        callback(new Error("密码不一致,请重新输入"))
      }
    };
    return {
      rules : {
        oldPass : [
          { required: true, message: '原密码不能为空', trigger: 'blur' },
          { validator: oldPass, trigger: 'blur' }
        ],
        newPass : [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
        ],
        checkNewPass : [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: checkNewPass, trigger: 'change' }
        ]
      },
      updatePassForm: {
        oldPass : "",
        newPass : "",
        checkNewPass : ""
      },
      dialogFormVisible: false
    };
  },
  methods: {
    //修改密码方法
    submitUpdatePass(){
      this.$refs["updatePassForm"].validate(async(valid)=>{
        if(valid){
          const userId = this.$store.getters.info.id;
          const response = await updatePassword(userId,this.updatePassForm.newPass);
          const res = response.data;
          if(res.flag){
            removeUser();
            message.PromptMessage("修改密码成功","success");
            this.logout();
          }else{
            message.PromptMessage("修改密码失败","error");
          }
          //让修改密码提示框隐藏
          this.dialogFormVisible = false;
        }
      })
    },


    handleCommand(command) {
      switch (command) {
        case "change-pass":
          this.showPassDialog();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    //显示修改密码提示框方法
    showPassDialog() {
      this.$nextTick(()=>{
        this.$refs["updatePassForm"].resetFields();
      })
      //让修改密码提示框进行显示
      this.dialogFormVisible = true;
    },
    //退出登录的方法
    async logout() {
      const res = await this.$store.dispatch("UserLogout");
      if (res.flag) {
        //回到登录页面
        this.$router.push("/login");
      } else {
        message.PromptMessage("登录失败", "error");
      }
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
.el-dropdown {
  float: right;
  color: #fff;
}
</style>