<!-- 告警管理 -->
<template>
  <div class="w-full h-full bg-cover bg-no-repeat flex bg-[rgba(214,218,234,1)]">
    <div class="w-43%">
      <div id="errorPieChart" class="border border-solid border-gray my-2 h-32%"></div>
      <div id="errorBarChart" class="border border-solid border-gray my-2 h-32%"></div>
      <div id="errorTimeBarChart" class="border border-solid border-gray mt-2 h-32%"></div>
    </div>
    <div class="w-57%" ref="containerDomRef">
      <div class="h-16% my-2 border border-solid border-gray">
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
        <Button type="primary" @click="handleDownload">下载</Button>
      </div>
      <Table :columns="columns" :data-source="alarmList" :scroll="{ x: '100%', y: tableHeight }" :rowClassName="rowClassName"></Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { Table, Statistic, TableProps, Button, Modal } from 'ant-design-vue';
import { pieOptions, barOption, bar2Option } from './options';
import { RangePicker } from 'ant-design-vue';
import { getAlarmCalc, getAlarmParam, delay, alarmConfirm, alarmClear, setAlarmType, getCsvFile } from '@/api/index';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import AlarmTypeCom from './component/alarmType.vue';
import { useElementSize } from '@vueuse/core';

const containerDomRef = ref<HTMLDivElement>();
const { height } = useElementSize(containerDomRef);
const tableHeight = computed(() => {
  return height.value - height.value * 0.26 - 32 - 162;
});
type RangeValue = [Dayjs, Dayjs];
const dateRange = ref<RangeValue>([dayjs().subtract(7, 'days'), dayjs()]);
const alarmList = ref([]);
const alarmCalc = ref<any>({});

onMounted(async () => {
  const res = await getAlarmParam({ startTime: '2000-01-01', endTime: '2000-01-01' });
  alarmList.value = res.data.value?.result?.alarmList || [];
  await delay(500);
  const res2 = await getAlarmCalc({ startTime: '2000-01-01', endTime: '2000-01-01' });
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
  let data: any[] = [];
  Modal.confirm({
    title: '故障等级',
    width: '80%',
    content: () => {
      return h(AlarmTypeCom, {
        onChange(v) {
          data = v;
        },
      });
    },
    onOk() {
      setAlarmType({ alarmTypeList: data });
    },
  });
};

const rowClassName = (record: any) => {
  if (record?.clearTime !== '2000-01-01 00:00:00') {
    return '';
  }
  if (record.alarmLevel === '1') {
    return 'bg-[#ff552b]';
  }
  if (record.alarmLevel === '2') {
    return 'bg-[#ff9f82]';
  }
  if (record.alarmLevel === '3') {
    return 'bg-[#ffffde]';
  }
  return '';
};
const columns: TableProps['columns'] = [
  { dataIndex: 'id', title: '告警Id', width: 60 },
  { dataIndex: 'devId', title: '网元Id', width: 60 },
  { dataIndex: 'alarmLevel', title: '告警等级', width: 60 },
  { dataIndex: 'alarmModule', title: '故障类型', width: 100 },
  { dataIndex: 'alarmDesc', title: '告警描述', width: 100 },
  { dataIndex: 'alarmState', title: '告警状态', width: 100 },
  { dataIndex: 'alarmTime', title: '告警时间', width: 120 },
  {
    dataIndex: 'confirmTime',
    title: '确认时间',
    width: 120,
    customRender({ record }) {
      return record?.confirmTime === '2000-01-01 00:00:00'
        ? h(
            Button,
            {
              async onClick() {
                await alarmConfirm({ id: record.id, confirmTime: record.confirmTime });
                // window.location.reload();
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
    width: 120,
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
      barGap:'0%',
      
    },
    {
      type: 'bar',
      name: '等级二',
      data: lv2,
      barGap:'0%',
    },
    {
      type: 'bar',
      name: '等级三',
      data: lv3,
      barGap:'0%',
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
    .filter((d: any) => d)
  bar2Option.xAxis.data = xAxis.map((d: string) => `节点${d}`)
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
      barGap: '0%',
      data: lv1,
    },
    {
      type: 'bar',
      barGap: '0%',
      name: '等级二',
      data: lv2,
    },
    {
      barGap: '0%',
      type: 'bar',
      name: '等级三',
      data: lv3,
    },
  ];

  myChart.setOption(bar2Option);
});

const handleDownload = async () => {
  const { data } = await getCsvFile({
    type: 'alarm',
    col: ['id', 'nodeId', 'alarmLevel', 'state', 'alarmTime'],
    startTime: dateRange.value[0].format('YYYY-MM-DD'),
    endTime: dateRange.value[1].format('YYYY-MM-DD'),
    dataType: 'string',
  });
  if (data.value?.result?.filebody) {
    const url = URL.createObjectURL(new Blob([data.value?.result?.filebody]));
    const linkDom = document.createElement('a');
    linkDom.href = url;
    linkDom.download = 'text.csv';
    linkDom.click();
  }
};

onMounted(() => {});
</script>

<style scoped></style>
<route lang="yaml">
meta:
  layout: menu
</route>
