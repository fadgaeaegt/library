import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

// Function definition with physical constants
const f = (z, y, x) => z * y * y + z * z + y + x + z;

// Partial derivatives:
const partialDerivativeZ = (z, y) => y * y + 2 * z + 1;
const partialDerivativeY = (z, y) => 2 * z * y + 1;

const Plot3D = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define physical constants
    const x = 1; // Strong force
    const y = 1 / 137; // Electromagnetic force
    const z = 1e-6; // Weak force

    // Number of points to generate based on the given percentage
    const numberOfPoints = Math.round(30 * 30 * 21.67117e-42 / 100);
    const range = Array.from({ length: 30 }, (v, i) => i / 5 - 3); // -3 to 3 with step 0.2

    // Generate random indices for the limited set of points
    const indices = [];
    while (indices.length < numberOfPoints) {
      const randIndex = Math.floor(Math.random() * 900); // 30 * 30 = 900 total points
      if (!indices.includes(randIndex)) {
        indices.push(randIndex);
      }
    }

    const zData = [];
    const yData = [];
    const fData = [];

    // Populate data arrays only with selected indices
    let count = 0;
    for (let i = 0; i < 30; i++) {
      const rowZ = [];
      const rowY = [];
      const rowF = [];
      for (let j = 0; j < 30; j++) {
        if (indices.includes(count)) {
          rowZ.push(range[i]);
          rowY.push(range[j]);
          rowF.push(f(range[i], range[j], x));
        } else {
          rowZ.push(null);
          rowY.push(null);
          rowF.push(null);
        }
        count++;
      }
      zData.push(rowZ);
      yData.push(rowY);
      fData.push(rowF);
    }

    const plotData = [{
      z: yData,
      x: zData,
      y: fData,
      type: 'surface',
      name: 'Function Surface',
    }];

    setData(plotData);
  }, []);

  return (
    <Plot
      data={data}
      layout={{ title: '3D Function Plot with Limited Random Points' }}
    />
  );
};

export default Plot3D;
