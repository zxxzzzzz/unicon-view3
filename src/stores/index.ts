import { ref, watch } from 'vue';
import { getDevCurConfig } from '@/api';

export const globalStore = ref({
  authority: '',
  userName: '',
  password: '',
  token: '',
  userInfoList: [] as {
    authority: string;
    userName: string;
  }[],
});

const _g = window.sessionStorage.getItem('global');
if (_g) {
  globalStore.value = JSON.parse(_g);
}
watch(
  globalStore,
  () => {
    window.sessionStorage.setItem('global', JSON.stringify(globalStore.value));
  },
  { deep: true },
);

// setInterval(async () => {
//   if (globalStore.value.token) {
//     const { data: curData } = await getDevCurConfig();
//     devCurConfig.value = curData.value?.result?.devList || [];
//   }
// }, 1000);

export const devCurConfig = ref<any[]>([]);
