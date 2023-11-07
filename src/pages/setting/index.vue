<template>
    <div>
      <Card>
        <Table :columns="columns"  />
      </Card>
    </div>
  </template>
  <script lang="ts" setup>
    import { Table, Select, Card, Cascader } from 'ant-design-vue';
    import type { TableProps } from 'ant-design-vue';
    import { computed, h, ref } from 'vue';
    import { cityList } from './cityList';
    // defineProps<{  }>();
    type UserItem = {
      authority: string;
      position: [string, string][];
      userName: string;
    };
    const userList = ref<UserItem[]>([]);
    
    
    const columns: TableProps<UserItem>['columns'] = [
      { dataIndex: 'userName', title: '用户名称' },
      {
        dataIndex: 'position',
        title: '地点',
        customRender({ record, index }) {
          return h(Cascader, {
            showSearch: true,
            dropdownClassName: 'h-160 city',
            expandTrigger: 'hover',
            multiple: true,
            async onChange(v) {
              const pMap = (v as [string, string][]).reduce((re, sl) => {
                if (re[sl[0]]) {
                  re[sl[0]] = [...re[sl[0]], sl[1]];
                } else {
                  re[sl[0]] = [sl[1]];
                }
                return re;
              }, {});
              const position = Object.keys(pMap).map((k) => {
                const cityList = pMap[k];
                return {
                  province: k,
                  city: cityList.map((c) => ({ cityName: c })),
                };
              });
              ;
              userList.value[index].position = v as [string, string][];
            },
            value: userList.value[index].position,
            options: cityList.map((city) => {
              return {
                value: city.name,
                label: city.name,
                children: city.children.map((c) => ({ label: c.name, value: c.name })),
              };
            }),
          });
        },
      },
      {
        dataIndex: 'authority',
        title: '角色',
        customRender({ record, index }) {
          const pMap = (userList.value[index].position as [string, string][]).reduce((re, sl) => {
            if (re[sl[0]]) {
              re[sl[0]] = [...re[sl[0]], sl[1]];
            } else {
              re[sl[0]] = [sl[1]];
            }
            return re;
          }, {});
          const position = Object.keys(pMap).map((k) => {
            const cityList = pMap[k];
            return {
              province: k,
              city: cityList.map((c) => ({ cityName: c })),
            };
          });
          return h(
            Select,
            {
              options: [],
              value: record.authority,
              class: 'w-30',
            },
            '分配角色',
          );
        },
      },
    ];
  </script>
  <style lang="css">
    .city .ant-cascader-menu {
      height: 40rem;
    }
  </style>
  <route lang="yaml">
    meta:
      layout: menu
  </route>