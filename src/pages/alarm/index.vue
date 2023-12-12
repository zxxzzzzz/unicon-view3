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
        <Button type="primary" @click="handleAlarmType">告警等级</Button>
        <div class="w-55% ml-a">
          <RangePicker v-model:value="dateRange" show-time />
        </div>
        <Button type="primary" @click="handleAlarmTime">确认</Button>
        <Button type="primary">下载</Button>
      </div>
      <Table :columns="columns" :data-source="alarmList" :pagination="{ pageSize: 4 }"></Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { Table, Statistic, TableProps, Button, Modal } from 'ant-design-vue';
import { pieOptions, barOption, bar2Option } from './options';
import { RangePicker } from 'ant-design-vue';
import { getAlarmCalc, getAlarmParam, delay, alarmConfirm, alarmClear } from '@/api/index';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import AlarmTypeCom from './component/alarmType.vue';
// const data = alarmClear({id:'8',clearTime:'2023-12-11'})
// console.log(data);

type RangeValue = [Dayjs, Dayjs];
const dateRange = ref<RangeValue>([dayjs().subtract(7, 'days'), dayjs()]);
const alarmList = ref([]);
const alarmCalc = ref<any>({});
onMounted(async () => {
  const res = await getAlarmParam({ startTime: '2001-01-01', endTime: '2001-01-01' });
  alarmList.value = res.data.value?.result?.alarmList || [];
  await delay(500);
  const res2 = await getAlarmCalc({ startTime: '2001-01-01', endTime: '2001-01-01' });
  alarmCalc.value = res2.data.value?.result || {};
});

const handleAlarmTime = async () => {
  const res = await getAlarmParam({ startTime: dateRange.value[0].format('YYYY-MM-DD'), endTime: dateRange.value[1].format('YYYY-MM-DD') });
  alarmList.value = res.data.value?.result?.alarmList || [];
  const res2 = await getAlarmCalc({ startTime: dateRange.value[0].format('YYYY-MM-DD'), endTime: dateRange.value[1].format('YYYY-MM-DD') });
  alarmCalc.value = res2.data.value?.result || {};
};
// // const data = getAlarmType();
const handleAlarmType = () => {
  Modal.info({
    title: '故障等级',
    width: '80%',
    content: () => {
      return h(AlarmTypeCom);
    },
  });
};
const columns: TableProps['columns'] = [
  { dataIndex: 'id', title: '告警Id' },
  {
    dataIndex: 'devId',
    title: '网元Id',
    //   customRender({record}){
    //     if(record.)
    // }
  },
  { dataIndex: 'alarmLevel', title: '告警等级' },
  { dataIndex: 'alarmModule', title: '告警源' },
  { dataIndex: 'alarmDesc', title: '告警描述' },
  { dataIndex: 'alarmState', title: '告警状态' },
  { dataIndex: 'alarmTime', title: '告警时间' },
  {
    dataIndex: 'confirmTime',
    title: '确认时间',
    customRender({ record }) {
      return record?.confirmTime === '2000-01-01 00:00:00'
        ? h(
            Button,
            {
              async onClick() {
                await alarmConfirm({ id: record.id, confirmTime: record.confirmTime });
                const res = await getAlarmParam({ startTime: dateRange.value[0].format('YYYY-MM-DD'), endTime: dateRange.value[1].format('YYYY-MM-DD') });
                alarmList.value = res.data.value?.result?.alarmList || [];
              },
            },
            '确认',
          )
        : record?.confirmTime;
    },
  },
  {
    dataIndex: 'clearTime',
    title: '清除时间',
    customRender({ record }) {
      return record?.clearTime === '2000-01-01 00:00:00'
        ? h(
            Button,
            {
              async onClick() {
                await alarmClear({ id: record.id, clearTime: record.clearTime });
                const res = await getAlarmParam({ startTime: dateRange.value[0].format('YYYY-MM-DD'), endTime: dateRange.value[1].format('YYYY-MM-DD') });
                alarmList.value = res.data.value?.result?.alarmList || [];
              },
            },
            '清除',
          )
        : record?.clearTime;
    },
  },
];

watch(alarmCalc, () => {
  var myChart = echarts.init(document.getElementById('errorPieChart'), null);
  const timeList = [alarmCalc.value?.alarmTimeRate].map((item) => {
    return (item || '').split(':');
  });
  const lv1 = timeList.map((e) => e?.[0] || 0);
  const lv2 = timeList.map((e) => e?.[1] || 0);
  const lv3 = timeList.map((e) => e?.[2] || 0);
  pieOptions.series[0].data = [
    { value: lv1.reduce((a, b) => a + b), name: '等级一' },
    { value: lv2.reduce((a, b) => a + b), name: '等级二' },
    { value: lv3.reduce((a, b) => a + b), name: '等级三' },
  ];
  myChart.setOption(pieOptions);
});

//一周异常
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
  myChart.setOption(barOption);
});

// 故障时间
watch(alarmCalc, () => {
  var myChart = echarts.init(document.getElementById('errorTimeBarChart'), null);
  const xAxis = (alarmCalc.value?.devAlarmTime || [])
    .map((item: any) => {
      return item?.devId || '';
    })
    .filter((d: any) => d);
  bar2Option.xAxis.data = xAxis;
  const lvList = xAxis.map((x: any) => {
    return (alarmCalc.value?.devAlarmTime || []).find((item: any) => item?.devId === x)?.time?.split?.(':') || [0, 0, 0];
  });
  const lv1 = lvList.map((e: any) => e?.[0] || 0);
  const lv2 = lvList.map((e: any) => e?.[1] || 0);
  const lv3 = lvList.map((e: any) => e?.[2] || 0);
  bar2Option.series = [
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

  myChart.setOption(bar2Option);
});

onMounted(() => {});
</script>

<style scoped></style>
<route lang="yaml">
meta:
  layout: menu
</route>
