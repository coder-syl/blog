<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="5" v-for="(item,index) in cardData" :key="index">
        <div class>
          <el-card shadow="always" style>
            <i :class="item.icon" style="font-size: 50px"></i>
            <div style="float:right">
              <div>{{item.title}}</div>
              <div>{{item.total}}</div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "admin-index",
  components: {},
  data() {
    return {
      cardData: [
        {
          icon: "el-icon-user",
          title: "文章总数",
          total: 100
        },
        {
          icon: "el-icon-document-copy",
          title: "评论总数",
          total: 100
        },
        {
          icon: "el-icon-document-copy",
          title: "评论总数",
          total: 100
        },
        {
          icon: "el-icon-document-copy",
          title: "评论总数",
          total: 100
        }
      ]
    };
  },

  computed: {},

  methods: {}
};
</script>
<style  scoped>
</style>