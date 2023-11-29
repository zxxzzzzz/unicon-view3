<!-- 告警管理 -->
<template>
  <div class="w-full h-full bg-cover bg-no-repeat flex bg-[rgba(214,218,234,1)]">
    <div class="w-50%">
      <div id="errorPieChart" class="border border-solid border-gray my-2 h-33%"></div>
      <div id="errorBarChart" class="border border-solid border-gray my-2 h-33%"></div>
      <div id="errorTimeBarChart" class="border border-solid border-gray mt-2 h-34%"></div>
    </div>
    <div class="w-50%">
      <div class="h-26% my-2 border border-solid border-gray">
        <div class="flex justify-center items-center h-full flex-wrap w-full">
          <Statistic title="网元" :value="11.28" :precision="2" suffix="%" :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </Statistic>
          <Statistic title="端口" :value="11.28" :precision="2" suffix="%" :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </Statistic>
          <Statistic title="槽位" :value="11.28" :precision="2" suffix="%" :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </Statistic>
          <Statistic title="告警数" :value="11.28" :precision="2" suffix="%" :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </Statistic>
        </div>
      </div>
      <div class="flex">
        <Button type="primary">下载</Button>
        <div class="w-35% ml-a">
          <RangePicker />
        </div>
        <Button type="primary" @click="handlealarmtime">确认</Button>
      </div>
      <Table :columns="columns" :data-source="alarmList"></Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { Table, Card, Statistic, TableProps, Button, Select, SelectProps } from 'ant-design-vue';
import { lineOptions, rectOptions, louOptions, pieOptions, barOption, bar2Option } from './options';
import { RangePicker } from 'ant-design-vue';
import { getSystemAlarm,getAlarmCalc,getAlarmParam } from '@/api/index';
import { computed } from 'vue';
// import {  } from 'ant-design-vue';
// 基于准备好的dom，初始化echarts实例

// const { data: alarmData } = getSystemAlarm();
// const { data: alarmData } = getAlarmCalc({startTime:'2023-11-01', endTime:'2023-11-18'});
const handlealarmtime =()=>{
  getAlarmParam({startTime:'2023-11-01', endTime:'2023-11-18'});
}
const alarmList = computed(() => {
  return []
  // if(!alarmData) return []
  // return alarmData.value.result?.alarmList as any[]
});

const columns: TableProps['columns'] = [
  { title: '告警Id' },
  { title: '网元Id' },
  { title: '告警等级' },
  { title: '告警源' },
  { title: '告警描述' },
  { title: '告警状态' },
  { title: '告警时间' },
  { title: '确认时间' },
  { title: '清除时间' },

];

const options1 = ref<SelectProps['options']>([
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'disabled',
    label: 'Disabled',
    disabled: true,
  },
  {
    value: 'yiminghe',
    label: 'Yiminghe',
  },
]);

onMounted(() => {
  var myChart = echarts.init(document.getElementById('errorBarChart'), null);
  myChart.setOption(barOption);
  var myChart = echarts.init(document.getElementById('errorTimeBarChart'), null);
  myChart.setOption(bar2Option);
  // var myChart = echarts.init(document.getElementById('louChart'), null);
  // myChart.setOption(louOptions)
  var myChart = echarts.init(document.getElementById('errorPieChart'), null);
  myChart.setOption(pieOptions);
});
</script>

<style scoped></style>
<route lang="yaml">
meta:
  layout: menu
</route>
