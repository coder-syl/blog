<template>
  <a-carousel dot-position="right" effect="fade" autoplay>
    <div v-for="item in state.blogList" :key="item.id">
      <div class="blog-content">
                <div class="blog-img">
          <img
            width="48"
            height="48"
            src="https://cdn.jsdelivr.net/gh/chocolate1999/cdn/img/20201229201533.png"
            alt=""
          />
        </div>
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
  
      </div>
    </div>
  </a-carousel>
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
export default {
  name: "Home",

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
      listBlog({
        curPage: 1,
        pageSize: 5,
      }).then((res) => {
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
/* For demo */
.ant-carousel {
}
.ant-carousel :deep(.slick-slide) {
  box-shadow: $card-box-shadow;
  border-radius: 12px 8px 8px 12px;
  height: 200px;

  background: #fff;
  overflow: hidden;
}

.ant-carousel :deep(.slick-dots li) {
  background: #858585;
  width: 11px;
  height: 11px;
  display: block;
  border-radius: 10px;
  background: #858585;
  transition: all 0.3s;
  margin: 8px 0;
}
.ant-carousel :deep(.slick-dots li button) {
  background: #858585;
  width: 11px;
  height: 11px;
  display: block;
  border-radius: 10px;
  background: #858585;
  transition: all 0.3s;
  margin: 8px 0;
}
.ant-carousel :deep(.slick-dots .slick-active) {
  background: $btn-bg;
  height: 30px;
  width: 11px;
}
.ant-carousel :deep(.slick-dots .slick-active button) {
  background: $btn-bg;
  height: 30px;
  width: 11px;
}

.blog-content {
  display: flex;
  flex-direction: row;
  padding: 0px 20px 0;
  align-items: center;
  
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
    width: 200px;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    height: 200px;
    padding: 10px;
    border-radius: 5px;
    -webkit-transform: translateX(0px);
    -moz-transform: translateX(0px);
    -o-transform: translateX(0px);
    -ms-transform: translateX(0px);
    transform: translateX(0px);
    overflow: hidden;

    img {
      max-width: 100%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
      border-radius: 5px;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -o-transition: all 0.3s;
      -ms-transition: all 0.3s;
      transition: all 0.3s;
    }
  }
}
</style>