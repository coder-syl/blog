<template>
  <div :class="showFixed">
    <div class="menu-left">
      <el-image style="width: 80px; height: 65px;" :src="url"></el-image>
    </div>
    <div></div>
    <div class="menu-right">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        text-color="#545454"
        router
      >
        <!-- @select="getIsIndex" -->

        <el-menu-item index="/index">首页</el-menu-item>
        <!-- <el-submenu index="2">
          <template slot="title">
            <span style="font-size:16px;">分类</span>
          </template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>-->
        <el-menu-item index="aboutMe">关于我</el-menu-item>
        <el-menu-item index="friends">友情链接</el-menu-item>
        <el-menu-item index="/admin/index">后台</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { listClassifications } from "@/api/classifications/classifications";

export default {
  data() {
    return {
      activeIndex: "1",
      showFixed:"nav-menu",
      url: "http://sylblog.xin/usr/themes/Akina/images/akina.png"
    };
  },
  mounted() {
    // console.log(,)
    if(this.$route.path==='/detail'){
      this.showFixed="nav-menu-flex"
            console.log(this.showFixed,'==============')

    }else{
      this.showFixed="nav-menu"
    }
    listClassifications(this.queryParams).then(response => {
      this.tableData = response.data;
    });
  },
  methods: {
    // getIsIndex(key, keyPath) {
    //   if (key === "/index") {
    //     this.$emit("input", true);
    //   } else {
    //     this.$emit("input", false);
    //   }
    // }
  }
};
</script>

<style scoped>
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu-item {
  font-size: 16px;
}
.nav-menu {
  background-color: #fff;
  width: 100%;
  
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* position: fixed;
  top: 0; */
}
.nav-menu-flex {
  background-color: #fff;
  width: 100%;
  position: fixed;
  top:0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* position: fixed;
  top: 0; */
}
.menu-left {
  padding-top: 10px;
}
.menu-right {
  padding-top: 15px;
}
</style>
