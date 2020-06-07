<template>
  <div class="layout">
    <navMenu v-model="isIndex"></navMenu>
    <tagMenu v-show="isIndex" v-model="curClaId"></tagMenu>

    <div style="width: 70%;margin: auto;">
      <router-view :curClaId="curClaId"></router-view>
    </div>
  </div>
</template>

<script>
import navMenu from "@/components/home/nav-menu";
import tagMenu from "@/components/home/tag-menu";
export default {
  components: {
    navMenu,
    tagMenu
  },
  data() {
    return {
      curClaId: "",
      isIndex: true
    };
  },
  mounted() {},
  watch: {}
};
</script>

<style>
.layout {
  background-color: #f4f5f5;
  height: 100%;
}
</style>