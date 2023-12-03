
<template>
  <div class="flex">
    <div class="w-10rem mr-2rem">
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9"
        :class="state.currentTabName === TabName.网元 ? 'text-white' : ''" @click="handleTabClick(TabName.网元)">网元
      </div>
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9"
        :class="state.currentTabName === TabName.板卡 ? 'text-white' : ''" @click="handleTabClick(TabName.板卡)">板卡
      </div>
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9"
        :class="state.currentTabName === TabName.端口 ? 'text-white' : ''" @click="handleTabClick(TabName.端口)">端口
      </div>
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9"
        :class="state.currentTabName === TabName.频率 ? 'text-white' : ''" @click="handleTabClick(TabName.频率)">频率
      </div>
      <div class="py-2rem text-center bg-blue border border-solid border-blue-9"
        :class="state.currentTabName === TabName.时间 ? 'text-white' : ''" @click="handleTabClick(TabName.时间)">时间
      </div>
    </div>
    <div class="flex-1">
      <div v-if="state.currentTabName === TabName.网元">
        <div class="flex">
          <div class="w-10rem">NodeId</div>
          <div><Input></Input></div>
        </div>
        <div class="flex">
          <div class="w-10rem">Duty</div>
          <div><Input></Input></div>
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
          <div><Input></Input></div>
        </div>
        <div class="flex">
          <div class="w-10rem">setValue</div>
          <div><Input></Input></div>
        </div>
        <div class="flex">
          <div class="w-10rem">clockSource</div>
          <div><Input></Input></div>
        </div>
        <button @click="">确定</button>
      </div>
      <div v-if="state.currentTabName === TabName.端口">
        <Tabs v-model:activeKey="state.currentPortTabName">
          <TabPane :key="PortTabName.SMA_1" tab="SMA_1">Content of Tab Pane 1</TabPane>
          <TabPane :key="PortTabName.SMA_2" tab="SMA_2" force-render>Content of Tab Pane 2</TabPane>
          <TabPane :key="PortTabName.SMA_3" tab="SMA_3">Content of Tab Pane 3</TabPane>
        </Tabs>
        <button @click="">确定</button>
      </div>
      <div v-if="state.currentTabName === TabName.频率">
        <Tabs v-model:activeKey="state.currentFrequencyTabName">
          <TabPane :key="FrequencyTabName.输入" tab="输入">Content of Tab Pane 1</TabPane>
          <TabPane :key="FrequencyTabName.输出" tab="输出" force-render>Content of Tab Pane 2</TabPane>
        </Tabs>
        <button @click="">确定</button>
      </div>
      <div v-if="state.currentTabName === TabName.时间">
        <Tabs v-model:activeKey="state.currentTimeTabName">
          <TabPane :key="TimeTabName.输入" tab="输入">Content of Tab Pane 1</TabPane>
          <TabPane :key="TimeTabName.输出" tab="输出" force-render>Content of Tab Pane 2</TabPane>
          <TabPane :key="TimeTabName.输出1" tab="输出1">Content of Tab Pane 3</TabPane>
        </Tabs>
        <button @click="">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input, Tabs, TabPane } from 'ant-design-vue';
import { getAllDev,getDevConfigParam } from '@/api/index';
import {globalStore} from '@/stores/index';

const { data } = getDevConfigParam();





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
  currentTabName: TabName,
  currentPortTabName: PortTabName,
  currentFrequencyTabName: FrequencyTabName,
  currentTimeTabName: TimeTabName,
}>({
  currentTabName: TabName.网元,
  currentPortTabName: PortTabName.SMA_1,
  currentFrequencyTabName: FrequencyTabName.输入,
  currentTimeTabName: TimeTabName.输入,
})
const handleTabClick = (tabName: TabName) => {
  state.value.currentTabName = tabName
}

</script>

<style scoped></style>