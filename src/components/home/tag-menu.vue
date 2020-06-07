<template>
  <div>
    <div class="tag-menu" v-bind:class="[isFixed]">
      <div class="tag-list">
        <div class="paraent-list">
          <div class="paraent-tag">
            <el-button @click="getBlog({id:0})" autofocus>全部</el-button>
            <el-button
              v-for="item in classificationsList"
              :key="item.id"
              @click="getChildren(item)"
            >{{item.name}}</el-button>
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
              @click="getBlog(item)"
              :autofocus="item.name==='全部'?true:false"
            >{{item.name}}</el-button>
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
      classificationsList: [],
      childClassificationsList: [],
      activeIndex: "1",
      url: "http://sylblog.xin/usr/themes/Akina/images/akina.png"
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

      if (scrollTop >= 130) {
        vm.isFixed = "tag-menu-fixed";
        // vm.setFixed("tag-menu-fixed")
        console.log(vm.isFixed);
      } else {
        vm.isFixed = "";
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getBlog(item) {
      if(item.id===0){
        this.childClassificationsList=[]
      }
      this.$emit("input", item.id);
    },
    // setFixed(val){
    //     this.isFixed=val
    // }
    getChildren(item) {
      console.log("---------");
      console.log(item, "item");
      this.$emit("input", item.id);
      let itemTemp = Object.assign({}, item);
      itemTemp.name = "全部";
      this.childClassificationsList = [];
      this.childClassificationsList.push(itemTemp);
      for (let i of this.classificationsList) {
        // console.log(i);
        if (item.id === i.id) {
          if (i.children) {
            this.childClassificationsList.push(...i.children);
          }
        }
      }
      console.log(this.childClassificationsList);
    }
  },
  watch: {
    isFixed: function(val) {
      console.log(val, "=============");
    }
  }
};
</script>

<style scoped>
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu-item {
  font-size: 16px;
}
.tag-menu {
  /* position: fixed;
  top: 5rem; */
  transition: all 0.2s;
  transform: translateZ(0);
  background-color: #fff;
  width: 100%;
  margin: auto;
  /* display: flex;
  flex-direction: row;
  justify-content: space-around; */

  /* position: fixed;
  top: 0; */
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
}
.child-list {
  width: 70%;
  margin: auto;
}
.child-tag {
  padding-top: 15px;
  background-color: #f4f5f5;
}
.child-tag > span {
  margin-right: 15px;
  cursor: pointer;
}
</style>
