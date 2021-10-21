<template>
  <div v-if="jueJinVisible" class="juejin">
    <a-button type="primary" @click="DiaVisible = true" :disabled="anayDisable"
      >点赞分析</a-button
    >
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="今日更文情况"
        ><jielong :jielongData="state.jielongData"></jielong
      ></a-tab-pane>
      <a-tab-pane key="2" tab="尚未点赞情况" force-render
        ><noStars :nostarsData="state.nostarsData"></noStars
      ></a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
  <div>
    <a-modal
      title="Title"
      v-model:visible="DiaVisible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <a-form
        name="custom-validation"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
      >
        <a-form-item has-feedback label="密码" name="pass">
          <a-input
            v-model:value="formState.pass"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item has-feedback label="今日接龙" name="urlString">
          <a-textarea
            v-model:value="formState.urlString"
            type="text"
            autocomplete="off"
            :rows="10"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getSatrsByUid } from "@/api/juejin/juejin";
import { reactive, onMounted, ref, getCurrentInstance, onUnmounted } from "vue";
import { message } from "ant-design-vue";
import jielong from "./jielong";
import noStars from "./noStars";
import socket from "socket.io-client";

export default {
  components: {
    jielong,
    noStars,
  },
  setup() {
    let state = reactive({
      starsList: [],
      jielongData: [],
      nostarsData: [],
    });
    const DiaVisible = ref(false);

    const jueJinVisible = ref(true);
    const anayDisable = ref(false);
    const confirmLoading = ref(false);
    const formState = reactive({
      pass: "picker",
      urlString: `7. 海鸥爱上鱼+海鸥与鱼 
https://juejin.cn/post/7020603642612809742`,
    });
    let validatePass = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入密码");
      }
    };
    let validateurlString = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入接龙文本");
      }
    };
    const rules = {
      pass: [{ required: true, validator: validatePass, trigger: "change" }],
      urlString: [
        { required: true, validator: validateurlString, trigger: "change" },
      ],
    };
    onMounted(() => {});
    // onUnmounted(() => {
    //   io.close();
    // });
    const handleOk = () => {
      const io = socket("ws://127.0.0.1:3000");
      io.on("connect", () => {
        console.log("链接");
      });
      confirmLoading.value = true;
      anayDisable.value = true;

      console.log(formState.pass, "pass");
      if (formState.pass === "picker") {
        state.jielongData = [];
        state.nostarsData = [];

        confirmLoading.value = false;
        jueJinVisible.value = true;
        DiaVisible.value = false;
        const hide = message.loading(
          "由于访问的是掘金接口，时间较久，请骚等！！！",
          0
        );

        io.on("endSend", () => {
          anayDisable.value = false;
          console.log("分析结束");
          io.close()
          hide();

        });
        io.on("sendStarData", (data) => {
          console.log("message: ", data);

          state.nostarsData.push(data);
        });
        getSatrsByUid(formState.urlString).then((res) => {
          console.log(res);
          //   state.nostarsData = res.datas;
          state.jielongData = res.jielongData;
        });
      } else {
        message.error("密码错误");
        confirmLoading.value = false;
      }
    };
    return {
      DiaVisible,
      jueJinVisible,
      handleOk,
      confirmLoading,
      formState,
      rules,
      labelCol: { style: { width: "80px" } },
      state,
      activeKey: ref("1"),
      anayDisable,
    };
  },
};
</script>

<style lang="scss" scoped>
.juejin{
  width:1060px;
}

</style>
