<!--  -->
<template>
  <div>
    <div>
      <el-form :model="blog" ref="queryForm" label-width="68px">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="文章名" prop="name">
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
            <el-form-item label="内容" class="blog-detail">
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
            ></el-date-picker>
            <p style="font-size:14px;color:#606266;line-height: 40px">最近更新</p>
            <el-date-picker
              type="date"
              v-model="blog.updated_time"
              placeholder="选择日期"
              style="width: 100%;"
              disabled
            ></el-date-picker>
            <p style="font-size:14px;color:#606266;line-height: 40px">分类</p>
            <el-tree
              ref="tree"
              :data="listClifys"
              show-checkbox
              :check-strictly="true"
              v-model="blog.classify"
              node-key="id"
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
        created_time: null,
        updated_time: null,
        htmlContent: "",
        classificationId:""
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
  created() {
    // this.loading = true;
    // this.axios.get("/listProject").then(response => {
    //   this.tableData = response.data.result;
    //   console.log(response.data);
    // });
    console.log("文章管理");
    console.log(this.$router);
    console.log(this.$route.params.id);
    if (this.$route.params.id) {
      getBlogById(this.$route.params.id, true).then(response => {
        // console.log(response);
        this.blog = response.data;
        // console.log(response.result[0].id);
        // this.loading = false;
      });
      this.idAdd = false;
    } else {
      console.log(12);
      this.idAdd = true;
    }
    listClassifications(this.queryParams).then(response => {
      // console.log(response);
      this.listClifys = response.data;
      console.log(this.tableData);
      // console.log(response.result[0].id);
      // this.loading = false;
    });
  },
  methods: {
    getHtmlContent(value, html) {
      this.blog.htmlContent = html;
    },
    //pageSize改变时触发的函数
    handleSizeChange(val) {},
    //当前页改变时触发的函数
    handleCurrentChange: function() {
      console.log("页码改变了");
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = this.multipleSelection.map(item => item.id);
      console.log("ids", this.ids);
      this.multiple = !this.multipleSelection.length;
      this.single = this.multipleSelection.length != 1;
    },
    handleUpdate() {
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
    handleDelete() {},
    handleQuery() {},
    handleAdd() {
      this.blog.updated_time = this.blog.created_time;
      this.blog.author = "coder-syl";
      addBlog(this.blog, true).then(response => {
        // console.log(response);
        // this.blog = response.data;
        // console.log(response.result[0].id);
        // this.loading = false;
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
      console.log(data, "数据");
      console.log(checked, "选中状态");
      console.log(indeterminate, "子树中选中状态");
      // 获取当前选择的id在数组中的索引
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
      this.blog.classificationId=this.selectOrg.orgsid;
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