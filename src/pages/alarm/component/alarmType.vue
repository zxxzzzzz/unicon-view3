<template>
  <div>
    <Table :columns="columns" :data-source="dataSource" :pagination="{ pageSize: 4 }"></Table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getAlarmType, setAlarmType } from '@/api/index';
import { TableProps, Table, Select } from 'ant-design-vue';
const { data,execute } = getAlarmType();
const dataSource = computed(() => {
  return (data.value as any)?.result || [];
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
    customRender({ record }) {
      return h(Select, {
        value: record.typeLevel,
        options,
        style: { width: '80px' },
        async onChange(v) {
          await setAlarmType({ alarmTypeList: [{ ...record, typeLevel: v }] });
          execute(true)
        },
      });
    },
  },
];
</script>

<style scoped></style>