<template>
  <div class="flex">
    <div class="w-10rem mr-2rem">
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9" :class="state.currentTabName === TabName.网元 ? 'text-white' : ''" @click="handleTabClick(TabName.网元)">网元</div>
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9" :class="state.currentTabName === TabName.板卡 ? 'text-white' : ''" @click="handleTabClick(TabName.板卡)">板卡</div>
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9" :class="state.currentTabName === TabName.端口 ? 'text-white' : ''" @click="handleTabClick(TabName.端口)">端口</div>
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9" :class="state.currentTabName === TabName.频率 ? 'text-white' : ''" @click="handleTabClick(TabName.频率)">频率</div>
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9" :class="state.currentTabName === TabName.时间 ? 'text-white' : ''" @click="handleTabClick(TabName.时间)">时间</div>
    </div>
    <div class="flex-1">
      <div v-if="state.currentTabName === TabName.网元">
        <div class="flex">
          <div class="w-10rem">NodeId</div>
          <div><Input></Input></div>
        </div>
        <div class="flex">
          <div class="w-10rem">Duty</div>
          <div><Select v-model:value="state.duty" class="w-186px" :options="dutyOptions"></Select></div>
        </div>
        <div class="flex">
          <div class="w-10rem">state</div>
          <div><Input></Input></div>
        </div>
        <div class="flex">
          <div class="w-10rem">ClockClass</div>
          <div><Input></Input></div>
        </div>
        <button @click="">确定</button>
      </div>
      <div v-if="state.currentTabName === TabName.板卡">
        <div class="flex">
          <div class="w-10rem">P</div>
          <div><Input></Input></div>
        </div>
        <div class="flex">
          <div class="w-10rem">I</div>
          <div><Input></Input></div>
        </div>
        <div class="flex">
          <div class="w-10rem">D</div>
          <div><Input></Input></div>
        </div>
        <div class="flex">
          <div class="w-10rem">FiberConfig</div>
          <div><Select class="w-186px" :options="fiberConfigOptions"></Select></div>
        </div>
        <div class="flex">
          <div class="w-10rem">setValue</div>
          <div><Input></Input></div>
        </div>
        <div class="flex">
          <div class="w-10rem">clockSource</div>
          <div><Select class="w-186px" :options="clockSourceOptions"></Select></div>
        </div>
        <button @click="">确定</button>
      </div>
      <div v-if="state.currentTabName === TabName.端口">
        <Tabs v-model:activeKey="state.currentPortTabName">
          <TabPane v-for="port in portList" :key="port.tabName" :tab="port.tabName">
            <div v-for="item in port.itemList" class="flex">
              <div class="w-10rem">{{ item.title }}</div>
              <div><Select class="w-186px" :options="item.options"></Select></div>
            </div>
          </TabPane>
        </Tabs>
        <button @click="">确定</button>
      </div>
      <div v-if="state.currentTabName === TabName.频率">
        <Tabs v-model:activeKey="state.currentFrequencyTabName">
          <TabPane v-for="freq in freqList" :key="freq.tabName" :tab="freq.tabName">
            <div v-for="item in freq.itemList" class="flex">
              <div class="w-10rem">{{ item.title }}</div>
              <div><Select class="w-186px" :options="item.options"></Select></div>
            </div>
          </TabPane>
        </Tabs>
        <button @click="">确定</button>
      </div>
      <div v-if="state.currentTabName === TabName.时间">
        <Tabs v-model:activeKey="state.currentTimeTabName">
          <TabPane v-for="time in timeList" :key="time.tabName" :tab="time.tabName">
            <div v-for="item in time.itemList" class="flex">
              <div class="w-10rem">{{ item.title }}</div>
              <div><Select class="w-186px" :options="item.options"></Select></div>
            </div>
          </TabPane>
        </Tabs>
        <button @click="">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input, Tabs, TabPane, Select } from 'ant-design-vue';
import { getDevCurConfig, getDevConfigParam } from '@/api/index';
import { useRoute } from 'vue-router';

const { data } = getDevConfigParam();

const route = useRoute();

const dutyOptions = computed(() => {
  return (data.value?.result?.devList?.[0]?.property?.duty || []).map((v: string) => ({ label: v, value: v }));
});
const clockLevelOptions = computed(() => {
  return (data.value?.result?.devList?.[0]?.property?.moduleList?.[0]?.property?.clockLevel || []).map((v: string) => ({ label: v, value: v }));
});
const clockSourceOptions = computed(() => {
  return (data.value?.result?.devList?.[0]?.property?.moduleList?.[0]?.property?.clockSource || []).map((v: string) => ({ label: v, value: v }));
});
const fiberConfigOptions = computed(() => {
  return (data.value?.result?.devList?.[0]?.property?.moduleList?.[0]?.property?.fiberConfig || []).map((v: string) => ({ label: v, value: v }));
});

const portList = computed(() => {
  return (data.value?.result?.devList?.[0]?.property?.portList || []).map((port: any) => {
    return {
      tabName: port.object,
      itemList: Object.entries(port.property).map(([key, value]) => {
        return {
          title: key,
          options: (value as any).flat().map((v: string) => ({ label: v, value: v })),
        };
      }),
    };
  });
});
const freqList = computed(() => {
  return (data.value?.result?.devList?.[0]?.property?.freqList || []).map((port: any) => {
    return {
      tabName: port.object,
      itemList: Object.entries(port.property).map(([key, value]) => {
        return {
          title: key,
          options: (value as any).flat().map((v: string) => ({ label: v, value: v })),
        };
      }),
    };
  });
});
const timeList = computed(() => {
  return (data.value?.result?.devList?.[0]?.property?.timeList || []).map((port: any) => {
    return {
      tabName: port.object,
      itemList: Object.entries(port.property).map(([key, value]) => {
        return {
          title: key,
          options: (value as any).flat().map((v: string) => ({ label: v, value: v })),
        };
      }),
    };
  });
});

enum TabName {
  网元,
  板卡,
  端口,
  频率,
  时间,
}

enum PortTabName {
  SMA_1,
  SMA_2,
  SMA_3,
}
enum FrequencyTabName {
  输入,
  输出,
}
enum TimeTabName {
  输入,
  输出,
  输出1,
}

const state = ref<{
  currentTabName: TabName;
  currentPortTabName: PortTabName;
  currentFrequencyTabName: FrequencyTabName;
  currentTimeTabName: TimeTabName;
  duty: string;
  location: string;
  nodeId: number;
  state: string;
}>({
  currentTabName: TabName.网元,
  currentPortTabName: PortTabName.SMA_1,
  currentFrequencyTabName: FrequencyTabName.输入,
  currentTimeTabName: TimeTabName.输入,

  duty: '',
  location: '',
  nodeId: 0,
  state: '',
});

onMounted(async () => {
  const { data: curData } = await getDevCurConfig();
  const d = (curData.value?.result?.devList || []).find((item: any) => {
    console.log(item, route.query.id);
    return item.nodeId == route.query.id;
  });
  console.log(d);
  if (d) {
    state.value = {
      ...state.value,
      ...d,
    };
  }
});

const handleTabClick = (tabName: TabName) => {
  state.value.currentTabName = tabName;
};
</script>

<style scoped></style>
