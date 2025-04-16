import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 배달 from '../config/배달.json';

const ChartComponent = ({ dong, cate, sex }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const target1 = 배달.find(item => item.행정동 === dong && item.업종이름 === cate && item.성별 === "여자");
    const target2 = 배달.find(item => item.행정동 === dong && item.업종이름 === cate && item.성별 === "남자");

    const months = [
      "23.12", "24.01", "24.02", "24.03", "24.04", "24.05", 
      "24.06", "24.07", "24.08", "24.09", "24.10", "24.11", "24.12"
    ];

    const salesData = target1 ? months.map(month => Number(target1[month])) : [];

    const option = {
      title: { text: '상가 월 매출' },
      tooltip: {},
      xAxis: { data: months },
      yAxis: {},
      series: [{
        name: '점포 수',
        type: 'bar',
        data: salesData
      }]
    };

    chart.setOption(option);
    return () => chart.dispose();
  }, [dong, cate]); // ✅ 의존성 추가

  return (
    <div 
      ref={chartRef} 
      style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', borderRadius: '8px' }} 
    />
  );
};

export default ChartComponent;
