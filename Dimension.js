import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

// Function definition
const f = (z, y, x) => z * y * y + z * z + y + x + z;

// Partial derivatives:
const partialDerivativeZ = (z, y) => y * y + 2 * z + 1;
const partialDerivativeY = (z, y) => 2 * z * y + 1;

const Plot3D = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define a range for z and y
    const zRange = Array.from({ length: 30 }, (v, i) => i / 5 - 3); // -3 to 3 with step 0.2
    const yRange = Array.from({ length: 30 }, (v, i) => i / 5 - 3); // -3 to 3 with step 0.2

    const plotData = [];

    for (let x = 0; x <= 3; x++) {
      const zData = [];
      const yData = [];
      const fData = [];

      for (let z of zRange) {
        const rowZ = [];
        const rowY = [];
        const rowF = [];
        for (let y of yRange) {
          rowZ.push(z);
          rowY.push(y);
          rowF.push(f(z, y, x));
        }
        zData.push(rowZ);
        yData.push(rowY);
        fData.push(rowF);
      }

      plotData.push({
        z: yData,
        x: zData,
        y: fData,
        type: 'surface',
        name: `x=${x}`,
      });
    }

    // Add tangent plane at a specific point (z0, y0, x0)
    const z0 = 1, y0 = 2, x0 = 3;
    const f0 = f(z0, y0, x0);
    const df_dz = partialDerivativeZ(z0, y0);
    const df_dy = partialDerivativeY(z0, y0);

    const tangentPlane = [];

    for (let z of zRange) {
      const row = [];
      for (let y of yRange) {
        row.push(f0 + df_dz * (z - z0) + df_dy * (y - y0));
      }
      tangentPlane.push(row);
    }

    plotData.push({
      z: yRange,
      x: zRange,
      y: tangentPlane,
      type: 'surface',
      name: 'Tangent Plane',
      opacity: 0.6,
    });

    setData(plotData);
  }, []);

  return (
    <Plot
      data={data}
      layout={{ title: '3D Function Plot with Tangent Plane' }}
    />
  );
};

export default Plot3D;
