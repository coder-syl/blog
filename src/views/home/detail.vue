<template>
  <div>
    <div class="blog-detail">
      <div class="blog-detail-container">
        <div class="blog-detail-title">{{blogDetai.title}}</div>
        <div class="author-info-block">
          <div class="avatar-wrapper">
              <!-- <img :src="article.user.avatar || defaultAvatar" class="avatar"> -->
              <img src="https://poile-img.nos-eastchina1.126.net/me.png" class="avatar">
          </div>
          <div class="author-info-box">
            <p class="nickename">{{ blogDetai.author }}</p>
            <div class="meta-box">
              <span class="time">{{ blogDetai.created_time }}</span>
              <span class="views-count">浏览&ensp;{{ blogDetai.visit_count }}</span>
            </div>
          </div>
        </div>
        <div class="text-container my-markdown-body" v-html="blogDetai.htmlContent"></div>
        <div>
          <copyright></copyright>
        </div>
      </div>
      <div class="cardList">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>相关阅读</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getBlogById } from "@/api/blog/blog";
// import "../../styles/heilingt.css";

// import marked from "marked";

export default {
  name: "home-detail",
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
    abc();
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

  margin-top: 90px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start	;
}

.author-info-block {
  display: flex;

  .avatar-wrapper {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-right: 5px;

    .avatar {
      width: 100%;
      height: 100%;
    }
  }

  .author-info-box {
    .nickename {
      font-weight: 500;
      font-size: 15px;
      display: inline-block;
      margin: 5px;
      color: #000;
    }

    .meta-box {
      font-size: 12px;
      color: #909090;

      .views-count {
        margin-left: 5px;
      }
    }
  }
}
.blog-detail-container {
  width: 70%;
  border: 1px solid rgba(178, 186, 194, 0.15);
  padding: 0 2rem;
  /* border: 1px solid black; */
  background-color: #fff;
  .blog-detail-title {
    margin: 0.67em 0;
        font-size: 25px;
    font-weight: 700;
    color: #222;
 
    // line-height: 1.5;
  }
  .text-container {
    font-size: 15px;
    margin-top: 24px;
  }
}
.cardList {
  position: fixed;
  width: 20%;
  right: 10%;
  top:90px;
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