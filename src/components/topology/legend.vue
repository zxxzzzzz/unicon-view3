<template>
  <div class="border-solid border border-blue-900 p-4">
    <div class="flex">
      <div   :style="{ backgroundImage: `url(${imgUrl.legendFaluty})` }" class="w-12 h-12 bg-contain bg-no-repeat"></div>
      <div class="ml-4 text-lg font-bold">故障</div>
    </div>
    <div class="flex">
      <div :style="{ backgroundImage: `url(${imgUrl.legendOffline})` }" class="w-12 h-12 bg-contain bg-no-repeat"></div>
      <div class="ml-4 text-lg font-bold">离线</div>
    </div>
    <div class="flex">
      <div :style="{ backgroundImage: `url(${imgUrl.legendMasterNormal})` }" class="w-12 h-12 bg-contain bg-no-repeat"></div>
      <div class="ml-4 text-lg font-bold">master在线</div>
    </div>
    <div class="flex">
      <div :style="{ backgroundImage: `url(${imgUrl.legendOtherNormal})` }" class="w-12 h-12 bg-contain bg-no-repeat"></div>
      <div class="ml-4 text-lg font-bold">slave/relay在线</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import imgUrl from './img'
</script>
