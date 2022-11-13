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
      <el-form-item label="时间">
        <el-input v-model="formInline.time" placeholder="2022.10.1"></el-input>
      </el-form-item>
      <el-form-item label="社团" v-if="this.token.type == 1">
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
        <el-button type="primary" @click="onSubmit">查询</el-button>
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
      <el-table-column
        prop="aname"
        label="社团名称"
        align="center"
      ></el-table-column>
      <el-table-column prop="cnum_text" label="收/支" align="center">
      </el-table-column>
      <el-table-column prop="ctag" label="描述" align="center">
      </el-table-column>
      <el-table-column prop="time" label="时间" align="center">
      </el-table-column>
      <el-table-column prop="money" label="金额" align="center">
      </el-table-column>
      <el-table-column prop="isno_text" label="状态" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateInfo(scope.row)"
            style="padding: 7px 10px"
            >修改</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="审批" align="center" v-if="token.type == 1">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-check"
            @click="approval(scope.row.id, 2)"
          ></el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-close"
            @click="approval(scope.row.id, 0)"
          ></el-button>
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
          label="社团名称"
          :label-width="formLabelWidth"
          prop="aname"
          style="width: 400px"
        >
          <el-input
            v-model="form.aname"
            autocomplete="off"
            placeholder="社团/团委/学院名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="收/支"
          :label-width="formLabelWidth"
          prop="cnum_text"
          style="width: 400px"
        >
          <el-input
            v-model="form.cnum_text"
            autocomplete="off"
            placeholder="收入/支出"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
          prop="ctag"
          style="width: 400px"
        >
          <el-input v-model="form.ctag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="时间"
          :label-width="formLabelWidth"
          prop="time"
          style="width: 400px"
        >
          <el-input
            v-model="form.time"
            autocomplete="off"
            placeholder="xxxx.xx.xx(例：2022.10.27)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="金额"
          :label-width="formLabelWidth"
          prop="money"
          style="width: 400px"
        >
          <el-input v-model.number="form.money" autocomplete="off"></el-input>
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
    var checkCnum = (rule, value, callback) => {
      console.log(value == "收入");
      if (!value) {
        return callback(new Error("不能为空"));
      }
      setTimeout(() => {
        if (value == "收入" || value == "支出") {
          callback();
        } else {
          callback(new Error("输入必须是收入或支出"));
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
        aname: "",
        cnum: "",
        ctag: "",
        money: "",
        time: "",
      },
      token: {
        type: "",
        tokenName: "",
        pname: "",
      },
      // 存储社团信息
      assInfo: [],
      // 存储所有salon信息
      tableData: [],
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
        aname: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "change",
          },
        ],
        cnum_text: [{ required: true, validator: checkCnum, trigger: "blur" }],
        ctag: [
          { required: true, message: "请输入详细描述", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "change",
          },
        ],
        time: [{ required: true, message: "请输入活动时间", trigger: "blur" }],
        money: [{ required: true, validator: checkNum, trigger: "blur" }],
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
      this.getAllCapital();
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
      if (!this.formInline.ass || !this.formInline.time) {
        // 重新调用分页查询
        this.getAllCapital();
      } else {
        this.onSubmit();
      }
    },
    // 获取所有社团资金信息
    async getAllCapital() {
      let result = await this.$API.capital.getAllCapital();
      console.log(result);
      this.total = result.total;
      let newresult = await this.$API.capital.getAllCapital(
        this.currentPage,
        this.pageSize
      );
      console.log(newresult);
      this.tableData = newresult.data;
      this.tableData.forEach((item) => {
        console.log(item);
        item.isno === 0
          ? (item.isno_text = "不批准")
          : item.isno === 1
          ? (item.isno_text = "未审批")
          : (item.isno_text = "已批准");
        item.cnum === 1 ? (item.cnum_text = "支出") : (item.cnum_text = "收入");
      });
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
      console.log("@" + this.formInline.time, "@@" + this.formInline.ass);
      this.currentPage = 1;
      let result = await this.$API.capital.getCapitalByTimeOrAssociation(
        null,
        null,
        this.formInline.time,
        this.formInline.ass
      );
      console.log(result);
      this.total = result.total;
      let newresult = await this.$API.capital.getCapitalByTimeOrAssociation(
        this.currentPage,
        this.pageSize,
        this.formInline.time,
        this.formInline.ass
      );
      this.tableData = newresult.data;
      this.tableData.forEach((item) => {
        console.log(item);
        item.isno === 0
          ? (item.isno_text = "不批准")
          : item.isno === 1
          ? (item.isno_text = "未审批")
          : (item.isno_text = "已批准");
        item.cnum === 1 ? (item.cnum_text = "支出") : (item.cnum_text = "收入");
      });
    },
    // 社团资金审批函数
    async approval(id, isno) {
      let result = await this.$API.capital.CapitalIsNo({ id, isno });
      if (result.status === 200) {
        // 审批成功弹出提示
        this.$message({
          message: "审批成功",
          type: "success",
        });
        // 审批后重新获取页面
        this.currentPage = 1;
        this.getAllCapital();
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
    // 点击修改时触发的函数
    updateInfo(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.form = row;
      this.form.money *= 1;
    },
    // 增加或修改
    addAndUpdate() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.form.cnum_text === "收入"
            ? (this.form.cnum = 2)
            : (this.form.cnum = 1);
          this.dialogFormVisible = false;
          let result = await this.$API.capital.addOrUpdate(this.form);
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
              this.getAllCapital();
            }
          }
        }
      });

      console.log(this.form);
    },
  },
};
</script>