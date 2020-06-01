<!--  -->
<template>
  <div class="login">
    <div class="login-form">
      <h1>系统登录</h1>
      <el-form :model="userForm" status-icon :rules="rules" ref="userForm" class="demo-userForm">
        <el-form-item prop="userName">
          <el-input type="text" prefix-icon="el-icon-user-solid" v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="userForm.pass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('userForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        pass: "",
        userName: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        userName: [{ validator: validateUserName, trigger: "blur" }]
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.axios.get("/getAllProject").then(response => {
          //   console.log(response.data);
          // });
          this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style  scoped>
.login {
  min-height: 100%;
  background-color: #2d3a4b;
}
.login-form {
  width: 25%;
  margin: auto;
  padding-top: 15%;
  text-align: center;
  color: #fff;
}
.login-form h1 {
  padding-bottom: 30px;
}
.el-input input {
  background-color: #2d3a4b;
}
.el-button {
  width: 100%;
}
</style>