export const timeOption = {
  title: {
    text: '钟差',
    textStyle: {
      fontSize: 16,
      fontWeight: 'bolder',
    },
  },
  xAxis: {
    type: 'time',
    splitNumber: 5,
    minInterval: 10 * 1000,
  },
  yAxis: {
    type: 'value',
    name: 'ps',
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
    text: '频差',
    textStyle: {
      fontSize: 16,
      fontWeight: 'bolder',
    },
  },
  xAxis: {
    type: 'time',
    splitNumber: 5,
    minInterval: 10 * 1000,
  },
  yAxis: {
    type: 'value',
    name: 'MHz',
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
    textStyle: {
      fontSize: 16,
      fontWeight: 'bolder',
    },
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
    name: 'ps',
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
