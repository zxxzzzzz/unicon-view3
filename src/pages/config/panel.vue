<template>
  <div class="flex">
    <div class="w-10rem mr-2rem">
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9" :class="tabState.currentTabName === TabName.网元 ? 'text-white' : ''" @click="handleTabClick(TabName.网元)">网元</div>
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9" :class="tabState.currentTabName === TabName.板卡 ? 'text-white' : ''" @click="handleTabClick(TabName.板卡)">板卡</div>
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9" :class="tabState.currentTabName === TabName.端口 ? 'text-white' : ''" @click="handleTabClick(TabName.端口)">端口</div>
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9" :class="tabState.currentTabName === TabName.频率 ? 'text-white' : ''" @click="handleTabClick(TabName.频率)">频率</div>
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9" :class="tabState.currentTabName === TabName.时间 ? 'text-white' : ''" @click="handleTabClick(TabName.时间)">时间</div>
    </div>
    <div class="flex-1">
      <div v-if="tabState.currentTabName === TabName.网元">
        <Tabs v-model:activeKey="tabState.currentDevTabName">
          <TabPane v-for="(dev, index) in devList" :key="dev.tabName" :tab="dev.tabName">
            <div v-for="item in dev.itemList" class="flex mb-1rem">
              <div class="w-10rem">{{ item.title }}</div>
              <div>
                <Select v-model:value="devListState[index][item.title]" v-if="item.type === 'select'" class="w-186px" :options="item.options"></Select>
                <Input v-else  :disabled="item.readonly" class="w-186px" v-model:value.number="devListState[index][item.title]"></Input>
              </div>
            </div>
            <Button @click="handleSetModule(index)">确定</Button>
          </TabPane>
        </Tabs>
      </div>
      <div v-if="tabState.currentTabName === TabName.板卡">
        <Tabs v-model:activeKey="tabState.currentModuleTabName">
          <TabPane v-for="(_module, index) in moduleList" :key="_module.tabName" :tab="_module.tabName">
            <div v-for="item in _module.itemList" class="flex mb-1rem">
              <div class="w-10rem">{{ item.title }}</div>
              <div>
                <Select v-model:value="moduleListState[index][item.title]" v-if="item.type === 'select'" class="w-186px" :options="item.options"></Select>
                <Input v-else class="w-186px" v-model:value.number="moduleListState[index][item.title]"></Input>
              </div>
            </div>
            <Button @click="handleSetModule(index)">确定</Button>
          </TabPane>
        </Tabs>
      </div>
      <div v-if="tabState.currentTabName === TabName.端口">
        <Tabs v-model:activeKey="tabState.currentPortTabName">
          <TabPane v-for="(port, index) in portList" :key="port.tabName" :tab="port.tabName">
            <div v-for="item in port.itemList" class="flex">
              <div class="w-10rem">{{ item.title }}</div>
              <div>
                <Select v-model:value="portListState[index][item.title]" v-if="item.type === 'select'" class="w-186px" :options="item.options"></Select>
                <Input v-else class="w-186px" v-model:value.number="portListState[index][item.title]"></Input>
              </div>
            </div>
            <Button @click="handleSetPort(index)">确定</Button>
          </TabPane>
        </Tabs>
      </div>
      <div v-if="tabState.currentTabName === TabName.频率">
        <Tabs v-model:activeKey="tabState.currentFrequencyTabName">
          <TabPane v-for="(freq, index) in freqList" :key="freq.tabName" :tab="freq.tabName">
            <div v-for="item in freq.itemList" class="flex">
              <div class="w-10rem">{{ item.title }}</div>
              <div>
                <Select v-model:value="freqListState[index][item.title]" v-if="item.type === 'select'" class="w-186px" :options="item.options"></Select>
                <Input v-else class="w-186px" v-model:value.number="freqListState[index][item.title]"></Input>
              </div>
            </div>
            <Button @click="handleSetFreq(index)">确定</Button>
          </TabPane>
        </Tabs>
      </div>
      <div v-if="tabState.currentTabName === TabName.时间">
        <Tabs v-model:activeKey="tabState.currentTimeTabName">
          <TabPane v-for="(time, index) in timeList" :key="time.tabName" :tab="time.tabName">
            <div v-for="item in time.itemList" class="flex">
              <div class="w-10rem">{{ item.title }}</div>
              <div>
                <Select v-model:value="timeListState[index][item.title]" v-if="item.type === 'select'" class="w-186px" :options="item.options"></Select>
                <Input v-else class="w-186px" v-model:value.number="timeListState[index][item.title]"></Input>
              </div>
            </div>
            <Button @click="handleSetTime(index)">确定</Button>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input, Tabs, TabPane, Select, Button, message } from 'ant-design-vue';
import { getDevCurConfig, getDevConfigParam, setDevPortConfig } from '@/api/index';
import { useRoute } from 'vue-router';

const { data } = getDevConfigParam();

const route = useRoute();

const devList = computed(() => {
  return (data.value?.result?.devList?.[0]?.property?.devList || []).map((port: any) => {
    return {
      tabName: port.object,
      itemList: Object.entries(port.property).map(([key, value]) => {
        const type = Array.isArray(value) ? 'select' : value;
        return {
          title: key,
          readonly: key === 'nodeId',
          type: type,
          options: type === 'select' ? (value as any).flat().map((v: string) => ({ label: v, value: v })) : [],
        };
      }),
    };
  });
});
const moduleList = computed(() => {
  return (data.value?.result?.devList?.[0]?.property?.moduleList || []).map((port: any) => {
    return {
      tabName: port.object,
      itemList: Object.entries(port.property).map(([key, value]) => {
        const type = Array.isArray(value) ? 'select' : value;
        return {
          title: key,
          type: type,
          options: type === 'select' ? (value as any).flat().map((v: string) => ({ label: v, value: v })) : [],
        };
      }),
    };
  });
});

