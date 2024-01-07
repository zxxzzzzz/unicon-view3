<template>
  <div class="h-[calc(100%-2px)]">
    <div ref="canvas" class="h-full border border-dark-50" style="background: linear-gradient(rgba(214, 218, 234, 1) 33%, rgba(214, 218, 234, 1) 33%, rgba(214, 218, 234, 1) 33%)"></div>
    <!-- <Legend class="right-0 absolute mr-2 mt-2 top-0" /> -->
  </div>
</template>
<script lang="ts" setup>
import cytoscape from 'cytoscape';
import { ref, watch, nextTick } from 'vue';
import { message } from 'ant-design-vue';
import edgehandles from 'cytoscape-edgehandles';
import Popper from 'cytoscape-popper';
import { initEdgeDelete, initLink, initNodeDelete, useDevPop } from './utils';

cytoscape.use(Popper);
cytoscape.use(edgehandles);

const props = defineProps<{ nodes: cytoscape.NodeDefinition[]; edges: cytoscape.EdgeDefinition[] }>();
const canvas = ref<HTMLDivElement>();
const emits = defineEmits<{
  (event: 'cxttap', node: cytoscape.CollectionReturnValue): void;
  (event: 'tap', node: cytoscape.CollectionReturnValue): void;
  (event: 'select', node: cytoscape.CollectionReturnValue): void;
  (event: 'unselect', node: cytoscape.CollectionReturnValue): void;
  (event: 'hover', node: cytoscape.CollectionReturnValue): void;
  (event: 'drag', node: cytoscape.CollectionReturnValue): void;
  (event: 'dragfree', node: cytoscape.CollectionReturnValue): void;
  (event: 'dblclick', node: cytoscape.CollectionReturnValue): void;
  (event: 'delete', node: cytoscape.CollectionReturnValue): void;
  (event: 'deleteEdge', node: cytoscape.CollectionReturnValue): void;
  (event: 'config', node: cytoscape.CollectionReturnValue): void;
  (event: 'performance', node: cytoscape.CollectionReturnValue): void;
  (event: 'link', data: { sourceNode: cytoscape.CollectionReturnValue; targetNode: cytoscape.CollectionReturnValue }): void;
}>();

let destroyHandleList: (() => void)[] = [];
onUnmounted(() => {
  destroyHandleList.forEach((func) => func());
});

let cy: cytoscape.Core | undefined = undefined;
watch(
  () => props.nodes,
  () => {
    nextTick(() => {
      if (canvas.value) {
        try {
          destroyHandleList.forEach((func) => func());
          cy = cytoscape({
            container: canvas.value, // container to render in
            // @ts-ignore
            elements: {
              nodes: props.nodes,
              edges: props.edges,
            },
            layout: {
              name: 'preset',
            },
            style: [
              {
                selector: '.eh-ghost-edge.eh-preview-active',
                style: {
                  opacity: 0,
                },
              },
              {
                selector: 'node',
                style: {
                  label: 'data(id)',
                },
              },
              {
                selector: 'node.eh-handle',
                style: {
                  'background-color': 'red',
                  width: 12,
                  height: 12,
                  shape: 'ellipse',
                  'overlay-opacity': 0,
                  'border-width': 12, // makes the handle easier to hit
                  'border-opacity': 0,
                },
              },
              {
                selector: `[state = 'faulty']`,
                style: {
                  'background-color': 'red',
                },
              },
              // convergence
              {
                selector: `[state = 'normal']`,
                style: {
                  'background-color': 'green',
                },
              },
              {
                selector: `[state = 'offline']`,
                style: {
                  'background-color': 'gray',
                },
              },
              {
                selector: `[?selected]`,
                style: {
                  'background-color': 'blue',
                },
              },
              {
                selector: 'edge',
                style: {
                  'curve-style': 'bezier',
                },
              },
              
            ],
            wheelSensitivity: 0.1,
          });
        } catch (error: any) {
          message.error((error as Error).message, 10);
        }
        if (cy) {
          cy.edgehandles({
            snap: true,
            canConnect: function (sourceNode, targetNode) {
              if (sourceNode.same(targetNode)) {
                return false;
              }
              if (sourceNode.neighborhood().contains(targetNode)) {
                return false;
              }
              return true;
            },
          });
          destroyHandleList = [initLink(cy), initEdgeDelete(cy), initNodeDelete(cy), useDevPop(cy)];
          cy.on('select ', 'node', (evt) => {
            var node = evt.target;
            emits('select', node);
          });
          cy.on('delete ', 'node', (evt) => {
            var node = evt.target;
            emits('delete', node);
          });
          cy.on('config ', 'node', (evt) => {
            var node = evt.target;
            emits('config', node);
          });
          cy.on('performance ', 'node', (evt) => {
            var node = evt.target;
            emits('performance', node);
          });
          cy.on('select ', 'edge', (evt) => {
            const node = evt.target;
            emits('select', node);
          });
          cy.on('delete ', 'edge', (evt) => {
            const node = evt.target;
            emits('deleteEdge', node);
          });
          cy.on('unselect ', 'node', (evt) => {
            var node = evt.target;
            emits('unselect', node);
          });
          cy.on('unselect ', 'edge', (evt) => {
            var node = evt.target;
            emits('unselect', node);
          });
          cy.on('tap', 'node', function (evt) {
            var node = evt.target;
            emits('tap', node);
          });
          cy.on('mouseover', 'node', function (evt) {
            var node = evt.target;
            emits('hover', node);
          });
          cy.on('cxttap', 'node', function (evt) {
            var node = evt.target;
            emits('cxttap', node);
          });
          cy.on('drag', 'node', function (evt) {
            var node = evt.target;
            emits('drag', node);
          });
          cy.on('dragfree', 'node', function (evt) {
            var node = evt.target;
            emits('dragfree', node);
          });
          cy.on('dblclick', 'node', function (evt) {
            var node = evt.target;
            emits('dblclick', node);
          });
          // @ts-ignore
          cy.on('ehcomplete', function (event, sourceNode, targetNode, addedEdge) {
            emits('link', { sourceNode, targetNode });
          });
        }
      }
    });
  },
  { immediate: true },
);
defineExpose({
  getCy() {
    return cy;
  },
});
</script>
<style>
.popper-handle {
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 20px;
  z-index: 1;
}
</style>
