<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>学生社团管理系统</span>
      </div>
      <el-form label-width="80px" :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="form.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 49%" @click="login('form', 1)"
            >老师登录</el-button
          >
          <el-button
            type="success"
            style="width: 49%; margin-left: 2px"
            @click="login('form', 2)"
            >学生登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { nameRule, passRule } from "../utils/vaildate";
import { setToken } from "../utils/setToken";
export default {
  name: "LoginComponent",
  data() {
    return {
      form: {
        username: "",
        pwd: "",
      },
      //   校验模块
      rules: {
        username: [{ validator: nameRule, trigger: "blur" }],
        pwd: [{ validator: passRule, trigger: "blur" }],
      },
    };
  },
  methods: {
    login(form, type) {
      let url = "";
      // 判断登录身份，然后修改url地址
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          if (type == 1) {
            this.loginAd(this.form.username, this.form.pwd);
          } else if (type == 2) {
            this.loginPresident(this.form.username, this.form.pwd);
          }
        } else {
          console.log("出现错误请排查！");
        }
      });
    },
    async loginAd(name, pass) {
      console.log(name, pass);
      let result = await this.$API.login.loginAd(name, pass);
      console.log(result);
      if (result.status === 200) {
        setToken("id", result.id);
        setToken("name", result.name);
        setToken("type", result.type);
        setToken("aname", result.aname);
        setToken("token", result.token);
        this.$message({
          message: "登录成功！",
          type: "success",
        });
        this.$router.push("/home");
      }
    },
    async loginPresident(name, pass) {
      console.log(name, pass);
      let result = await this.$API.login.loginPresident(name, pass);
      if (result.status === 200) {
        setToken("id", result.id);
        setToken("name", result.name);
        setToken("type", result.type);
        setToken("aname", result.aname);
        setToken("token", result.token);
        this.$message({
          message: "登录成功！",
          type: "success",
        });
        this.$router.push("/home");
      }
    },
  },
};
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../assets/login.png");
  background-size: cover;
  .box-card {
    width: 450px;
    margin: 200px auto;
    background: rgba(28, 41, 56, 0.3);
    font-size: 20px;
    font-weight: 600;
    .el-card__header {
      font-family: 楷体;
      font-weight: 600;
      font-size: 35px;
      color: #35333c;
    }
    .el-button {
      font-family: 楷体;
    }
  }
}
</style>