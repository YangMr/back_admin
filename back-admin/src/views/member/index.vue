<template>
  <div class="member">
    <!-- 搜索 -->
    <el-form :inline="true" :model="searchMember" ref="searchMember" class="demo-form-inline">
      <el-form-item prop="cardNum">
        <el-input v-model="searchMember.cardNum" placeholder="会员卡号" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMember.name" placeholder="会员姓名" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMember.payType" placeholder="支付类型" style="width:110px">
          <el-option v-for="item in payType" :key="item.id" :label="item.type" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="searchMember.birthday"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getMemberList">查询</el-button>
        <el-button type="primary">新增</el-button>
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
          <el-button
            size="mini"
            @click="handleEditMember(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteMember(scope.$index, scope.row)"
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
  </div>
</template>

<script>
import { getMember } from "../../api/member";
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
      payType : payType,
      total: 0,
      page: 1,
      pageSize: 10,
      searchMember: {},
      tableData: [
        // {
        //   id: 10,
        //   cardNum: 6301842163550756,
        //   name: "姜超",
        //   birthday: "2008-10-23",
        //   phone: "41362826486",
        //   integral: 399,
        //   money: 93.028,
        //   payType: "3",
        //   address: "山东省 济宁市 汶上县"
        // },
        // {
        //   id: 10,
        //   cardNum: 6301842163550756,
        //   name: "姜超",
        //   birthday: "2008-10-23",
        //   phone: "41362826486",
        //   integral: 399,
        //   money: 93.028,
        //   payType: "3",
        //   address: "山东省 济宁市 汶上县"
        // },
        // {
        //   id: 10,
        //   cardNum: 6301842163550756,
        //   name: "姜超",
        //   birthday: "2008-10-23",
        //   phone: "41362826486",
        //   integral: 399,
        //   money: 93.028,
        //   payType: "3",
        //   address: "山东省 济宁市 汶上县"
        // },
        // {
        //   id: 10,
        //   cardNum: 6301842163550756,
        //   name: "姜超",
        //   birthday: "2008-10-23",
        //   phone: "41362826486",
        //   integral: 399,
        //   money: 93.028,
        //   payType: "3",
        //   address: "山东省 济宁市 汶上县"
        // },
        // {
        //   id: 10,
        //   cardNum: 6301842163550756,
        //   name: "姜超",
        //   birthday: "2008-10-23",
        //   phone: "41362826486",
        //   integral: 399,
        //   money: 93.028,
        //   payType: "3",
        //   address: "山东省 济宁市 汶上县"
        // },
      ]
    };
  },
  created() {
    //调用获取会员列表接口
    this.getMemberList();
  },
  methods: {
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
      console.log(this.searchMember)
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
    handleEditMember() {
      alert("编辑会员");
    },
    //删除会员方法
    handleDeleteMember() {
      alert("删除会员");
    },
    //重置表单方法
    resetForm(formName){
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

.el-form{
  margin-top:20px;
}
.el-pagination {
  margin-top: 10px;
}
</style>