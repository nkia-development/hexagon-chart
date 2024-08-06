import React, { ReactElement } from "react";
import { Hexagon, Text } from "react-hexgrid";
import { HexagonElementProps, ItemData, Visibility } from "./HexagonTypes";
import { getVisibility, pxRatio, ROOT3, TOOLTIP_SPACING } from "./HexagonUtil";

const HexagonElement: React.FC<HexagonElementProps> = ({
  containerRef,
  tooltipStyleRef,
  hex,
  data,
  goToLink,
  toolTipOn,
  tooltip,
  setTooltip,
  size,
  fontSize,
  fontFamily,
  fontColor,
  N,
  hexagonColor,
  hexagonStroke,
  hexagonStrokeWidth,
  disappearingPoint,
  contentsBackgroundShape,
  contentsBackgroundColor,
  contentsBackgroundStroke,
  contentsBackgroundStrokeWidth,
  contentsBackgroundSizeRatio,
  contentsBackgroundRadius,
  iconSize,
  selectedLegend,
  scale,
  mode,
}) => {
  const getMousePosition = (
    toolTipDom: HTMLDivElement,
    container: HTMLDivElement,
    event: React.MouseEvent,
  ) => {
    const containerRect = container.getBoundingClientRect();
    const toolTipRect = toolTipDom.getBoundingClientRect();
    const viewScale = {
      x: 1,
      y: 1,
    };
    let x = event.clientX - containerRect.left;
    let y = event.clientY - containerRect.top;
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    if (mouseX < centerX && mouseY < centerY) {
      x = (x + TOOLTIP_SPACING) / viewScale.x;
      y = (y + TOOLTIP_SPACING) / viewScale.y;
    } else if (mouseX >= centerX && mouseY < centerY) {
      x = (x - toolTipRect.width - TOOLTIP_SPACING) / viewScale.x;
      y = (y + TOOLTIP_SPACING) / viewScale.y;
    } else if (mouseX >= centerX && mouseY >= centerY) {
      x = (x - toolTipRect.width - TOOLTIP_SPACING) / viewScale.x;
      y = (y - toolTipRect.height - TOOLTIP_SPACING) / viewScale.y;
    } else if (mouseX < centerX && mouseY >= centerY) {
      x = (x + TOOLTIP_SPACING) / viewScale.x;
      y = (y - toolTipRect.height - TOOLTIP_SPACING) / viewScale.y;
    }
    return {
      x,
      y,
      containerRect,
      toolTipRect,
      viewScale,
    };
  };

  const createContentsShape = (visibility: Visibility): ReactElement | null => {
    if (visibility === "hidden") return null;
    const ratio = size.x * contentsBackgroundSizeRatio;
    switch (contentsBackgroundShape) {
      case "circle":
        return (
          <circle
            r={ratio}
            stroke={contentsBackgroundStroke}
            strokeWidth={contentsBackgroundStrokeWidth}
            fill={contentsBackgroundColor}
          />
        );
      case "rect":
        return (
          <rect
            x={-1 * (ratio / 2)}
            y={-1 * (ratio / 2)}
            width={ratio}
            height={ratio}
            rx={pxRatio(contentsBackgroundRadius, size.x)}
            ry={pxRatio(contentsBackgroundRadius, size.x)}
            stroke={contentsBackgroundStroke}
            strokeWidth={contentsBackgroundStrokeWidth}
            fill={contentsBackgroundColor}
          />
        );
      case "none":
      default:
        return null;
    }
  };

  const handleMouseOver = (data: ItemData, event: React.MouseEvent) => {
    if (!toolTipOn) return;
    const container = containerRef.current;
    const toolTipDom = tooltipStyleRef.current;
    if (!container || !toolTipDom) return;
    const { x, y } = getMousePosition(toolTipDom, container, event);
    setTooltip({
      ...tooltip,
      x: x,
      y: y,
      content: data?.toolTip,
      borderColor: data?.hexAlarmColor ? data?.hexAlarmColor : data?.hexColor,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    if (!toolTipOn) return;
    setTooltip({ ...tooltip, visible: false, borderColor: "" });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!toolTipOn) return;
    const container = containerRef.current;
    const toolTipDom = tooltipStyleRef.current;
    if (!container || !toolTipDom || !tooltip.visible) return;
    const { x, y } = getMousePosition(toolTipDom, container, event);
    toolTipDom.style.left = `${x}px`;
    toolTipDom.style.top = `${y}px`;
  };

  const doAnimation = selectedLegend.text === "" && selectedLegend.alarm === "";
  const isBright =
    selectedLegend.legendType === "text"
      ? data?.text === selectedLegend.text
      : data?.alarm === selectedLegend.alarm;
  const visibility = getVisibility(N, disappearingPoint, scale);

  return (
    <Hexagon
      className={data?.hexAlarmStrokeBlink ? "blink" : ""}
      q={hex.q}
      r={hex.r}
      s={hex.s}
      onMouseOver={e => handleMouseOver(data, e)}
      onMouseMove={e => handleMouseMove(e)}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (!goToLink) return;
        window.open(data?.link, "_blank");
      }}
      style={{
        fill:
          (data?.hexAlarmColor
            ? data.hexAlarmColor
            : data?.hexColor
              ? data.hexColor
              : hexagonColor) ?? "",
        stroke:
          (data?.hexAlarmStroke
            ? data.hexAlarmStroke
            : data?.hexStroke
              ? data.hexStroke
              : hexagonStroke) ?? "",
        strokeDasharray:
          (data?.hexAlarmStrokeDasharray
            ? data.hexAlarmStrokeDasharray
            : data?.hexStrokeStrokeDasharray) ?? "",
        strokeDashoffset: "2",
        strokeLinejoin: "round",
        strokeWidth: hexagonStrokeWidth ?? 0,
        opacity: doAnimation || isBright ? 1 : 0.3,
      }}
    >
      {createContentsShape(visibility)}
      {mode === "text" ? (
        <Text
          fontFamily={fontFamily}
          fill={fontColor}
          strokeWidth={0}
          fontSize={`${pxRatio(fontSize, size.x)}px`}
          visibility={visibility}
        >
          {data.text}
        </Text>
      ) : mode === "icon" ? (
        <foreignObject
          x={-1 * ((ROOT3 * size.x) / 2)}
          y={-1 * size.y}
          width={ROOT3 * size.x}
          height={2 * size.y}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              visibility: visibility,
            }}
          >
            <img
              src={data.icon}
              style={{ width: `${iconSize}%`, height: "auto" }}
              alt=""
            />
          </div>
        </foreignObject>
      ) : null}
    </Hexagon>
  );
};

export default HexagonElement;
