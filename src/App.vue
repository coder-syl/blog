<template>
  <!-- <base-header></base-header> -->

  <layout>
    <div class="container">
      <router-view />
    </div>
    <footer></footer
  ></layout>
</template>
<script>
// import baseHeader from "@components/base-header";
import layout from "./layouts/index";
export default {
  components: {
    // baseHeader,
    layout,
  },
};
</script>
<style lang="scss" >
html {
  font-size: 12px;
  font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell,
    Noto Sans, sans-serif, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", Arial;
  word-break: break-word;
  text-rendering: optimizeLegibility;
  color: #333;
  background-color: #dee3e7;
}
body {
  font-size: 12px;
  line-height: normal;
  cursor: pointer;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  // background-color: #f0f2f5;
  background-color: #f8f8f8;
  height: 100vh;
}
</style>
