<template>
  <div class="container" ref="fullPage">
    <div
      class="home"
      ref="fullPageContainer"
      @mousewheel="mouseWheelHandle"
      @DOMMouseScroll="mouseWheelHandle"
    >
      <div class="section section1">
        <div class="secction1-content">
          <h1>coder-syl(尚衍亮)</h1>
          <p>Web前端开发工程师，毕业于江苏师范大学，2019.07.08~至今 在FUJISTU工作。</p>
        </div>
      </div>
      <div class="section section2">
        <div class="secction2-content">
          <h2>我的开源</h2>
          <aboutAboutMeCard></aboutAboutMeCard>
        </div>
      </div>
      <div class="section section3">
        <div class="secction3-content">
          <h2>使用技术</h2>
          <aboutAboutMeTech></aboutAboutMeTech>
        </div>
      </div>
      <!-- <div class="section section4"> -->
        <!-- <progressBar></progressBar> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
// import aboutMeCard from "@/components/home/about/about-me-card";
// import aboutMeTech from "@/components/home/about/about-me-tech";
// import progressBar from "@/components/home/about/progress-bar";
export default {
  // components: {
  //   aboutMeCard,
  //   aboutMeTech,
  //   progressBar
  // },
  name: "Home",
  data() {
    return {
      fullpage: {
        current: 1,
        isScrolling: false,
        // 返回鼠标滚轮的垂直滚动量
        deltaY: 0
      }
    };
  },
  mounted() {
    this.$performanceMonitor();
  },
  methods: {
    next() {
      let len = document.getElementsByClassName('section').length;
      if (this.fullpage.current + 1 <= len) {
        this.fullpage.current += 1;
        this.move(this.fullpage.current);
      }
    },
    pre() {
      if (this.fullpage.current - 1 > 0) {
        this.fullpage.current -= 1;
        this.move(this.fullpage.current);
      }
    },
    move(index) {
      // 为了防止滚动多次滚动，需要通过一个变量来控制是否滚动
      this.fullpage.isScrolling = true;
      this.directToMove(index);
      //这里的动画是1s执行完，使用setTimeout延迟1s后解锁
      setTimeout(() => {
        this.fullpage.isScrolling = false;
      }, 1010);
    },
    directToMove(index) {
      let height = this.$refs["fullPage"].clientHeight;
      let width = this.$refs["fullPage"].clientWidth;
      let $scroll = this.$refs["fullPageContainer"];
      //位移多少
      let displacement;
      displacement = -(index - 1) * height + "px";
      $scroll.style.transform = `translateY(${displacement})`;

      this.fullpage.current = index;
    },
    mouseWheelHandle(event) {
      // 添加冒泡阻止
      let evt = event || window.event;
      if (evt.stopPropagation) {
        evt.stopPropagation();
      } else {
        evt.returnValue = false;
      }

      if (this.fullpage.isScrolling) {
        // 加锁部分
        return false;
      }

      let e = event.originalEvent || event;
      this.fullpage.deltaY = e.deltaY || e.detail; // Firefox使用detail
      if (this.fullpage.deltaY > 0) {
        this.next();
      } else if (this.fullpage.deltaY < 0) {
        this.pre();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 100%;
  overflow: hidden;
  /* background-color: rgb(189, 211, 186); */
}
.home {
  width: 100%;
  height: 100%;
  transition: all linear 1s;
}
.section {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
}
/* section1 start */
.section1 {
  /* background-color: rgb(189, 211, 186); */
  background: url("../../assets/about/section1.jpg");
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.section1 .secction1-content {
  color: #fff;
  text-align: center;
  position: absolute;
  top: 40%;
  right: 0;
  left: 0;
}
.secction1-content h1 {
  font-size: 40px;
  padding-bottom: 30px;
}
.secction1-content p {
  font-size: 20px;
}
/* section1 end */

/* section2 start */
.section2 {
  /* background-color: rgb(44, 48, 43); */
  background: url("../../assets/about/section2.jpg");
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: all 1s;
  overflow: hidden;
}
.secction2-content {
  color: #fff;
  text-align: center;
}
.secction2-content h2 {
  font-size: 40px;
  padding-top: 20px;
}
/* section2 end */

.section3 {
  background: url("../../assets/about/section3.jpg");
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  /* background-color: rgb(116, 104, 109); */
}
.secction3-content {
  color: #fff;
  text-align: center;
}
.secction3-content h2 {
  font-size: 40px;
  padding-top: 20px;
}
.section4 {
  background-color: rgb(201, 202, 157);
}
</style>
