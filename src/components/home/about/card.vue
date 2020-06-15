<!--  -->
<template>
  <div class="card">
    <div class="card-content">
      <div class="card-content-img">
        <img :src="img_url" alt="图片" />
      </div>
      <div class="card-content-title">
        <h2>{{ name }}</h2>
      </div>
      <div class="card-content-detail">{{ description }}</div>
      <div class="card-content-github">
        <p class="check-detail">
          <a href="#">查看详情</a>
        </p>
        <p>
          <span>{{ language.split(",")[0] }}</span>
          <span class="span-bf">{{ language.split(",")[1] }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    img_url: {
      type: String,
      required: true
    },
    name: String,
    description: String,
    language: String
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  //   mounted: {},

  methods: {}
};
</script>
<style scoped>
.card {
  transition: all 0.3s;
}
.card-content {
  width: 280px;
  height: 390px;
  position: relative;
  background-color: #00316d;
  transition: all 0.3s;
  margin-top: 20px;
}
@media screen and (min-height: 800px) {
  .card-content {
    height: 390px;
  }
}
@media screen and (max-height: 800px) {
  .card-content {
    height: 300px !important;
  }
}

.card-content:hover {
  margin-top: 0;
  height: 430px;
  background-color: #2f4c90;
}
.card-content-img {
  /* height: 150px; */
  /* margin-top: 50px; */
  /* background-color: #1212c2; */
  padding-top: 50px;
  text-align: center;
}
.card-content-img img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
/* .card-content-title {
  background-color: #d1d1e2;
} */
.card-content-title h2 {
  font-size: 18px;
  color: #fff;
  text-align: center;
  margin: 10px 0;
  line-height: 40px;
}
.card-content-detail {
  /* background-color: #8484bb; */
  font-size: 14px;
  color: #999999;
  line-height: 24px;
  height: calc(100% - 330px);
  margin: 0 30px;
  overflow: hidden;
}
.card-content .card-content-github {
  background-color: #27272e;
  width: 280px;
  padding: 20px 0px;
  bottom: 0;
  position: absolute;
  color: #fff;
}
.card-content-github p {
  line-height: 30px;
  margin: 10px;
  font-size: 14px;
  color: #999999;
}
.card-content-github p span {
  font-size: 16px;
  color: #fff;
  float: left;
  width: calc(50% - 1px);
}

.span-bf::before {
  content: "|";
  /* float: left; */
  color: rgba(102, 102, 102, 0.6);
}
/* .card-content-detail: {
  height: 100%;
} */
</style>
