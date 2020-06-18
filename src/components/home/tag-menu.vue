<template>
  <div>
    <div class="tag-menu" v-bind:class="[isFixed]">
      <div class="tag-list">
        <div class="paraent-list">
          <div class="paraent-tag">
            <el-button @click="getBlog({id:0})" type="primary">全部</el-button>
            <el-button
              v-for="item in classificationsList"
              :key="item.id"
              :ref="'father-'+item.name"
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
              :ref="'child-'+item.name"
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
        // console.log(vm.isFixed);
      } else {
        vm.isFixed = "";
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    getBlog(item) {
      console.log(item);
      console.log(this.$refs, "item==");
      for (let ref in this.$refs) {
        console.log(ref);
        if (ref.startsWith('child-') &&ref.replace("child-",'')===item.name) {
          console.log(this.$refs[ref][0],'this.$refs[ref][0]')
          this.$refs[ref][0].type = "primary";
        } else {
          this.$refs[ref][0].type = "default";
        }
      }
      if (item.id === 0) {
        this.childClassificationsList = [];
      }
      this.$emit("input", item.id);
    },
    // setFixed(val){
    //     this.isFixed=val
    // }
    getChildren(item) {
      // let index=this.$refs.indexOf(item.name)
      // console.log(index)
      console.log(this.$refs);
      for (let ref in this.$refs) {
        console.log(this.$refs[ref][0],'this.$refs[ref][0]');
                console.log(ref,'ref===============');

        console.log(ref.startsWith('father'),ref.replace("father-",'')===item.name)
        if (ref.startsWith('father-') &&item.name.replace("father-",'') === ref) {
          cons.l
          this.$refs[ref][0].type = "primary";
        } else {
          this.$refs[ref][0].type = "default";
        }
      }

      // this.$nextTick(() => {
      //   this.$refs.python[0];
      // });
      // this.$refs[item.name].style.height ="1000px"
      // console.log(();
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

<style >
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu-item {
  font-size: 16px;
}
.el-button {
  background-color: #409eff;
  color: #fff;
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
  margin-bottom: 15px;
}
.child-tag > span {
  margin-right: 15px;
  cursor: pointer;
}
</style>
