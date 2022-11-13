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
            :label="item.aname"
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
      <el-table-column prop="id" label="id" width="60" align="center">
      </el-table-column>
      <el-table-column prop="aname" label="社团名称" align="center">
      </el-table-column>
      <el-table-column
        prop="goods"
        label="物品"
        align="center"
      ></el-table-column>
      <el-table-column prop="num" label="数量 " align="center">
      </el-table-column>
      <el-table-column prop="mtag" label="描述" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="updateInfo(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
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
    <el-dialog
      :title="this.form.id ? '物资修改' : '物资增加'"
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
          label="社团名称"
          :label-width="formLabelWidth"
          prop="aname"
          style="width: 400px"
        >
          <el-input v-model="form.aname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="物品"
          :label-width="formLabelWidth"
          prop="goods"
          style="width: 400px"
        >
          <el-input v-model="form.goods" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="数量"
          :label-width="formLabelWidth"
          prop="num"
          style="width: 400px"
        >
          <el-input v-model.number="form.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
          prop="mtag"
          style="width: 400px"
        >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.mtag"
            maxlength="30"
            show-word-limit
          >
          </el-input>
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
        return callback(new Error("数量不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 0) {
            callback(new Error("必须大于0"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      // 查询信息存放
      formInline: {},
      // 列表数据存放
      tableData: [],
      // 存放社团数据
      assInfo: [],
      token: {
        type: "",
        tokenName: "",
        pname: "",
      },
      // 分页器相关
      currentPage: 1,
      pageSize: 3,
      total: 0,
      // 蒙版层数据
      form: {
        aname: "",
        goods: "",
        num: "",
        mtag: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "90px",
      // 验证规则
      rules: {
        aname: [
          { required: true, message: "请输入社团名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字",
            trigger: "change",
          },
        ],
        goods: [
          { required: true, message: "请输入物品名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        num: [{ required: true, validator: checkNum, trigger: "blur" }],
        mtag: [
          { required: true, message: "请输入物品描述", trigger: "blur" },
          {
            min: 2,
            max: 30,
            message: "长度在 2 到 30 个字",
            trigger: "change",
          },
        ],
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
      this.getAllMaterial();
      this.getAllAss();
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 首先将页面数据清空
      this.tableData = [];
      // 然后修改页码值
      this.currentPage = val;
      if (!this.formInline.name) {
        if (this.token.type == 2) {
          this.onSubmit();
        } else {
          this.getAllMaterial();
        }
      }
    },
    // 获取所有信息
    async getAllMaterial() {
      let result = await this.$API.material.getAllMaterial();
      // console.log(result);
      this.total = result.total;
      let newresult = await this.$API.material.getAllMaterial(
        this.currentPage,
        this.pageSize
      );
      console.log(newresult);
      if (newresult.status === 200) {
        this.tableData = newresult.data;
      }
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
      let result = await this.$API.material.getMaterialByname(
        null,
        null,
        this.formInline.ass
      );
      if (result.status === 200) {
        this.total = result.total;
      }
      let newresult = await this.$API.material.getMaterialByname(
        this.currentPage,
        this.pageSize,
        this.formInline.ass
      );
      if (newresult.status === 200) {
        this.tableData = newresult.data;
      }
    },
    // 增加触发
    addInfo() {
      this.dialogFormVisible = true;
      this.form = {};
      if (this.token.type == 2) {
        this.form.aname = this.token.tokenName;
      }
    },
    // 修改触发
    updateInfo(row) {
      this.dialogFormVisible = true;
      this.form = row;
    },
    // 删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.material.deleteMaterial(id);
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
              this.getAllMaterial();
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
    // 实现数据的增加和修改
    async addAndUpdate() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let result = await this.$API.material.addAndUpdateMaterial(this.form);
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
              this.getAllMaterial();
            }
          }
        }
      });
    },
  },
};
</script>