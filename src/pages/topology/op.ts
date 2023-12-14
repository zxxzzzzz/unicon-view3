export const timeOption = {
  title: {
    text: '时间',
  },
  xAxis: {
    type: 'time',
    data: [] as any[],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [] as any[],
      type: 'line',
      showSymbol:false,
      smooth: true,
    },
  ],
};
export const hzOption = {
  title: {
    text: '频率',
  },
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [] as any[],
      type: 'line',
      showSymbol:false,
      smooth: true,
    },
  ],
};
export const tdevOption = {
  title: {
    text: 'TDEV',
  },
  xAxis: {
    type: 'category',
    data: ['10', '10²', '10³', '10⁴', '10⁵'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
};
