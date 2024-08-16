import {
  DEGREE_TO_RADIAN,
  HexCoordinates,
  Point,
  RADIAN_TO_DEGREE,
  ROOT3,
} from "./PieHexagonTypes";
import { Hex } from "react-hexgrid";

// 원의 중심 좌표에서 반지름 (radius) 만큼 떨어지고, 0도 부터 시계 방향으로 떨어진 각 일때 해당 지점을 차원 평면 좌표 점에서 구하는 함수
// -90 도를 한 이유는 0 ~ 180은 1, 4 분면 이기 때문에 2, 1 분면으로 시작하려면 -90도 해줘야함
export const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angle: number,
): Point => {
  const radians = (angle - 90) * DEGREE_TO_RADIAN;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
};

// Hex 좌표계 q,r,s 가진 핵사곤의 인접 6개의 핵사곤 좌표를 구하는 함수
export const getHexNeighbors = (hex: Hex): HexCoordinates[] => {
  const directions: HexCoordinates[] = [
    { q: 1, r: -1, s: 0 },
    { q: 1, r: 0, s: -1 },
    { q: 0, r: 1, s: -1 },
    { q: -1, r: 1, s: 0 },
    { q: -1, r: 0, s: 1 },
    { q: 0, r: -1, s: 1 },
  ];

  return directions.map((direction: any) => ({
    q: hex.q + direction.q,
    r: hex.r + direction.r,
    s: hex.s + direction.s,
  }));
};

// 헥사곤을 픽셀 좌표로 변환하는 함수 (pointed top)
export const hexToPixel = (
  hex: Hex,
  hexSize: number,
  spacing: number,
): Point => {
  const x = hexSize * (ROOT3 * hex.q + (ROOT3 / 2) * hex.r);
  const y = hexSize * ((3 / 2) * hex.r);
  return { x: x * spacing, y: y * spacing };
};

// 픽셀을 핵사곤으로 변환하는 함수 (pointed top)
export const pixelToHex = (
  x: number,
  y: number,
  hexSize: number,
  spacing: number,
): Hex => {
  const _x = x / spacing;
  const _y = y / spacing;
  const q = ((ROOT3 / 3) * _x - (1 / 3) * _y) / hexSize;
  const r = ((2 / 3) * _y) / hexSize;
  return new Hex(q, r, -q - r);
};

// 헥사곤의 꼭지점을 계산하는 함수 (pointed top)
export const calculateHexCorners = (
  hex: Hex,
  hexSize: number,
  spacing: number,
): Point[] => {
  const center = hexToPixel(hex, hexSize, spacing);
  const corners = [];
  for (let i = 0; i < 6; i++) {
    const angle = DEGREE_TO_RADIAN * (60 * i - 30); // 각 꼭지점의 각도를 계산 (pointed top 고려)
    const x = center.x + hexSize * Math.cos(angle);
    const y = center.y + hexSize * Math.sin(angle);
    corners.push({ x, y });
  }
  return corners;
};

// 점이 파이 슬라이스 내부에 있는지 확인하는 함수
export const isPointInsidePieSlice = (
  x: number,
  y: number,
  cx: number,
  cy: number,
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  outerRadius: number,
): boolean => {
  const angle = Math.atan2(y - cy, x - cx) * RADIAN_TO_DEGREE + 90;
  const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

  return (
    angle >= startAngle &&
    angle <= endAngle &&
    distance >= innerRadius &&
    distance <= outerRadius
  );
};

// 헥사곤이 파이 슬라이스 내부에 있는지 확인하는 함수
export const isHexagonInsidePieSlice = (
  hex: Hex,
  cx: number,
  cy: number,
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  outerRadius: number,
  hexSize: number,
  spacing: number,
  sideAngleGap: number,
  radiusGap: number,
): boolean => {
  const corners = calculateHexCorners(hex, hexSize, spacing);
  return corners.every(corner =>
    isPointInsidePieSlice(
      corner.x + cx,
      corner.y + cy,
      cx,
      cy,
      startAngle + sideAngleGap,
      endAngle - sideAngleGap,
      innerRadius + radiusGap,
      outerRadius - radiusGap,
    ),
  );
};

// 파이 슬라이스 중심 계산 함수 추가
export const getPieSliceCenter = (
  cx: number,
  cy: number,
  radius: number,
  thickness: number,
  startAngle: number,
  endAngle: number,
) => {
  const middleAngle = (startAngle + endAngle) / 2;
  const distanceFromCenter = radius - thickness / 2;
  return polarToCartesian(cx, cy, distanceFromCenter, middleAngle);
};

// 수량별 호의 높이 계산
export const distributeHeightByQuantity = (
  quantities: number[],
  totalHeight: number,
  adjusted: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
): number[] => {
  const n = quantities.length;
  const baseHeight = totalHeight / n;
  const totalQuantity = quantities.reduce((acc, q) => acc + q, 0);
  const weights = quantities.map(q =>
    totalQuantity > 0 ? q / totalQuantity : 0,
  );
  const adjustedHeights = weights.map(
    weight => baseHeight + (weight * totalHeight) / adjusted,
  );
  const totalAdjustedHeight = adjustedHeights.reduce((acc, h) => acc + h, 0);
  const heightScalingFactor = totalHeight / totalAdjustedHeight;
  return adjustedHeights.map(height => height * heightScalingFactor);
};

export const calculateRadiusAndThicknessByHeightDistribution = (
  calculatedHeights: number[],
  totalHeight: number,
): { radius: number; thickness: number }[] => {
  return calculatedHeights.map((height, index) => {
    return {
      radius:
        totalHeight -
        calculatedHeights.slice(0, index).reduce((acc, h) => acc + h, 0),
      thickness: height,
    };
  });
};
