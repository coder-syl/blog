<template>
  <!-- <base-header></base-header> -->
  <a-config-provider :locale="locale">
    <layout>
      <div class="container">
        <router-view />
      </div>
      <footer></footer
    ></layout>
  </a-config-provider>
</template>
<script>
import { onMounted } from "@vue/runtime-core";
// import baseHeader from "@components/base-header";
import layout from "./layouts/index";
import zhCN from "ant-design-vue/es/locale/zh_CN"; //引入antd中文包

export default {
  components: {
    // baseHeader,
    layout,
  },
  setup() {
    onMounted(() => {
      document.getElementById("loading-box").classList.add("loaded");
    });
    return {
      locale: zhCN,
    };
  },
};
</script>
<style lang="scss" >
html {
  height: 100%;
  font-size: 20px;
}
body {
  font-size: 14px;
  line-height: normal;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    rgba(247, 149, 51, 0.1),
    rgba(243, 112, 85, 0.1) 15%,
    rgba(239, 78, 123, 0.1) 30%,
    rgba(161, 102, 171, 0.1) 44%,
    rgba(80, 115, 184, 0.1) 58%,
    rgba(16, 152, 173, 0.1) 72%,
    rgba(7, 179, 155, 0.1) 86%,
    rgba(109, 186, 130, 0.1)
  );

  min-height: 100%;
  color: $font-color;
  font-size: $global-font-size;
  font-family: sleek;
  line-height: 2;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  overflow-x: hidden;
  // background-color: #f0f2f5;
  // background-color: #f8f8f8;
  // height: 100vh;
}

</style>
