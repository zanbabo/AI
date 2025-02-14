<template>
111
</template>
<script lang="ts">
import emitter from "@/utils/emitter";
import { onBeforeUnmount } from "vue";

// 绑定事件
emitter.on('send-id',(value)=>{
  console.log('send-id事件被触发',value)

})

onBeforeUnmount(()=>{
  // 解绑事件
  emitter.off('send-id')
})


</script>
<style scoped></style>