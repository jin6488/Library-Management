<template>
  <div id="outer">
    <div id="inner">
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="ursename">
          <el-input type="text" v-model="ruleForm2.ursename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" maxlength="16"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" maxlength="16"></el-input>
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="ruleForm2.phone" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
      <router-view/>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    var Pusername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };

    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          // if (value.length > 13) {
          //   callback(new Error("请输入正确的手机号码"));
          // } else {
          callback();
          // }
        }
      }, 1000);
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm2: {
        ursename: "",
        pass: "",
        checkPass: "",
        phone: ""
      },

      rules2: {
        ursename: [{ validator: Pusername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkphone, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      // console.log(this.ruleForm2.ursename);
      this.$axios
        .post("/user/useradd", {
          username: this.ruleForm2.ursename,
          password: this.ruleForm2.checkPass,
          phone: this.ruleForm2.phone
        })
        .then(res => {
          // console.log(res.data.errmsg.code); 500
          if (res.data.errmsg.code == 500) {
            this.$refs[formName].validate(valid => {
              if (valid) {
                alert("注册成功!");
                this.$router.push("/");
              } else {
                console.log("error submit!!");
                return false;
              }
            });
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
#inner {
  background: white;
  border: 2px solid yellow;
  border-radius: 30px;
  padding: 60px 50px 50px 10px;
  margin: 140px auto;
  width: 450px;
  height: 300px;
  font-weight: bolder;
}
#outer {
  padding-top: 1px;
  height: 730px;
  background: url(../assets/bg3.jpg);
}
.el-form-item__label {
  color: #ffffff;
}
</style>
