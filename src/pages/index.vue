<!-- 登录页 -->
<template>
  <div class="flex h-[100vh]">
    <div class="w-[50vw] bg-blue">
    </div>
    <div class="w-[50vw] flex flex-col justify-center items-center">
      <div class="flex mb-[1rem]">
        <div class="w-[6rem]">用户名</div>
        <Input class="w-[20rem]" v-model:value="state.username" />
      </div>
      <div class="flex">
        <div class="w-[6rem]">密码</div>
        <Input class="w-[20rem]" v-model:value="state.password" type="password" />
      </div>
      <div class="mt-[1rem] flex justify-end relative w-[42rem]">
        <div>
          <Button class="mr-[1rem]" @click="handleLogin">登录</Button>
          <Button @click="handleRegistry">注册</Button>
        </div>
        <Button type="text" class="ml-[10rem]">忘记密码</Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Input, Button } from 'ant-design-vue'
import { useRouter } from 'vue-router';
import { login } from '@/api/index';

const router = useRouter()

const state = ref({
  username: '',
  password: ''
})
const handleLogin = async () => {
  try {
    await login({ userName: state.value.username, password: state.value.password })
    router.push({ path: '/topology' })
  } catch (error) {
    console.log(error, 'error');
  }
}
const handleRegistry = () => {
  router.push({ path: '/registry' })
}
// const { t } = useI18n()
</script>

<route lang="yaml">
# meta:
#   layout: 404
</route>
