<!-- 告警管理 -->
<template>
  <div class="w-full h-full bg-cover bg-no-repeat flex bg-[rgba(214,218,234,1)]">
    <div class="w-50%">
      <div id="errorPieChart" :columns="alarmColumns" :data-source="alarmList" class="border border-solid border-gray my-2 h-33%"></div>
      <div id="errorBarChart" class="border border-solid border-gray my-2 h-33%"></div>
      <div id="errorTimeBarChart" class="border border-solid border-gray mt-2 h-34%"></div>
    </div>
    <div class="w-50%">
      <div class="h-26% my-2 border border-solid border-gray">
        <div class="flex justify-center items-center h-full flex-wrap w-full">
          <Statistic title="网元" :value="alarmCalc.devNum" suffix="个" :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </Statistic>
          <Statistic title="端口" :value="alarmCalc.portNum" suffix="个" :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </Statistic>
          <Statistic title="槽位" :value="alarmCalc.alarmNum" suffix="个" :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </Statistic>
          <Statistic title="告警数" :value="alarmCalc.alarmNum" suffix="个" :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </Statistic>
        </div>
      </div>
      <div class="flex">
        <Button type="primary">下载</Button>
        <div class="w-55% ml-a">
          <RangePicker v-model:value="dateRange" show-time />
        </div>
        <Button type="primary" @click="handleAlarmTime">确认</Button>
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
import { getSystemAlarm, getAlarmCalc, getAlarmParam, delay } from '@/api/index';
import { computed } from 'vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { values } from 'cypress/types/lodash';
import { data } from 'cypress/types/jquery';
import { time } from 'console';
// import {  } from 'ant-design-vue';
// 基于准备好的dom，初始化echarts实例

// const { data: alarmData } = getSystemAlarm();
type RangeValue = [Dayjs, Dayjs];
const dateRange = ref<RangeValue>([dayjs().startOf('M'), dayjs()]);
const alarmList = ref([]);
const alarmCalc = ref<any>({});

onMounted(async () => {
  const res = await getAlarmParam({ startTime: dateRange.value[0].format('YYYY-MM-DD'), endTime: dateRange.value[1].format('YYYY-MM-DD') });
  alarmList.value = res.data.value?.result?.alarmList || [];
  await delay(500);
  const res2 = await getAlarmCalc({ startTime: dateRange.value[0].format('2023-12-1'), endTime: dateRange.value[1].format('2023-12-2') });
  alarmCalc.value = res2.data.value?.result || {};
});

const handleAlarmTime = async () => {
  const res = await getAlarmParam({ startTime: dateRange.value[0].format('YYYY-MM-DD'), endTime: dateRange.value[1].format('YYYY-MM-DD') });
  alarmList.value = res.data.value?.result?.alarmList || [];
  const res2 = await getAlarmCalc({ startTime: dateRange.value[0].format('YYYY-MM-DD'), endTime: dateRange.value[1].format('YYYY-MM-DD') });
  alarmCalc.value = res2.data.value?.result || {};
};

watch(alarmCalc, () => {
  var myChart = echarts.init(document.getElementById('errorBarChart'), null);
  const timeList = [
    alarmCalc.value?.weekAlarmTime?.mo,
    alarmCalc.value?.weekAlarmTime?.tu,
    alarmCalc.value?.weekAlarmTime?.we,
    alarmCalc.value?.weekAlarmTime?.th,
    alarmCalc.value?.weekAlarmTime?.fr,
    alarmCalc.value?.weekAlarmTime?.sa,
    alarmCalc.value?.weekAlarmTime?.su,
  ].map((item) => {
    return (item || '').split(':');
  });
  const lv1 = timeList.map((e) => e?.[0] || 0);
  const lv2 = timeList.map((e) => e?.[1] || 0);
  const lv3 = timeList.map((e) => e?.[2] || 0);
  barOption.series = [
    {
      type: 'bar',
      name: '等级一',
      data: lv1,
    },
    {
      type: 'bar',
      name: '等级二',
      data: lv2,
    },
    {
      type: 'bar',
      name: '等级三',
      data: lv3,
    },
  ];
  console.log(barOption);
  myChart.setOption(barOption);
});

