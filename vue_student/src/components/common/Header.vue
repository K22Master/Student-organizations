<template>
  <div class="header">
    <el-header style="height: 120px">
      <div class="title">学生社团管理系统</div>
      <div>
        {{ name }}，你好！<i
          class="el-icon-switch-button"
          style="font-size: 20px; color: red"
          @click="logout"
        ></i>
      </div>
    </el-header>
  </div>
</template>
<script>
import { getToken, removeToken } from "@/utils/setToken";
export default {
  data() {
    return {
      name: "",
    };
  },
  created() {
    this.name = getToken("name");
  },
  methods: {
    logout() {
      this.$confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "欢迎下次登录!",
          });
          removeToken("name");
          removeToken("aname");
          removeToken("type");
          removeToken("id");
          removeToken("token");
          this.$router.push({ path: "/login" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  .el-header {
    background-image: url("../.././assets/herder.png");
    background-size: cover;
    color: #fff;
    text-align: center;
    line-height: 120px;
    display: flex;
    justify-content: space-between;
    .title {
      width: 350;
      font-family: 华文行楷;
      font-size: 48px;
      margin-left: 130px;
    }
  }
}
</style>