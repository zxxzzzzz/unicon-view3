<template>
  <div class="flex h-full ">
    <div class="w-25%">
      <div class="flex p-2">
        <CheckboxGroup :options="options" />
        <Tag color="pink" class="ml-2">10</Tag>
      </div>
      <div class="flex p-2">
        MTIE:+
        <Tag color="pink" class="ml-2">10</Tag>
      </div>
      <div class="h-30% m-2 " id="timeLineChart">

      </div>
      <div class="h-30% m-2  " id="hzLineChart">

      </div>
      <div class="h-30% m-2  " id="tdevLineChart">

      </div>
    </div>
    <div class="h-full relative overflow-auto flex-1">
      <div class="absolute left-4 z-10">
        <Button type="primary" class="mt-[1rem] bg-blue" @click="handleCreateNode">新建节点</Button>
      </div>
      <div class="h-[calc(100%-0rem)]">
        <Topology :nodes="state.nodes" :edges="state.edges" @dblclick="handleDoubleClick"></Topology>
      </div>
    </div>
    <div class="w-20% flex flex-col">
      <div class="p-2">
        <RangePicker />
      </div>
      <div class="mt-2 p-2">

        <Button>下载</Button>
      </div>
      <div class="">
        <Table :columns="columns"></Table>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import Topology from '@/components/topology/index.vue';
import { Button, CheckboxGroup, Tag, RangePicker, Table, TableProps } from 'ant-design-vue';
import cytoscape from 'cytoscape';
import { openWindow } from '@/utils';
import { ref } from 'vue';
import * as echarts from 'echarts';
import { timeOption, hzOption, tdevOption } from './op';

enum NodeType {
  a,
  b
}
enum EdgeType {
  a,
  b
}

// 基于准备好的dom，初始化echarts实例
const columns: TableProps['columns'] = [
  { title: '名称' },
  { title: '站点' },
  { title: '位置' },
]

onMounted(() => {
  var myChart = echarts.init(document.getElementById('timeLineChart'), null);
  myChart.setOption(timeOption)
  var myChart = echarts.init(document.getElementById('hzLineChart'), null);
  myChart.setOption(hzOption)
  var myChart = echarts.init(document.getElementById('tdevLineChart'), null);
  myChart.setOption(tdevOption)
})

const options = [
  { label: 'TIE', value: 'TIE' },
  { label: 'Δf/f', value: 'Δf/f' },
];

const nodeTypeList = [
  { value: NodeType.a, label: '节点1' },
  { value: NodeType.b, label: '节点2' },
]
const edgeTypeList = [
  { value: EdgeType.a, label: '链路1' },
  { value: EdgeType.b, label: '链路2' },
]

const state = ref({
  nodes: [{
    position: { x: 100, y: 100 },
    data: {
      id: '123'
    }
  }, {
    position: { x: 200, y: 300 },
    data: {
      id: '1234'
    }
  }] as cytoscape.NodeDefinition[],
  edges: [],
  currentNodeType: NodeType.a,
  currentEdgeType: EdgeType.a
})

const handleCreateNode = () => {
  const node: cytoscape.NodeDefinition = {
    position: { x: 100, y: 100 },
    data: {
      id: new Date().valueOf().toString()
    }
  }
  state.value.nodes = [...state.value.nodes, node]
}

const handleDoubleClick = () => {
  openWindow('/config/panel')
  console.log('dbbbb');
}

const handleNodeTypeClick = (v: NodeType) => {
  state.value.currentNodeType = v
}
const handleEdgeTypeClick = (v: EdgeType) => {

  state.value.currentEdgeType = v
}

</script>

<route lang="yaml">
  meta:
    layout: menu
    menuName: 拓扑管理
</route>