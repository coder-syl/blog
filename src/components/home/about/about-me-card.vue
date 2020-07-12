<!--  -->
<template>
  <div class="about-me-card">
    <div v-for="(item, index) in cardDatas" :key="index">
      <card v-bind="item"></card>
    </div>
  </div>
</template>

<script>
import card from "./card";
import {
  listProjects,
  updateProjectById,
  addProject,
  deleteProjectById
} from "@/api/project/project";
export default {
  name: "aboutMeCard",
  components: {
    card
  },
  created() {
    listProjects().then(response => {
      this.cardDatas = response.data.rows;
    });
  },
  data() {
    return {
      cardDatas: []
    };
  },

  computed: {},

  methods: {}
};
</script>
<style scoped>
.about-me-card {
  width: 70%;
  margin: auto;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
