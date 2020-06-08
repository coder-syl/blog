<template>
  <div class="blog-detail">
    <div class="blog-detail-container">
      <div class="blog-detail-title">{{blogDetai.title}}</div>
      <div class="text-container my-markdown-body" v-html="blogDetai.htmlContent"></div>
      <div></div>
    </div>
    <div class="cardList">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getBlogById } from "@/api/blog/blog";
// import "../../styles/heilingt.css";

// import marked from "marked";

export default {
  data() {
    return {
      blogDetai: {}
    };
  },
  mounted() {
    let id = this.$route.query.id;
    getBlogById(id).then(res => {
      console.log(res.data);
      this.blogDetai = res.data;
      // this.blogDetai.content = marked(this.blogDetai.content);
    });
  }
};
</script>

<style lang="scss"  scoped>
// @import "../../styles/variables";
// @import "../../styles/markdown.css";
@import "../../styles/markdown.css";
.blog-detail {
  width: 70%;
    margin: auto;

  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.blog-detail-container {
  width: 70%;
  border: 1px solid rgba(178, 186, 194, 0.15);
  padding: 0 2rem;
  /* border: 1px solid black; */
  background-color: #fff;
  .blog-detail-title {
    margin: 0.67em 0;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.5;
  }
  .text-container {
    font-size: 15px;
    margin-top: 24px;
  }
}
.cardList {
  width: 20%;
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
}
</style>