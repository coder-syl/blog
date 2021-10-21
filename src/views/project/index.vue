<template>
  <div class="project">
    <div class="project-intro">
      <span>人这一生总要做些东西，留下些记忆！！！</span>
    </div>
    <div class="project-list">
      <div
        class="project-container"
        v-for="item in state.projectList"
        :key="item.id"
      >
        <div class="project-title">
          <a :href="item.url">{{ item.name }}</a>
        </div>
        <div class="project-desc">{{ item.description }}</div>
        <div class="project-info">
          <span class="language-color"></span>
          <!-- <span class="language-title">{{ item.language }}</span> -->
          <img :src="item.icon_url" alt="" />
          <img
            :src="`https://img.shields.io/github/stars/coder-syl/${item.name}?style=social`"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  listProjects,
  updateProjectById,
  addProject,
  deleteProjectById,
  uploadImg,
} from "@/api/project/project";

import { onMounted, reactive } from "vue";
export default {
  setup() {
    let state = reactive({
      projectList: [],
    });
    onMounted(() => {
      listProjects().then((response) => {
        state.projectList = response.data.rows;
      });
    });
    return { state };
  },
};
</script>

<style lang='scss' scoped>
.project {
  margin-top: 6rem;
  .project-intro {
    margin-top: 10px;
    padding: 10px;
    font-size: 1.4rem;
    //  width: 900px;
    margin: 0 auto;
    background: #fff;
  }
  .project-desc {
    margin: 10px 0;
    // font-size: 1.5em;
  }

  .project-list {
    .project-container {
      margin: 5px;
      display: inline-block;
      width: 45%;
      border: 1px solid #d0d7de;
      background: #fff;
      border-radius: 5px;
      color: #57606a;
      font-size: 1.2rem;
      padding: 16px;
      .project-title {
        a {
          color: #0969da;
        }
      }
      .project-desc {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        height:  2.4rem; // that's one line, 2em for 2 lines, etc...
        line-height:  1.2rem; // the height of one text line
      }
      .project-info {
        img {
          margin-right: 20px;
        }
      }
    }
  }
}

// .project {
//   display: flex;
//   flex-direction: row;
//   .project-left-container {
//     flex: 1;
//     background: red;
//     display: flex;
//     flex-direction: column;
//     padding: 20px;
//     .project-left-top {
//       height: 200px;
//       border-radius: 5px;
//       background: -webkit-linear-gradient(0deg, #7cb2ae, #d1dfdf);
//     }
//     .project-left-footer {
//       margin: 10px;
//       display: flex;
//       flex-direction: row;
//       .project-left-footer_left {
//         flex: 1;
//         height: 300px;
//         padding: 10px;
//         background: linear-gradient(#42acc9, #7fc5d9, #b5d9e6, #d1dfdf);
//         border-radius: 5px;
//       }

//       .project-left-footer_right {
//         flex: 1;
//         padding: 10px;
//         height: 300px;
//       }
//     }
//   }
//   .project-right-container {
//     flex: 1;
//     background: black;
//   }
// }
</style>