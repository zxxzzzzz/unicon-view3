<template>
  <main>
    <Layout>
      <LayoutHeader>
        <div class="flex items-center justify-end">
          <Dropdown trigger="click">
            <div class="flex items-center cursor-pointer">
              <Avatar :size="64">
                <template #icon>
                  <UserOutlined />
                </template>
              </Avatar>
              <div class="text-white text-1.2rem">{{ globalStore.userName }}</div>
            </div>
            <template #overlay>
              <Menu>
                <MenuItem>
                  <div @click="handleUserClick">用户信息</div>
                </MenuItem>
                <!-- <MenuItem v-if="currentAuthority === '1'">
                  <div @click="appearUser">权限管理</div>
                </MenuItem> -->
                <MenuItem>
                  <div @click="handleLoginOut">登出</div>
                </MenuItem>
              </Menu>
            </template>
          </Dropdown>
        </div>
      </LayoutHeader>
      <Layout>
        <LayoutSider>
          <Menu v-model:selectedKeys="state.selectedKeys" mode="inline" theme="dark" :inline-collapsed="state.collapsed" :items="items"></Menu>
        </LayoutSider>
        <LayoutContent>
          <div class="h-[calc(100vh-64px)] bg-[rgba(214,218,234,1)]">
            <RouterView></RouterView>
          </div>
        </LayoutContent>
      </Layout>
      <!-- <LayoutFooter>Footer</LayoutFooter> -->
    </Layout>
  </main>
</template>

<script setup lang="ts">
import { Layout, LayoutContent, LayoutHeader, LayoutSider, Menu, Avatar, Dropdown, MenuItem } from 'ant-design-vue';
import { GithubFilled, UserOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { globalStore } from '@/stores/index';
import { loginOut,getUserInformation } from '@/api/index';
import dayjs from 'dayjs';
import { genBaseStyle } from 'ant-design-vue/es/alert/style';

const route = useRoute();
const router = useRouter();
const state = reactive({
  collapsed: false,
  selectedKeys: ['配置管理'],
});
const currentAuthority = computed(() => {
  return globalStore.value.userInfoList.find((u) => u.userName === globalStore.value.userName)?.authority;
});
watch(
  () => route.path,
  () => {
    const km: { [k: string]: string } = {
      '/topology': '设备管理',
      '/system': '系统管理',
      '/alarm': '告警管理',
    };
    const name = km[route.path];
    if (name) {
      state.selectedKeys = [name];
    }
  },
  { immediate: true },
);
watch(
  () => state.selectedKeys,
  () => {
    const km: { [k: string]: string } = {
      设备管理: '/topology',
      告警管理: '/alarm',
      系统管理: '/system',
    };
    router.push({ path: km[state.selectedKeys[0]] });
  },
);
const items = reactive([
  {
    key: '设备管理',
    // icon: () => h(DesktopOutlined),
    label: '设备管理',
    title: '设备管理',
  },
  {
    key: '告警管理',
    // icon: () => h(InboxOutlined),
    label: '告警管理',
    title: '告警管理',
  },
  {
    key: '系统管理',
    // icon: () => h(InboxOutlined),
    label: '系统管理',
    title: '系统管理',
  },
]);
;

if(globalStore.value.authority!='1'){
    items.splice(2,1);
};
  
const handleUserClick = () => {
  router.push('/setting');
};
// const appearUser = () => {
//   alert('正在开发中');
// };
const handleLoginOut = async () => {
  try {
    await loginOut({
      userName: globalStore.value.userName,
      endTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    router.push('/');
  } catch (error) {}
};
</script>
