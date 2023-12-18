<template>
  <div>
    <div class="flex mb-1rem">
      <div class="w-6rem">nodeId</div>
      <Input v-model:value="state.nodeId" @change="handleChange"></Input>
    </div>
    <div class="flex mb-1rem">
      <div class="w-6rem">duty</div>
      <Select class="w-[20rem]" :options="dutyOptions" v-model:value="state.duty" @change="handleChange"></Select>
    </div>
    <div class="flex mb-1rem">
      <div class="w-6rem">masterId</div>
      <Input v-model:value="state.master"  :disabled="state.duty === 'master'" @change="handleChange"></Input>
    </div>
    <div class="flex mb-1rem">
      <div class="w-6rem">location</div>
      <Cascader class="w-[20rem]" v-model:value="state.location" :options="cityOptions" @change="handleChange"/>
    </div>

    <!--
    <div class="flex">
      <div class="w-6rem">ip</div>
      <Input v-model:value="state.ip" @change="handleChange"></Input>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { Input, Select, Cascader } from 'ant-design-vue';
import { cityList } from '@/pages/registry/cityList';

const emits = defineEmits(['change'])
const state = ref({
  type: 'add',
  nodeId: '',
  duty: '',
  location: [],
  master: '',
  // ip: '',
});
//
const dutyOptions = [
  { label: 'master', value: 'master' },
  { label: 'slave', value: 'slave' },
  { label: 'relay', value: 'relay' },
];

const cityOptions = computed(() => {
  return cityList.map((city) => {
    return {
      value: city.name,
      label: city.name,
      children: city.children.map((c) => ({ label: c.name, value: c.name })),
    };
  });
});

const handleChange = ()=>{
  emits('change', state.value)
}
</script>

<style scoped></style>
