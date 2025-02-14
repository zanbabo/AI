<template>
  <div class="base">
    <div class="content">
      <!--登录表单-->
      <div class="loginArea">
        <!--标语-->
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <div v-show="isShow" class="title">
            登录
          </div>
        </transition>
        <!--密码框和用户框-->
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!-- 密码框和用户名框 -->
          <div v-show="isShow" class="pwdArea">
            <div style="flex: 1;justify-content: center;display: flex;align-items: center">
              <el-input class="username" v-model="loginUser.name" style="width: 165px" placeholder="用户名"></el-input>
            </div>
            <div style="flex: 1;justify-content: center;display: flex;align-items: center">
              <el-input placeholder="密码" v-model="loginUser.password" style="width: 165px" show-password></el-input>
            </div>
          </div>
        </transition>
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!-- 登录注册按钮 -->
          <div v-show="isShow" class="btnArea">
            <el-button type="success" round class="custom-button" @click="UserLogin">登录</el-button>
          </div>
        </transition>

      </div>
      <!--注册表单-->
      <div class="registArea">
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!--  注册表头-->
          <div v-show="!isShow" class="rigestTitle">
            注册
          </div>
        </transition>
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!--            注册表单-->
          <div v-show="!isShow" class="registForm">
            <div style="flex: 1;display: flex;justify-content: center;align-items: center">
              用&nbsp;&nbsp;&nbsp;户&nbsp;&nbsp;&nbsp;名:
              <el-input
                  placeholder="请输入用户名"
                  v-model="regUser.regUsername"
                  style="width: 165px;margin-left: 10px"
                  clearable
              >

              </el-input>

            </div>
            <div style="flex: 1;display: flex;justify-content: center;align-items: center">
              密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:
              <el-input placeholder="请输入密码" style="width: 165px;margin-left: 10px" v-model="regUser.regPwd"
                        show-password>
              </el-input>
            </div>
            <div style="flex: 1;display: flex;justify-content: center;align-items: center;">
              确&nbsp;认&nbsp;密&nbsp;码:
              <el-input placeholder="请再次输入密码" style="width: 165px;margin-left: 10px" v-model="regUser.regRePwd"
                        show-password>
              </el-input>
            </div>


          </div>
        </transition>


        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!--            注册按钮-->
          <div v-show="!isShow" class="registBtn">
            <el-button type="success" round class="custom-button" @click="userRegister">
              注册
            </el-button>
          </div>
        </transition>
      </div>

      <!-- 信息展示界面 -->
      <div id="aaa" class="showInfo"
           :style="{
             borderTopRightRadius:styleObj.bordertoprightradius,
             borderBottomRightRadius:styleObj.borderbottomrightradius,
             borderTopLeftRadius:styleObj.bordertopleftradius,
             borderBottomLeftRadius:styleObj.borderbottomleftradius,
             right:styleObj.rightDis
            }"
           ref="showInfoView">

        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!-- 没有用户输入用户名或者找不到用户名的时候 -->
          <div v-show="isShow" class="form">
            <!-- 欢迎语 -->
            <div class="welcome-slogan">
              欢迎登入AI
            </div>
            <!-- 欢迎图片 -->
            <div style="flex: 2">
              <el-button type="success" class="change-button" round @click="changeToRegiest">
                还没有账户？点击注册
              </el-button>
            </div>
          </div>
        </transition>

        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!-- 用户注册的时候展示信息 -->
          <div v-show="!isShow" class="form">
            <!-- 欢迎语 -->
            <div class="welcome-slogan">
              欢迎注册
            </div>
            <!-- 欢迎图片 -->
            <div style="flex: 2">
              <el-button type="success" class="change-button" round @click="changeToLogin">
                已有账户？点击登录
              </el-button>
            </div>
          </div>
        </transition>
      </div>

    </div>
  </div>

</template>

<script setup lang="ts">

import 'animate.css';
import {ref, reactive} from 'vue';

import {useRouter} from 'vue-router'


