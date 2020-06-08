<template>
  <div class="layout">
    <navMenu v-model="isIndex"></navMenu>
    <div >
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
  mounted() {
    console.log(this.$route.path)
    if (this.$route.path === "/index") {
        this.isIndex=true
      } else {
this.isIndex=false      }
  },
  watch: {}
};
</script>

<style>
.layout {
  background-color: #f4f5f5;
  height: 100%;
}
</style>