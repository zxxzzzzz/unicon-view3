import { ref } from 'vue';
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

watch(globalStore, () => {
  window.sessionStorage.setItem('global', JSON.stringify(globalStore.value));
});