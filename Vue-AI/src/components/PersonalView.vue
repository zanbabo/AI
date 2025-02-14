<template>
  <div class="viewOfPersonalData">

    <!--      头像和消息通知区域-->

    <!--            头像区-->
    <div class="headAreaOfUser">
      <img src="@/assets/images/头像.png" alt="">

    </div>
    <!--            图标区-->
    <div class="IconArea">


      <el-icon color="gray" size="25" @click="dispersonalCenter(disvalue)">
        <Remove/>
      </el-icon>


    </div>
    <div class="edit">
      <ul>

        <li @click="editProfile">

          <el-icon>
            <Edit/>
          </el-icon>

          编辑个人资料
        </li>
        <li @click="changePassword">
          <el-icon>
            <Unlock/>
          </el-icon>
          修改密码
        </li>
        <li @click="bindAccount">
          <el-icon>
            <Link/>
          </el-icon>
          绑定账号
        </li>
        <li @click="changeAvatar">
          <el-icon>
            <User/>
          </el-icon>
          更换头像
        </li>
        <li @click="changeAvatar">
          <el-icon><RefreshLeft /></el-icon>
          <RouterLink :to="{name:'login'}" class="logout-link">退出登录</RouterLink>
        </li>
      </ul>
    </div>
  </div>


</template>

<script lang="ts" setup>
import {RouterView, RouterLink} from 'vue-router'
import 'animate.css';
import {Remove} from "@element-plus/icons-vue";
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {Link, Unlock, User, Edit,RefreshLeft} from '@element-plus/icons-vue'

const disvalue = ref(false);
defineProps(['dispersonalCenter'])


</script>

<style scoped>
.headAreaOfUser img {
  border-radius: 10px;
  width: 100px;
  height: 100px;

}

.edit {
  flex: 5;
}

.viewOfPersonalData {
  position: relative;
  width: 310px;
  height: 800px;
  background-color: #F5F7F9;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  right: 0px;
}

.informationArea {
  position: absolute;

  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.headAreaOfUser {
  position: absolute;
  top: 20px;
  left: 20px;
}

.IconArea {
  position: absolute;
  top: 27px;
  right: 20px;
  cursor: pointer;

}

.edit {
  width: 280px;
  position: absolute;
  top: 200px;
  left: 15px;


}

.edit ul {
  list-style-type: none;
  padding: 0;
}

.edit li {
  display: flex; /* 将 <li> 元素设置为 Flex 容器 */
  align-items: center; /* 垂直居中对齐 */
  gap: 10px; /* 设置子元素之间的间距为 10px */
  justify-content: center;
  border-radius: 15px;
  line-height: 60px;
  text-align: center;


  cursor: pointer;
  margin-bottom: 15px;

  font-size: 17px;
  background-color: white;
}

.edit li:hover {
  color: #4682B4;

  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.logout-link{
  color:black;
  background-color: white;

}

</style>