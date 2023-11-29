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
