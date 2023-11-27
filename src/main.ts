import { ViteSSG } from 'vite-ssg';
import { setupLayouts } from 'virtual:generated-layouts';

// import Previewer from 'virtual:vue-component-preview'
import App from './App.vue';
import generatedRoutes from '~pages';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { globalStore } from '@/stores/index';

import './styles/main.css';
import 'uno.css';
import { getUserInformation } from './api';

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});
// router.beforeEach(async (to, from, next) => {
//   if (!globalStore.value.userInfoList?.length) {
//     try {
//       const { data } = await getUserInformation();
//       globalStore.value.userInfoList = data.value?.result?.userList || [];
//     } catch (error) {
      
//     }
//   }
//   if (to.path !== '/' && !globalStore.value.token) {
//     next('/');
//     return;
//   }
//   next();
// });

const app = createApp(App);
app.use(router);
app.mount('#app');

// https://github.com/antfu/vite-ssg
// export const createApp = ViteSSG(
//   App,
//   { routes, base: import.meta.env.BASE_URL },
//   (ctx) => {
//     // install all modules under `modules/`
//     Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
//       .forEach(i => i.install?.(ctx))
//     // ctx.app.use(Previewer)
//   },
// )
