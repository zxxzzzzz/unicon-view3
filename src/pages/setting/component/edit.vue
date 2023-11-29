<template>
  <div>
    <div class="flex my-2">
      <div class="w-4rem">用户名</div>
      <Input v-model:value="state.userName"></Input>
    </div>
    <div class="flex my-2">
      <div class="w-4rem">密码</div>
      <Input v-model:value="state.password"></Input>
    </div>
    <div class="flex my-2">
      <div class="w-4rem">地点</div>
      <Cascader class="w-full" v-model:value="state.position" :options="cityOptions"></Cascader>
    </div>
    <div class="flex my-2">
      <div class="w-4rem">权限</div>
      <Select class="w-full" v-model:value="state.authority"></Select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input, Select, Cascader } from 'ant-design-vue';
import { cityList } from '@/pages/registry/cityList';
import { computed, ref } from 'vue';

const emit = defineEmits<{
  (
    e: 'change',
    data: {
      userName: string;
      password: string;
      position: string[];
      authority: string;
    },
  ): void;
}>();
const state = ref({
  userName: '',
  password: '',
  position: [],
  authority: '',
});
const cityOptions = computed(() => {
  return cityList.map((city) => {
    return {
      value: city.name,
      label: city.name,
      children: city.children.map((c) => ({ label: c.name, value: c.name })),
    };
  });
});
</script>

<style scoped></style>
