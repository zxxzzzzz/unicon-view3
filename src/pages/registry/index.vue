
<template>
  <div class="flex h-[100vh]">
    <div class="w-full flex flex-col justify-center items-center">
      <div class="flex mb-[1rem]">
        <div class="w-[6rem]">用户名</div>
        <Input class="w-[20rem]" v-model:value="state.username" />
      </div>
      <div class="flex mb-[1rem]">
        <div class="w-[6rem]">密码</div>
        <Input class="w-[20rem]" v-model:value="state.password" type="password" />
      </div>
      <div class="flex">
        <div class="w-[6rem]">省份</div>
        <Cascader class="w-[20rem]" v-model:value="state.address" :options="cityOptions" />
      </div>
      <div class="mt-[1rem] flex justify-end ml-20rem">
        <div>
          <Button @click="handleRegistry">注册</Button>
          <Button @click="handleBack">返回</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 注册 -->
<script setup lang="ts">
import { Input, Button, Cascader, message } from 'ant-design-vue'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { registry } from '@/api/index';
import { cityList } from './cityList';

const router = useRouter()

const state = ref({
  username: '',
  password: '',
  // ['江苏','南京']
  address: void 0 as undefined | string[]
})
const cityOptions = computed(() => {
  return cityList.map((city) => {
    return {
      value: city.name,
      label: city.name,
      children: city.children.map((c) => ({ label: c.name, value: c.name })),
    };
  })
})
const handleRegistry = async () => {
  if (!state.value.address || !state.value.password || !state.value.username) {
    message.error('请填写完整')
    return
  }
  try {
    const res = await registry({ userName: state.value.username, password: state.value.password, address: state.value.address })
    message.success("注册成功")
    router.push({ path: '/',params:{ userName: state.value.username, password: state.value.password} })
  } catch (error) {
    console.log(error, 'error');
  }
}
const handleBack = ()=>{
  router.push('/')
}
// const { t } = useI18n() b
</script>

<route lang="yaml">
# meta:
#   layout: 404
</route>
