<!--  -->
<template>
  <div>
    <div style="margin-bottom:20px;">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="error" prop="name">
          <el-input
            placeholder="类型"
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
            type="warning"
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['biz:server:export']"
          >导出</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="errorLevel" label="异常级别" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column
        prop="errorType"
        :filters="[{text: 'error', value: 'error'}, {text: 'waring', value: 'waring'}]"
        label="异常类型"
        width="120"
        :filter-method="filterHandler"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="content" label="内容" width="400" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop label="标签" width="120" show-overflow-tooltip></el-table-column> -->
      <el-table-column :formatter="formatDate" prop="createdAt" label="发布日期" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleDetail(scope.row)">详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        :page-sizes="[100, 200, 300, 400]"
        :current-page.sync="pageConf.pageCode"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { listError, deleteErrorById } from "@/api/error/error";
export default {
  name: "admin-error",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      total: 100,
      // 选中的数组
      ids: [],
      single: true,
      multiple: true,
      loading: false,
      pageConf: {
        //设置一些初始值(会被覆盖)
        pageCode: 1, //当前页
        pageSize: 10, //每页显示的记录数
        totalPage: 12, //总记录数
        pageOption: [10, 20] //分页选项
      }
    };
  },
  created() {
    this.getAllError();
  },
  methods: {
    //pageSize改变时触发的函数
    handleSizeChange(val) {},
    //当前页改变时触发的函数
    handleCurrentChange: function() {
      console.log("页码改变了" + this.pageConf.pageCode);
    },
    formatDate(row, column, created_time) {
      let createTime = new Date(created_time);
      return (
        createTime.getFullYear() +
        "年" +
        (createTime.getMonth() + 1) +
        "月" +
        createTime.getDate() +
        "日 " +
        createTime.getHours() +
        ":" +
        createTime.getMinutes() +
        ":" +
        createTime.getSeconds()
      );
    },
    getAllError() {
      listError(true).then(response => {
        this.tableData = response.data;
      });
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
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
      // 这个函数是用来获取当前选中的数据
      this.multipleSelection = val;
      this.ids = this.multipleSelection.map(item => item.id);
      this.multiple = !this.multipleSelection.length;
      this.single = this.multipleSelection.length != 1;
    },

    handleQuery() {},
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
a {
  text-decoration: none;
  color: #fff;
}
</style>