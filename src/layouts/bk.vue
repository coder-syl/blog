<template>
  <a-layout
    class="layout-dashboard"
    id="layout-dashboard"
    :class="[
      navbarFixed ? 'navbar-fixed' : '',
      !sidebarCollapsed ? 'has-sidebar' : '',
      layoutClass,
    ]"
  >
    <SideBar
      :sidebarCollapsed="sidebarCollapsed"
      :sidebarColor="sidebarColor"
      :sidebarTheme="sidebarTheme"
      @toggleSidebar="toggleSidebar"
    ></SideBar>

    <a-layout>
      <baseHeader></baseHeader>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    return {
      selectedKeys: ref(["1"]),
      collapsed: ref(false),
    };
  },
});
</script>

