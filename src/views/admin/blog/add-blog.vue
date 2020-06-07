<!--  -->
<template>
  <div>
    <div>
      <el-form :model="blog" ref="queryForm" :rules="rules" label-width="68px">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="文章名" prop="title">
              <el-input
                placeholder="请输入文章名"
                v-model="blog.title"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <!-- <el-form-item label="内容" class="animated bounce blog-detail" v-show="showEditor">
              <quill-editor v-model="blog.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
            </el-form-item>-->
            <el-form-item label="内容" class="blog-detail" prop="content">
              <mavon-editor v-model="blog.content" @change="getHtmlContent" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <!-- <el-form-item label="内容" > -->
            <p
              style="font-size:14px;color:#606266;line-height: 40px;cursor:pointer"
              @click="showEditor=!showEditor"
            >
              <i class="el-icon-refresh">切换编辑器</i>
            </p>

            <p style="font-size:14px;color:#606266;line-height: 40px">发布日期</p>
            <el-date-picker
              type="date"
              v-model="blog.created_time"
              placeholder="选择日期"
              style="width: 100%;"
              required
              disabled
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <p style="font-size:14px;color:#606266;line-height: 40px">上次更新</p>
            <el-date-picker
              type="date"
              v-model="blog.updated_time"
              placeholder="选择日期"
              style="width: 100%;"
              disabled
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <p style="font-size:14px;color:#606266;line-height: 40px">分类</p>
            <el-tree
              ref="tree"
              :data="listClifys"
              show-checkbox
              v-model="blog.classification_id"
              node-key="id"
              :check-strictly="true"
              :default-expand-all="true"
              @check-change="setClassify"
            ></el-tree>
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="24" style="margin-top:20px">
            <el-form-item>
              <el-button type="primary" @click="handleAdd" v-show="idAdd">新增</el-button>
              <el-button type="primary" @click="handleUpdate" v-show="!idAdd">更新</el-button>
              <el-button icon="el-icon-refresh" @click="resetQuery('queryForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- </el-col>
      <el-col :span="4">
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>-->
  </div>
</template>
<script>
import { getBlogById, addBlog, updateBlogById } from "@/api/blog/blog";
import { listClassifications } from "@/api/classifications/classifications";
export default {
  name: "admin-blog",
  data() {
    return {
      content: "<h2>I am Example</h2>",
      editorOption: {
        // some quill options
      },
      showEditor: true,
      activeName: "second",
      listClifys: [],
      blog: {
        title: "",
        content: "",
        created_time: new Date(),
        updated_time: new Date(),
        htmlContent: "",
        classification_id: "",
        parent_classification_id: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: "请填写文章内容", trigger: "change" }
        ],
        created_time: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],

        classification_id: [
          { required: true, message: "请选择分类", trigger: "change" }
        ]
      },
      idAdd: true,
      // 选中的数组
      ids: [],
      // 选中的classify
      selectOrg: {
        orgsid: []
      },
      loading: false
    };
  },
  mounted() {
    // 根据是否带有文章id判断是否更新还是新增
    if (this.$route.params.id) {
      getBlogById(this.$route.params.id, true).then(response => {
        this.blog = response.data;
        console.log(this.blog.created_time);
      });
      this.idAdd = false;
    } else {
      this.idAdd = true;
    }
    listClassifications(this.queryParams).then(response => {
      this.listClifys = response.data;
    });
  },
  methods: {
    getHtmlContent(value, html) {
      this.blog.htmlContent = html;
    },

    handleUpdate() {
      this.blog.updated_time=new Date()
      updateBlogById(this.blog, true).then(response => {
        if (response.code === 200) {
          this.$message({
            message: "更新成功",
            type: "success"
          });
        } else {
          this.$message.error("更新失败");
        }
      });
    },
    handleAdd() {
      this.blog.updated_time = this.blog.created_time;
      this.blog.author = "coder-syl";
      addBlog(this.blog, true).then(response => {
        if (response.code === 200) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    setClassify(data, checked, indeterminate) {
      console.log(data.pa);
      console.log(this.$refs.tree.getHalfCheckedNodes(), "父节点");
      // console.log(, "父节点");
      console.log(data, "数据");
      console.log(checked, "选中状态");
      console.log(indeterminate, "子树中选中状态");
      // 获取当前选择的id在数组中的索引
      this.blog.classification_id = "";
      this.blog.parent_classification_id = "";
      const indexs = this.selectOrg.orgsid.indexOf(data.id);
      // 如果不存在数组中，并且数组中已经有一个id并且checked为true的时候，代表不能再次选择。
      if (indexs < 0 && this.selectOrg.orgsid.length === 1 && checked) {
        console.log("only one");
        this.$message({
          message: "只能选择一个分类！",
          type: "error",
          showClose: true
        });
        // 设置已选择的节点为false 很重要
        this.$refs.tree.setChecked(data, false);
      } else if (this.selectOrg.orgsid.length === 0 && checked) {
        // 发现数组为空 并且是已选择
        // 防止数组有值，首先清空，再push
        this.selectOrg.orgsid = [];
        this.selectOrg.orgsid.push(data.id);
      } else if (
        indexs >= 0 &&
        this.selectOrg.orgsid.length === 1 &&
        !checked
      ) {
        // 再次直接进行赋值为空操作
        this.selectOrg.orgsid = [];
      }
      this.blog.classification_id = this.selectOrg.orgsid;
      console.log(
        this.$refs.tree.getNode(data.id).parent.data.id,
        "this.$refs.tree.getNode(data.id).parent.data.id"
      );
      this.blog.parent_classification_id = this.$refs.tree.getNode(
        data.id
      ).parent.data.id;
    },
    resetQuery(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style  scoped>
.el-pagination {
  right: 0;
  position: absolute;
  margin-top: 10px;
  margin-right: 10px;
}
.blog-detail {
  height: 100%;
  /* height: 600px; */
}
@media screen and (min-height: 800px) {
  .v-note-wrapper {
    height: 650px !important;
    box-shadow: none !important;
  }
}
@media screen and (max-height: 800px) {
  .v-note-wrapper {
    height: 530px !important;
    box-shadow: none !important;
  }
}

.v-note-wrapper.shadow {
  border: 1px solid #dcdfe6 !important;
  border-radius: 1px;
}
.quill-editor {
  height: 475px !important;
  /* background-color: #fff !important; */
}
/* .el-form-item__content{
    height: 675px !important;

} */
</style>