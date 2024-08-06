import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from "react";
import { Hex } from "react-hexgrid";

export type Mode = "text" | "icon";
export type ContentsBackgroundShape = "circle" | "rect" | "none";
export type LegendType = "text" | "alarm";
export type Visibility = "hidden" | "visible";
export type PointerType = "grabbing" | "grab" | "default" | "pointer";

export interface SelectedLegend {
  legendType: LegendType | "";
  text: string;
  alarm: string;
}

export interface Zoom {
  scale: number;
  dx: number;
  dy: number;
}

export interface TooltipMousePosition {
  x: number;
  y: number;
  cx: number;
  cy: number;
}

export interface Heights {
  legendHeight: number;
  hexagonHeight: number;
}

export interface Coordinate {
  size: {
    x: number;
    y: number;
  };
  hexes: Hex[];
  origin: {
    x: number;
    y: number;
  };
}

export interface LegendData {
  color: string;
  stroke: string;
  text: string;
}

export interface ToolTipData {
  key: string;
  value: string;
}

export interface ItemData {
  text?: string;
  alarm?: string;
  hexAlarmColor?: string;
  hexAlarmStroke?: string;
  hexAlarmStrokeDasharray?: string;
  hexAlarmStrokeBlink?: boolean;
  icon?: string;
  link?: string;
  hexColor?: string;
  hexStroke?: string;
  hexStrokeStrokeDasharray?: string;
  toolTip?: ToolTipData[];
}

export interface ToolTipState {
  visible: boolean;
  content: ToolTipData[] | undefined;
  borderColor: string | undefined;
  x: number;
  y: number;
}

export interface HexagonElementProps {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  tooltipStyleRef: MutableRefObject<HTMLDivElement | null>;
  hex: Hex;
  data: ItemData;
  goToLink: boolean;
  toolTipOn: boolean;
  tooltip: ToolTipState;
  setTooltip: Dispatch<SetStateAction<ToolTipState>>;
  size: {
    x: number;
    y: number;
  };
  fontSize: number;
  fontFamily?: string;
  fontColor?: string;
  N: number;
  hexagonColor?: string;
  hexagonStroke?: string;
  hexagonStrokeWidth?: number;
  disappearingPoint: number;
  contentsBackgroundShape?: ContentsBackgroundShape;
  contentsBackgroundColor?: string;
  contentsBackgroundStroke?: string;
  contentsBackgroundStrokeWidth?: number;
  contentsBackgroundSizeRatio: number;
  contentsBackgroundRadius: number;
  iconSize: number;
  selectedLegend: { legendType: string; text: string; alarm: string };
  scale: number;
  mode: Mode;
}

export interface HexagonChartProps {
  data: ItemData[];
  width: number;
  height: number;
  spacing: number;
  hexagonMaxSize?: number;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  toolTipOn?: boolean;
  legendOn?: boolean;
  goToLink?: boolean;
  disappearingPoint?: number;
  hexagonMagnification?: number;
  hexagonColor?: string;
  hexagonStroke?: string;
  hexagonStrokeWidth?: number;
  hexAlarmStrokeBlinkColor?: string;
  tooltipFontColor?: string;
  tooltipFontSize?: number;
  tooltipBackgroundColor?: string;
  contentsBackgroundShape?: ContentsBackgroundShape;
  contentsBackgroundColor?: string;
  contentsBackgroundStroke?: string;
  contentsBackgroundStrokeWidth?: number;
  contentsBackgroundSizeRatio?: number;
  contentsBackgroundRadius?: number;
  iconSize?: number;
  zooming?: boolean;
  draggable?: boolean;
  mode?: Mode;
  order?: string;
  textLegendOrder?: string;
  alarmLegendOrder?: string;
  noDataCustomComponent?: () => ReactNode;
}

export interface HexagonChartWrapperProps
  extends Omit<HexagonChartProps, "width" | "height"> {
  width: string;
  height: string;
}

export interface IconWithTextProps {
  color: string;
  stroke: string;
  text: string;
  legendType: LegendType;
  setSelectedLegend: Dispatch<SetStateAction<SelectedLegend>>;
}

export interface LegendProps {
  items: LegendData[];
  legendType: LegendType;
  setSelectedLegend: Dispatch<SetStateAction<SelectedLegend>>;
}
