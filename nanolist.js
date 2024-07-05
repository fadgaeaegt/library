import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

// 함수 정의: 물리적 상수와 함께
const f = (x, y, z, g) => g * (z * y * y + z * z + y + x + z);

// 편미분 함수들:
const partialDerivativeZ = (x, y, z, g) => g * (y * y + 2 * z + 1); // z에 대한 편미분
const partialDerivativeY = (x, y, z, g) => g * (2 * z * y + 1);      // y에 대한 편미분

const Plot3D = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 고정된 물리적 상수들
    const x = 1;           // 강력
    const y = 1 / 137;     // 전자기력
    const z = 1e-6;        // 약력

    // 허용 오차 범위 백분율
    const allowedErrorPercentage = 21.67117e-42; // 허용 오차 백분율

    // 0과 1 사이의 랜덤 확률 생성
    const randomNumber = Math.random();

    // 랜덤 숫자가 허용된 오차 백분율 내에 있는지 확인
    const executeFunction = randomNumber <= allowedErrorPercentage / 100;

    // 시각화를 위해 랜덤 점들 생성
    const numPoints = 1000; // 총 점의 수
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const randX = Math.random() * 2 - 1; // -1에서 1 사이의 랜덤 숫자
      const randY = Math.random() * 2 - 1; // -1에서 1 사이의 랜덤 숫자
      const randZ = Math.random() * 2 - 1; // -1에서 1 사이의 랜덤 숫자
      const randG = Math.random() * 2 - 1; // -1에서 1 사이의 랜덤 숫자
      points.push({ x: randX, y: randY, z: randZ, g: randG });
    }

    // 고정된 (x, y, z, g)에서의 편미분 계산
    const df_dz = partialDerivativeZ(x, y, z, executeFunction ? 1 : 0);
    const df_dy = partialDerivativeY(x, y, z, executeFunction ? 1 : 0);

    const plotData = [{
      type: 'scatter3d',
      mode: 'markers',
      x: points.map(point => point.x),
      y: points.map(point => point.y),
      z: points.map(point => point.z),
      marker: {
        size: 5,
        color: 'blue',
      },
      name: 'Random Points',
    }];

    setData(plotData);
  }, []);

  return (
    <Plot
      data={data}
      layout={{
        title: '랜덤 점의 3D 산점도',
        scene: {
          xaxis: { title: 'X' },
          yaxis: { title: 'Y' },
          zaxis: { title: 'Z' },
        },
      }}
    />
  );
};

export default Plot3D;
