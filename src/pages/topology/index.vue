<!-- 设备管理 -->
<template>
  <div class="flex h-full bg-[rgba(214,218,234,1)]">
    <div class="h-full relative overflow-auto flex-1">
      <div class="absolute left-4 z-10">
        <!--新建节点-->
        <Button type="primary" class="mt-[1rem] bg-blue" @click="handleCreateNode">新建节点</Button>
        <Button type="primary" class="mt-[1rem] ml-10 bg-blue" @click="handleSaveTopography">保存拓扑图</Button>
      </div>
      <div class="h-[calc(100%-1rem)] overflow-hidden">
        <Topology
          :nodes="state.nodes"
          :edges="state.edges"
          @select="handleSelect"
          @delete-edge="handleDeleteEdge"
          @dragfree="handleDrag"
          @delete="handleNodeDelete"
          @config="handleNodeConfig"
          @link="handleLink"
        ></Topology>
      </div>
    </div>
    <div class="h-100% w-1px bg-black" />
    <div class="w-% h-100% flex flex-col">
      <div>
        <RangePicker v-model:value="dateRange" class="w-90" :format="dataFormat" />
        <Button type="primary" class="ml-2" @click="handleData">确认</Button>
      </div>

      <div class="flex m-auto p-8">
        <CheckboxGroup :options="options.slice(0, 1)" />
        <Tag color="pink" class="mr-2">{{ TIE.toFixed(2) }}</Tag>
        <CheckboxGroup :options="options.slice(1, 2)" />
        <Tag color="pink" class="mr-2">{{ DELF }}</Tag>
        MTIE:+
        <Tag color="pink" class="ml-2">{{ MTIE.toFixed(5) }}</Tag>
        <div>
          <Button type="primary" class="bg-blue border h-5" style="line-height: 0.7" @click="handleDataDownload">数据下载</Button>
        </div>
      </div>
      <div class="h-100%">
        <div class="h-33% p-2" style="border: 1px solid rgb(109, 101, 101)" id="timeLineChart"></div>
        <div class="h-32% p-2 mt-2" style="border: 1px solid rgb(109, 101, 101)" id="hzLineChart"></div>
        <div class="h-31% p-2 mt-2" style="border: 1px solid rgb(109, 101, 101)" id="tdevLineChart"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Topology from '@/components/topology/index.vue';
import { Button, CheckboxGroup, Tag, Modal, message, RangePicker } from 'ant-design-vue';
import cytoscape from 'cytoscape';
import { openWindow } from '@/utils';
import { ref, nextTick } from 'vue';
import * as echarts from 'echarts';
import { timeOption, hzOption, tdevOption } from './op';
import { getTopography, updateDev, updateLink, getDevCurConfig, setTopography, getData, getNodeState } from '@/api/index';
import NodePop from './nodePop.vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import CsvFile from './component/csvfile.vue';
import { uniqBy } from 'lodash';

type RangeValue = [Dayjs, Dayjs];
const options = [
  { label: 'TIE', value: 'TIE' },
  { label: 'Δf/f', value: 'Δf/f' },
];

const state = ref({
  nodes: [] as { position: { x: number; y: number }; data: { id: string; state: string; selected: boolean } }[],
  edges: [] as {
    data: {
      id: string;
      source: string;
      target: string;
    };
  }[],
  selectedNode: void 0 as { position: { x: number; y: number }; data: { id: string } } | undefined,
});
const selectedNode = computed(() => {
  const node = state.value.nodes.find((n) => n.data.selected);
  if (node) {
    return node;
  }
  return state.value.nodes[0];
});
const dateRange = ref<RangeValue>([dayjs().subtract(7, 'days'), dayjs()]);
let timeId: any = 0;
let stateTimeId: any = 0;
const DELF = ref(0);
const MTIE = ref(0);
const TIE = ref(0);

let timeChart: ReturnType<typeof echarts.init> | undefined = void 0;
let freqChart: ReturnType<typeof echarts.init> | undefined = void 0;
let tdevChart: ReturnType<typeof echarts.init> | undefined = void 0;

const dataFormat = (value: Dayjs) => {
  if (value.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
    return '至今';
  }
  return value.format('YYYY-MM-DD');
};

onUnmounted(() => {
  clearInterval(timeId);
  clearInterval(stateTimeId);
});

const updateState = async () => {
  const { data } = await getNodeState();
  state.value.nodes = state.value.nodes.map((node) => {
    const _dev = (((data.value as any)?.result?.devStateList || []) as any[]).find((dev) => dev.nodeId == node.data.id);
    if (_dev) {
      return {
        ...node,
        data: {
          ...node.data,
          state: _dev.state,
          selected: _dev.state === 'faulty' ? false : node.data.selected,
        },
      };
    }
    return node;
  });
  await nextTick();
};

