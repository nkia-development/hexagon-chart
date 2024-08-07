import { Hex } from "react-hexgrid";
import {
  Coordinate,
  Heights,
  ItemData,
  LegendData,
  LegendType,
  Visibility,
} from "./HexagonTypes";

export const ROOT3 = Math.sqrt(3);
export const TOOLTIP_SPACING = 25;
export const BASE_SIZE = 100;
export const LEGEND_HEIGHT_RATIO = 0.1;
export const VISIBILITY_THRESHOLD_SCALE = 1.5;
export const MIN_SCALE = 0.1;
export const MAX_SCALE = 5;

export const pxRatio = (originSize: number, R: number): number =>
  (originSize * R) / 10;

export const getVisibility = (
  N: number,
  disappearingPoint: number,
  scale: number,
): Visibility => {
  return scale > VISIBILITY_THRESHOLD_SCALE
    ? "visible"
    : N > disappearingPoint
      ? "hidden"
      : "visible";
};

export const getHeights = (originHeight: number, legendOn: boolean): Heights =>
  legendOn
    ? {
        legendHeight: originHeight * LEGEND_HEIGHT_RATIO,
        hexagonHeight: originHeight * (1 - LEGEND_HEIGHT_RATIO),
      }
    : {
        legendHeight: 0,
        hexagonHeight: originHeight,
      };

export const createCoordinate = (
  width: number,
  height: number,
  N: number,
  spacing: number,
  hexagonMagnification: number,
  hexagonMaxSize: number,
): Coordinate => {
  let count = 0;
  const hexes: Hex[] = [];
  if (!width || !height || !N || !spacing)
    return { hexes, size: { x: 0, y: 0 }, origin: { x: 0, y: 0 } };

  function calculateOptimalRectSize(
    _width: number,
    _height: number,
    _N: number,
  ) {
    const aspectRatio = _width / _height;
    let cols: number;
    let rows: number;

    if (aspectRatio > 1) {
      cols = Math.ceil(Math.sqrt(_N * aspectRatio));
      rows = Math.ceil(_N / cols);
    } else {
      rows = Math.ceil(Math.sqrt(_N / aspectRatio));
      cols = Math.ceil(_N / rows);
    }

    while (cols * (rows - 1) >= _N) rows--;
    while ((cols - 1) * rows >= _N) cols--;

    const w_prime = _width / cols;
    const h_prime = _height / rows;

    return { w_prime, h_prime, cols, rows };
  }

  const { w_prime, h_prime, cols, rows } = calculateOptimalRectSize(
    width,
    height,
    N,
  );
  let r: number;
  for (r = 0; r < rows; r++) {
    const offset = Math.floor(r / 2);
    for (let q = -offset; q < cols - offset; q++) {
      if (count === N) break;
      hexes.push(new Hex(q, r, -q - r));
      count++;
    }
  }
  const size = {
    x: w_prime / spacing / ROOT3 / (width / BASE_SIZE),
    y: h_prime / spacing / 2 / (height / BASE_SIZE),
  };
  let maxSize = Math.max(size.x, size.y);
  maxSize *= 0.86 * hexagonMagnification;
  maxSize = Math.min(maxSize, hexagonMaxSize);
  size.x = maxSize;
  size.y = maxSize;
  const { x, y } = size;
  const sumHexWidth =
    ROOT3 * x +
    ROOT3 * x * spacing * (cols - 1) +
    (rows > 1 && N >= cols * 2 ? (ROOT3 * x) / 2 : 0);
  const sumHexHeight = 2 * y + (3 / 2) * y * spacing * (rows - 1);
  const origin = {
    x: -1 * (sumHexWidth / 2) + (ROOT3 * x) / 2,
    y: -1 * (sumHexHeight / 2) + (2 * y) / 2,
  };
  return { hexes, size, origin };
};

export const getLegendData = (
  data: ItemData[],
  key: LegendType,
  defaultHexStroke: string,
  defaultHexColor: string,
  order: string,
): LegendData[] => {
  return Object.values(
    data.reduce(
      (obj, el) => {
        const legendElement = {
          text: key === "text" ? el.text || "" : el.alarm || "",
          stroke:
            key === "text"
              ? el.hexStroke || defaultHexStroke
              : el.hexAlarmStroke || "",
          color:
            key === "text"
              ? el.hexColor || defaultHexColor
              : el.hexAlarmColor || "",
        };
        obj[legendElement.text] = legendElement;
        return obj;
      },
      {} as Record<string, { color: string; stroke: string; text: string }>,
    ),
  )
    .filter(el => el.text !== "")
    .sort((a, b) => {
      if (order === "asc") {
        return a.text.localeCompare(b.text);
      }
      // order === "desc"
      return b.text.localeCompare(a.text);
    });
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return { r, g, b };
};

export const colorToRgba = (
  color: string,
): { r: number; g: number; b: number; a: number } => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("2D context not supported or canvas already initialized");
  }
  ctx.fillStyle = color;
  document.body.appendChild(canvas);
  const computedColor = ctx.fillStyle;
  document.body.removeChild(canvas);
  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(computedColor)) {
    const { r, g, b } = hexToRgb(computedColor);
    return { r, g, b, a: 1 };
  }
  const rgbaMatch = computedColor.match(
    /rgba?\((\d+), (\d+), (\d+),? (\d+(\.\d+)?|)\)/,
  );
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1]),
      g: parseInt(rgbaMatch[2]),
      b: parseInt(rgbaMatch[3]),
      a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
    };
  }
  throw new Error("Invalid color format");
};

export const createColorMatrixValues = (
  r: number,
  g: number,
  b: number,
  alpha: number,
): string => {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  return `0 0 0 0 ${rNorm} 0 0 0 0 ${gNorm} 0 0 0 0 ${bNorm} 0 0 0 ${alpha === 1 ? alpha * 0.25 : alpha} 0`;
};
