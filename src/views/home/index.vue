<template>
  <div>
    <div>
      <tagMenu v-model="curClaId"></tagMenu>
    </div>
    <div class="index">
      <button @click="makeError"> asdfa</button>
      <div class="blogList" v-loading="hasLoding">
        <div class="blog" v-show="!(blogList.length>0)">
          <div class="blogHeader"></div>
          <div class="blogContent">
            没有数据
            <!-- <p
            style="  width: 90%;;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
            >{{getContent(item.content)}}</p>-->
          </div>
          <div class="blogFooter"></div>
        </div>

        <div v-for="item in blogList" :key="item.id" class="blog">
          <div class="blogHeader">
            <span>{{item.author}}</span>
            <span>{{ item.created_time| formatDate}}</span>
            <span>{{ item.classification_name}}</span>
          </div>
          <div class="blogContent" @click="getBlogDetail(item.id)">
            <div>
              <p class="blog-content-title">{{item.title}}</p>

              <p class="blog-content-descript">{{item.content}}</p>
            </div>
            <div class="blog-content-img">
              <img src="https://poile-img.nos-eastchina1.126.net/1592234164693.jpg" alt />
            </div>
            <!-- <p
            style="  width: 90%;;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
            >{{getContent(item.content)}}</p>-->
          </div>
          <div class="blogFooter">
            <div>
              <el-button size="mini" icon="el-icon-view" round>{{item.visit_count}}</el-button>
              <el-button size="mini" icon="el-icon-s-comment" round>{{item.reply_count}}</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="cardList">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>热门文章</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div v-for="(item,index) in hotBlogList" :key="item.id" class="text item cardContent">
            <!-- <div class="el-step__icon is-text"><div class="el-step__icon-inner"> -->
              <!-- </div></div> -->
            <div class="card-list-content-title">{{index}} —{{ item.title }}</div>
          </div>
        </el-card>
        <!-- <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
        </el-card> -->
      </div>

      <!-- <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
      </ul>-->
    </div>
  </div>
</template>

<script>
import {
  listBlog,
  getBlogByClassification,
  getBlogOrderByVisitCount
} from "@/api/blog/blog";
export default {
  // props: {
  //   curClaId: {
  //     default: 0
  //   }
  // },
  name:"home-index",
  data() {
    return {
      hasLoding: true,
      blogList: [],
      curClaId: "",
      hotBlogList: []
    };
  },
  filters: {
    formatDate: function(created_time) {
      let createTime = new Date(created_time);
      return (
        createTime.getFullYear() +
        "年" +
        (createTime.getMonth() + 1) +
        "月" +
        createTime.getDate() +
        "日"
      );

      // if (!value) return ''
      // value = value.toString()
      // return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  
  methods: {
    makeError(){
      console.log(1)
        error

      new Error('I was constructed via the "new" keyword!');
    },
    load() {
      this.count += 2;
    },
    getBlogDetail(id) {
      this.$router.push({ name: "detail", query: { id: id } });
    },
    getContent(str) {
      str = str.replace(/\n/g, "");
      // return str.replace(/<[^>]*>|/g, "").replace(/\\n/g, "");
      return str.replace(/#/g, "").replace(/\\n/g, "");
    }
  },
  watch: {
    curClaId: function(newV) {
      if (newV === 0) {
        listBlog().then(res => {
          this.blogList = res.data;
          this.hasLoding = false;
        });
      } else {
        getBlogByClassification(newV).then(res => {
          this.blogList = res.data;
          this.hasLoding = false;
        });
      }
    }
  },

  mounted() {
    listBlog().then(res => {
      this.blogList = res.data;
      this.hasLoding = false;
    });
    getBlogOrderByVisitCount().then(res => {
      this.hotBlogList = res.data;
      this.hasLoding = false;
    });
         
     abc();    
  }
};
</script>

<style lang='scss' scoped>
.index {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 70%;
  margin: auto;
}
.blogList {
  width: 70%;
  border: 1px solid rgba(178, 186, 194, 0.15);
  /* border: 1px solid black; */
  background-color: #fff;
  height: 100%;
}
.blog {
  border-bottom: 1px solid rgba(178, 186, 194, 0.15);
  padding-left: 20px;
  /* border-bottom: 1px solid black; */
}

.blogHeader,
.blogContent,
.blogFooter {
  color: #b2bac2;
  padding: 10px;
}
.blogHeader {
  font-size: 14px;
  font-weight: 700;
  span:not(:last-child)::after {
    content: "\B7";
    margin: 0 5px;
    color: #b2bac2;
  }
}
.blogContent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  font-size: 19px;
  height: 100px;
  /* font-size: 1.4rem; */
  font-weight: 600;
  // line-height: 90px;
  color: #2e3135;
  // white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  .blog-content-title {
    color: #2f2f2f;
  }
  .blog-content-descript {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
    font-size: 14px;
    line-height: 24px;
    color: #999;
    margin-top: 5px;
  }
  .blog-content-img > img {
    padding-top: 10%;
    width: 150px;
    height: 90px;
  }
}
.blogFooter > button {
  cursor: default;
  color: #b2bac2;
  font-weight: 700;
}
.cardList {
  width: 25%;
  .card-list-content-title{
    font-size: 14px;
  }
}
.cardContent {
  line-height: 15px;
  margin-bottom: 15px;
}
</style>