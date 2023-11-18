import { createFetch } from '@vueuse/core';
import { message } from 'ant-design-vue';
import { globalStore } from '@/stores/index';

const useMyFetch = createFetch({
  baseUrl: 'http://60.163.13.247:8888',
  options: {
    immediate: false,
    async beforeFetch({ options }) {
      // const myToken = await getMyToken()
      if (globalStore.value.token) {
        // @ts-ignore
        options.headers['Authorization'] = `Bearer ${globalStore.value.token}}`;
      }
      return { options };
    },
    onFetchError(ctx) {
      if (!ctx.data) {
        message.error('网络错误');
        return ctx;
      }
      const data = typeof ctx.data === 'string' ? JSON.parse(ctx.data) : ctx.data;
      if (data && data?.body?.code !== 200) {
        const msg = data?.body?.message;
        message.error(msg || '网络错误');
        return ctx;
      }
      return ctx;
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
});

export const login = async (data: { userName: string; password: string }) => {
  const args = useMyFetch('/UserLogin').post(data).json();
  await args.execute(true);
  return args;
};

export const registry = async (data: { userName: string; password: string; address: string[] }) => {
  const args = useMyFetch('/NewUser').post(data);
  await args.execute(true);
  return args;
};
export const getUserInformation = async () => {
  const args = useMyFetch('/GetUserInformation').post().json();
  await args.execute(true);
  return args;
};
export const setUserAuthority = async (data: {
  userList: {
    userName: string;
    password: string;
    authority: string; //int 1-3
  }[];
}) => {
  const args = useMyFetch('/SetUserAuthority').post(data).json();
  await args.execute(true);
  return args;
};

export const getTopography = async (data: {
  //token
}) => {
  const args = useMyFetch('/GetTopography').post(data);
  await args.execute(true);
  return args;
};

export const UserInformation = async (data: {}) => {
  const args = useMyFetch('/GetUserInformation').post(data);
  await args.execute(true);
  return args;
};
export const getUserLogin = () => {
  const args = useMyFetch('/GetUserLogin').post().json();
  args.execute(true);
  return args;
};
export const getDevConfigParam = () => {
  const args = useMyFetch('/GetDevConfigParam').post().json();
  args.execute(true);
  return args;
};
export const getAlarmCalc  = (data:{startTime:string,endTime:string}) => {
  const args = useMyFetch('/AlarmCalc ').post(data).json();
  args.execute(true);
  return args;
};
export const getAlarmParam  = (data:{startTime:string,endTime:string}) => {
  const args = useMyFetch('/GetAlarmParam ').post(data).json();
  args.execute(true);
  return args;
};
export const getSystemAlarm = () => {
  const args = useMyFetch('/GetSystemAlarm').post().json();
  args.execute(true);
  return args;
};
export const getUserOperation = () => {
  const args = useMyFetch('/GetUserOperation').post().json();
  args.execute(true);
  return args;
};
export const getAllDev = () => {
  const args = useMyFetch('/GetAllDev').post().json();
  args.execute(true);
  return args;
};
export const loginOut = async (data: { userName: string; endTime: string }) => {
  const args = useMyFetch('/UserLeave').post(data);
  await args.execute(true);
  return args;
};
