<template>
  <div class="info">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width: 400px; margin: auto"
    >
      <el-form-item label="密码" prop="pass" >
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getToken } from "@/utils/setToken";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length >= 6) {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      } else {
        callback(new Error("密码小于六位"));
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码小于六位"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
      },
      token: {
        type: "",
        id: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    this.ruleForm.name = getToken("name");
    this.token.type = getToken("type");
    this.token.id = getToken("id");
  },
  methods: {
    async submitForm() {
      if (this.token.type == 2) {
        console.log("情况1");
        let result = await this.$API.president.updatePwd({
          id: this.token.id,
          pwd: this.ruleForm.pass,
        });
        console.log(result);
        if (result.status === 200) {
          // 弹出提示信息
          this.$message({
            message: "重置成功",
            type: "success",
          });
        }
      } else {
        console.log(this.ruleForm);
        this.$refs["ruleForm"].validate(async (valid) => {
          if (valid) {
            let result = await this.$API.info.UpdateAdmin(this.ruleForm);
            console.log(result);
            if (result.status === 200) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
            }
          } else {
            this.$message({
              message: "修改失败，请确认密码",
              type: "warning",
            });
            return false;
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
.info {
  margin-top: 150px;
}
.el-form-item__label{
  font-size: 18px;
}
</style>