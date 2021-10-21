<template>
  <div>
    <!-- <detailPanel :blogDetail="state.blogDetai"></detailPanel> -->
    <div class="blog-detail">
      <div class="blog-detail-container">
        <div class="blog-detail-title">{{ state.blogDetai.title }}</div>
        <div class="author-info-block">
          <div class="avatar-wrapper">
            <!-- <img :src="article.user.avatar || defaultAvatar" class="avatar"> -->
            <img
              src="https://avatars2.githubusercontent.com/u/23353792?s=60&v=4"
              class="avatar"
            />
          </div>
          <div class="author-info-box">
            <p class="nickename">{{ state.blogDetai.author }}</p>
            <div class="meta-box">
              <span class="time">{{ state.blogDetai.created_time }}</span>
              <span class="views-count"
                >浏览&ensp;{{ state.blogDetai.visit_count }}</span
              >
            </div>
          </div>
        </div>
        <div
          class="text-container markdown-body"
          v-html="state.blogDetai.htmlContent"
        ></div>
        <div style="margin-bottom: 80px">
          <copyright></copyright>
         
          <div class="main-tools-box" style="float: right">
            <!-- <el-button type="danger" size="mini">评论</el-button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <to-top></to-top> -->
</template>

<script>
import { onMounted, reactive } from "vue";
import { getBlogById, updateBlogById } from "@/api/blog/blog";
import { useRoute } from "vue-router";
import copyright from "@/components/copyright.vue"
import toTop from "@/components/to-top.vue"
export default {
    components:{
        copyright,
        toTop
        
    },
  setup() {
          const id = useRoute().query.id;

    let state = reactive({
      blogDetai: {},
    });

    onMounted(() => {
      getBlogById(id).then((res) => {
        state.blogDetai = res.data;
        state.blogDetai.visit_count += 1;
        updateBlogById(state.blogDetai).then((response) => {
          if (response.code === 200) {
            // this.$message({
            //   message: "更新成功",
            //   type: "success"
            // });
          } else {
            // this.$message.error("更新失败");
          }
        });
        // this.blogDetai.content = marked(this.blogDetai.content);
      });
    });
    return {state}
  }
};
</script>
<style lang="scss"  scoped>
@import "../../assets/style/markdown.css";
@import "../../assets/style/markdown-theme/channing-cyan/channing-cyan.css";
// @import "";
.blog-detail {
  width: 80%;
  margin: auto;

  margin-top: 6rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.edit-container {
  margin: 0 auto;
  padding: 15px 0px;

  @media screen and (max-width: 960px) {
    padding: 0;
  }

  ::v-deep .ql-container.ql-snow {
    border: none;
  }

  ::v-deep .ql-toolbar.ql-snow {
    border: none;
  }

  ::v-deep .ql-editor {
    border: 1px solid #e74851;
    border-radius: 5px;
    min-height: 120px;
    padding: 20px;
  }

  ::v-deep .ql-stroke {
    stroke: #e74851;
  }

  ::v-deep .ql-fill {
    fill: #e74851;
  }
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
  top: 90px;
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