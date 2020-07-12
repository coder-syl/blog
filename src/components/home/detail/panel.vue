<template>
  <div class="panel">
    <ul class="extra-act">
      <li @click="likeClick">
        <el-badge :value="likeCount" type="primary">
          <svg-icon icon-class="like" class="svg-icon" />
        </el-badge>
      </li>
      <!-- <li :class="{ 'collect-warpper': collected }" @click="collectClick">
        <el-badge :value="collectCount" :max="99" type="primary">
          <svg-icon icon-class="collect" class="svg-icon" />
        </el-badge>
      </li>-->
    </ul>

    <ul class="extra-cnt">
      <li>
        <a
          slot="reference"
          target="_blank"
          class="item"
          :href="'https://connect.qq.com/widget/shareqq/index.html?url=' + codedUrl + '&title=' + blogDetail.title + '&summary=&style=101&width=96&height=24'"
        >
          <svg-icon icon-class="qq" class="svg-icon" />
        </a>
      </li>

      <li class="wx-warpper">
        <el-popover placement="left" trigger="hover">
          <img
            style="width:90px;height:90px;margin: 5px;"
            :src="'https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=' + codedUrl"
          />
          <svg-icon slot="reference" icon-class="wx" class="svg-icon" />
        </el-popover>
      </li>

      <!-- <li v-clipboard:copy="url" v-clipboard:success="copySuccess" class="cp-warpper">
        <svg-icon icon-class="copy" class="svg-icon" />
      </li>-->
      <ul />
    </ul>
  </div>
</template>

<script>
import { getBlogById, updateBlogById } from "@/api/blog/blog";

export default {
  // props: [
  //       'author',
  //       'classification_id',
  //       'content',
  //       'createdAt',
  //       'created_time',
  //       'deletef',
  //       'htmlContent',
  //       'id',
  //       'parent_classification_id',
  //       'reply_count',
  //       'title',
  //       'updatedAt',
  //       'updated_time',
  //       'visit_count'
  // ],
  props: { blogDetail: { type: Object } },
  watch: {
    blogDetail(nv, ov) {
      this.likeCount = nv.reply_count;
    }
  },
  data() {
    return {
      likeCount: this.blogDetail.reply_count,
      collectCount: 10,
      codedUrl: window.location.href
    };
  },
  mounted() {
    console.log(this.blogDetail, "this.blog");
  },
  methods: {
    likeClick() {
      updateBlogById(
        {
          title: this.blogDetail.title,
          reply_count: this.blogDetail.reply_count + 1,
          content:this.blogDetail.content,
          id:this.blogDetail.id
        },
        true
      ).then(response => {
        if (response.code === 200) {
          // this.$message({
          //   message: "更新成功",
          //   type: "success"
          // });
          this.likeCount+=1
        } else {
          // this.$message.error("更新失败");
        }
      });
      
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  position: fixed;
  width: 45px;
  top: 30%;
  right: calc(100% - 100px);
  left: calc(calc(100% - 1040px) / 4);
  text-align: center;
  margin: 0;
  padding: 0;
  .extra-act {
    margin: 0;
    padding: 0;
    margin-bottom: 20px;

    ::v-deep .el-badge__content.is-fixed {
      right: 2px;
      top: -5px;
    }

    li {
      list-style: none;
      background: #fff;
      border-radius: 50%;
      width: 38px;
      height: 38px;
      text-align: center;
      margin-top: 10px;
      color: #b2bac2;
      box-sizing: border-box;
      padding-top: 8px;
      cursor: pointer;
      //  ::v-deep .el-badge__content {
      //     background: #b2bac2;
      //   }

      .svg-icon {
        width: 15px;
        height: 15px;
        cursor: pointer;
        fill: currentcolor;
        margin: 0 auto;
      }
    }

    .like-warpper {
      color: #007fff;
      ::v-deep .el-badge__content {
        background: #007fff;
      }
    }

    .collect-warpper {
      color: #007fff;
      ::v-deep .el-badge__content {
        background: #007fff;
      }
    }
  }

  .extra-cnt {
    margin: 0;
    padding: 0;
    color: #b2bac2;
    background: #fff;

    li {
      list-style: none;
      padding: 10px 0;
      position: relative;
      a {
        cursor: pointer;
        color: inherit;
        text-decoration: none;
      }
      &:before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 20px;
        height: 1px;
        background-color: #e5e5e5;
        margin-left: -10px;
      }

      &:hover {
        color: #007fff;
      }

      .svg-icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        fill: currentcolor;
      }
    }

    .wx-warpper:hover {
      color: #26aa09;
    }

    .cp-warpper {
      &:before {
        display: none;
      }

      &:hover {
        color: #007fff;
      }
    }
  }
}
</style>
