<template>
  <div>
    <div class="bg-white rounded-8px relative" :style="{ boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)' }">
      <div class="w-5rem py-2 px-2 hover:bg-gray-2 rounded-8px cursor-pointer" @click="handleDelete">删除</div>
      <div class="w-5rem py-2 px-2 hover:bg-gray-2 rounded-8px cursor-pointer" @click="handleInfo">基础信息</div>
      <div class="w-5rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer" @click="handleConfig">配置</div>
      <div class="w-5rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer" @click="handlePerformance">端口性能</div>
      <div class="absolute w-1rem h-1rem -left-1rem top-[calc(50%-0.5rem)] bg-white" :style="{ clipPath: 'polygon(100% 0, 0% 50% , 100% 100% )' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['delete', 'config', 'performance', 'info'])
const handleDelete = ()=>{
  emits('delete')
}
const handleInfo = ()=>{
  emits('info')
}
const handleConfig = ()=>{
  emits('config')
}
const handlePerformance = ()=>{
  emits('performance')
}

</script>

<style scoped></style>
