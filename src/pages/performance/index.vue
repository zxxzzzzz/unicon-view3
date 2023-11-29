<!-- 未知 -->
<template>
  <div class="flex h-full">
    <div class="h-full relative overflow-auto flex-1">
      <div class="absolute left-4 z-10">
        <Button
          type="primary"
          class="mt-[1rem] bg-blue"
          @click="handleCreateNode"
          >新建节点</Button
        >
      </div>
      <div class="h-[calc(100%-2px)]">
        <Topology
          :nodes="state.nodes"
          :edges="state.edges"
          @dblclick="handleDoubleClick"
        ></Topology>
      </div>
    </div>
    <div>
      <div class="w-20rem">
        <div class="bg-gray p-2">
          <div class="flex items-center">
            <div>时间</div>
            <div class="h-1px bg-white flex-1"></div>
          </div>
          <div class="flex">
            <div>
              <div>
                <div>运行状态</div>
              </div>
              <div>
                <div>MTIE</div>
              </div>
              <div>
                <div>性能测量</div>
              </div>
            </div>
            <div class="flex-1">
              <div class="ml-2 h-5rem bg-white"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-20rem mt-4">
        <div class="bg-gray p-2">
          <div class="flex items-center">
            <div>时间</div>
            <div class="h-1px bg-white flex-1"></div>
          </div>
          <div class="flex">
            <div>
              <div>
                <div>运行状态</div>
              </div>
              <div>
                <div>MTIE</div>
              </div>
              <div>
                <div>性能测量</div>
              </div>
            </div>
            <div class="flex-1">
              <div class="ml-2 h-5rem bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Topology from "@/components/topology/index.vue";
import { Button } from "ant-design-vue";
import cytoscape from "cytoscape";
import { openWindow } from "@/utils";
import { ref } from "vue";

enum NodeType {
  a,
  b,
}
enum EdgeType {
  a,
  b,
}

const nodeTypeList = [
  { value: NodeType.a, label: "节点1" },
  { value: NodeType.b, label: "节点2" },
];
const edgeTypeList = [
  { value: EdgeType.a, label: "链路1" },
  { value: EdgeType.b, label: "链路2" },
];

const state = ref({
  nodes: [
    {
      position: { x: 100, y: 100 },
      data: {
        id: "123",
      },
    },
    {
      position: { x: 200, y: 300 },
      data: {
        id: "1234",
      },
    },
  ] as cytoscape.NodeDefinition[],
  edges: [],
  currentNodeType: NodeType.a,
  currentEdgeType: EdgeType.a,
});

const handleCreateNode = () => {
  const node: cytoscape.NodeDefinition = {
    position: { x: 100, y: 100 },
    data: {
      id: "123456",
    },
  };
  state.value.nodes = [...state.value.nodes, node];
};

const handleDoubleClick = () => {
  openWindow("/config/panel");
  console.log("dbbbb");
};

const handleNodeTypeClick = (v: NodeType) => {
  state.value.currentNodeType = v;
};
const handleEdgeTypeClick = (v: EdgeType) => {
  state.value.currentEdgeType = v;
};
</script>

<route lang="yaml">
meta:
  layout: menu
  menuName: 性能管理
</route>
