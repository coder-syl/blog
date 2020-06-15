<!--  -->
<template>
  <div>
    <div style="margin-bottom:20px;">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="项目名" prop="name">
          <el-input
            placeholder="请输入项目名"
            v-model="queryParams.name"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="dialogFormVisible = true"
          >添加项目</el-button>
        </el-col>
        <!-- <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
          >修改</el-button>
        </el-col>-->
        <!-- <el-col :span="1.5">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
          >删除</el-button>
        </el-col>-->
        <!-- <el-col :span="1.5">
          <el-button
            type="warning"
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['biz:server:export']"
          >导出</el-button>
        </el-col>-->
      </el-row>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="项目" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="img_url" label="图标地址" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="language" label="语言" show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" label="简介" show-overflow-tooltip></el-table-column>
      <el-table-column prop="url" label="地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="deletef" label="是否删除" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="updateProject(scope.row)"
          >修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleDetail(scope.row)">详细</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['biz:server:remove']"
          >删除</el-button>-->
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-document"
            @click="handleService(scope.row)"
          >服务一览</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <!-- <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>-->
    <div class="block">
      <el-pagination
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        :page-sizes="[100, 200, 300, 400]"
        @pagination="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog
      title="项目管理"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="restDialogForm"
      width="450px"
    >
      <el-form :model="form" :disabled="isDetail">
        <el-form-item label="项目名" label-width="70px">
          <el-input v-model="form.name" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="url" label-width="70px">
          <el-input v-model="form.url" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="简介" label-width="70px">
          <el-input v-model="form.description" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="语言" label-width="70px">
          <el-input v-model="form.language" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="创建时间" label-width="70px">
          <el-date-picker
            style="width:300px"
            v-model="form.createdAt"
            type="date"
            placeholder="选择日期"
            disabled
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="是否删除" label-width="70px">
          <el-select v-model="form.deletef" placeholder="是否删除？" style="width:300px">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否删除" label-width="70px">
          <!-- <div label="图片地址" label-width="70px"> -->
          <el-upload
            action="#"
            :limit="1"
            ref="upload"
            :multiple="false"
            :auto-upload="false"
            :file-list="imgList"
            :on-change="hasChangeImg"
            list-type="picture-card"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">上传图片大小不超过500kb</div>
          </el-upload>
          <!-- </div> -->
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-show="isAdd" @click="handleAdd">确 定</el-button>
        <el-button type="primary" v-show="!isAdd" @click="handleUpdate">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  listProjects,
  updateProjectById,
  addProject,
  deleteProjectById,
  uploadImg
} from "@/api/project/project";
import projectForm from "@components/admin/project-form";
export default {
  name: "project",
  components: {
    projectForm
  },
  data() {
    return {
      // 控制dialog是否显示
      dialogFormVisible: false,
      tableData: [],
      multipleSelection: [],
      queryParams: {
        pageCode: 1,
        pageSize: 5
        // serverUrl: undefined,
        // serverEnvironment: undefined,
        // id: ""
      },
      form: {
        name: "",
        createdAt: new Date(),
        deletef: "",
        url: "",
        img_url: "",
        language: "",
        description: ""
      },
      isAdd: true,
      imgList: [],
      ChangeImg: false,
      isDetail: false,
      total: 100,
      // 选中的数组
      ids: [],
      single: true,
      multiple: true,
      loading: false,
      formVisible: false,
      pageConf: {
        // 设置一些初始值(会被覆盖)
        pageCode: 1, // 当前页
        pageSize: 5, // 每页显示的记录数
        totalPage: 12, // 总记录数
        pageOption: [10, 20] // 分页选项
      }
    };
  },
  created() {
    this.loading = true;
    this.getAllProjects();
  },
  methods: {
    getAllProjects() {
      listProjects().then(response => {
        this.tableData = response.data;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.deletef === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "";
      }
      return "";
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
      this.multiple = !this.multipleSelection.length;
      this.single = this.multipleSelection.length != 1;
    },
    restDialogForm() {
      this.form = {};
      this.imgList = [];
      this.isAdd = true;
      this.ChangeImg = false;
      this.isDetail = false;
    },
    hasChangeImg() {
      this.$message({
        message: "更换成功",
        type: "success"
      });
      this.ChangeImg = true;
    },
    updateProject(rows) {
      this.form = rows;
      this.dialogFormVisible = true;
      this.isAdd = false;
      this.form.img_url
        ? this.imgList.push({
            name: this.form.name,
            url: this.form.img_url
          })
        : (this.imgList = []);
      // this.imgList[0]=this.tableData.img_url
    },
    handleUpdate() {
      const fileArray = this.$refs.upload.uploadFiles;
      const fd = new FormData();
      fd.append("avatar", fileArray[0].raw);
      new Promise((resolve, reject) => {});
      if (this.ChangeImg === true) {
        this.$message({
          message: "正在上传图片",
          type: "success"
        });
        uploadImg(fd)
          .then(response => {
            this.form.img_url =
              "http://localhost:3000/" +
              String(response.data.avatar.path).replace(/\\/g, "/");
            console.log(this.form.img_url, " this.form.img_url ");
          })
          .then(() => {
            updateProjectById(this.form).then(response => {
              this.getAllProjects();
              if (response.code === 200) {
                this.getAllProjects();
                this.$message({
                  message: "更新成功",
                  type: "success"
                });
              } else {
                this.$message.error("更新失败");
              }
            });
          });
      } else {
        console.log(this.form.img_url, " this.form.img_url ");
        updateProjectById(this.form).then(response => {
          this.getAllProjects();
          if (response.code === 200) {
            this.getAllProjects();
            this.$message({
              message: "更新成功",
              type: "success"
            });
          } else {
            this.$message.error("更新失败");
          }
        });
      }
    },
    handleDelete(row) {
      deleteProjectById((row.deletef = 1), row.id).then(response => {
        this.getAllProjects();
        if (response.code === 200) {
          this.getAllProjects();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    handleQuery() {},
    handleDetail(row) {
      this.form = row;
      this.dialogFormVisible = true;
      this.isDetail = true;
      this.form.img_url
        ? this.imgList.push({
            name: this.form.name,
            url: this.form.img_url
          })
        : (this.imgList = []);
    },

    handleAdd() {
      if (this.ChangeImg === false) {
        this.$message.error("图片是必须的");
        return;
      }
      const fileArray = this.$refs.upload.uploadFiles;
      const fd = new FormData();
      fd.append("avatar", fileArray[0].raw);
      uploadImg(fd).then(response => {
        this.form.img_url =
          "http://localhost:3000/" +
          String(response.data.avatar.path).replace(/\\/g, "/");

        addProject(this.form, true).then(response => {
          if (response.code === 200) {
            this.getAllProjects();
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.$message.error("添加失败");
          }
        });
      });
    },
    resetQuery(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.el-pagination {
  right: 0;
  position: absolute;
  margin-top: 10px;
  margin-right: 10px;
}
.el-table .warning-row {
  background: #fdf5e6;
}
</style>
