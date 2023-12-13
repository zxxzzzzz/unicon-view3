<template>
  <div>
    <Table :columns="columns" :data-source="dataSource" :pagination="{ pageSize: 4 }"></Table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getAlarmType } from '@/api/index';
import { TableProps, Table, Select } from 'ant-design-vue';
const data = ref<any>();
const emits = defineEmits(['change']);
const dataSource = computed(() => {
  return (data.value as any)?.result || [];
});
onMounted(async () => {
  const { data: _data } = await getAlarmType();
  data.value = _data.value;
});
const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
];
const columns: TableProps['columns'] = [
  { dataIndex: 'typeName', title: '类型名称' },
  { dataIndex: 'typeDesc', title: '类型描述' },
  { dataIndex: 'suggestLevel', title: '建议等级' },
  {
    dataIndex: 'typeLevel',
    title: '类型等级',
    customRender({ record, index }) {
      return h(Select, {
        value: record.typeLevel,
        options,
        style: { width: '80px' },
        async onChange(v) {
          data.value.result = (data.value?.result || []).map((re: any, i: number) => {
            if (i === index) {
              return { ...re, typeLevel: v };
            }
            return re;
          });
          emits('change', data.value?.result || [])
        },
      });
    },
  },
];
</script>

<style scoped></style>
