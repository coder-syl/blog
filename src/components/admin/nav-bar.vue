<template>
  <div>
    <i class="el-icon-s-unfold"></i>

    <div style="display:inline;float:left; ">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:50px;">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
          <span
            v-if="item.redirect==='noRedirect'||index==levelList.length-1"
            class="no-redirect"
          >{{ item.meta.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route(route) {
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    }
  },
  computed: {},
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
      const first = matched[0];
      //   如果不是首页的话,会把上级目录加入到路径当中
      if (!this.isDashboard(first)) {
        matched = [{ path: "/admin/index", meta: { title: "首页" } }].concat(
          matched
        );
      }
      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim() === "index";
    },
    pathCompile(path) {
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      //   const { redirect, path } = item;
      //   if (redirect) {
      //     this.$router.push(redirect);
      //     return;
      //   }
      this.$router.push({ path: item.path });
    }
  }
};
</script>
<style  scoped>
.el-icon-s-unfold {
  font-size: 25px;
  color: rgb(129, 125, 125);
  float: left;
  line-height: 50px;
  margin-right: 10px;
}
</style>