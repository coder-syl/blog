<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  /* color: #fff; */
}
#app {
  height: 100%;
}
</style>
