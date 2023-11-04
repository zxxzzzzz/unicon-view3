<template>
  <div class="h-[calc(100%-2px)]">
    <div ref="canvas" class="h-full border border-dark-50"
<<<<<<< HEAD
      style="background: linear-gradient(rgba(214, 218, 234, 1) 33%, rgba(194, 200, 224, 1) 33% 66%, rgba(159, 168, 205, 1) 66%)">
=======
<<<<<<< HEAD
      style="background: linear-gradient(rgba(214, 218, 234, 1) 33%, rgba(194, 200, 224, 1) 33% 66%, rgba(159, 168, 205, 1) 66%)">
=======
<<<<<<< HEAD
      style="background: linear-gradient(rgba(214, 218, 234, 1) 33%, rgba(194, 200, 224, 1) 33% 66%, rgba(159, 168, 205, 1) 66%)">
=======
      style="background: linear-gradient(rgba(214, 218, 234, 1) 33%, rgba(214, 218, 234, 1) 33%, rgba(214, 218, 234, 1) 33%)">
>>>>>>> dfca7a9 (part)
>>>>>>> 1074d20 (update part)
>>>>>>> 72c34dd (update part)
    </div>
    <!-- <Legend class="right-0 absolute mr-2 mt-2 top-0" /> -->
  </div>
</template>
<script lang="ts" setup>
import cytoscape from 'cytoscape';
import { ref, watch, nextTick } from 'vue';
import { message } from 'ant-design-vue';
import img from './img';
import edgehandles from 'cytoscape-edgehandles';
import Popper from 'cytoscape-popper';
import { initEdgeDelete, initLink,initNodeDelete } from './utils';

cytoscape.use(Popper);
cytoscape.use(edgehandles);
// import Legend from './legend.vue';

const props = defineProps<{ nodes: cytoscape.NodeDefinition[], edges: cytoscape.EdgeDefinition[] }>();
const canvas = ref<HTMLDivElement>();
const emits = defineEmits<{
  (event: 'cxttap', node: cytoscape.CollectionReturnValue): void;
  (event: 'tap', node: cytoscape.CollectionReturnValue): void;
  (event: 'select', node: cytoscape.CollectionReturnValue): void;
  (event: 'unselect', node: cytoscape.CollectionReturnValue): void;
  (event: 'drag', node: cytoscape.CollectionReturnValue): void;
  (event: 'dragfree', node: cytoscape.CollectionReturnValue): void;
  (event: 'dblclick', node: cytoscape.CollectionReturnValue): void;
}>();
const formatType = (s: string) => {
  return s.replace(/[()-]+/g, '');
};

let destroyHandleList: (() => void)[] = []
onUnmounted(() => {
  destroyHandleList.forEach(func => func())
})




let cy: cytoscape.Core | undefined = undefined;
watch(
  () => props.nodes,
  () => {
    nextTick(() => {
      if (canvas.value) {
        try {
          destroyHandleList.forEach(func => func())
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
                  'opacity': 0
                }
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
                  'width': 12,
                  'height': 12,
                  'shape': 'ellipse',
                  'overlay-opacity': 0,
                  'border-width': 12, // makes the handle easier to hit
                  'border-opacity': 0
                }
              },
              {
                selector: 'node.ATN950B',
                style: {
                  width: 50,
                  height: 36.5,
                  'background-image': img.atn950b,
                  'background-fit': 'contain',
                  'background-opacity': 0,
                },
              },
              // convergence
              {
                selector: `node.${formatType('CX600-X16-DO(V8)')}`,
                style: {
                  width: 50,
                  height: 36.3,
                  'background-image': img.cx600x16,
                  'background-fit': 'contain',
                  'background-opacity': 0,
                },
              },
              {
                selector: `node.${formatType('CX600-X16A-DO(V8)')}`,
                style: {
                  width: 50,
                  height: 35.7,
                  'background-image': img.cx600x16a,
                  'background-fit': 'contain',
                  'background-opacity': 0,
                },
              },
              {
                selector: `node.${formatType('CX600-X8-DO(V8)')}`,
                style: {
                  width: 50,
                  height: 35.7,
                  'background-image': img.cx600x8,
                  'background-fit': 'contain',
                  'background-opacity': 0,
                },
              },
              {
                selector: 'node.Service',
                style: {
                  width: 50,
                  height: 35.7,
                  'background-image': img.service,
                  'background-fit': 'contain',
                  'background-opacity': 0,
                },
              },
              {
                selector: 'edge',
                style: {
                  'curve-style': 'bezier',
                },
              },
              {
                selector: 'edge.ptp',
                style: {
                  'line-style': 'dashed',
                  'target-arrow-shape': 'triangle',
                  'line-dash-pattern': [10, 3],
                  'target-arrow-color': 'blue',
                  'line-color': 'blue',
                },
              },
              {
                selector: 'edge.syncE',
                style: {
                  'line-style': 'dashed',
                  'target-arrow-shape': 'triangle',
                  'line-dash-pattern': [10, 3],
                  'line-color': 'red',
                  'target-arrow-color': 'red',
                },
              },
            ],
            wheelSensitivity: 0.1,
          });
        } catch (error: any) {
          message.error((error as Error).message, 10);
        }
        if (cy) {
          destroyHandleList = [initLink(cy), initEdgeDelete(cy), initNodeDelete(cy)]
          cy.on('select ', 'node', (evt) => {
            var node = evt.target;
            emits('select', node);
          });
          cy.on('select ', 'edge', (evt) => {
            const node = evt.target;
            emits('select', node);
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
  z-index: 9999;
}
</style>