<!-- 设备管理 -->
<template>
  <div class="flex h-full bg-[rgba(214,218,234,1)]">
    <div class="h-full relative overflow-auto flex-1">
      <div class="absolute left-4 z-10">
        <!--新建节点-->
        <Button type="primary" class="mt-[1rem] bg-blue" @click="handleCreateNode">新建节点</Button>
      </div>
      <div class="h-[calc(100%-1rem)] overflow-hidden">
        <Topology :nodes="state.nodes" :edges="state.edges" @delete="handleNodeDelete" @config="handleNodeConfig"></Topology>
      </div>
    </div>
    <div class="h-100% w-1px bg-black" />
    <div class="w-% h-100% flex flex-col">
      <div class="flex m-auto p-8">
        <CheckboxGroup :options="options" />&nbsp; <Tag color="pink" class="mr-2">10</Tag>&nbsp; MTIE:+ <Tag color="pink" class="ml-2">10</Tag>&nbsp;
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
import { Button, CheckboxGroup, Tag, Modal } from 'ant-design-vue';
import cytoscape from 'cytoscape';
import { openWindow } from '@/utils';
import { ref } from 'vue';
import * as echarts from 'echarts';
import { timeOption, hzOption, tdevOption } from './op';
import { getTopography, updateDev } from '@/api/index';
import NodePop from './nodePop.vue';

enum NodeType {
  a,
  b,
}
enum EdgeType {
  a,
  b,
}

const updateTopography = async () => {
  const { data: dataDev } = await getTopography({ userName: globalStore.value.userName });
  state.value.nodes = ((dataDev.value as any)?.result?.deviceList || []).map((item: any) => {
    return {
      position: { x: item.posX, y: item.posY },
      data: {
        id: item.object,
      },
    };
  });
  state.value.edges = ((dataDev.value as any)?.result?.linkList || []).map((item: any) => {
    return {
      data: {
        id: item.object,
        source: item.Dev1,
        target: item.ConnectDev2,
      },
    };
  });
};

onMounted(async () => {
  updateTopography();
});

// 基于准备好的dom，初始化echarts实例
onMounted(() => {
  var myChart = echarts.init(document.getElementById('timeLineChart'), null);
  myChart.setOption(timeOption);
  var myChart = echarts.init(document.getElementById('hzLineChart'), null);
  myChart.setOption(hzOption);
  var myChart = echarts.init(document.getElementById('tdevLineChart'), null);
  myChart.setOption(tdevOption);
});

const options = [
  { label: 'TIE', value: 'TIE' },
  { label: 'Δf/f', value: 'Δf/f' },
];

const state = ref({
  nodes: [] as cytoscape.NodeDefinition[],
  edges: [],
  currentNodeType: NodeType.a,
  currentEdgeType: EdgeType.a,
});

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

const handleNodeDelete = (node: cytoscape.NodeSingular) => {
  node.remove();
};

const handleNodeConfig = (node: any) => {
  const data = node.data();
  openWindow(`/config/panel?id=${data.id}`);
};
const handleDataDownload = () => {
  //指向下载的一个地址
  alert('数据下载中');
};
</script>

<route lang="yaml">
meta:
  layout: menu
  menuName: 拓扑管理
</route>
