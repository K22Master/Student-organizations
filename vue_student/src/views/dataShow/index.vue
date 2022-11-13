<template>
  <div class="data-view">
    <div class="top" v-if="type == 1">
      <el-card>
        <div id="view1"></div>
      </el-card>
      <el-card>
        <div id="view2"></div>
      </el-card>
    </div>
    <el-card class="view3">
      <div v-if="type == 2" style="font-size: 19px; font-weight: 800">
        <span style="font-style: italic">{{ aname }}&nbsp;</span
        >至今已经申请过<span style="color: aqua">{{ assInfoSum }}</span
        >次活动，已批准的有<span style="color: chartreuse">{{
          this.assInfo.value3
        }}</span
        >个,未批准的有<span style="color: red">{{ this.assInfo.value1 }}</span
        >个，正在审批的有<span style="color: darkseagreen">{{
          this.assInfo.value2
        }}</span
        >个
      </div>
      <hr v-if="type == 2" />
      <div id="view3"></div>
    </el-card>
  </div>
</template>
<script>
import { getToken } from "@/utils/setToken";
export default {
  data() {
    return {
      view1data: [],
      view2data: [],
      view3data: {
        name: [],
        value: [],
      },
      type: "",
      aname: "",
      assInfo: {
        value1: 0,
        value2: 0,
        value3: 0,
      },
    };
  },
  created() {
    this.getSalonShow();
    this.getCaptitalShow();
    this.getSalonCount();
    this.type = getToken("type");
    if (this.type == 2) {
      this.aname = getToken("aname");
      this.getSalonByAss();
    }
  },
  computed: {
    assInfoSum() {
      return this.assInfo.value1 + this.assInfo.value2 + this.assInfo.value3;
    },
  },
  methods: {
    drawPie(title, view, data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(view));
      console.log(data);
      // 绘制图表
      myChart.setOption({
        title: { text: title, textStyle: { fontSize: 20 } },
        tooltip: {},
        series: [{type: "pie",data: data,},
        ],
        label: {
          fontSize: 18,
        },
      });
    },
    drawLine(title, view, data) {
      let myChart = this.$echarts.init(document.getElementById(view));
      myChart.setOption({
        title: { text: title, textStyle: { fontSize: 20 } },
        xAxis: {
          data: [...data.name],
          axisLabel: {
            interval: 0,
            rotate: 40,
          },
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            data: data.value,
          },
        ],
      });
    },
    async getSalonShow() {
      let result = await this.$API.dataShow.salonShow();
      console.log(result);
      if (result.status === 200) {
        this.view1data = result.data;
        this.view1data.forEach((item) => {
          item.isno === 0
            ? (item.name = "未批准")
            : item.isno === 1
            ? (item.name = "未审批")
            : (item.name = "已批准");
        });
        this.drawPie("至今日活动审批还有", "view1", this.view1data);
      }
    },
    async getCaptitalShow() {
      let result = await this.$API.dataShow.capitalShow();
      console.log(result);
      if (result.status === 200) {
        this.view2data = result.data;
        this.view2data.forEach((item) => {
          item.isno === 0
            ? (item.name = "未批准")
            : item.isno === 1
            ? (item.name = "未审批")
            : (item.name = "已批准");
        });
        this.drawPie("至今日经费审批还有", "view2", this.view2data);
      }
    },
    async getSalonCount() {
      let result = await this.$API.dataShow.salonCount();
      console.log(result);
      if (result.status === 200) {
        result.data.forEach((item) => {
          this.view3data.name.push(item.name);
          this.view3data.value.push(item.value);
        });
        console.log(this.view3data);
        this.drawLine("社团活动数量图", "view3", this.view3data);
      }
    },
    async getSalonByAss() {
      let result = await this.$API.dataShow.getSalonByAss(this.aname);
      if (result.status === 200) {
        result.data.forEach((item) => {
          if (item.name == 0) {
            this.assInfo.value1 = item.value;
          } else if (item.name == 1) {
            this.assInfo.value2 = item.value;
          } else {
            this.assInfo.value3 = item.value;
          }
        });
      }
      console.log(this.assInfo);
    },
  },
};
</script>
<style lang="scss">
.data-view {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .top {
    width: 100%;
    height: 400px;
    display: flex;
    .el-card {
      width: 50%;
      #view1,
      #view2 {
        padding-top: 40px;
        height: 300px;
        font-size: 30px;
      }
    }
  }
  .view3 {
    width: 100%;
    #view3 {
      height: 400px;
      width: 640px;
      margin-left: 280px;
      .assInfo {
      }
    }
  }
}
</style>