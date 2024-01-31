<template>
  <div>
    <div>
      <RangePicker v-model:value="dateRange" show-time />
    </div>
    <div class="flex mt-5">
      <div class="w-6rem text-1.5rem">时间</div>
      <Button type="primary" @click="handleTimeDownload">下载</Button>
      <Select mode="multiple" :options="timeOption" class="w-20rem" v-model:value="state.timeColumn"></Select>
    </div>
    <div class="flex mt-5">
      <div class="w-6rem text-1.5rem">频率</div>
      <Button type="primary" class="" @click="handleFreqDownload">下载</Button>
      <Select mode="multiple" :options="freqOption" class="w-20rem" v-model:value="state1.freqColumn"></Select>
    </div>
    <!-- <div class="flex mt-5">
      <div class="w-6rem text-1.5rem" >TDEV</div>
      <Button type="primary" class="" @click="handleFreqDownload">下载</Button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { Button, Select, RangePicker } from 'ant-design-vue';
import { ref } from 'vue';
import { getCsvFile } from '@/api/index';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

type RangeValue = [Dayjs, Dayjs];
const dateRange = ref<RangeValue>([dayjs().subtract(7, 'days'), dayjs()]);
const state = ref({
  timeColumn:[] as string[]
});
const state1 = ref({
    freqColumn:[]as string[]
})
const timeOption = [['节点id', 'nodeId'], ['Name','name'], ['Tab','tab'], ['Tba','tba'], ['Td','td'], ['DeltaT','deltaT'], ['ErrorT','errorT'], ['CreatedTime','createdTime']].map((v) => ({ value: v[1], label: v[0] }));
const freqOption = [
  { label: '节点id', value: 'nodeId' },
  { label: 'Name', value: 'name' },
  { label: 'Value', value: 'value' },
  { label: 'CreatedTime', value: 'createdTime' },
];

const handleTimeDownload = async () => {
  const { data } = await getCsvFile({
    type: 'time',
    col: state.value.timeColumn,
    startTime: dateRange.value[0].format('YYYY-MM-DD HH:mm:ss'),
    endTime: dateRange.value[1].format('YYYY-MM-DD HH:mm:ss'),
    dataType: 'string',
  });
  if (data.value?.result?.filebody) {
    const url = URL.createObjectURL(new Blob([data.value?.result?.filebody]));
    const linkDom = document.createElement('a');
    linkDom.href = url;
    linkDom.download = data.value?.result?.remark;
    linkDom.click();
  }
};
const handleFreqDownload = async () => {
  const { data } = await getCsvFile({
    type: 'freq',
    col: state1.value.freqColumn,
    startTime: dateRange.value[0].format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange.value[1].format('YYYY-MM-DD HH:mm:ss'),
    dataType: 'string',
  });
  if (data.value?.result?.filebody) {
    const url = URL.createObjectURL(new Blob([data.value?.result?.filebody]));
    const linkDom = document.createElement('a');
    linkDom.href = url;
    linkDom.download = data.value?.result?.remark;
    linkDom.click();
  }
};
</script>
<style scoped></style>
