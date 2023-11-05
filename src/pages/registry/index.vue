
<template>
  <div class="flex h-[100vh]">
    <div class="w-full flex flex-col justify-center items-center">
      <div class="flex mb-[1rem]">
        <div class="w-[6rem]">用户名</div>
        <Input class="w-[20rem]" v-model:value="state.username" />
      </div>
      <div class="flex">
        <div class="w-[6rem]">密码</div>
        <Input class="w-[20rem]" v-model:value="state.password" type="password" />
      </div>
      <div class="mt-[1rem] flex justify-end ml-20rem">
        <div>
          <Button @click="handleRegistry">注册</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 注册 -->
<script setup lang="ts">
import { Input, Button } from 'ant-design-vue'
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()

const state = ref({
  username: '',
  password: ''
})
const handleRegistry = () => {
  router.push({ path: '/config' })
}
// const { t } = useI18n() b
</script>

<route lang="yaml">
# meta:
#   layout: 404
</route>
