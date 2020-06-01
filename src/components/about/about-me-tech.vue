<template>
  <div class="about-me-experience">
    <div class="about-me-experience-content">
      <div class="about-me-experience-year">
        <div class="about-me-experience-year-content">
          <div class="about-me-experience-year-content-year">
            <p>{{wordYear}}</p>
            <span>Years Working Experience</span>
          </div>
        </div>
      </div>
      <div class="about-me-experience-progress">
        <div v-for="(item,index) in techData" :key="index">
          <div class="progress-title">
            <div>{{item.language}}</div>
            <div>{{item.width}}</div>
          </div>
          <div>
            <progressBar :width="item.width"></progressBar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import progressBar from "./progress-bar";
export default {
  name: "aboutMeTech",
  components: {
    progressBar
  },
  data() {
    return {
      wordYear: "",
      techData: [
        {
          language: "Django",
          width: "80%"
        },
        {
          language: "Django",
          width: "50%"
        },
        {
          language: "Django",
          width: "50%"
        },
        {
          language: "Django",
          width: "50%"
        },
        {
          language: "Django",
          width: "50%"
        },
        {
          language: "Django",
          width: "50%"
        }
      ]
    };
  },

  computed: {},

  //   mounted: {},
  created() {
    var date1 = new Date().toLocaleDateString();
    var date2 = "2019-07-08";
    // 拆分年月日
    date1 = date1.split("/");
    // 得到月数
    date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
    // 拆分年月日
    date2 = date2.split("-");
    // 得到月数
    date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
    this.wordYear = parseInt(Math.abs(date1 - date2) / 12);
    if (this.wordYear < 1) {
      this.wordYear = 1;
    }
    // alert(m);
    // this.wordYear = Number(new Date().getFullYear()) - 2019;
  },

  methods: {}
};
</script>
<style  scoped>
/* .about-me-experience {
} */
.about-me-experience-content {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 5%;
}
.about-me-experience-year {
  flex: 1;
}
.about-me-experience-year-content {
  padding-top: 80px;
}
.about-me-experience-year-content-year {
  margin: 0 auto;
  width: 30%;
  padding: 10px;
  text-align: center;
}
.about-me-experience-year-content-year {
  border: 1px solid #fff;
}
.about-me-experience-year-content-year p {
  font-family: montserrat, sans-serif;
  font-size: 23.142rem;
  line-height: 1;
  font-weight: 400;
  color: #fff;
}
.about-me-experience-year-content-year span {
  color: #f5f5f1;
  display: block;
}
.about-me-experience-progress {
  flex: 1;
}
.progress-title {
  display: flex;
  direction: row;
  justify-content: space-between;
  padding-bottom: 20px;
}
.progress {
  height: 2.9rem;
  margin-bottom: 2rem;
  border-radius: 0;
  /* background-color: #ffeb00; */
}
.progress-bar {
  width: 80%;
  background-color: #ffeb00;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #007bff;
  transition: width 0.6s ease;
}
</style>