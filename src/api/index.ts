import { createFetch } from '@vueuse/core';
import { message } from 'ant-design-vue';
import { globalStore } from '@/stores/index';

const useMyFetch = createFetch({
  baseUrl: 'http://60.163.13.247:8888',
  options: {
    immediate: false,
    async beforeFetch({ options }) {
      // @ts-ignore
      options.headers['origin'] = window.location.origin;
      // const myToken = await getMyToken()
      if (globalStore.value.token) {
        // @ts-ignore
        options.headers['Authorization'] = `${globalStore.value.token}`;
      }
      const session = window.sessionStorage.getItem('global');
      if (session && !globalStore.value.token) {
        const token = JSON.parse(session).token;
        // @ts-ignore
        options.headers['Authorization'] = `${token}`;
      }
      return { options };
    },
    onFetchError(ctx) {
      console.log(ctx);
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
export const getUserInformation = async (data: { userName: string }) => {
  const args = useMyFetch('/GetUserInformation').post(data).json();
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

export const getTopography = (data: {
  //token
}) => {
  const args = useMyFetch('/GetTopography').post(data).json();
  args.execute(true);
  return args;
};

export const UserInformation = async (data: { userName: string }) => {
  const args = useMyFetch('/GetUserInformation').post(data);
  await args.execute(true);
  return args;
};
export const getUserLogin = (data: { userName: string }) => {
  const args = useMyFetch('/GetUserLogin').post(data).json();
  args.execute(true);
  return args;
};
export const getDevConfigParam = () => {
  const args = useMyFetch('/GetDevConfigParam').post().json();
  args.execute(true);
  return args;
};

export const setDevPortConfig = async (data: {
  nodeId: number;
  type: 'dev'|'module'|'port'|'freq'|'time'; //配置模块类型(dev,module,port,freq,time)
  name: string; //配置的模块
  paramList: {
    paramName: string; //配置的参数名字
    value: string; //值
  }[];
}) => {
  const args = useMyFetch('/SetDevPortConfig').post(data).json();
  await args.execute(true);
  return args;
};
export const getDevCurConfig = () => {
  const args = useMyFetch('/GetDevCurConfig').post().json();
  args.execute(true);
  return args;
};
export const getAlarmCalc = (data: { startTime: string; endTime: string }) => {
  const args = useMyFetch('/AlarmCalc ').post(data).json();
  args.execute(true);
  return args;
};
export const getAlarmParam = (data: { startTime: string; endTime: string }) => {
  const args = useMyFetch('/GetAlarmParam ').post(data).json();
  args.execute(true);
  return args;
};
export const alarmConfirm = (data: { id: string; confirmTime: string }) => {
  const args = useMyFetch('/AlarmConfirm ').post(data).json();
  args.execute(true);
  return args;
};
export const alarmClear = (data: { id: string; clearTime: string }) => {
  const args = useMyFetch('/alarmClear ').post(data).json();
  args.execute(true);
  return args;
};
export const getSystemAlarm = () => {
  const args = useMyFetch('/GetSystemAlarm').post().json();
  args.execute(true);
  return args;
};
export const getUserOperation = (data: { userName: string }) => {
  const args = useMyFetch('/GetUserOperation').post(data).json();
  args.execute(true);
  return args;
};
export const getAllDev = () => {
  const args = useMyFetch('/GetAllDev').post().json();
  args.execute(true);
  return args;
};
export const updateDev = (data: { type: string; nodeId: string; duty: string; location: string[]; status: string; ip: string }) => {
  const args = useMyFetch('/UpdateDev').post(data).json();
  args.execute(true);
  return args;
};
export const loginOut = async (data: { userName: string; endTime: string }) => {
  const args = useMyFetch('/UserLeave').post(data);
  await args.execute(true);
  return args;
};

export const delay = (n: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, n);
  });
};