const updateTopography = async () => {
  const { data: dataDev } = await getTopography({ userName: globalStore.value.userName });
  const { data: curData } = await getDevCurConfig();
  state.value.nodes = ((dataDev.value as any)?.result?.deviceList || []).map((item: any) => {
    const cur = (curData.value?.result?.devList || []).find((dev: any) => dev.nodeId === item.object);
    return {
      position: { x: item.posX, y: item.posY },
      data: {
        id: item.object,
        state: cur?.state || 'normal',
      },
    };
  });
  const nodeIdList = state.value.nodes.map((n) => n.data.id);
  state.value.edges = ((dataDev.value as any)?.result?.linkList || [])
    .map((item: any) => {
      return {
        data: {
          id: item.object,
          source: item.Dev1,
          target: item.ConnectDev2,
        },
      };
    })
    .filter((e: any) => {
      return nodeIdList.includes(e.data.source) && nodeIdList.includes(e.data.target);
    });
};

const updateChart = async (id: string) => {
  const { data } = await getData({
    nodeId: parseInt(id),
    flag: 1,
    name: 'node',
    startTime: dateRange.value[0].format('YYYY-MM-DD HH:mm:ss'),
    endTime: dateRange.value[1].format('YYYY-MM-DD HH:mm:ss'),
  });
  MTIE.value = data.value?.result?.MTIE;
  DELF.value = data.value?.result?.DELF;
  TIE.value = data.value?.result?.TIE;
  const timeList = [...((data.value?.result?.time as any[]) || [])];
  const timeValueList = [...((data.value?.result?.timeValue as any[]) || [])];
  timeOption.series[0].data = uniqBy(
    timeList.map((t, index) => {
      return [t, timeValueList[index]];
    }),
    (d) => d[0],
  );
  const freqValueList = [...hzOption.series[0].data.map((d) => d[1]), ...((data.value?.result?.freqValue as any[]) || [])];
  hzOption.series[0].data = uniqBy(
    timeList.map((t, index) => {
      return [t, freqValueList[index]];
    }),
    (d) => d[0],
  );
  const xTDEV = data.value?.result?.TDEV?.XValue || [];
  const yTDEV = data.value?.result?.TDEV?.YValue || [];

  tdevOption.xAxis.data = xTDEV;
  tdevOption.series[0].data = yTDEV;

  if (!timeChart) {
    timeChart = echarts.init(document.getElementById('timeLineChart'), null);
  }
  if (!freqChart) {
    freqChart = echarts.init(document.getElementById('hzLineChart'), null);
  }
  if (!tdevChart) {
    tdevChart = echarts.init(document.getElementById('tdevLineChart'), null);
  }
  timeChart.setOption(timeOption);
  freqChart.setOption(hzOption);
  tdevChart.setOption(tdevOption);
};
const partUpdateChart = async (id: string) => {
  const { data } = await getData({
    nodeId: parseInt(id),
    flag: 0,
    name: 'node',
    startTime: dateRange.value[0].format('YYYY-MM-DD HH:mm:ss'),
    endTime: dateRange.value[1].format('YYYY-MM-DD HH:mm:ss'),
  });
  MTIE.value = data.value?.result?.MTIE;
  DELF.value = data.value?.result?.DELF;
  TIE.value = data.value?.result?.TIE;
  const time = [...timeOption.series[0].data.map((d) => d[0]), ...((data.value?.result?.time as any[]) || []).map((t) => dayjs(t, 'YYYY-MM-DD HH:mm:ss').valueOf())];
  const timeValueList = [...timeOption.series[0].data.map((d) => d[1]), ...((data.value?.result?.timeValue as any[]) || [])];
  timeOption.series[0].data = uniqBy(
    time.map((t, index) => {
      return [t, timeValueList[index]];
    }),
    (d) => d[0],
  ).sort((a, b) => a[0] - b[0]);
  timeOption.xAxis.minInterval = ((timeOption.series[0].data.slice(-1)?.[0]?.[0] || 0) - (timeOption.series[0].data?.[0]?.[0] || 0)) / 2;

  const freqValueList = [...hzOption.series[0].data.map((d) => d[1]), ...((data.value?.result?.freqValue as any[]) || [])];
  hzOption.series[0].data = uniqBy(
    time.map((t, index) => {
      return [t, freqValueList[index]];
    }),
    (d) => d[0],
  ).sort((a, b) => a[0] - b[0]);
  hzOption.xAxis.minInterval = ((hzOption.series[0].data.slice(-1)?.[0]?.[0] || 0) - (hzOption.series[0].data[0]?.[0] || 0)) / 2;

  const xTDEV = data.value?.result?.TDEV?.XValue || [];
  const yTDEV = data.value?.result?.TDEV?.YValue || [];

  tdevOption.xAxis.data = xTDEV;
  tdevOption.series[0].data = yTDEV;

  if (!timeChart) {
    timeChart = echarts.init(document.getElementById('timeLineChart'), null);
  }
  if (!freqChart) {
    freqChart = echarts.init(document.getElementById('hzLineChart'), null);
  }
  if (!tdevChart) {
    tdevChart = echarts.init(document.getElementById('tdevLineChart'), null);
  }
  timeChart.setOption(timeOption);
  freqChart.setOption(hzOption);
  tdevChart.setOption(tdevOption);
};

