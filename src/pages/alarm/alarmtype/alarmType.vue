<template>
    <div>
      <div class="flex my-2">
        <div class="w-4rem">typeName</div>
        <Input v-model:value="state.typeName" @change="handleChange"></Input>
      </div>
      <div class="flex my-2">
        <div class="w-4rem">typeLevel</div>
        <Input v-model:value="state.typeLevel" @change="handleChange"></Input>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';

  const emits = defineEmits(['change'])
  const state = ref({
    typeName: '',
    typeLevel: '',
  });
  const handleChange = () => {
    emits ('change', {
      ...state.value,
    });
  };
  </script>
  
  <style scoped></style>
  