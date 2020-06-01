<template>
  <el-container>
    <el-aside width="210px">
      <sideBar></sideBar>
    </el-aside>
    <el-container>
      <el-header>
        <navBar></navBar>
      </el-header>
      <el-divider></el-divider>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import sideBar from "../../components/admin/side-bar";
import navBar from "../../components/admin/nav-bar";
export default {
  name: "admin-layout",
  components: { sideBar, navBar },
  data() {
    return {};
  },

  computed: {},

  methods: {}
};
</script>
<style  scoped>
.el-container {
  min-height: 100%;
}
.el-header {
  height: 50px !important;
  background-color: #fff !important;
}
.el-header,
.el-aside {
  background-color: #304156;
  color: #fff;
  /* text-align: center; */
}

.el-main {
  /* background-color: #e9eef3; */
  /* color: #333; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-divider--horizontal {
  margin: 0;
}
</style>