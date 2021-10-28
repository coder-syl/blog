<template>
  <a-card title="我到过的地方">
    <a-card-grid class="card-size">
      <a
        href="https://www.zhihu.com/people/shang-yan-liang"
        target="_blank"
        rel="noopener noreferrer"
      >
        <icon-font type="icon-shejiaotubiao-46" />
      </a>
    </a-card-grid>
    <a-card-grid class="card-size">
      <a
        href="https://blog.csdn.net/shangyanaf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <icon-font type="icon-csdn" />
      </a>
    </a-card-grid>
    <a-card-grid class="card-size">
      <a
        href="https://juejin.cn/user/2788775426270046"
        target="_blank"
        rel="noopener noreferrer"
      >
        <juejinIcon></juejinIcon>
      </a>
    </a-card-grid>
    <a-card-grid class="card-size">
      <a
        href="https://github.com/coder-syl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <icon-font type="icon-github" />
      </a>
    </a-card-grid>
    <a-card-grid class="card-size">
      <a
        href="https://space.bilibili.com/337327961"
        target="_blank"
        rel="noopener noreferrer"
      >
        <blibli></blibli>
      </a>
    </a-card-grid>
    <a-card-grid class="card-size"> </a-card-grid>
    <a-card-grid class="card-size"> </a-card-grid>
    <a-card-grid class="card-size"> </a-card-grid>
  </a-card>
</template>

<script>
import {
  UserOutlZhihuOutlinedined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  createFromIconfontCN,
  ZhihuOutlined,
} from "@ant-design/icons-vue";
import blibli from "./blibli";
import juejinIcon from "./juejinIcon";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2884541_umyxfsn2nuj.js",
});
export default {
  components: {
    ZhihuOutlined,
    IconFont,
    blibli,
    juejinIcon,
  },
};
</script>


<style>
.ant-card-grid {
  padding: 10px;
}
.card-size {
  /* width: 25%; */
  text-align: center;
  font-size: 30px;
}
</style>