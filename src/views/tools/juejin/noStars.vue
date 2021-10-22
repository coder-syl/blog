npm <template>
  <a-table :data-source="nostarsData" :columns="columns">
    <template #name="{ text, record }">
      <a :href="record.auth.page1" target="_blank">{{ text }}</a>
      <br />
      <a :href="record.auth.page2" target="_blank">{{ record.auth.name2 }}</a>
    </template>
    <template #customTitle>
      <span>
        <smile-outlined />
        账号
      </span>
    </template>
    <template #url="{ record }">
      <span v-for="item of record.article" :key="item.authName">
        <a :href="item.url" target="__blank">{{ item.authName }}</a>
        <a-divider type="vertical" />
      </span>
    </template>
    <template #articleTitle>
      <span>
        <FrownOutlined />
        未点赞文章
      </span>
    </template>
  </a-table>
</template>

<script >
import {
  SmileOutlined,
  DownOutlined,
  FrownOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, onMounted } from "vue";

const columns = [
  {
    dataIndex: "auth.name1",
    key: "name",
    slots: { title: "customTitle", customRender: "name" },
  },
  {
    dataIndex: "article",
    key: "url",
    slots: { title: "articleTitle", customRender: "url" },
  },
];
export default {
  props: {
    nostarsData: {
      type: Object,
      default: [],
    },
  },
  setup(props) {
    //

    return { columns };
  },
  components: {
    SmileOutlined,
    DownOutlined,
    FrownOutlined,
  },
};
</script>

