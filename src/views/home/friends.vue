<template>
  <div>
    <div card>
      <!-- <div class="friendLogo"></div>
      <div class="friendName"></div>
      <div class="friendLogo"></div>-->
      <el-steps :active="2" align-center>
        <el-step title="步骤1" description="这是一段很长很长很长的描述性文字" @click="show"></el-step>
        <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    show(){
      alert(1)
    },
  }
};
</script>

<style>
</style>