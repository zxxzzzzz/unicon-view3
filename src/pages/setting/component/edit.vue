<template>
  <div>
    <div class="flex my-2">
      <div class="w-4rem">用户名</div>
      <div>{{ state.userName }}</div>
    </div>
    <div class="flex my-2">
      <div class="w-4rem">密码</div>
      <Input v-model:value="state.password" @change="handleChange"></Input>
    </div>
    <div class="flex my-2">
      <div class="w-4rem">地点</div>
      <Cascader class="w-full" v-model:value="state.position" :options="cityOptions" @change="handleChange"></Cascader>
    </div>
    <div class="flex my-2">
      <div class="w-4rem">权限</div>
      <Select class="w-full" v-model:value="state.authority" :options="auOptions" @change="handleChange"></Select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input, Select, Cascader } from 'ant-design-vue';
import { cityList } from '@/pages/registry/cityList';
import { computed, ref } from 'vue';

const props = defineProps<{
  userName: string;
  position: string[];
  authority: string;
}>();

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
  position: [] as string[],
  authority: '',
});
onMounted(() => {
  state.value.userName = props.userName || '';
  state.value.authority = props.authority || '';
  state.value.position = props.position || [];
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
const auOptions = [
  { label: '等级一', value: '1' },
  { label: '等级二', value: '2' },
  { label: '等级三', value: '3' },
];
const handleChange = () => {
  emit('change', {
    ...state.value,
  });
};
</script>

<style scoped></style>
