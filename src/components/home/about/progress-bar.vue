<template>
  <!-- <div>adsf</div> -->
  <div class="progress">
    <div class="progress-bar" :style="{width:width,}"></div>
  </div>
</template>

<script>
export default {
  name: "progressBar",
  data() {
    return {};
  },
  props: {
    width: {
      type: String,
      required: true
    }
  }
  // components: {},

  // computed: {},

  // //   mounted: {},

  // methods: {}
};
</script>
<style  scoped>
.progress {
  padding: 4px;
  height: 16px;
  background: rgba(94, 92, 92, 0.25);
  border-radius: 6px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
}

.progress-bar {
  position: relative;
  height: 16px;
  border-radius: 4px;
  -webkit-transition: width 0.4s linear;
  -moz-transition: width 0.4s linear;
  -o-transition: width 0.4s linear;
  transition: width 0.4s linear;
  width: 0;
  background-color: #ffeb00;
  /* -webkit-transition-property: width;
  -moz-transition-property: width;
  -o-transition-property: width;
  transition-property: width; */
}
.progress-bar:before,
.progress-bar:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.progress-bar:before {
  bottom: 0;
  border-radius: 4px 4px 0 0;
}
.progress-bar:after {
  z-index: 2;
  bottom: 45%;
  border-radius: 4px;
}
</style>