// 基于准备好的dom，初始化echarts实例
onMounted(async () => {
  await updateTopography();
  clearInterval(timeId);
  timeId = setInterval(async () => {
    partUpdateChart(selectedNode.value.data.id);
  }, 5000);
  clearInterval(stateTimeId);
  stateTimeId = setInterval(async () => {
    updateState();
  }, 5000);
});
const handleData = async () => {
  clearInterval(timeId);
  if (dateRange.value[1].format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
    timeId = setInterval(async () => {
      partUpdateChart(selectedNode.value.data.id);
    }, 5000);
    return;
  }
  if (selectedNode.value?.data?.id) {
    updateChart(selectedNode.value.data.id);
  }
};

const handleCreateNode = () => {
  let state: any = {};
  Modal.confirm({
    title: '新建节点',
    content: () => {
      return h(NodePop, {
        onChange(v) {
          state = v;
        },
      });
    },
    async onOk() {
      await updateDev({ ...state, nodeId: parseInt(state?.nodeId || '0'), location: (state?.location || []).join('/') });
      updateTopography();
    },
  });
};

const handleSaveTopography = async () => {
  setTimeout(async () => {
    await setTopography({
      deviceList: state.value.nodes.map((n) => {
        return {
          nodeId: parseInt(n.data.id),
          posX: n.position.x,
          posY: n.position.y,
        };
      }),
    });
  }, 50);
};
// 移动更新节点
const handleDrag = (node: any) => {
  state.value.nodes = state.value.nodes.map((n) => {
    if (n.data.id == node.data('id')) {
      return { ...n, position: node.position() };
    }
    return n;
  });
};

const handleNodeDelete = async (node: cytoscape.NodeSingular) => {
  // @ts-ignore
  await updateDev({ nodeId: parseInt(node.id()), type: 'delete' });
  node.remove();
  updateTopography();
};

const handleNodeConfig = (node: any) => {
  const data = node.data();
  openWindow(`/config/panel?id=${data.id}`);
};

const handleDataDownload = () => {
  Modal.info({
    title: '下载',
    width: '40%',
    content: () => {
      return h(CsvFile);
    },
  });
};

//@ts-ignore
const handleLink = async ({ sourceNode, targetNode }) => {
  setTimeout(async () => {
    try {
      // @ts-ignore
      await updateLink({
        type: 'add',
        Dev1: parseInt(sourceNode.data('id')),
        ConnectDev2: parseInt(targetNode.data('id')),
        linkType: 12,
      });
      message.success('更新成功');
      updateTopography();
    } catch (error) {}
  }, 1);
};
const handleDeleteEdge = (node: any) => {
  setTimeout(async () => {
    try {
      const id = node.id();
      const edge = state.value.edges.find((e) => e.data.id === id);
      if (!edge) return;
      //@ts-ignore
      await updateLink({
        type: 'delete',
        object: edge.data.id,
        Dev1: parseInt(edge.data.source),
        ConnectDev2: parseInt(edge.data.target),
        linkType: 12,
      });
      message.success('更新成功');
      updateTopography();
    } catch (error) {}
  }, 1);
};

const handleSelect = (node: any) => {
  state.value.nodes = state.value.nodes.map((n: any) => {
    if (n.data.id === node.id()) return { ...n, data: { ...n.data, selected: true } };
    return { ...n, data: { ...n.data, selected: false } };
  });
  timeOption.series[0].data = [];
  hzOption.series[0].data = [];
  tdevOption.xAxis.data = [];
  tdevOption.series[0].data = [];
};
</script>

<route lang="yaml">
meta:
  layout: menu
  menuName: 拓扑管理
</route>
