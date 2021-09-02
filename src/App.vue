<template>
  <s-header></s-header>
  <div class="container">
    <router-view />
  </div>
  <footer></footer>
</template>
<script>
import sHeader from "@components/s-header";
export default {
  components: {
    sHeader,
  },
};
</script>
<style lang="scss" scoped>

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  .container{
    max-width: 960px;
    height: 100px;
      margin: 0 auto;
  }
}
</style>
