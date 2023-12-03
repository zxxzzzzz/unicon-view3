import { ref, watch } from 'vue';
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
console.log('sssssssssssss');
watch(
  globalStore,
  () => {
    window.sessionStorage.setItem('global', JSON.stringify(globalStore.value));
  },
  { deep: true },
);
