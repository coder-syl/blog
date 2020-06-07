<!--  -->
<template>
  <div>123</div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  mounted() {
    // var p = new Promise(function(resolve, reject) {
    //   //做一些异步操作
    //   setTimeout(function() {
    //     console.log("执行完成");
    //     // 这里的
    //     resolve("随便什么数据");
    //   }, 2000);
    // });
    // p.then(data => {
    //   console.log(data);
    // });
    // function run(callback) {
    //   setInterval(callback, 1000);
    // }
    // // 采用 Promise 进行包装，就能够避免这一问题
    // let promise = new Promise(resolve => {
    //   run(resolve);
    // });
    // // 只会触发一次
    // promise.then(() => {
    //   console.log("执行完成！");
    // });
  },
  computed: {},

  methods: {
    getData() {
      return Promise((resolve, reject) => {
        axios.get("");
      });
    }
  }
};
</script>
<style  scoped>
</style>