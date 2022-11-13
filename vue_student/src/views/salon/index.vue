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
      <el-form-item label="社团">
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
      <el-table-column prop="salonname" label="活动名称" align="center">
      </el-table-column>
      <el-table-column
        prop="aname"
        label="社团名称"
        align="center"
      ></el-table-column>
      <el-table-column prop="place" label="地点" align="center">
      </el-table-column>
      <el-table-column prop="duration" label="时间" align="center">
      </el-table-column>
      <el-table-column prop="attendees" label="预计人数" align="center">
      </el-table-column>
      <el-table-column prop="pname" label="负责人" align="center">
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
      :title="this.form.id ? '活动修改' : '活动增加'"
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
          label="活动名称"
          :label-width="formLabelWidth"
          prop="salonname"
          style="width: 400px"
        >
          <el-input v-model="form.salonname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="组织"
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
          label="活动地点"
          :label-width="formLabelWidth"
          prop="place"
          style="width: 400px"
        >
          <el-input v-model="form.place" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="活动时间"
          :label-width="formLabelWidth"
          prop="duration"
          style="width: 400px"
        >
          <el-input
            v-model="form.duration"
            autocomplete="off"
            placeholder="xxxx.xx.xx(例：2022.10.27)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="预计人数"
          :label-width="formLabelWidth"
          prop="attendees"
          style="width: 400px"
        >
          <el-input
            v-model.number="form.attendees"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="负责人"
          :label-width="formLabelWidth"
          prop="pname"
          style="width: 400px"
        >
          <el-input v-model="form.pname" autocomplete="off"></el-input>
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
        return callback(new Error("人数不能为空"));
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
      // 查询参数
      formInline: {
        time: null,
        ass: "",
      },
      // 新增与修改存储
      form: {
        id: "",
        salonname: "",
        aname: "",
        place: "",
        duration: "",
        attendees: "",
        pname: "",
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
        salonname: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "change",
          },
        ],
        aname: [{ required: true, message: "请输入活动组织", trigger: "blur" }],
        place: [{ required: true, message: "请输入活动地点", trigger: "blur" }],
        duration: [
          { required: true, message: "请输入活动时间", trigger: "blur" },
        ],
        attendees: [{ required: true, validator: checkNum, trigger: "blur" }],
        pname: [
          { required: true, message: "请输入活动负责人", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getAllSalon();
    this.getAllAss();
    this.token.type = getToken("type");
    this.token.tokenName = getToken("aname");
    this.token.pname = getToken("name");
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
        this.getAllSalon();
      } else {
        this.onSubmit();
      }
    },
    // 获取所有社团活动信息
    async getAllSalon() {
      let result = await this.$API.salon.getAllSalon();
      console.log(result);
      this.total = result.total;
      let newresult = await this.$API.salon.getAllSalon(
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
      let result = await this.$API.salon.getSalonByTimeOrAssociation(
        null,
        null,
        this.formInline.time,
        this.formInline.ass
      );
      console.log(result);
      this.total = result.total;
      let newresult = await this.$API.salon.getSalonByTimeOrAssociation(
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
      });
    },
    // 社团活动审批函数
    async approval(id, isno) {
      let result = await this.$API.salon.SalonIsNo({ id, isno });
      if (result.status === 200) {
        // 审批成功弹出提示
        this.$message({
          message: "审批成功",
          type: "success",
        });
        // 审批后重新获取页面
        this.currentPage = 1;
        this.getAllSalon();
      }
    },
    // 增加触发
    addInfo() {
      this.dialogFormVisible = true;
      this.form = {};
      if (this.token.type == 2) {
        this.form.aname = this.token.tokenName;
        this.form.pname = this.token.pname;
      }
    },
    // 点击修改时触发的函数
    updateInfo(row) {
      if (row.aname != this.token.tokenName && this.token.type == 2) {
        this.$alert("您没有权限修改其他社团的活动信息", "警告", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "warning",
              message: `请选择正确的社团`,
            });
          },
        });
      } else {
        console.log(row);
        this.dialogFormVisible = true;
        this.form = row;
        this.form.attendees *= 1;
      }
    },
    // 增加或修改
    addAndUpdate() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let result = await this.$API.salon.addAndUpdateSalon(this.form);
          console.log(result);
          if (result.status === 200) {
            // 弹出提示信息
            this.$message({
              message: this.form.id ? "修改成功" : "添加成功",
              type: "success",
            });
            // 成功后重新查询页面
            this.currentPage = 1;
            this.getAllSalon();
          }
        }
      });
    },
  },
};
</script>