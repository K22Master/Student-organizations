<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      style="float: left"
    >
      <el-form-item>
        <!-- 增加按钮 -->
        <el-button type="primary" class="addbutton" @click="addInfo"
          >新增<i class="el-icon-plus" style="padding-left: 10px"></i
        ></el-button>
      </el-form-item>
      <el-form-item label="社团" v-if="token.type == 1">
        <el-select v-model="formInline.ass" placeholder="请选择">
          <el-option label="请选择" :value="null"></el-option>
          <el-option
            v-for="(item, index) in assInfo"
            :label="`${item.aname}---${item.aid}`"
            :value="item.aname"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-if="token.type == 1"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 列表信息展示去 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%; font-size: 20px"
      align="center"
    >
      <el-table-column prop="id" label="id" align="center"> </el-table-column>
      <el-table-column prop="uname" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="department" label="学院" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
      </el-table-column>
      <el-table-column prop="aname" label="社团名称" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateInfo(scope.row)"
            style="padding: 7px 10px"
            >修改</el-button
          >
          <el-button
            size="mini"
            @click="deleteInfo(scope.row.id)"
            style="padding: 7px 10px"
            type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 蒙版层 -->
    <el-dialog
      :title="this.form.id ? '信息修改' : '信息增加'"
      :visible.sync="dialogFormVisible"
      class="dialog"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        style="width: 500px; margin: auto"
      >
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="uname"
          style="width: 400px"
        >
          <el-input v-model="form.uname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          :label-width="formLabelWidth"
          prop="sex"
          style="width: 400px"
        >
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="学院"
          :label-width="formLabelWidth"
          prop="department"
          style="width: 400px"
        >
          <el-input v-model="form.department" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="联系方式"
          :label-width="formLabelWidth"
          prop="phone"
          style="width: 400px"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="社团名称"
          :label-width="formLabelWidth"
          prop="aname"
          style="width: 400px"
        >
          <el-input
            v-model="form.aname"
            autocomplete="off"
            v-if="this.form.id || token.type == 2"
          ></el-input>
          <el-select
            v-model="form.aname"
            placeholder="请选择"
            v-else
            style="float: left"
          >
            <el-option label="请选择" :value="null"></el-option>
            <el-option
              v-for="(item, index) in assInfo"
              :label="`${item.aname}---${item.aid}`"
              :value="item.aname"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAndUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from "@/utils/setToken";
export default {
  data() {
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      }
      setTimeout(() => {
        let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      // 查询参数
      formInline: {
        time: null,
        ass: "",
      },
      // 新增与修改存储
      form: {
        id: "",
        uname: "",
        sex: "",
        department: "",
        phone: "",
        aname: "",
      },
      // 存储社团信息
      assInfo: [],
      // 存储所有salon信息
      tableData: [],
      token: {
        type: "",
        tokenName: "",
        pname: "",
      },
      //每页显示5个数据
      pageSize: 3,
      // 总共有多少条数据
      total: 0,
      // 当前第几页，默认为1
      currentPage: 1,
      // 是否显示蒙版层
      dialogFormVisible: false,
      formLabelWidth: "90px",
      // 验证规则：
      rules: {
        uname: [
          {
            required: true,
            message: "请输入学生姓名",
            trigger: "blur",
          },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            message: "长度最少为6个字符",
            trigger: "change",
          },
        ],
        aname: [{ required: true, message: "请输入社团名称", trigger: "blur" }],
        phone: [{ required: true, validator: checkNum, trigger: "blur" }],
      },
    };
  },
  created() {
    this.token.type = getToken("type");
    this.token.tokenName = getToken("aname");
    this.token.pname = getToken("name");
    if (this.token.type == 2) {
      this.formInline.ass = this.token.tokenName;
      this.onSubmit();
    } else {
      this.getAllStudents();
      this.getAllAss();
    }
  },
  methods: {
    // 当页码发生改变时，重新获取数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 首先将页面数据清空
      this.tableData = [];
      // 然后修改页码值
      this.currentPage = val;
      if (!this.formInline.ass) {
        // 重新调用分页查询
        this.getAllStudents();
      } else {
        this.onSubmit();
      }
    },
    // 获取所有学生信息
    async getAllStudents() {
      let result = await this.$API.students.getAll();
      console.log(result);
      this.total = result.total;
      let newresult = await this.$API.students.getAll(
        this.currentPage,
        this.pageSize
      );
      console.log(newresult);
      this.tableData = newresult.data;
    },
    // 获取所有社团
    async getAllAss() {
      // 通过全局API调用接口查询
      let result = await this.$API.association.getAllAssociations();
      console.log(result.data);
      this.assInfo = result.data;
    },
    // 条件查询
    async onSubmit() {
      console.log("@@" + this.formInline.ass);
      let result = await this.$API.students.getStudentByAss(
        null,
        null,
        this.formInline.ass
      );
      console.log(result);
      this.total = result.total;
      let newresult = await this.$API.students.getStudentByAss(
        this.currentPage,
        this.pageSize,
        this.formInline.ass
      );
      this.tableData = newresult.data;
    },
    // 增加触发
    addInfo() {
      this.dialogFormVisible = true;
      this.form = {};
      if (this.token.type == 2) {
        this.form.aname = this.token.tokenName;
      }
    },
    // 点击修改时触发的函数
    updateInfo(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.form = row;
    },
    // 增加或修改
    addAndUpdate() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let result = await this.$API.students.addOrUpdateStudent(this.form);
          console.log(result);
          if (result.status === 200) {
            // 弹出提示信息
            this.$message({
              message: this.form.id ? "修改成功" : "添加成功",
              type: "success",
            });
            if (this.token.type == 2) {
              this.onSubmit();
            } else {
              // 成功后重新查询页面
              this.currentPage = 1;
              this.getAllStudents();
            }
          }
        }
      });
    },
    // 删除信息
    deleteInfo(id) {
      // 删除前做一次确认，是否删除
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.students.deleteById(id);
          // console.log(result);
          // 删除成功，弹出提示
          if (result.status === 200) {
            this.$message({
              type: "success",
              message: result.msg,
            });
            if (this.token.type == 2) {
              this.currentPage = 1;
              this.onSubmit();
            } else {
              // 成功后重新查询页面
              this.currentPage = 1;
              this.getAllStudents();
            }
          }
        })
        .catch(() => {
          // 取消删除
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>