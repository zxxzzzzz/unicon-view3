<template>
  <div class="border-solid border border-blue-900 p-4">
    <div class="flex">
      <div :style="{ backgroundImage: `url(${img.cx600x8})` }" class="w-12 h-12 bg-contain bg-no-repeat"></div>
      <div class="ml-4 text-lg font-bold">CX600-X8-DO(V8)</div>
    </div>
    <div class="flex">
      <div :style="{ backgroundImage: `url(${img.cx600x16})` }" class="w-12 h-12 bg-contain bg-no-repeat"></div>
      <div class="ml-4 text-lg font-bold">CX600-X16-DO(V8)</div>
    </div>
    <div class="flex">
      <div :style="{ backgroundImage: `url(${img.cx600x16a})` }" class="w-12 h-12 bg-contain bg-no-repeat"></div>
      <div class="ml-4 text-lg font-bold">CX600-X16A-DO(V8)</div>
    </div>
    <div class="flex">
      <div :style="{ backgroundImage: `url(${img.service})` }" class="w-12 h-12 bg-contain bg-no-repeat"></div>
      <div class="ml-4 text-lg font-bold">Service</div>
    </div>
    <div class="flex">
      <div :style="{ backgroundImage: `url(${img.atn950b})` }" class="w-12 h-12 bg-contain bg-no-repeat"></div>
      <div class="ml-4 text-lg font-bold">ATN950B</div>
    </div>
    <div class="flex mt-6 items-center">
      <div
        class="w-20 h-1"
        :style="{
          background:
            'linear-gradient(to right, blue 0% 10%,white 10% 20%,blue 20% 30%,white 30% 40%,blue 40% 50%,white 50% 60%,blue 60% 70%,white 70% 80%,blue 80% 90%,white 90% 100%)',
        }"
      ></div>
      <div class="ml-2">时间路径</div>
    </div>
    <div class="flex mt-8 items-center">
      <div
        class="w-20 h-1"
        :style="{
          background:
            'linear-gradient(to right, red 0% 10%,white 10% 20%,red 20% 30%,white 30% 40%,red 40% 50%,white 50% 60%,red 60% 70%,white 70% 80%,red 80% 90%,white 90% 100%)',
        }"
      ></div>
      <div class="ml-2">频率路径</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import img from './img';
</script>
