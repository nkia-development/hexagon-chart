import React, { useCallback, useMemo } from "react";
import { PieHexagonGridProps } from "./PieHexagonTypes";
import {
  getHexNeighbors,
  getPieSliceCenter,
  isHexagonInsidePieSlice,
  pixelToHex,
} from "./PieHexagonUtil";
import { Hex, Layout, Hexagon } from "react-hexgrid";
import PieSlice from "./PieSlice";

const PieHexagonGrid: React.FC<PieHexagonGridProps> = ({
  cx,
  cy,
  radius,
  startAngle,
  endAngle,
  thickness,
  hexSize,
  spacing,
  pieSliceStyle,
  hexagonStyle,
  sideAngleGap = 1,
  radiusGap = 8,
  data,
}) => {
  // BFS 알고리즘을 사용하여 파이 슬라이스 내부에 있는 헥사곤을 생성
  const generateHexagonsInPieSlice = useCallback(
    (centerHex: Hex, maxCount: number): Hex[] => {
      const hexagons = [];
      const queue = [centerHex];
      const visited = new Set();

      while (queue.length > 0 && hexagons.length < maxCount) {
        const hex = queue.shift();
        if (!hex) continue;
        const hexKey = `${Math.round(hex.q)},${Math.round(hex.r)},${Math.round(hex.s)}`;
        if (!visited.has(hexKey)) {
          visited.add(hexKey);
          if (
            isHexagonInsidePieSlice(
              hex,
              cx,
              cy,
              startAngle,
              endAngle,
              radius - thickness,
              radius,
              hexSize,
              spacing,
              sideAngleGap,
              radiusGap,
            )
          ) {
            hexagons.push(hex);
            const neighbors = getHexNeighbors(hex);
            for (const neighbor of neighbors) {
              if (
                !visited.has(
                  `${Math.round(neighbor.q)},${Math.round(neighbor.r)},${Math.round(neighbor.s)}`,
                )
              ) {
                queue.push(neighbor);
              }
            }
          }
        }
      }
      return hexagons;
    },
    [cx, cy, endAngle, hexSize, radius, spacing, startAngle, thickness],
  );

  const pieSliceCenter = useMemo(
    () => getPieSliceCenter(cx, cy, radius, thickness, startAngle, endAngle),
    [cx, cy, radius, thickness, startAngle, endAngle],
  );

  const centerHex = useMemo(
    () =>
      pixelToHex(
        pieSliceCenter.x - cx,
        pieSliceCenter.y - cy,
        hexSize,
        spacing,
      ),
    [pieSliceCenter, cx, cy, hexSize, spacing],
  );

  const hexagonsInPieSlice = useMemo(
    () => generateHexagonsInPieSlice(centerHex, data?.length ?? 1),
    [centerHex, data, generateHexagonsInPieSlice],
  );

  return (
    <g>
      <Layout
        size={{ x: hexSize, y: hexSize }}
        origin={{ x: cx, y: cy }}
        spacing={spacing}
        flat={false}
      >
        {hexagonsInPieSlice.map((hex, index) => (
          <Hexagon
            style={hexagonStyle}
            key={index}
            q={hex.q}
            r={hex.r}
            s={hex.s}
          />
        ))}
      </Layout>
      <PieSlice
        style={pieSliceStyle}
        cx={cx}
        cy={cy}
        radius={radius}
        startAngle={startAngle}
        endAngle={endAngle}
        thickness={thickness}
      />
    </g>
  );
};

export default PieHexagonGrid;
