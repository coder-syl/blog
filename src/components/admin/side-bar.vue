vue
<template>
  <div>
    <div>
      <logo></logo>
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>-->
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <router-link to="/admin/index">
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              首页
            </template>
          </el-menu-item>
        </router-link>
        <router-link to="/admin/project">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            项目
          </el-menu-item>
        </router-link>
        <router-link to="/admin/blog">
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            文章
          </el-menu-item>
        </router-link>
        <router-link to="/admin/classification">
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            分类
          </el-menu-item>
        </router-link>
         <router-link to="/admin/error">
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
           错误
          </el-menu-item>
        </router-link>
      </el-menu>
    </div>
  </div>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 209px;
  min-height: 400px;
}
.el-menu {
  background-color: #304156;
}
.el-submenu__title,
.el-menu-item {
  color: #fff;
}
</style>

<script>
import logo from "./logo";
export default {
  name: "navMenu",
  data() {
    return {
      isCollapse: false
    };
  },
  components: {
    logo
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>