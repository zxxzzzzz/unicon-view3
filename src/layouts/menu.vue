<template>
  <main>
    <Layout>
      <LayoutHeader>
        <div class="flex items-center justify-end">
          <div class="flex items-center cursor-pointer" @click="handleUserClick">
            <Avatar :size="64">
              <template #icon>
                <UserOutlined />
              </template>
            </Avatar>
          <div class="text-white text-1.2rem">zxx</div>
          </div>
        </div>
      </LayoutHeader>
      <Layout>
        <LayoutSider>
          <Menu v-model:selectedKeys="state.selectedKeys" mode="inline" theme="dark" :inline-collapsed="state.collapsed"
            :items="items"></Menu>
        </LayoutSider>
        <LayoutContent>
          <div class="h-[calc(100vh-64px)]">
            <RouterView></RouterView>
          </div>
        </LayoutContent>
      </Layout>
      <!-- <LayoutFooter>Footer</LayoutFooter> -->
    </Layout>
  </main>
</template>

<script setup lang="ts">
import { Layout, LayoutContent, LayoutHeader, LayoutSider, Menu, Avatar, } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const state = reactive({
  collapsed: false,
  selectedKeys: ['配置管理'],
});
watch(() => route.path, () => {
  const km: { [k: string]: string } = {
    '/topology': '设备管理',
    '/system': '系统管理',
    '/alarm': '告警管理',
  }
  const name = km[route.path]
  if (name) {
    state.selectedKeys = [name]
  }
}, { immediate: true })
watch(() => state.selectedKeys, () => {
  const km: { [k: string]: string } = {
    '设备管理': '/topology',
    '告警管理': '/alarm',
    '系统管理': '/system',
  }
  router.push({ path: km[state.selectedKeys[0]] })
})
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

const handleUserClick = ()=>{
  alert("111")
}

</script>


