<template>
  <div class="notfound">
    <div class="warpper">
      <div>返回<router-link to="/login">登录页面</router-link></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.notfound {
  height: 100%;
  background-image: url("../assets/404.png");
  background-size: cover, auto;
  .warpper {
    font-size: 25px;
    font-family: 楷体;
    position: absolute;
    top: 550px;
    right: 490px;
  }
}
</style>