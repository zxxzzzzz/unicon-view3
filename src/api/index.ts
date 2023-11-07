import { createFetch } from '@vueuse/core';

const useMyFetch = createFetch({
  baseUrl: 'http://192.168.0.152:8888',
  options: {
    async beforeFetch({ options }) {
      // const myToken = await getMyToken()
      // options.headers.Authorization = `Bearer ${myToken}`

      return { options }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

const getUserInfo = () => {
  return useMyFetch('/userInfo')
}