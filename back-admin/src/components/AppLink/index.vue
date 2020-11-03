<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="line">{{
        $route.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {}
};
</script>


<style scoped>
.el-breadcrumb {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.line {
  border-left: 3px solid red;
  padding-left: 10px;
}
</style>