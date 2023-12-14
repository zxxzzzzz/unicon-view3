<template>
    <div>
        <div class="flex">
            <div class="w-6rem"><h2>时间</h2></div>
                <Button type="primary" class="mt-5" @click="handleTimeDownload">下载</Button>
        </div>
        <div class="flex">
                <div class="w-6rem"><h2>频率</h2></div>
                <Button type="primary" class="mt-5" @click="handleFreqDownload">下载</Button>
        </div>
        <div class="flex">
            <div class="w-6rem"><h2>TDEV</h2></div>
                <Button type="primary" class="mt-5" @click="handleFreqDownload">下载</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button} from 'ant-design-vue';
import { ref, watch, watchEffect, computed,} from 'vue';
import { getCsvFile} from '@/api/index';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
type RangeValue = [Dayjs, Dayjs];
const dateRange = ref<RangeValue>([dayjs().subtract(7, 'days'), dayjs()]);

const handleTimeDownload = async()=>{
    const { data } = await getCsvFile({
    type: 'time',
    col: ['nodeId','name','value','createdTime'],
    startTime: '2023-11-01',
    endTime: '2023-12-14',
    dataType: 'string',
  });
  if (data.value?.result?.filebody) {
    const url = URL.createObjectURL(new Blob([data.value?.result?.filebody]));
    const linkDom = document.createElement('a')
    linkDom.href = url
    linkDom.download = data.value?.result?.remark;
    linkDom.click()
  }
}
const handleFreqDownload = async()=>{
    const { data } = await getCsvFile({
    type: 'freq',
    col: ['nodeId','name','value','createdTime'],
    startTime: '2023-11-01',
    endTime: '2023-12-14',
    dataType: 'string',
  });
  if (data.value?.result?.filebody) {
    const url = URL.createObjectURL(new Blob([data.value?.result?.filebody]));
    const linkDom = document.createElement('a')
    linkDom.href = url
    linkDom.download = data.value?.result?.remark;
    linkDom.click()
  }
}
</script>
<style scoped></style>