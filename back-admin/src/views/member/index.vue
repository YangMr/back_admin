<template>
  <div class="member">
    <!-- 搜索 -->
    <el-form
      :inline="true"
      :model="searchMember"
      ref="searchMember"
      class="demo-form-inline"
    >
      <el-form-item prop="cardNum">
        <el-input
          v-model="searchMember.cardNum"
          placeholder="会员卡号"
          style="width:200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="searchMember.name"
          placeholder="会员姓名"
          style="width:200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select
          v-model="searchMember.payType"
          placeholder="支付类型"
          style="width:110px"
        >
          <el-option
            v-for="item in payType"
            :key="item.id"
            :label="item.type"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          v-model="searchMember.birthday"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getMemberList">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="resetForm('searchMember')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据列表 -->
    <el-table :data="tableData" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="110">
      </el-table-column>
      <el-table-column prop="integral" label="可用积分"> </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          {{ scope.row.payType | payTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEditMember(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteMember(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="changePageSize"
      @current-change="changePage"
      :current-page="page"
      :page-sizes="[10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 新增会员 -->
    <el-dialog
      :title="addMemberForm.id ? memberTitle.edit : memberTitle.add"
      width="500px"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="addMemberForm"
        :rules="rules"
        status-icon
        label-width="100px"
        style="width:400px"
        label-position="right"
        :model="addMemberForm"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input
            v-model="addMemberForm.cardNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="addMemberForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="addMemberForm.birthday"
            type="date"
            placeholder="会员生日"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addMemberForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="addMemberForm.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input
            v-model="addMemberForm.integral"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="addMemberForm.payType" placeholder="支付类型">
            <el-option
              v-for="item in payType"
              :key="item.id"
              :label="item.type"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="addMemberForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            addMemberForm.id
              ? editMemberForm('addMemberForm')
              : submitMemberForm('addMemberForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMember,
  addMember,
  removeMember,
  findMember,
  updateMember
} from "../../api/member";
import { Prompt } from "../../utils/prompt";
const message = new Prompt();

const payType = [
  {
    id: 1,
    type: "现金"
  },
  {
    id: 2,
    type: "微信"
  },
  {
    id: 3,
    type: "支付宝"
  },
  {
    id: 4,
    type: "银行卡"
  }
];

export default {
  name: "",
  data() {
    return {
      memberTitle: {
        add: "会员新增",
        edit: "会员编辑"
      },
      addMemberForm: {
        cardNum: "",
        name: "",
        phone: "",
        birthday: "",
        payType: "",
        money: 0,
        integral: 0,
        address: ""
      },
      rules: {
        cardNum: [
          { required: true, message: "请输入会员卡号", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        payType: [
          { required: true, message: "请选择支付类型", trigger: "change" }
        ]
      },
      dialogFormVisible: false,
      payType: payType,
      total: 0,
      page: 1,
      pageSize: 10,
      searchMember: {},
      tableData: []
    };
  },
  created() {
    //调用获取会员列表接口
    this.getMemberList();
  },
  methods: {
    //显示新增会员弹窗方法
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["addMemberForm"].resetFields();
        // console.log(this.$refs["addMemberForm"])
      });
    },

    //新增功能
    submitMemberForm(formName) {
      console.log("新增会员");
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const response = await addMember(this.addMemberForm);
          const res = response.data;
          if (res.flag) {
            this.getMemberList();
          } else {
            message.PromptMessage("添加会员失败", "error");
          }
          this.dialogFormVisible = false;
        }
      });
    },

    //改变页码方法
    changePage(value) {
      this.page = value;
      //重新获取数据
      this.getMemberList();
    },
    //改变条数方法
    changePageSize(value) {
      this.pageSize = value;
      //重新获取数据
      this.getMemberList();
    },
    //获取会员列表接口
    async getMemberList() {
      console.log(this.searchMember);
      const memberList = await getMember(
        this.page,
        this.pageSize,
        this.searchMember
      );
      const res = memberList.data;
      console.log(res);
      if (res.flag) {
        this.tableData = res.data.rows;
        this.total = res.data.total;
      } else {
        message.PromptMessage("获取会员列表失败", "error");
      }
    },
    //编辑会员方法
    async handleEditMember(id) {
      const response = await findMember(id);
      const res = response.data;
      if (res.flag) {
        this.addMemberForm = res.data;
        console.log(this.addMemberForm);
      } else {
        message.PromptMessage("查看当前会员数据失败", "error");
      }
      this.dialogFormVisible = true;
    },
    //删除会员方法
     handleDeleteMember(id) {
      this.$confirm("确认删除这条记录吗？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async() => {
          const response =await removeMember(id);
          const res = response.data;
          if(res.flag){
            message.PromptMessage("删除成功","success")
            this.getMemberList();
          }else{
            message.PromptMessage("删除会员数据失败", "error");
          }
        })
        .catch(() => {
          message.PromptMessage("取消删除","info")
        });
      
    },
    //更新会员方法
    async editMemberForm() {
      const response = await updateMember(
        this.addMemberForm.id,
        this.addMemberForm
      );
      const res = response.data;
      if (res.flag) {
        this.getMemberList();
      } else {
        message.PromptMessage("更新会员数据失败", "error");
      }
      this.dialogFormVisible = false;
    },
    //重置表单方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  filters: {
    payTypeFilter(num) {
      return payType.find(item => item.id == num).type;
    }
  },
  components: {}
};
</script>


<style scoped>
.el-form {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 10px;
}
</style>