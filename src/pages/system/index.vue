<template>
  <div class="p-2">
    <Tabs v-model:activeKey="state.currentTabName">
      <TabPane key="系统" tab="系统">
        <Table :columns="alarmColumns"></Table>
      </TabPane>
      <TabPane key="日志" tab="日志" force-render>
        <Table :columns="systemColumns"></Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabPane, Table, TableProps } from 'ant-design-vue';
import { ref } from 'vue';

const state = ref({
  currentTabName: '系统'
})


const alarmColumns: TableProps['columns'] = [
  {
    title: 'devId',
    dataIndex: 'devId',
    key: 'devId',
  },
  {
    title: 'devName',
    dataIndex: 'devName',
    key: 'devName',
  },
  {
    title: 'alarmLevel',
    dataIndex: 'alarmLevel',
    key: 'alarmLevel',
  },
  {
    title: 'alarmModule',
    dataIndex: 'alarmModule',
    key: 'alarmModule',
  },
  {
    title: 'alarmDesc',
    dataIndex: 'alarmDesc',
    key: 'alarmDesc',
  },
  {
    title: 'alarmState',
    dataIndex: 'alarmState',
    key: 'alarmState',
  },
  {
    title: 'alarmTime',
    dataIndex: 'alarmTime',
    key: 'alarmTime',
  },
  {
    title: 'confirmTime',
    dataIndex: 'confirmTime',
    key: 'confirmTime',
  },
  {
    title: 'clearTime',
    dataIndex: 'clearTime',
    key: 'clearTime',
  },
]
const systemColumns: TableProps['columns'] = [
  {
    title: 'alarmModule',
    dataIndex: 'alarmModule',
    key: 'alarmModule',
  },
  {
    title: 'alarmDesc',
    dataIndex: 'alarmDesc',
    key: 'alarmDesc',
  },
  {
    title: 'alarmTime',
    dataIndex: 'alarmTime',
    key: 'alarmTime',
  },
  {
    title: 'alarmModule',
    dataIndex: 'alarmModule',
    key: 'alarmModule',
  },
  {
    title: 'clearTime',
    dataIndex: 'clearTime',
    key: 'clearTime',
  },
]


</script>

<style scoped></style>
<route lang="yaml">
  meta:
    layout: menu
    menuName: 系统管理
</route>