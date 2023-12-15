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
    <div class="flex mt-5">
      <div class="w-6rem text-1.5rem" >TDEV</div>
      <Button type="primary" class="" @click="handleFreqDownload">下载</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, Select, RangePicker } from 'ant-design-vue';
import { ref, watch, watchEffect, computed } from 'vue';
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
const timeOption = ['nodeId', 'name', 'tab', 'tba', 'td', 'delta', 'error', 'createdTime'].map((v) => ({ value: v, label: v }));
const freqOption = [
  { label: 'nodeId', value: 'nodeId' },
  { label: 'name', value: 'name' },
  { label: 'value', value: 'value' },
  { label: 'createdTime', value: 'createdTime' },
];

const handleTimeDownload = async () => {
  const { data } = await getCsvFile({
    type: 'time',
    col: state.value.timeColumn,
    startTime: '2023-11-01',
    endTime: '2023-12-14',
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
    startTime: '2023-11-01',
    endTime: '2023-12-14',
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
