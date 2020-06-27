<!--  -->
<template>
  <div>
    <div style="margin-bottom:20px;">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="标签名" prop="name">
          <el-input
            placeholder="请输入标签名"
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
          >新建标签</el-button>
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
        <el-col :span="1.5">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
          >删除</el-button>
        </el-col>
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
      v-loading="loading"
      default-expand-all
      :data="tableData"
      row-key="id"
      tooltip-effect="dark"
      style="width: 100%"
      :tree-props="{children: 'children'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="标签名" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="paper_count" label="文章数" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="parent_name" label="上级标签" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column
        prop="created_time"
        label="创建时间"
        :formatter="formatDate"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="deletef" label="是否已删除" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="description" label="简介" show-overflow-tooltip></el-table-column>
      <el-table-column prop="url" label="地址" show-overflow-tooltip></el-table-column>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="updateClassification(scope.row)"
          >更新</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleDetail(scope.row)">详细</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
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
       
        :current-page.sync="pageConf.pageCode"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog
      title="标签管理"
      :visible.sync="dialogFormVisible"
      @close="restDialogForm"
      :close-on-click-modal="false"
      width="400px"
    >
      <el-form :model="form">
        <el-form-item label="标签名" label-width="70px">
          <el-input v-model="form.name" autocomplete="off" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" label-width="70px">
          <el-date-picker
            v-model="form.created_time"
            type="date"
            placeholder="选择日期"
            style="width:220px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="是否删除" label-width="70px">
          <el-select v-model="form.deletef" placeholder="是否删除？" style="width:220px">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父标签" label-width="70px">
          <el-select v-model="form.parentId" placeholder="请选择父标签" style="width:220px">
            <el-option label="无" value="0"></el-option>
            <el-option v-for="item in tableData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
  listClassifications,
  addClassification,
  deleteClassificationById,
  updateClassificationById
} from "@/api/classifications/classifications";
export default {
  name: "admin-blog",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10
        // serverUrl: undefined,
        // serverEnvironment: undefined,
        // id: ""
      },
      dialogFormVisible: false,
      total: 100,
      // 选中的数组
      ids: [],
      form: {
        name: "",
        created_time: "",
        deletef: "",
        parentId: ""
      },
      isAdd: true,
      single: true,
      multiple: true,
      loading: false,
      pageConf: {
        //设置一些初始值(会被覆盖)
        pageCode: 1, //当前页
        pageSize: 10, //每页显示的记录数
        totalPage: "", //总记录数
        pageOption: [10, 20] //分页选项
      }
    };
  },
  created() {
    // this.loading = true;
    // this.axios.get("/listProject").then(response => {
    //   this.tableData = response.data.result;
    //   console.log(response.data);
    // });
    this.getALlClaaifications(); // listClassifications(this.queryParams).then(response => {
    //   // console.log(response);
    //   this.tableData = response.data;
    //   console.log(this.tableData);
    //   // console.log(response.result[0].id);
    //   // this.loading = false;
    // });
  },
  methods: {
    getALlClaaifications() {
      listClassifications().then(response => {
        // console.log(response);
        this.tableData = response.data;
        console.log(this.tableData);
        // console.log(response.result[0].id);
        // this.loading = false;
      });
    },
    //pageSize改变时触发的函数
    handleSizeChange(val) {},
    //当前页改变时触发的函数
    handleCurrentChange: function() {
      console.log("页码改变了" + this.pageConf.pageCode);
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
    restDialogForm() {
      this.form = {};
    },
    handleSelectionChange(val) {
      // 这个函数是用来获取当前选中的数据
      this.multipleSelection = val;
      this.ids = this.multipleSelection.map(item => item.id);
      console.log("ids", this.ids);
      this.multiple = !this.multipleSelection.length;
      this.single = this.multipleSelection.length != 1;
    },
    updateClassification(rows) {
      this.form = rows;
      this.dialogFormVisible = true;
      this.isAdd = false;
    },
    formatDate(row, column, created_time) {
      let createTime = new Date(created_time);
      return (
        createTime.getFullYear() +
        "年" +
        (createTime.getMonth() + 1) +
        "月" +
        createTime.getDate() +
        "日"
      );
    },
    handleUpdate() {
      updateClassificationById(this.form).then(response => {
        this.getALlClaaifications();
        if (response.code === 200) {
          this.getALlClaaifications();
          this.$message({
            message: "更新成功",
            type: "success"
          });
        } else {
          this.$message.error("更新失败");
        }
      });
    },
    handleDelete(row) {
      deleteClassificationById((row.deletef = 1), row.id).then(response => {
        this.getALlClaaifications();
        if (response.code === 200) {
          this.getALlClaaifications();
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
    handleAdd() {
      addClassification(this.form, true).then(response => {
        console.log(this.form);
        if (response.code === 200) {
          this.getALlClaaifications();
          this.$message({
            message: "添加成功",
            type: "success"
          });
        } else {
          this.$message.error("添加失败");
        }
      });
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
</style>