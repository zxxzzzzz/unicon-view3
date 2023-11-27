<template>
  <div>
    <Card>
      <Tabs v-model:active-key="activeKey">
        <TabPane key="1" tab="用户">
          <Table :columns="columns" :data-source="userList" />
        </TabPane>
        <TabPane key="2" tab="登录日志">
          <Table :columns="loginColumns" :data-source="loginList" />
        </TabPane>
        <TabPane key="3" tab="操作日志">
          <Table :columns="operationColumns" :data-source="operationList" />
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script lang="ts" setup>
import { Table, Card, Button, Modal, Tabs, TabPane } from 'ant-design-vue';
import type { TableProps } from 'ant-design-vue';
import { computed, h, onMounted } from 'vue';
import { getUserInformation, setUserAuthority, getUserLogin, getUserOperation } from '@/api';
import Edit from './component/edit.vue';
// defineProps<{  }>();
type UserItem = {
  authority: string;
  position: [string, string][];
  userName: string;
};
const activeKey = ref('1');

const userList = computed(() => {
  return globalStore.value.userInfoList;
});

const { data: loginData } = getUserLogin({userName:globalStore.value.userName});
const { data: operationData } = getUserOperation({userName:globalStore.value.userName});

const loginList = computed(() => {
  if (!loginData.value) {
    return [];
  }
  console.log((loginData.value as any));
  return (loginData.value as any)?.body?.result?.userList;
});
const operationList = computed(() => {
  if (!operationData.value) {
    return [];
  }
  return (operationData.value as any)?.body?.result?.userList;
});

onMounted(async () => {
  const { data } = await getUserInformation({userName:globalStore.value.userName});
  globalStore.value.userInfoList = data.value?.body?.result?.userList || [];
});

const columns: TableProps<UserItem>['columns'] = [
  { dataIndex: 'userName', title: '用户名称' },
  { dataIndex: 'password', title: '密码' },
  {
    dataIndex: 'position',
    title: '地点',
  },
  {
    dataIndex: 'authority',
    title: '角色',
    customRender({ record, index }) {
      const t = ['-', '一', '二', '三'][parseInt(record.authority)];
      return h('div', t ? `等级${['-','一', '二', '三'][parseInt(record.authority)]}` : '-');
    },
  },
  {
    title: '操作',
    customRender() {
      return [
        h(
          Button,
          {
            onClick() {
              Modal.confirm({
                title: '编辑',
                okText: '保存',
                cancelText: '取消',
                icon: null,
                content: () => {
                  return h(Edit, {
                    async onChange(data) {
                      try {
                        await setUserAuthority({
                          userList: [
                            {
                              userName: data.userName,
                              password: data.password,
                              authority: data.authority,
                            },
                          ],
                        });
                      } catch (error) {}
                    },
                  });
                },
              });
            },
          },
          '编辑',
        ),
      ];
    },
  },
];

const loginColumns: TableProps<UserItem>['columns'] = [
  { dataIndex: 'userName', title: '用户名称' },
  { dataIndex: 'password', title: '密码' },
  { dataIndex: 'startTime', title: '开始时间' },
  { dataIndex: 'endTime', title: '结束时间' },
];

const operationColumns: TableProps<UserItem>['columns'] = [
  { dataIndex: 'userName', title: '用户名称' },
  { dataIndex: 'position', title: '登录地点' },
  { dataIndex: 'module', title: '操作模块' },
  { dataIndex: 'msg', title: '操作内容' },
  { dataIndex: 'startTime', title: '操作开始时间' },
  { dataIndex: 'endTime', title: '操作结束时间' },
];
</script>
<style lang="css">
.city .ant-cascader-menu {
  height: 40rem;
}
</style>
<route lang="yaml">
meta:
  layout: menu
</route>