watch(alarmCalc, () => {
  var myChart = echarts.init(document.getElementById('errorPieChart'), null);
  const timeList = [
    alarmCalc.value?.alarmTimeRate,
  ].map((item) => {
    return (item || '').split(':');
  });
  // const lv1 = timeList.map((e) => e?.[0] || 0);
  const lv1 = timeList.map((e) => e?.[0] || 0)[0];
  const lv2 = timeList.map((e) => e?.[1] || 0)[1];
  const lv3 = timeList.map((e) => e?.[2] || 0)[2];
  pieOptions.series = [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data:[
          {value:lv1,name:'等级一'},
          {value:lv2,name:'等级二'},
          {value:lv3,name:'等级三'},
    ],
    emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    },
    // {
    //   type: 'pie',
    //   name:'等级二',
    //   radius: '50%',
    //   data:[
    //       {value:lv1,name:'等级一'},
    //       {value:lv2,name:'等级二'},
    //       {value:lv3,name:'等级三'} 
    // ],
    // emphasis: {
    //     itemStyle: {
    //       shadowBlur: 10,
    //       shadowOffsetX: 0,
    //       shadowColor: 'rgba(0, 0, 0, 0.5)'
    //     }
    //   }
    // },
    // {
    //   type: 'pie',
    //   name:'等级三',
    //   radius: '50%',
    //   data:[
    //       {value:lv1,name:'等级一'},
    //       {value:lv2,name:'等级二'},
    //       {value:lv3,name:'等级三'} 
    // ],
    // emphasis: {
    //     itemStyle: {
    //       shadowBlur: 10,
    //       shadowOffsetX: 0,
    //       shadowColor: 'rgba(0, 0, 0, 0.5)'
    //     }
    //   }
    // },
  ];
  console.log(pieOptions);
  myChart.setOption(pieOptions);
});



// watch(alarmCalc, () => {
//   var myChart = echarts.init(document.getElementById('errorTimeBarChart'), null);
//   const lv11=[];
//   const lv22=[];
//   const lv33=[];
//   for(var i =0;i<alarmCalc.value.devAlarmTime.length;i++){
//   const timeList = [
//     alarmCalc.value?.devAlarmTime[i].time
//   ].map((item) => {
//     return (item || '').split(':');
//   });
//   //等级一
//   const lv1 = timeList.map((e) => e?.[0] || 0);
//   lv11.push(timeList[i][0][0]);
//   //等级二
//   const lv2 = timeList.map((e) => e?.[1] || 0);
//   lv22.push(timeList[i][0][1]);
//   //等级三
//   const lv3 = timeList.map((e) => e?.[2] || 0);
//   lv33.push(timeList[i][0][2])
//   console.log(i);
  
//   console.log("==========");
//   console.log(timeList);
  
//   console.log(lv1);
//   console.log(lv2);
//   console.log(lv3);

// }

//   bar2Option.series = [
//     {
//       type: 'bar',
//       name: '等级一',
//       data: lv11[0],
//     },
//     {
//       type: 'bar',
//       name: '等级二',
//       data: lv22[1],
//     },
//     {
//       type: 'bar',
//       name: '等级三',
//       data: lv33[2],
//     },
//   ];
  
  
//   console.log(bar2Option);
//   myChart.setOption(bar2Option);
// });
// {
//   "alarmDesc": "safafsfwesd",
//   "alarmLevel": "1",
//   "alarmModule": "time",
//   "alarmState": "NeedSolveManual",
//   "alarmTime": "2023-11-04 16:41:06",
//   "clearTime": "2023-11-04 16:41:46",
//   "confirmTime": "0000-00-00 00:00:00",
//   "devId": "1",
//   "id": "1"
// }

const columns: TableProps['columns'] = [
  { dataIndex: 'id', title: '告警Id' },
  { dataIndex: 'devId', title: '网元Id' },
  { dataIndex: 'alarmLevel', title: '告警等级' },
  { dataIndex: 'alarmModule', title: '告警源' },
  { dataIndex: 'alarmDesc', title: '告警描述' },
  { dataIndex: 'alarmState', title: '告警状态' },
  { dataIndex: 'alarmTime', title: '告警时间' },
  {
    dataIndex: 'confirmTime',
    title: '确认时间',
    customRender({ record }) {
      return record?.confirmTime === '0000-00-00 00:00:00' ? h(Button, {}, '确认') : record?.confirmTime;
    },
  },
  {
    dataIndex: 'clearTime',
    title: '清除时间',
    customRender({ record }) {
      return record?.confirmTime === '0000-00-00 00:00:00' ? h(Button, {}, '清除') : record?.confirmTime;
    },
  },
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
// const alarmColumns: TableProps['columns'] = [
//   { dataIndex: 'mo', title: 'Mon' },
//   { dataIndex: 'tu', title: 'Tue' },
//   { dataIndex: 'we', title: 'Wed' },
//   { dataIndex: 'th', title: 'Thu' },
//   { dataIndex: 'fr', title: 'Fri' },
//   { dataIndex: 'sa', title: 'Sat' },
//   { dataIndex: 'su', title: 'Sun' }

// ];
// onMounted(() => {
//   var myChart = echarts.init(document.getElementById('errorTimeBarChart'), null);
//   myChart.setOption(bar2Option);
//   // var myChart = echarts.init(document.getElementById('louChart'), null);
//   // myChart.setOption(louOptions)
//   var myChart = echarts.init(document.getElementById('errorPieChart'), null);
//   myChart.setOption(pieOptions);
// });
</script>

<style scoped></style>
<route lang="yaml">
meta:
  layout: menu
</route>
