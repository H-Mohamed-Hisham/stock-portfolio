import ReactECharts from "echarts-for-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Chart({ option }: { option: any }) {
  return <ReactECharts option={option} />;
}
