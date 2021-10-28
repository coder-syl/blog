<template>
  <div class="home">
    <div class="blog-list">
      <div class="hot-blog">
        <hot-blog></hot-blog>
      </div>

      <div class="blog-container">
        <!-- <div > -->
        <div class="blog-content" v-for="item in state.blogList" :key="item.id">
          <div class="blog-img">
            <img src="./../assets/target.png" alt="" />
          </div>
          <div class="blog-detail">
            <div class="blog-title" @click="getBlogDetail(item.id)">
              {{ item.title }}
            </div>
            <div class="blog-abstract">
              {{ item.content }}
            </div>
            <div class="blog-info">
              <div class="blog-into_author">半夏</div>
              |
              <div class="blog-into_time">
                <ClockCircleOutlined />
                {{ $Utils.formatDateTOYYYYMMDD(item.created_time) }}
              </div>
              |
              <div class="blog-into_tag">
                <TagOutlined />
                {{ item.classification_name }}
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <a-pagination
            show-quick-jumper
            :current="pageConf.curPage"
            :total="pageConf.total"
            :pageSize="pageConf.pageSize"
            :defaultPageSize="10"
            @change="onCurPageChange"
            @showSizeChange="showPageSizeChange"
            show-size-changer
            :page-size-options="['6', '8', '10']"
            :show-total="(total) => `共计 ${total} 篇`"
          />
        </div>
      </div>
      <!-- </div> -->
    </div>
    <div class="sider-bar">
      <div class="sider-card">
        <div class="sider-title">
          <SoundTwoTone twoToneColor="#f00" />&nbsp;&nbsp; 半夏有话说
        </div>
        <div class="comment">
          博主 19届本科毕业，可以喊我
          <span style="color: #f00">半夏</span>。
          <br />
          当然你也可以喊我
          <span style="color: #f00">前端picker。</span>
          <br />
          目前我已经开通了个人公众号，在这里会有我最新的文章，面试资料等等。欢迎关注！
          <br />
          <img src="./../assets/image/qrcode.jpg" />
          当然你也可以扫码加我的微信,交流。
          <img width="240" height="240" src="./../assets/image/vx.jpg" />
        </div>
      </div>
      <!-- <div class="sider-classify sider-card">
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
      </div> -->

      <div class="sider-hotBlog sider-card">
        <div class="sider-title">
          <FundTwoTone twoToneColor="#f00" />&nbsp;&nbsp;
          热门文章
        </div>
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
import {
  TagOutlined,
  ClockCircleOutlined,
  SoundTwoTone,
  FundTwoTone,
} from "@ant-design/icons-vue";
import { listClassifications } from "@/api/classifications/classifications";
import { useRouter } from "vue-router";
import ToTop from "../components/to-top.vue";
import hotBlog from "@/views/blog/hot-blog.vue";
export default {
  name: "Home",
  components: {
    ToTop,
    hotBlog,
    ClockCircleOutlined,
    TagOutlined,
    SoundTwoTone,
    FundTwoTone,
  },

  setup() {
    // // let {proxy}

    // };
    let pageConf = reactive({
      //设置一些初始值(会被覆盖)
      curPage: 1, //当前页
      pageSize: 10, //每页显示的记录数
      total: 0, //总记录数
      pageOption: [10, 20], //分页选项
    });
    const useRouterT = useRouter();
    console.log(useRouterT);
    let state = reactive({
      blogList: [],
      hotBlogList: [],
      classifyList: [],
    });
    const getBlogBypageConfig = () => {
      const pageConfig = {
        curPage: pageConf.curPage || 1,
        pageSize: pageConf.pageSize || 10,
      };
      listBlog(pageConfig).then((res) => {
        // console.log( res.data.rows);
        state.blogList = res.data.rows;
        pageConf.total = Number(res.data.count);
      });
    };
    onMounted(() => {
      getBlogBypageConfig();
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
    const onCurPageChange = (pageNumber) => {
      console.log("Page: ", pageNumber);

      pageConf.curPage = pageNumber;
      getBlogBypageConfig();
    };
    const showPageSizeChange = (curPage, pageSize) => {
      console.log("pageSize: ", pageSize);
      pageConf.curPage = curPage;

      pageConf.pageSize = pageSize;
      getBlogBypageConfig();
    };
    function getBlogDetail(id) {
      useRouterT.push({ name: "Blog", query: { id: id } });
    }
    console.log(state.blogList);

    return {
      state,
      getBlogDetail,
      pageConf,
      onCurPageChange,
      showPageSizeChange,
      getBlogBypageConfig,
    };
  },
};
</script>


<style lang='scss' scoped>
.home {
  display: flex;
  flex-direction: row;
  // padding: 1.5rem;\
  .hot-blog {
    width: 100%;
  }
  .blog-list {
    width: 75%;
    .blog-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-top: 1rem;
      border-radius: 5px;
      padding: 10px;
      .blog-content {
        transition: all 5s;

        display: flex;
        border-radius: 8px;
        flex-direction: column;
        // padding: 12px 20px 0;
        border-bottom: $borderBottom;
        width: 49%;
        margin-top: 20px;
        padding: 5px;
        .blog-detail {
          background: #fff;

          flex: 1 1 auto;
          padding: 0 40px;
          font-size: 13px;
          line-height: 22px;
          color: #4e5969;
          border-radius: 0 0 8px 8px;

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
            font-size: 18px;
            font-weight: 700;
            line-height: 1.4;
            color: $text-highlight-color;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            &:hover {
              color: #49b1f5;
            }
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
          // margin-top: 15px;
          width: 100%;
          height: 200px;
          overflow: hidden;
          border-radius: 8px 8px 0 0;
          img {
            width: 100%;
            height: 100%;
            -webkit-transition: all 0.6s;
            -moz-transition: all 0.6s;
            -o-transition: all 0.6s;
            -ms-transition: all 0.6s;
            transition: all 0.6s;
            object-fit: cover;
          }
          img:hover {
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            -o-transform: scale(1.1);
            -ms-transform: scale(1.1);
            transform: scale(1.1);
          }
        }
      }
      .pagination {
        padding-top: 20px;
        margin: auto;
      }
    }
  }
  .sider-bar {
    margin-left: 15px;
    .sider-card {
      padding: 20px 20px;
    }
    .comment {
    }
    width: 25%;
    .sider-title {
      padding-bottom: 0.3rem;
      font-size: 1.2em;
    }
    .sider-hotBlog {
      .hot-list {
        .hot-list-item {
          padding: 0.4rem 0.5rem;
          a {
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            overflow: hidden;
            font-size: 1em;
            color: $font-color;
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
            font-size: 0.8rem;
            color: #262626;
          }
        }
      }
    }
  }
}
:deep(.ant-pagination-item-active) {
  background: #00c4b6;
  border-color: #fff;
  a {
    color: #fff;
  }
}
.sider-card {
  background: #fff;
  margin-bottom: 1.5rem;
}
</style>