import React from "react";

export interface PieSliceProps {
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  thickness: number;
  style: React.CSSProperties;
}

export interface PieHexagonGridProps {
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  thickness: number;
  hexSize: number;
  spacing: number;
  pieSliceStyle: React.CSSProperties;
  hexagonStyle: React.CSSProperties;
  sideAngleGap?: number;
  radiusGap?: number;
  data: any[];
}

export const DEGREE_TO_RADIAN = Math.PI / 180.0;
export const RADIAN_TO_DEGREE = 180 / Math.PI;
export const ROOT3 = Math.sqrt(3);

export interface Point {
  x: number;
  y: number;
}

export interface HexCoordinates {
  q: number;
  r: number;
  s: number;
}