const isShow = ref(true)
const router = useRouter()
//登录
const loginUser = reactive({
  name: '',
  password: ''
});
//注册
const regUser = reactive({
  regUsername: '',
  regRePwd: '',
  regPwd: '',
  selectValue: ''
});
const styleObj = reactive({
  bordertoprightradius: '15px',
  borderbottomrightradius: '15px',
  bordertopleftradius: '0px',
  borderbottomleftradius: '0px',
  rightDis: '0px'
});
const changeToRegiest = () => {
  styleObj.bordertoprightradius = '0px';
  styleObj.borderbottomrightradius = '0px';
  styleObj.bordertopleftradius = '15px';
  styleObj.borderbottomleftradius = '15px';
  styleObj.rightDis = '50%';
  isShow.value = !isShow.value; // 使用.value来访问和修改ref的值
};

const changeToLogin = () => {
  styleObj.bordertoprightradius = '15px';
  styleObj.borderbottomrightradius = '15px';
  styleObj.bordertopleftradius = '0px';
  styleObj.borderbottomleftradius = '0px';
  styleObj.rightDis = '0px';
  isShow.value = !isShow.value;
};


// 模拟用户数据存储
const users = reactive<{ [key: string]: string }>({});


// 模拟登录方法
const UserLogin = () => {
  if (!loginUser.name || !loginUser.password) {
    alert('请输入用户名和密码');
    return;
  }
  if (users[loginUser.name] === loginUser.password) {
    localStorage.setItem('token', 'simulated_token');
    alert('登录成功');
    router.replace({path: '/manage'});
  } else {
    alert('用户名或密码错误');
  }
};

// 模拟注册方法
const userRegister = () => {
  if (!regUser.regUsername || !regUser.regPwd || !regUser.regRePwd) {
    alert('请填写完整的注册信息');
    return;
  }
  if (regUser.regPwd !== regUser.regRePwd) {
    alert('两次输入的密码不一致');
    return;
  }
  if (users[regUser.regUsername]) {
    alert('该用户名已被注册');
    return;
  }
  users[regUser.regUsername] = regUser.regPwd;
  alert('注册成功，请登录');
  changeToLogin();
};


</script>


<style scoped>
.base {
  height: 100%;
  width: 1180px;

  display: flex;
  justify-content: center;
  align-items: center;


}

.content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.loginArea {
  background-color: rgba(255, 255, 255, 0.8);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  height: 400px;
  width: 350px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.registArea {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  height: 400px;
  width: 350px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.showInfo {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  position: absolute;
  height: 400px;
  width: 350px;
  z-index: 2;
  top: 0;
  right: 0;
  background-image: url("../assets/images/welcome2.jpg");

  background-size: cover;
}

.showInfo:hover {
  background-size: 100%;
  background-position: -50px -50px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%
}

.title {
  width: 70%;
  flex: 1;
  border-bottom: 1px solid #C0D0D8;
  display: flex;
  align-items: center;
  color: #4682B4;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: center;
}

.custom-button {
  background-color: #4682B4;
  letter-spacing: 5px;
  border: none;
  text-align: center;
}

.change-button {
  background-color: #4682B4;
  border: 1px solid #ffffff;
}

.welcome-slogan {
  flex: 2;
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #4682B4;
  font-weight: bold
}

#aaa {
  transition: 0.3s linear;
}

.pwdArea {
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;



}

.pwdArea input {
  outline: none;
  height: 30%;
  border-radius: 13px;
  padding-left: 10px;
  font-size: 12px;
  border: 1px solid gray;
}

.pwdArea input:focus {
  border: 2px solid #4682B4;
}

.btnArea {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.rigestTitle {
  width: 70%;
  flex: 1;
  color: #4682B4;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #4682B4;
}

.registForm {
  flex: 2;
  display: flex;
  flex-direction: column;
  color: #4682B4;
  font-size: 16px;
}

.registForm input {
  outline: none;
  height: 30%;
  border-radius: 13px;
  padding-left: 10px;
  font-size: 12px;
  border: 1px solid gray;
}

.registForm input:focus {
  border: 2px solid #4682B4;
}

.registBtn {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>