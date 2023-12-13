<!-- 登录页 -->
<template>
  <div class="flex h-[100vh]">
    <div class="w-[50vw] bg-blue"></div>
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
import { Input, Button } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { login } from '@/api/index';
import { onMounted } from 'vue';
import { globalStore } from '@/stores/index';
import { valHooks } from 'cypress/types/jquery';
import { values } from 'cypress/types/lodash';

const router = useRouter();
const route = useRoute();

const state = ref({
  username: '',
  password: '',
});

onMounted(() => {
  if (route.params.userName) {
    state.value.username = route.params.userName as string;
    state.value.password = route.params.password as string;
  }
});

const handleLogin = async () => {
  try {
    const { data } = await login({ userName: state.value.username, password: state.value.password });
    globalStore.value = { ...globalStore.value,authority:data.value?.result?.authority, token: data.value?.result?.token || '', userName: state.value.username };
    
    router.push({ path: '/topology' });
  } catch (error) {
    console.log(error, 'error');
  }
};
const handleRegistry = () => {
  router.push({ path: '/registry' });
};
// const { t } = useI18n()
</script>

<route lang="yaml">
# meta:
#   layout: 404
</route>
