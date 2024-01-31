export const pieOptions = {
  title: {
    text: '异常分级比例',
  },
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1000, name: '等级一' },
        { value: 735, name: '等级二' },
        { value: 580, name: '等级三' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

export const barOption = {
  title: {
    text: '一周异常总个数',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: { length: 100, inside: true, lineStyle: { color: 'red' } },
  },
  tooltip: {
    trigger: 'item',
  },
  yAxis: {
    type: 'value',
    name: '个数',
  },
  series: [
    {
      type: 'bar',
      name: '等级一',
      barGap: '0%',
      data: [0, 92.1, 94.4, 85.4, 55.0, 65.2, 12.0],
    },
    {
      type: 'bar',
      barGap: '0%',
      name: '等级二',
      data: [95.8, 89.4, 91.2, 76.9, 55.0, 65.2, 88.0],
    },
    {
      barGap: '0%',
      type: 'bar',
      name: '等级三',
      data: [97.7, 83.1, 92.5, 78.1, 55.0, 65.2, 12.0],
    },
  ],
};
export const bar2Option = {
  title: {
    text: '故障时间',
  },
  tooltip: {
    trigger: 'item',
  },
  xAxis: {
    type: 'category',
    data: ['1', '2', '3'],
    axisTick: { length: 100, inside: true, lineStyle: { color: 'red' } },
  },
  yAxis: {
    type: 'value',
    name: '时间(分)',
  },
  series: [
    {
      type: 'bar',
      name: '等级一',
      barGap: '0%',
      data: [97.7, 83.1, 92.5],
    },
    {
      type: 'bar',
      barGap: '0%',
      name: '等级二',
      data: [97.7, 83.1, 92.5],
    },
    {
      barGap: '0%',
      type: 'bar',
      name: '等级三',
      data: [97.7, 83.1, 92.5],
    },
  ],
};
