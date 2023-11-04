<template>
<<<<<<< HEAD
  <div class="p-2">
=======
<<<<<<< HEAD
  <div class="p-2">
=======
<<<<<<< HEAD
  <div class="p-2">
=======
  <div class="p-2 bg-[rgba(214,218,234,1)]">
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
    <Tabs v-model:activeKey="state.currentTabName">
      <TabPane key="系统" tab="系统">
        <Table :columns="alarmColumns"></Table>
      </TabPane>
      <TabPane key="日志" tab="日志" force-render>
        <Table :columns="systemColumns"></Table>
      </TabPane>
    </Tabs>
  </div>
<<<<<<< HEAD
</template>
=======
<<<<<<< HEAD
</template>
=======
<<<<<<< HEAD
</template>
=======
  <div class=" bg-[rgba(214,218,234,1)]" style="width: 100%;height: 370px;">

  </div>
</template>
<!-- 系统管理页 -->
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)

<script setup lang="ts">
import { Tabs, TabPane, Table, TableProps } from 'ant-design-vue';
import { ref } from 'vue';

const state = ref({
  currentTabName: '系统'
})


const alarmColumns: TableProps['columns'] = [
  {
<<<<<<< HEAD
    title: 'devId',
=======
<<<<<<< HEAD
    title: 'devId',
=======
<<<<<<< HEAD
    title: 'devId',
=======
    title: '告警IP',
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
    dataIndex: 'devId',
    key: 'devId',
  },
  {
<<<<<<< HEAD
    title: 'devName',
=======
<<<<<<< HEAD
    title: 'devName',
=======
<<<<<<< HEAD
    title: 'devName',
=======
    title: '告警模块',
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
    dataIndex: 'devName',
    key: 'devName',
  },
  {
<<<<<<< HEAD
    title: 'alarmLevel',
=======
<<<<<<< HEAD
    title: 'alarmLevel',
=======
<<<<<<< HEAD
    title: 'alarmLevel',
=======
    title: '告警描述',
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
    dataIndex: 'alarmLevel',
    key: 'alarmLevel',
  },
  {
<<<<<<< HEAD
    title: 'alarmModule',
=======
<<<<<<< HEAD
    title: 'alarmModule',
=======
<<<<<<< HEAD
    title: 'alarmModule',
=======
    title: '告警时间',
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
    dataIndex: 'alarmModule',
    key: 'alarmModule',
  },
  {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
    title: '清除时间',
    dataIndex: 'alarmDesc',
    key: 'alarmDesc',
  },
]
const systemColumns: TableProps['columns'] = [
  {
    title: '日志ip',
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
    dataIndex: 'alarmModule',
    key: 'alarmModule',
  },
  {
<<<<<<< HEAD
    title: 'alarmDesc',
=======
<<<<<<< HEAD
    title: 'alarmDesc',
=======
<<<<<<< HEAD
    title: 'alarmDesc',
=======
    title: '日志类型',
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
    dataIndex: 'alarmDesc',
    key: 'alarmDesc',
  },
  {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
    title: '日志内容',
    dataIndex: 'alarmTime',
    key: 'alarmTime',
  },
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
]


</script>

<style scoped></style>
<route lang="yaml">
  meta:
    layout: menu
    menuName: 系统管理
</route>