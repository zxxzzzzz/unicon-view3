<template>
  <div class="p-4">
    <div class="flex mb-2">
      <div class="w-8rem">nodeId</div>
      <div>{{ props.nodeId }}</div>
    </div>
    <div class="flex mb-2">
      <div class="w-8rem">10M有无</div>
      <div>{{ props.hasFreq }}</div>
    </div>
    <div class="flex mb-2">
      <div class="w-8rem">10M功率（dBm）</div>
      <div>{{ props.freqSignalPower }}</div>
    </div>
    <div class="flex mb-2">
      <div class="w-8rem">频差（Hz）</div>
      <div>{{ props.freqDiff }}</div>
    </div>
    <div class="flex mb-2">
      <div class="w-8rem">脉宽（ns）</div>
      <div>{{ props.ppsWidth }}</div>
    </div>
    <div class="flex">
      <div class="w-8rem">上升沿时间（ps）</div>
      <div>{{ props.ppsPosedge }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ nodeId: number; hasFreq: boolean; freqSignalPower: number; freqDiff: number; ppsWidth: number; ppsPosedge: number }>();
</script>

<style scoped></style>
