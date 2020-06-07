<!--  -->
<template>
  <div>
    <div>
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
        <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
          >修改</el-button>
        </el-col>
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
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="项目" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" label="图标地址" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="language" label="语言" show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" label="简介" show-overflow-tooltip></el-table-column>
      <el-table-column prop="url" label="地址" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['biz:server:edit']"
          >修改</el-button>-->
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleDetail(scope.row)">详细</el-button>
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

    <el-dialog title="弹出窗口" :visible.sync="dialogFormVisible">
      <projectForm></projectForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { listProject } from "@/api/project/project";
import projectForm from "../../components/admin/project-form";
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
      total: 100,
      // 选中的数组
      ids: [],
      single: true,
      multiple: true,
      loading: false,
      formVisible: false,
      pageConf: {
        //设置一些初始值(会被覆盖)
        pageCode: 1, //当前页
        pageSize: 5, //每页显示的记录数
        totalPage: 12, //总记录数
        pageOption: [10, 20] //分页选项
      }
    };
  },
  created() {
    console.log("process.env.VUE_APP_BASE_API", process.env);

    this.loading = true;
    // this.axios.get("/listProject").then(response => {
    //   this.tableData = response.data.result;
    //   console.log(response.data);
    // });
    listProject(this.queryParams, true).then(response => {
      console.log(response);
      this.tableData = response.result;
      // console.log(response.result[0].id);
      // this.loading = false;
    });
  },
  methods: {
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
    handleUpdate() {},
    handleDelete() {},
    handleQuery() {},
    handleAdd() {},
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