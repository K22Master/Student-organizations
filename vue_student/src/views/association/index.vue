<template>
  <div>
    <!-- 增加按钮 -->
    <el-button
      type="primary"
      class="addbutton"
      style="width: 100px; margin-bottom: 10px; float: left"
      @click="addInfo"
      >新增<i class="el-icon-plus" style="padding-left: 10px"></i
    ></el-button>
    <!-- 列表信息展示去 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%; font-size: 20px"
      align="center"
    >
      <el-table-column prop="aid" label="id" width="70" align="center">
      </el-table-column>
      <el-table-column
        prop="aname"
        label="社团名称"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column prop="tag" label="简介" width="300" align="center">
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="updateInfo(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.aid)"
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
      :title="this.form.id ? '社团修改' : '社团增加'"
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
          prop="name"
          style="width: 400px"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="社团简介"
          :label-width="formLabelWidth"
          style="width: 400px"
        >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.tag"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAndUpdateAss">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from "../../utils/setToken";
export default {
  data() {
    return {
      // 存储表单数据
      tableData: [],
      // 蒙版层数据
      form: {
        id: "",
        name: "" || getToken("aname"),
        tag: "",
      },
      //每页显示5个数据
      pageSize: 4,
      // 总共有多少条数据
      total: 0,
      // 当前第几页，默认为1
      currentPage: 1,
      // 是否显示蒙版层
      dialogFormVisible: false,
      formLabelWidth: "90px",
      // 表单验证规则
      rules: {
        // 社团名称的验证规则，必须有，且不超过10个字符串
        name: [
          { required: true, message: "请输入社团名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    // 在页面创建完后,调用函数
    // 获取所有数据的数量
    this.getAllNum();
    // 获取分页查询数据
    this.getAllData(this.currentPage, this.pageSize);
  },
  methods: {
    // 当页码发生改变时，重新获取数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 首先将页面数据清空
      this.tableData = [];
      // 然后修改页码值
      this.currentPage = val;
      // 重新调用分页查询
      this.getAllData(this.currentPage, this.pageSize);
    },
    // 获取所有页数
    async getAllNum() {
      // 通过全局API调用接口查询
      let result = await this.$API.association.getAllAssociations();
      console.log(result.data);
      // 获取长度给total
      this.total = result.data.length;
    },
    // 获取分页查询
    async getAllData() {
      // 传入页面分页器的当前页和每页大小
      let result = await this.$API.association.getAllAssociations(
        this.currentPage,
        this.pageSize
      );
      console.log(result.data);
      this.tableData = result.data;
    },
    // 删除数据,传入id
    handleDelete(index, id) {
      console.log(index, id);
      // 删除前做一次确认，是否删除
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.association.deleteAssociationById(id);
          // console.log(result);
          // 删除成功，弹出提示
          if (result.status === 200) {
            this.$message({
              type: "success",
              message: result.msg,
            });
            this.currentPage = 1;
            // 当数据删除后重新获取页面
            this.getAllNum();
            this.getAllData();
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
    // 增加触发
    addInfo() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    // 修改触发
    updateInfo(row) {
      this.dialogFormVisible = true;
      console.log(row);
      this.form = {
        id: row.aid,
        name: row.aname,
        tag: row.tag,
      };
    },
    // 社团添加或者修改事件（实现事件的复用）
    addAndUpdateAss() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let result = await this.$API.association.addAndUpdateAssociation(
            this.form
          );
          if (result.status == 200) {
            // 弹出提示信息
            this.$message({
              message: this.form.id ? "修改成功" : "添加成功",
              type: "success",
            });
            // 成功后重新查询页面
            this.currentPage = 1;
            // 当数据删除后重新获取页面
            this.getAllNum();
            this.getAllData();
          }
        }
      });
    },
  },
};
</script>
<style>
.dialog {
  font-family: 楷体;
}
.el-dialog__title {
  font-size: 35px;
  font-weight: 400;
}
.el-form-item__label {
  font-size: 16px;
  font-weight: 200;
}
</style>