<template>
  <div id="outer">
    <div class="inner">
      <h1>欢迎来到XX图书馆管理系统</h1>
      <div class="login_table">
        <label for="zh">请输入用户名</label>
        <el-input type="text" placeholder="请输入用户名" id="zh" v-model="username"></el-input>
        <label for="mm">请输入密码</label>
        <el-input type="password" placeholder="请输入密码" id="mm" v-model="password"></el-input>
        <el-row>
          <el-button type="primary" @click="go('/mainpage')">登陆
            <!-- <router-link to="./mainpage">登陆</router-link> -->
          </el-button>
          <el-button type="success" @click="go('/register')">注册
            <!-- <router-link to="./register">注册</router-link> -->
          </el-button>
        </el-row>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    go(value) {
      if (value == "/mainpage") {
        console.log(this.username, this.password);
        this.$axios
          .post("/user/login", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            console.log(res.data.data.code);
            if (res.data.data.code == 500) {
              this.$router.push(value);
            } else {
              alert("完犊子");
            }
          });
      } else {
        this.$router.push(value);
      }
    }
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-input {
  width: 200px;
  height: 50px;
}

.login_table {
  width: 200px;
  height: 200px;
  margin: 50px auto;
  text-align: left;
}

.inner {
  color: black;
  margin: 200px auto;
  width: 500px;
  height: 200px;
  /* background: url(assets/logo.png); */
}
#outer {
  padding-top: 1px;
  width: 100%;
  height: 735px;
  /* background: url(../assets/记忆大师.jpg); */
}
</style>

