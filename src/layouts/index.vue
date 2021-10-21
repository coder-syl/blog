<template>
  <a-layout class="layout">
    <!-- <a-layout class="layout-content"> -->
    <a-layout-header style="background: #fff">
      <SideBar
        :sidebarCollapsed="sidebarCollapsed"
        :sidebarColor="sidebarColor"
        :sidebarTheme="sidebarTheme"
      ></SideBar>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px" class="layout-content">
      <router-view />
    </a-layout-content>
  </a-layout>
  <!-- </a-layout> -->
</template>
<script >
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import SideBar from "@/components/SideBar.vue";
import { defineComponent, ref } from "vue";
export default {
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SideBar,
  },
  setup() {
    let sidebarCollapsed = ref(false);
    let sidebarColor = ref("primary");
    let sidebarTheme = ref("light");
    let selectedKeys = ref(ref(["1"]));
    console.log();

    function doToggleSidebar() {
      console.log(
        this.sidebarCollapsed,
        "this.sidebarCollapsedthis.sidebarCollapsed"
      );
      sidebarCollapsed.value = !this.sidebarCollapsed;
      console.log(
        this.sidebarCollapsed,
        "this.sidebarCollapsedthis.sidebarCollapsed"
      );

      // console.log( this.sidebarCollapsed.value)
    }

    return {
      sidebarCollapsed,
      selectedKeys,
      sidebarColor,
      sidebarTheme,
      doToggleSidebar,
    };
  },
};
</script>
<style lang="scss" scoped>
.ant-layout{
  background:none;
}
.layout {
  width: 100vw;
  display: flex;
  align-items: center;
  margin: 0;

  .layout-content {
    margin-top:16px;    
    max-width: 1060px;
  }
  .ant-layout-header {
    // text-align:center;
    width:100vw;
  
  }
}
</style>