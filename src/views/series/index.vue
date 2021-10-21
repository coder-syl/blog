<template>
  <div class="series">
    <div class="source-code">
      <div class="series-title">源码系列</div>
      <div class="series-info">
        <img
          src="../../assets/image/series/学透CSS.png"
          alt=""
          class="series-info_img"
        />
        <div class="series-info_base">
          <div class="series-info_title">Koa源码</div>
          <div class="series-info_desc">i解析koa原阿门</div>
          <div class="series-info_create">2019-02-10</div>
        </div>
      </div>
    </div>
    <div class="practice">
      <div class="series-title">实战系列</div>
      <div class="series-info">
        <img
          src="../../assets/image/series/学透CSS.png"
          alt=""
          class="series-info_img"
        />
        <div class="series-info_base">
          <div class="series-info_title">Koa源码</div>
          <div class="series-info_desc">i解析koa原阿门</div>
          <div class="series-info_create">2019-02-10</div>
        </div>
      </div>
    </div>
    <div class="special-column">
      <div class="series-title">专栏系列</div>
      <div class="series-info">
        <img
          src="../../assets/image/series/学透CSS.png"
          alt=""
          class="series-info_img"
        />
        <div class="series-info_base">
          <div class="series-info_title">Koa源码</div>
          <div class="series-info_desc">i解析koa原阿门</div>
          <div class="series-info_create">2019-02-10</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.series {
  //   width: 900px;
  margin-top: 6rem;
  display: flex;
  flex-direction: row;
  div {
    flex: 1;
    margin: 2px;
    background: #fff;
  }
  .series-title {
    font-size: 1.4rem;
    padding: 10px 20px;
    border-bottom: $borderBottom;
  }
  .series-info {
    display: flex;
    flex-direction: row;
    .series-info_img {
      width: 150px;
      height: 80px;
      margin: 5px 10px;
    }
    .series-info_base {
      margin: 5px 10px;
      border-bottom: $borderBottom;
      div {
        margin: 5px 0;
      }
      .series-info_title {
        font-size: 16px;
        line-height: 24px;
        color: #1d2129;
      }
    }
  }
}
</style>