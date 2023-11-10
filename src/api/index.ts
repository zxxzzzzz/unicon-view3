import { createFetch } from '@vueuse/core';
import { message } from 'ant-design-vue';

const useMyFetch = createFetch({
  baseUrl: 'http://60.163.15.154:8888',
  options: {
    async beforeFetch({ options }) {
      // const myToken = await getMyToken()
      // options.headers.Authorization = `Bearer ${myToken}`
      return { options }
    },
    afterFetch(ctx) {
      return {
        ...ctx,
        data: typeof ctx.data === 'string' ? JSON.parse(ctx.data) : ctx.data
      }
    },
    onFetchError(ctx) {
      if (!ctx.data) {
        message.error('网络错误')
        return ctx
      }
      const data = typeof ctx.data === 'string' ? JSON.parse(ctx.data) : ctx.data
      if (data && data?.body?.code !== 200) {
        const msg = data?.body?.message
        message.error(msg || '网络错误')
      }
      return ctx
    }

  },
  fetchOptions: {
    mode: 'cors',
  },
})

export const login = (data: {
  "userName": string,
  "password": string
}
) => {
  return useMyFetch('/UserLogin', { method: 'post', body: JSON.stringify(data) }, { immediate: true })
}