const portList = computed(() => {
  return (data.value?.result?.devList?.[0]?.property?.portList || []).map((port: any) => {
    return {
      tabName: port.object,
      itemList: Object.entries(port.property).map(([key, value]) => {
        const type = Array.isArray(value) ? 'select' : value;
        return {
          title: key,
          type,
          options: type === 'select' ? (value as any).flat().map((v: string) => ({ label: v, value: v })) : [],
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
        const type = Array.isArray(value) ? 'select' : value;
        return {
          title: key,
          type,
          options: type === 'select' ? (value as any).flat().map((v: string) => ({ label: v, value: v })) : [],
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
        const type = Array.isArray(value) ? 'select' : value;
        return {
          title: key,
          type,
          options: type === 'select' ? (value as any).flat().map((v: string) => ({ label: v, value: v })) : [],
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

const tabState = ref<{
  currentTabName: TabName;
  currentDevTabName: string;
  currentModuleTabName: string;
  currentPortTabName: string;
  currentFrequencyTabName: string;
  currentTimeTabName: string;
}>({
  currentTabName: TabName.网元,
  currentDevTabName: '',
  currentModuleTabName: '',
  currentPortTabName: '',
  currentFrequencyTabName: '',
  currentTimeTabName: '',
});

const devListState = ref<{ [key: string]: any }>({});
const moduleListState = ref<{ [key: string]: any }>({});
const portListState = ref<{ [key: string]: any }>({});
const freqListState = ref<{ [key: string]: any }>({});
const timeListState = ref<{ [key: string]: any }>({});

watch(data, async () => {
  const { data: curData } = await getDevCurConfig();
  const d = (curData.value?.result?.devList || []).find((item: any) => {
    return item.nodeId == route.query.id;
  });
  nextTick(() => {
    tabState.value.currentDevTabName = devList.value?.[0]?.tabName || '';
    tabState.value.currentModuleTabName = moduleList.value?.[0]?.tabName || '';
    tabState.value.currentPortTabName = portList.value?.[0]?.tabName || '';
    tabState.value.currentFrequencyTabName = freqList.value?.[0]?.tabName || '';
    tabState.value.currentTimeTabName = timeList.value?.[0]?.tabName || '';

    devListState.value = (devList.value as any[]).map((item) => {
      return item.itemList.reduce((re: any, e: any) => {
        return { ...re, [e.title]: '' };
      }, {});
    });
    moduleListState.value = (moduleList.value as any[]).map((item) => {
      return item.itemList.reduce((re: any, e: any) => {
        return { ...re, [e.title]: '' };
      }, {});
    });
    portListState.value = (portList.value as any[]).map((item) => {
      return item.itemList.reduce((re: any, e: any) => {
        return { ...re, [e.title]: '' };
      }, {});
    });
    freqListState.value = (freqList.value as any[]).map((item) => {
      return item.itemList.reduce((re: any, e: any) => {
        return { ...re, [e.title]: '' };
      }, {});
    });
    timeListState.value = (timeList.value as any[]).map((item) => {
      return item.itemList.reduce((re: any, e: any) => {
        return { ...re, [e.title]: '' };
      }, {});
    });
    if (d.duty) {
      devListState.value[0]['duty'] = d.duty;
      devListState.value[0]['nodeId'] = d.nodeId;
    }
    if (d.moduleList) {
      moduleListState.value = d.moduleList;
    }
    if (d.portList) {
      portListState.value = d.portList;
    }
    if (d.freqList) {
      freqListState.value = d.freqList;
    }
    if (d.timeList) {
      timeListState.value = d.timeList;
    }
  });
  if (d) {
    tabState.value = {
      ...tabState.value,
      ...d,
    };
  }
});

const handleTabClick = (tabName: TabName) => {
  tabState.value.currentTabName = tabName;
};

const handleSetModule = async (index: number) => {
  await setDevPortConfig({
    nodeId: parseInt(route.query.id as string),
    type: 'module',
    name: tabState.value.currentModuleTabName,
    paramList: Object.entries(moduleListState.value[index] as any).map(([key, value]) => {
      return {
        paramName: key,
        value: value as any,
      };
    }),
  });
  message.success('修改成功');
};
const handleSetPort = async (index: number) => {
  await setDevPortConfig({
    nodeId: parseInt(route.query.id as string),
    type: 'port',
    name: tabState.value.currentPortTabName,
    paramList: Object.entries(portListState.value[index] as any).map(([key, value]) => {
      return {
        paramName: key,
        value: value as any,
      };
    }),
  });
  message.success('修改成功');
};
const handleSetFreq = async (index: number) => {
  await setDevPortConfig({
    nodeId: parseInt(route.query.id as string),
    type: 'freq',
    name: tabState.value.currentFrequencyTabName,
    paramList: Object.entries(freqListState.value[index] as any).map(([key, value]) => {
      return {
        paramName: key,
        value: value as any,
      };
    }),
  });
  message.success('修改成功');
};
const handleSetTime = async (index: number) => {
  await setDevPortConfig({
    nodeId: parseInt(route.query.id as string),
    type: 'time',
    name: tabState.value.currentTimeTabName,
    paramList: Object.entries(timeListState.value[index] as any).map(([key, value]) => {
      return {
        paramName: key,
        value: value as any,
      };
    }),
  });
  message.success('修改成功');
};
</script>

<style scoped></style>
