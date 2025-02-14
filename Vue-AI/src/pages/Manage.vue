<template>

  <div class="mainBody">
    <!--        左侧边栏-->

    <div class="leftBar">
      <LeftNavBar :personalCenterApper="toPersonView"/>
    </div>

    <!--        数据可视化部分-->
    <div class="dataView">

        <Router-view style="transition: all 0.1s"/>


      <!--        右侧个人中心组件-->
      <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__bounceInRight"
          leave-active-class="animate__fadeOutRight"
          appear
      >
        <div v-show="personalViewFlag" class="personalCenter">
          <PersonalView :dispersonalCenter="disPersonView"/>
        </div>
      </transition>

    </div>
  </div>

</template>
<script setup lang="ts">
import 'animate.css';
import {RouterView, RouterLink} from 'vue-router'
import {ref, onMounted} from 'vue';
import LeftNavBar from "@/components/LeftNavBar.vue";
import PersonalView from "@/components/PersonalView.vue";

//import { EventBus } from '@/event-bus'; // 假设你有一个全局的事件总线，这里需要根据你的项目结构来调整

// 定义响应式数据
const personalViewFlag = ref(false);

function toPersonView(value: boolean) {
  personalViewFlag.value = value;
  console.log(personalViewFlag.value);
}
function disPersonView(value: boolean) {
  personalViewFlag.value = value;
  console.log(personalViewFlag.value);
}


// 监听事件总线上的事件


// 由于组件已经在模板中导入并使用，这里不需要再导出它们
// 但你需要确保它们在你的组件中是正确注册的（在模板中使用即可）

</script>


<style scoped>
.pleaseLogin {
  background-color: #2c3e50;
}

.mainBody {

  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 15px;
  position: relative;
}

.dataView {
  width: 1110px;
  height: 800px;
  background-color: #ffffff;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;
  position: relative;
}

.personalCenter {
  position: absolute;
  right: 0px;
  top: 0px;
}

.router_view-leave-active {
  opacity: 0;
}

</style>