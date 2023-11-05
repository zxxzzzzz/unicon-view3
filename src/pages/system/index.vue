<template>
  <div class="p-2 bg-[rgba(214,218,234,1)]">
    <Tabs v-model:activeKey="state.currentTabName">
      <TabPane key="系统" tab="系统">
        <Table :columns="alarmColumns"></Table>
      </TabPane>
      <TabPane key="日志" tab="日志" force-render>
        <Table :columns="systemColumns"></Table>
      </TabPane>
    </Tabs>
  </div>
  <div class=" bg-[rgba(214,218,234,1)]" style="width: 100%;height: 370px;">

  </div>
</template>
<!-- 系统管理页 -->

<script setup lang="ts">
import { Tabs, TabPane, Table, TableProps } from 'ant-design-vue';
import { ref } from 'vue';

const state = ref({
  currentTabName: '系统'
})


const alarmColumns: TableProps['columns'] = [
  {
    title: '告警IP',
    dataIndex: 'devId',
    key: 'devId',
  },
  {
    title: '告警模块',
    dataIndex: 'devName',
    key: 'devName',
  },
  {
    title: '告警描述',
    dataIndex: 'alarmLevel',
    key: 'alarmLevel',
  },
  {
    title: '告警时间',
    dataIndex: 'alarmModule',
    key: 'alarmModule',
  },
  {
    title: '清除时间',
    dataIndex: 'alarmDesc',
    key: 'alarmDesc',
  },
]
const systemColumns: TableProps['columns'] = [
  {
    title: '日志ip',
    dataIndex: 'alarmModule',
    key: 'alarmModule',
  },
  {
    title: '日志类型',
    dataIndex: 'alarmDesc',
    key: 'alarmDesc',
  },
  {
    title: '日志内容',
    dataIndex: 'alarmTime',
    key: 'alarmTime',
  },
]


</script>

<style scoped></style>
<route lang="yaml">
  meta:
    layout: menu
    menuName: 系统管理
</route>