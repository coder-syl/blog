<template>
  <div class="home">
    <div class="sider-link"></div>
    <div class="container"></div>
    <div class="sider-info"></div>
  </div>
</template>

<script>
import { reactive, onMounted, toRef, getCurrentInstance } from "vue";
// @ is an alias to /src
import {
  listBlog,
  getBlogByClassification,
  getBlogOrderByVisitCount,
} from "@/api/blog/blog";
import { listClassifications } from "@/api/classifications/classifications";
import { useRouter } from "vue-router";
import ToTop from "../components/to-top.vue";
export default {
  name: "Home",
  components: { ToTop },

  setup() {
    // let {proxy}
    const useRouterT = useRouter();
    console.log(useRouterT);
    let state = reactive({
      blogList: [],
      hotBlogList: [],
      classifyList: [],
    });
    onMounted(() => {
      listBlog().then((res) => {
        // console.log( res.data.rows);
        state.blogList = res.data.rows;
      });
      getBlogOrderByVisitCount().then((res) => {
        state.hotBlogList = res.data;
      });
      listClassifications().then((res) => {
        // console.log(response);
        state.classifyList = res.data;
        // console.log(response.result[0].id);
        // this.loading = false;
      });
    });
    function getBlogDetail(id) {
      useRouterT.push({ name: "Blog", query: { id: id } });
    }
    console.log(state.blogList);

    return { state, getBlogDetail };
  },
};
</script>


<style lang='scss' scoped>
.homr {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.sider-link {
  background: #f4f5f5;
  height:100%;
}
.container {
}
.sider-info {
}
</style>