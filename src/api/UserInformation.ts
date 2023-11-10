import { createFetch } from '@vueuse/core';
import { message } from 'ant-design-vue';

const useMyFetch = createFetch({
  baseUrl: 'http://60.163.15.154:8888',
  options: {
    immediate: false,
    async beforeFetch({ options }) {
      // const myToken = await getMyToken()
      // options.headers.Authorization = `Bearer ${myToken}`
      return { options }
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
        return ctx
      }
      return ctx
    }

  },
  fetchOptions: {
    mode: 'cors',
  },
})


export const UserInformation = async (data: {
  
}) => {
  const args = useMyFetch('/GetUserInformation').post(data)
  await args.execute(true)
  return args
}
