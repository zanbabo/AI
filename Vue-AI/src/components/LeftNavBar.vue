<template>
  <div class="leftNavbar">
  <!--            头像区-->
  <div class="profileArea">
    <el-tooltip class="item" effect="dark" content="个人中心" placement="bottom">

      <img src="@/assets/images/头像.png" alt="" @click="personalCenterApper(disvalue)">

    </el-tooltip>
  </div>
  <div class="barArea">
    <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeInUp"
        leave-active-class="animate__zoomOut"
        appear
    >
      <div style="width: 100%;position: absolute ;">
        <Router-link :to="{name:'home'}" active-class="active" >直接对话</Router-link>
        <Router-link :to="{name:'new'}" active-class="active" @click="createConversation">新会话</Router-link>
        <Router-link :to="{name:'old'}" active-class="active" >历史会话</Router-link>


      </div>

    </transition>
  </div>
  </div>



</template>

<script lang="ts" setup>
import {RouterView, RouterLink} from 'vue-router'
import 'animate.css';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import emitter from '@/utils/emitter.ts'
const disvalue = ref(true);
defineProps(['personalCenterApper'])

const token = 'pat_61vQguWkC0iXUADJUvHrv7lUa3MVCngW7aKMVBw2Gaa54Aicx1Aakb9SdVSH3aYg'; // 替换为你的实际访问令牌

const createConversation = async () => {
  try {
    const response = await fetch('https://api.coze.cn/v1/conversation/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // 若不需要初始消息，可将 messages 置为空数组
        messages: []
      })
    });

    const result = await response.json();
    if (result.code === 0) {
      const conversationId = result.data.id;
      // 可以在这里将 conversationId 传递给 Home.vue 组件，或者进行其他操作
      console.log('会话创建成功，Conversation ID:', conversationId);
      //
      emitter.emit('send-id', conversationId);
    } else {
      console.error('会话创建失败:', result.msg);
    }
  } catch (error) {
    console.error('请求出错:', error);
  }
};




</script>

<style scoped>


a{
  position: relative;
  text-decoration: none;
  display: block;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #3C3F41;
}
a::before{
  display: block;
  content: "";
  width: 3px;
  height: 50px;
  position: absolute;
  border-radius: 10px;
}
a:hover::before{
  background-color: #69717A;
}
a:hover{
  background-color: #d1d7d8;
}
.bodyOfManage{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.leftNavbar{
  transition: 0.5s linear;
  overflow: hidden;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  height: 800px;
  width: 170px;
  background-color: #F5F7F9;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profileArea img{
  border-radius: 10px;
  width: 100px;
  height:100px;
}
.profileArea{

  width: 100%;
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;

}

.profileArea:hover img{
  cursor: pointer;
}
.barArea{
  font-size: 16px;
  display: flex;
  justify-content: center;
  //align-items: center;
  width: 100%;
  flex: 7;
  font-weight: bold;
  position: relative;
}

.changeArea{
  flex: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.changeArea li{
  font-size: 18px;
}
.changeArea li:hover{
  color: #4682B4;
  cursor: pointer;
}


</style>