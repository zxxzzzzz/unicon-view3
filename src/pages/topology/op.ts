export const timeOption = {
  title: {
    text: '时间',
  },
  xAxis: {
    type: 'time',
    splitNumber: 5,
    minInterval: 10 * 1000,
  },
  yAxis: {
    type: 'value',
    name: '单位(纳秒)'
  },
  series: [
    {
      data: [] as any[],
      type: 'scatter',
      symbolSize: 5,
      showSymbol: false,
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
    splitNumber: 5,
    minInterval: 10 * 1000,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [] as any[],
      type: 'scatter',
      symbolSize: 5,
      showSymbol: false,
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
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'line',
      showSymbol: false,
      smooth: true,
    },
  ],
};
