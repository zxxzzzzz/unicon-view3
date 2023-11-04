<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
<!-- 设备管理 -->
<template>
  <div class="flex h-full  bg-[rgba(214,218,234,1)]">
    <div class="h-full relative overflow-auto flex-1 ">
      <div class="absolute left-4 z-10"><!--新建节点-->
        <Button type="primary" class="mt-[1rem] bg-blue" @click="handleCreateNode">新建节点</Button>
      </div>
      <div class="h-[calc(100%-0.5rem)]">
        <Topology :nodes="state.nodes" :edges="state.edges" @dblclick="handleDoubleClick"></Topology>
      </div>

    </div>
    <div class="h-100% w-1px bg-black"/>
    <div class="w-% h-100% flex flex-col ">
      <div class="flex m-auto p-8" >
        <CheckboxGroup :options="options" />&nbsp;
        <Tag color="pink" class="mr-2">10</Tag>&nbsp;
        MTIE:+
        <Tag color="pink" class="ml-2">10</Tag>&nbsp;
        <div>
          <Button type="primary" class="bg-blue border h-5"   style="line-height: 0.7;" @click="handdatadownload">数据下载</Button>
        </div>
      </div>
    <div class="h-100%">
      <div class="h-33% p-2" style="border:1px solid rgb(109, 101, 101)" id="timeLineChart">

      </div>
      <div class="h-32% p-2 mt-2" style="border:1px solid rgb(109, 101, 101)" id="hzLineChart">

      </div>
      <div class="h-31% p-2 mt-2" style="border:1px solid rgb(109, 101, 101)" id="tdevLineChart">
    </div>
    </div>

    </div>
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
  </div>
</template>

<script setup lang="ts">
import Topology from '@/components/topology/index.vue';
<<<<<<< HEAD
import { Button, CheckboxGroup, Tag, RangePicker, Table, TableProps } from 'ant-design-vue';
=======
<<<<<<< HEAD
import { Button, CheckboxGroup, Tag, RangePicker, Table, TableProps } from 'ant-design-vue';
=======
<<<<<<< HEAD
import { Button, CheckboxGroup, Tag, RangePicker, Table, TableProps } from 'ant-design-vue';
=======
import { Button, CheckboxGroup, Tag,RangePicker,Table,TableProps } from 'ant-design-vue';
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
const columns: TableProps['columns'] = [
  { title: '名称' },
  { title: '站点' },
  { title: '位置' },
]

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
const nodeTypeList = [
  { value: NodeType.a, label: '节点1' },
  { value: NodeType.b, label: '节点2' },
]
const edgeTypeList = [
  { value: EdgeType.a, label: '链路1' },
  { value: EdgeType.b, label: '链路2' },
]
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)

const state = ref({
  nodes: [{
    position: { x: 100, y: 100 },
    data: {
      id: '123'
    }
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
    
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
const handdatadownload = ()=>{
  //指向下载的一个地址
  alert("数据下载中")
}
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)

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