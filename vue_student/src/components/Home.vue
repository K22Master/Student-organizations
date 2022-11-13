<template>
  <div class="home">
    <HeaderVue />
    <el-container class="content">
      <MenuVue />
      <el-container>
        <breadcrumbVue />
        <el-main class="bg-color"> <router-view></router-view></el-main>
        <el-footer style="padding: 0px"><FooterVue /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderVue from "./common/Header.vue";
import FooterVue from "./common/Footer.vue";
import MenuVue from "./common/Menu.vue";
import breadcrumbVue from "./common/breadcrumb.vue";
export default {
  name: "HomeComponet",
  components: { HeaderVue, FooterVue, MenuVue, breadcrumbVue },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    width: 100%;
    top: 120px;
    bottom: 0px;
    .bg-color {
      background-color: #cce8cf;
    }
  }
}
</style>
