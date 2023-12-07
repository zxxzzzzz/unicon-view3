<template>
  <div>
    <div class="bg-white rounded-8px relative" :style="{ boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)' }">
      <div class="w-5rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div>创建时间</div>
        <div>{{ props.createdTime }}</div>
      </div>
      <div class="w-5rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div>hwVersion</div>
        <div>{{ props.hwVersion }}</div>
      </div>
      <div class="w-5rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div>ip</div>
        <div>{{ props.ip }}</div>
      </div>
      <div class="w-5rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div>地点</div>
        <div>{{ props.location }}</div>
      </div>
      <div class="w-5rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div>坐标</div>
        <div>X:{{ props.posX }} Y:{{ props.posY }}</div>
      </div>
      <div class="w-5rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div>starus</div>
        <div>{{ props.starus }}</div>
      </div>
      <div class="w-5rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div>swVersion</div>
        <div>{{ props.swVersion }}</div>
      </div>
      <div class="w-5rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div>更新时间</div>
        <div>{{ props.updatedTime }}</div>
      </div>
      <div class="absolute w-1rem h-1rem -left-1rem top-[calc(50%-0.5rem)] bg-white" :style="{ clipPath: 'polygon(100% 0, 0% 50% , 100% 100% )' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  createdTime: string;
  hwVersion: string;
  id: string;
  ip: string;
  location: string;
  posX: string;
  posY: string;
  starus: string;
  swVersion: string;
  updatedTime: string;
}>();

</script>

<style scoped></style>
