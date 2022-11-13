<template>
  <div class="menu" style="width: 180px">
    <el-aside style="height: 100%; width: 180px">
      <el-menu
        router
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: 100%"
      >
        <template v-for="(item, index) in menus">
          <el-submenu :index="index + ''" :key="index" v-if="!item.hidden">
            <template slot="title">
              <i :class="item.icon"></i>
              <span style="font-weight: 600; font-size: 20px">{{
                item.name
              }}</span>
            </template>
            <el-menu-item-group
              v-for="(child, index) in item.children"
              :key="index"
            >
              <el-menu-item
                :index="child.path"
                v-if="!child.type || child.type == type"
              >
                <i :class="child.icon"></i>
                {{ child.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
import { getToken } from "@/utils/setToken";
export default {
  name: "MyMenu",
  data() {
    return {
      menus: [],
      type: "",
    };
  },
  created() {
    this.type = getToken("type");
    this.menus = [...this.$router.options.routes];
    console.log(this.type);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss">
.menu {
  .el-aside {
    font-family: 楷体;
    .el-submenu .el-menu-item {
      min-width: 0;
      width: 100%;
    }
    .el-menu-item-group {
      .el-menu-item-group__title {
        padding-top: 3px;
        padding-bottom: 3px;
      }
    }
    .el-menu-item {
      font-size: 18px;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>