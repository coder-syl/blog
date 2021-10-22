<template>
  <a-table :dataSource="jielongData" :columns="columns">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #customTitle>
      <span>
        <smile-outlined />
        账号
      </span>
    </template>
    <template #url="{ text }">
      <a :href="text" target="__blank">{{ text }}</a>
    </template>
  </a-table>
</template>
<script >
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted } from "vue";

const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle", customRender: "name" },
  },
  {
    title: "url",
    dataIndex: "url",
    key: "url",
    slots: { customRender: "url" },
  },
];

export default {
  props: {
    jielongData: {
      type: Object,
      default: [],
    },
  },
  setup(props) {
    //

    onMounted(() => {

     
    });
    return {
      columns,
    };
  },
  components: {
    SmileOutlined,
    DownOutlined,
  },
};
</script>

