<template>
  <header class="site-header">
    <div class="container">
      <div class="site-logo">
        <p>樱舞话前端</p>
      </div>
      <nav class="site-nav">
        <ul class="site-nav__list">
          <li
            class="site-nav__item"
            v-for="item in menuList"
            :key="item.address"
            :class="{ active: isActive(item.address) }"
          >
            <router-link :to="item.address">{{ item.title }}</router-link>
          </li>
          <!-- <li class="site-nav__item"><a>标签</a></li>
          <li class="site-nav__item"><a>开源</a></li>
          <li class="site-nav__item"><a>开源</a></li>
          <li class="site-nav__item"><a>关于我</a></li>
          <li class="site-nav__item">
            <router-link to="/Tools">工具</router-link>
          </li> -->
        </ul>
      </nav>
      <div class="site-login">
        <div class="site-login__content">
          <a>登录</a>
          <a>注册</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { reactive, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const { ctx } = getCurrentInstance();

    // const router = useRouter()
    const route = useRoute();

    const menuList = reactive([
      { title: "首页", address: "/" },
      { title: "工具", address: "/Tools" },
    ]);
    function isActive(address) {
      return route.path === address;
    }
    return { menuList, isActive };
  },
};
</script>

<style lang="scss" scoped>
.site-header {
  .container {
    //   height: 55px;
    // line-height: 55px;
    font-size: 1.2em;
    height: 55px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .site-logo {
      vertical-align: middle;
      p {
        // font-size:1.2em;
        background: -webkit-linear-gradient(45deg, #00ff95,#09009f 80%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .site-nav {
      .site-nav__list {
        list-style: none;

        .site-nav__item {
          display: inline;
          margin: 0 4px;

          a {
            padding: 0 10px;
            line-height: 55px;
            color: #86909c;
          }
          .router-link-active {
            color: #1e80ff;
          }
        }
      }
    }
    .site-login {
      .site-login__content {
        a {
          line-height: 55px;
          color: #86909c;
        }
      }
    }
  }
  @media (max-width: 980px) {
    .site-nav__list {
      .site-nav__item {
        display: block !important;
      }
    }
  }
}
</style>
