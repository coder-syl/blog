<template>
<div id="page-header">
      <a-layout-header style="background: #fff">

  <div  class="header-menu">
    
    <div class="logo">
      <a id="site-name" href="/" data-pjax-state="">半夏的前端博客</a>
    </div>
    <a-menu theme="light" mode="horizontal" v-model:selectedKeys="selectedKeys">
       <a-menu-item key="1">
        <!-- <upload-outlined /> -->
        <ReadOutlined />
        <span>
          <router-link to="/">首页</router-link>
        </span>
      </a-menu-item>
      <a-menu-item key="2">
        <!-- <user-outlined /> -->
        <HomeOutlined />
        <span>
          <router-link to="/about">关于</router-link>
        </span>
      </a-menu-item>
     
      <a-sub-menu key="3">
        <template #title>
          <span>
            <ToolOutlined />
            工具
          </span>
        </template>
        <a-menu-item key="3-1"
          ><router-link to="/tools/juejin">掘金</router-link></a-menu-item
        >
        <!-- <a-menu-item key="2-2">option6</a-menu-item>
        <a-menu-item key="2-3">option7</a-menu-item>
        <a-menu-item key="2-4">option8</a-menu-item> -->
      </a-sub-menu>
      <a-menu-item key="4">
       <GithubOutlined />
        <span>
          <router-link to="/project">开源</router-link>
        </span>
      </a-menu-item>
      <a-menu-item key="5">
        <CoffeeOutlined />
        <span>
          <router-link to="/series">系列文</router-link>
        </span>
      </a-menu-item>
    </a-menu>
  </div>
      </a-layout-header>
</div>

</template>

<script >
import {
  HomeOutlined,
  ReadOutlined,
  ToolOutlined,
  GithubOutlined,
  CoffeeOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref, reactive } from "vue";
export default {
  components: {
    HomeOutlined,
    ReadOutlined,
    ToolOutlined,
    GithubOutlined,
    CoffeeOutlined,
  },
  props: {
    // Sidebar collapsed status.
    sidebarCollapsed: {
      type: Boolean,
      default: false,
    },
    // Main sidebar color.
    sidebarColor: {
      type: String,
      default: "primary",
    },

    // Main sidebar theme : light, white, dark.
    sidebarTheme: {
      type: String,
      default: "light",
    },
  },
  setup() {
    return {
      selectedKeys: ref(["1"]),
    };
  },
};
</script>

<style lang="scss" scoped>
.header-menu {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: space-around;
      transition: all 0.5;

  .logo {
    font-size: 1.3em;
    color: #4c4948;
  }
  .ant-menu {
    margin-left: 100px;
  }
  .ant-menu-item, .ant-menu-submenu-title {
    font-size: 0.78em;
  }
}
// .ant-layout-sider {
//   height: 100vh;
// }
// .sider-primary {
//   margin: 20px 0 0 20px;
//   padding: 13px 20px;
//   width: 250px;

//   height: 100vh;
//   overflow: auto;
//   margin: 0;
//   padding: 33px 20px;
//   background: #ffffff !important;
//   .ant-layout-sider-children {
//     width: 210px;
//     @media (min-width: $lg) {
//       width: auto;
//     }
//   }
//   .ant-layout-sider-white {
//     background-color: $color-gray-1 !important;
//     box-shadow: $shadow-1;
//     margin: 0;
//     padding-top: 33px;
//     border-radius: 0px;

//     @media (min-width: $lg) {
//       margin: 20px 0 64px 20px;
//       padding-top: 13px;
//       border-radius: 8px;
//     }
//   }
// }
// // }

// .ant-menu-inline,
// .ant-menu-vertical,
// .ant-menu-vertical-left {
//   border: none !important;
// }
// .ant-menu-item-selected {
//   background-color: #1081e8 !important;
// }
</style>