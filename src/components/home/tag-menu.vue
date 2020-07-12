<template>
  <div>
    <div class="tag-menu" v-bind:class="[isFixed]">
      <div class="tag-list">
        <div class="paraent-list">
          <div class="paraent-tag">
            <el-button
              @click="getBlog({ id: 0 })"
              :type="curFatherButton === `All-全部` ? 'primary' : 'default'"
              ref="All-全部"
            >全部</el-button>
            <el-button
              v-for="item in classificationsList"
              :type="curFatherButton === item.name ? 'primary' : 'default'"
              :key="item.id"
              :ref="'father-' + item.name"
              @click="getChildren(item)"
            >{{ item.name }}</el-button>
          </div>
        </div>
      </div>
      <div class="child-tag-list">
        <div class="child-list">
          <div class="child-tag">
            <el-button
              round
              v-for="item in childClassificationsList"
              :key="item.id"
              :type="curButton === item.name ? 'primary' : 'default'"
              :ref="'child-' + item.name"
              @click="getBlog(item)"
              :autofocus="item.name === '全部' ? true : false"
            >{{ item.name }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listClassifications } from "@/api/classifications/classifications";
export default {
  data() {
    return {
      isFixed: "",
      curButton: undefined,
      curFatherButton: "All-全部",
      classificationsList: [],
      childClassificationsList: []
    };
  },
  mounted() {
    const vm = this;
    listClassifications(this.queryParams).then(response => {
      this.classificationsList = response.data;
    });
    window.addEventListener("scroll", winScroll);
    function winScroll(e) {
      var scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;

      if (scrollTop >= 80) {
        vm.isFixed = "tag-menu-fixed";
        // vm.setFixed("tag-menu-fixed")
        // console.log(vm.isFixed);
      } else {
        vm.isFixed = "";
      }
    }
  },
  methods: {
    getBlog(item) {
      if (item.id === 0) {
        this.curFatherButton = "All-全部";
      } else {
        this.curButton = item.name;
      }
      if (item.id === 0) {
        this.childClassificationsList = [];
      }
      this.$emit("input", item.id);
    },

    getChildren(item) {
      this.curFatherButton = item.name;
      this.curButton = "全部";
      this.$emit("input", item.id);
      let itemTemp = Object.assign({}, item);
      itemTemp.name = "全部";
      this.childClassificationsList = [];
      this.childClassificationsList.push(itemTemp);
      for (let i of this.classificationsList) {
        if (item.id === i.id) {
          if (i.children) {
            this.childClassificationsList.push(...i.children);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.tag-menu {
  transition: all 0.2s;
  transform: translateZ(0);
  background-color: #fff;
  width: 100%;
  margin: auto;
  height: 80px;
}
.tag-menu-fixed {
  position: fixed;
  top: 0;
}
.tag-list {
  border: solid 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding-bottom: 15px;
}
.paraent-list {
  width: 70%;
  margin: auto;
}
.paraent-tag {
  padding-top: 10px;
}
.child-tag-list {
  background-color: #f4f5f5;
  margin-bottom: 100px;
}
.child-list {
  width: 70%;
  margin: auto;
}
.child-tag {
  padding-top: 15px;
  background-color: #f4f5f5;
  margin-bottom: 15px;
}
.child-tag > span {
  margin-right: 15px;
  cursor: pointer;
}
</style>
