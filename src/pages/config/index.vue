<template>
  <div class="h-full relative">
    <div class="absolute left-4 z-10">
      <Button type="primary" class="mt-[1rem] bg-blue" @click="handleCreateNode">新建节点</Button>
    </div>
    <div class="h-[calc(100%-2px)]">
      <Topology :nodes="state.nodes" :edges="state.edges" @dblclick="handleDoubleClick"></Topology>
    </div>
  </div>
</template>

<script setup lang="ts">
import Topology from '~/components/topology/index.vue';
import { Button } from 'ant-design-vue';
import cytoscape from 'cytoscape';
import { openWindow } from '~/utils';

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
  edges: []
})

const handleCreateNode = () => {
  const node: cytoscape.NodeDefinition = {
    position: { x: 100, y: 100 },
    data: {
      id: '123456'
    }
  }
  state.value.nodes = [...state.value.nodes, node]
}

const handleDoubleClick = () => {
  openWindow('/config/panel')
}

</script>

<route lang="yaml">
  meta:
    layout: menu
    menuName: 配置管理
</route>