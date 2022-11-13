<template>
  <div class="bg-color">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }" style="font-size: 20px"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="index"
          style="font-size: 20px"
          >{{ item.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "breadcrumbVue",
  data() {
    return {};
  },
};
</script>
<style>
</style>