<template>
  <div class="index">
    <div class="blogList" v-loading="hasLoding">
      <div v-for="item in blogList" :key="item.id" class="blog">
        <div class="blogHeader">{{new Date(item.created_time).toLocaleDateString()}}-{{item.author}}</div>
        <div class="blogContent" @click="getBlogDetail(item.id)">
          {{item.title}}
          <!-- <p
            style="  width: 90%;;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
          >{{getContent(item.content)}}</p>-->
        </div>
        <div class="blogFooter">
          <el-button size="medium" icon="el-icon-view">{{item.visit_count}}</el-button>
          <el-button size="medium" icon="el-icon-s-comment">{{item.reply_count}}</el-button>
        </div>
      </div>
    </div>
    <div class="cardList">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>热门标签</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item cardContent">
          <div>
            <el-tag>{{'列容 ' + o }}</el-tag>
          </div>
          <div>
            <el-tag>{{'列容 ' + o }}</el-tag>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
      </el-card>
    </div>

    <!-- <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
    </ul>-->
  </div>
</template>

<script>
import { listBlog } from "@/api/blog/blog";
export default {
  props: {
    curClaId: {
      default: 0
    }
  },
  data() {
    return {
      hasLoding: true,
      blogList: []
    };
  },
  methods: {
    load() {
      this.count += 2;
    },
    getBlogDetail(id) {
      this.$router.push({ name: "detail", query: { id: id } });
    },
    getContent(str) {
      console.log(typeof str);
      str = str.replace(/\n/g, "");
      // console.log( str)
      // return str.replace(/<[^>]*>|/g, "").replace(/\\n/g, "");
      return str.replace(/#/g, "").replace(/\\n/g, "");
    }
  },
  watch: {
    curClaId: function(newV) {
      if (newV === 0) {
        listBlog().then(res => {
          this.blogList = res.data;
          console.log(res);
          this.hasLoding = false;
        });
      } else {
        listBlog({ classification_id: newV }).then(res => {
          this.blogList = res.data;
          console.log(res);
          this.hasLoding = false;
        });
      }
    }
  },
  mounted() {
    listBlog().then(res => {
      this.blogList = res.data;
      console.log(res);
      this.hasLoding = false;
    });
  }
};
</script>

<style>
.index {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
.blogContent {
  cursor: pointer;
  font-size: 20px;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.2;
  color: #2e3135;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.blogFooter > button {
  cursor: default;
  color: #b2bac2;
  font-weight: 700;
}
.cardList {
  width: 25%;
}
.cardContent {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 5px;
}
</style>