<template>
  <div class="z-10">
    <div class="bg-white rounded-8px relative" :style="{ boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)' }">
      <div class="w-15rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div class="w-6rem">创建时间</div>
        <div>{{ state.createdTime }}</div>
      </div>
      <div class="w-15rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div class="w-6rem">ip:</div>
        <div>{{ state.ip }}</div>
      </div>
      <div class="w-15rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div class="w-6rem">地点:</div>
        <div>{{ state.location }}</div>
      </div>
      <div class="w-15rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div class="w-6rem">state:</div>
        <div>{{ devState }}</div>
      </div>
      <div class="w-15rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div class="w-6rem">hwVersion:</div>
        <div>{{ state.hwVersion }}</div>
      </div>
      <div class="w-15rem py-2 px-2 rounded-8px hover:bg-gray-2 cursor-pointer flex">
        <div class="w-6rem">swVersion:</div>
        <div>{{ state.swVersion }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllDev } from '@/api';
import {devCurConfig} from '@/stores';

const props = defineProps<{
  id: string;
}>();

const state = ref({
  createdTime: '',
  hwVersion: '',
  id: '',
  ip: '',
  location: '',
  posX: '',
  posY: '',
  state: '',
  swVersion: '',
  updatedTime: '',
});

const devState = computed(() => {
  return devCurConfig.value.find((item:any) => item.nodeId == props.id)?.state || state.value.state
})

onMounted(async () => {
  setTimeout(async () => {
    const { data } = await getAllDev();
    const dev = (data.value?.result?.devList || []).find((item: any) => {
      return props.id == item.nodeId;
    });
    if (dev) {
      state.value = dev;
    }
  }, 300);
});
</script>

<style scoped></style>
