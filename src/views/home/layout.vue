<template>
  <div class="layout"
>
    <navMenu></navMenu>
    <div style="width: 70%;
  margin: auto;">    <router-view></router-view>
</div>
  </div>
</template>

<script>
import navMenu from "@/components/home/nav-menu";
export default {
  components: {
    navMenu
  }
};
</script>

<style>
.layout{
  background-color: #f4f5f5;
  height: 100%;
}
</style>