<template>
  <div class="to-top">
    <button class="btn" @click="toTop">回顶部</button>
  </div>
</template>

<script>
export default {
  setup() {
    let timer;
    function toTop() {
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        var oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop - 50;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    }
    return { toTop };
  },
};
</script>

<style>
.to-top {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 1000;
}

.btn {
  margin: 1rem 0 0;
  padding: 0;
  width: 3.33rem;
  height: 3.33rem;
  line-height: 1;
  color: #909090;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 50%;
  box-shadow: 0 0 5px rgb(0 0 0 / 5%);
  cursor: pointer;
}
</style>