<template>
  <div class="home">
    <div class="blog-list">
      <div class="blog-container">
        <div v-for="item in state.blogList" :key="item.id">
          <div class="blog-content">
            <div class="blog-detail">
              <div class="blog-info">
                <div class="blog-into_author">樱舞话前端</div>
                |
                <div class="blog-into_time">
                  {{ $Utils.formatDateTOYYYYMMDD(item.created_time) }}
                </div>
                |
                <div class="blog-into_tag">{{ item.classification_name }}</div>
              </div>
              <div class="blog-title" @click="getBlogDetail(item.id)">
                {{ item.title }}
              </div>
              <div class="blog-abstract">
                {{ item.content }}
              </div>
            </div>
            <div class="blog-img">
              <img src="./../assets/target.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sider-bar">
      <div class="sider-classify sider-card">
        <div class="sider-title">分类</div>
        <div class="classify-list">
          <div
            class="classify-content"
            v-for="item in state.classifyList"
            :key="item.id"
          >
            <a href="">{{ item.name }}</a>
          </div>
        </div>
      </div>

      <div class="sider-hotBlog sider-card">
        <div class="sider-title">热门文章</div>
        <div class="hot-list">
          <div
            v-for="item in state.hotBlogList"
            :key="item.id"
            class="hot-list-item"
          >
            <a href="">{{ item.title }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <to-top></to-top>
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
.home {
  display: flex;
  flex-direction: row;
  // padding: 1.5rem;
  .blog-list {
    width: 800px;
    background: #fff;
    .blog-container {
      border-radius: 5px;
      padding: 10px;
      .blog-content {
        display: flex;
        flex-direction: row;
        padding: 12px 20px 0;
        border-bottom: $borderBottom;
        .blog-detail {
          flex: 1 1 auto;

          font-size: 13px;
          line-height: 22px;
          color: #4e5969;

          word-break: break-all;
          .blog-info {
            display: flex;
            flex-direction: row;
            margin-bottom: 8px;
            div:not(:first-child) {
              margin: 0 8px;
            }
            .blog-into_author {
              margin-right: 8px;
            }
          }
          .blog-title {
            font-size: 16px;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: #1d2129;
            margin-bottom: 8px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          .blog-abstract {
            color: #86909c;
            font-size: 13px;
            line-height: 22px;
            margin-bottom: 10px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
        .blog-img {
          flex: 0 0 auto;
          margin-top: 15px;
          img {
            width: 120px;
            height: 80px;
            margin-left: 24px;
            background-color: #fff;
            border-radius: 2px;
          }
        }
      }
    }
  }
  .sider-bar {
    margin-left: 20px;
    width: 240px;
    .sider-hotBlog {
      .hot-list {
        .hot-list-item {
          padding: 0.8rem 1.3rem;
          a {
            font-size: 1.16rem;
            color: #333;
          }
        }
      }
    }
    .sider-classify {
      .classify-list {
        .classify-content {
          text-align: center;
          display: inline-block;
          width: 40%;
          flex-wrap: wrap;
          padding: 10px 0;
          border-bottom: $borderBottom;
          margin: 5px 4%;
          a {
            font-size: 1.2rem;
            color: #262626;
          }
        }
      }
    }
  }
}
.sider-card {
  background: #fff;
  margin-bottom: 1.5rem;
}
</style>