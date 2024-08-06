import React, {
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  WheelEvent,
} from "react";
import { HexGrid, Layout } from "react-hexgrid";
import {
  HexagonChartProps,
  PointerType,
  SelectedLegend,
  TooltipMousePosition,
  ToolTipState,
  Zoom,
} from "./HexagonTypes";
import {
  colorToRgba,
  createColorMatrixValues,
  createCoordinate,
  getHeights,
  getLegendData,
  MAX_SCALE,
  MIN_SCALE,
} from "./HexagonUtil";
import HexagonChartLegend from "./HexagonChartLegend";
import HexagonElement from "./HexagonElement";

const HexagonChart: React.FC<HexagonChartProps> = ({
  data = [],
  width,
  height,
  spacing = 1.0,
  hexagonMaxSize = 30,
  goToLink = false,
  toolTipOn = true,
  legendOn = true,
  fontSize = 5,
  fontFamily,
  fontColor = "black",
  disappearingPoint = 200,
  hexagonMagnification = 11,
  hexagonColor = "rgba(63, 81, 181, 0.5)",
  hexagonStroke = "rgba(63, 81, 181)",
  hexagonStrokeWidth,
  tooltipFontColor = "black",
  tooltipFontSize = 10,
  tooltipBackgroundColor = "white",
  contentsBackgroundShape = "none",
  contentsBackgroundColor = "white",
  contentsBackgroundStroke,
  hexAlarmStrokeBlinkColor = "red",
  contentsBackgroundStrokeWidth,
  contentsBackgroundSizeRatio = 0.5,
  contentsBackgroundRadius = 10,
  iconSize = 50,
  zooming = true,
  draggable = true,
  mode = "text",
  order = "asc", // asc, desc
  textLegendOrder = "asc", // asc, desc
  alarmLegendOrder = "asc", // asc, desc
}) => {
  const [tooltip, setTooltip] = useState<ToolTipState>({
    visible: false,
    content: [],
    borderColor: "",
    x: 0,
    y: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipStyleRef = useRef<HTMLDivElement>(null);
  const { legendHeight, hexagonHeight } = getHeights(height, legendOn);

  const { hexes, size, origin } = useMemo(
    () =>
      createCoordinate(
        width,
        hexagonHeight,
        data.length,
        spacing,
        hexagonMagnification,
        hexagonMaxSize,
      ),
    [
      hexagonMaxSize,
      width,
      hexagonHeight,
      data.length,
      spacing,
      hexagonMagnification,
    ],
  );

  // order 가 양수일 경우 배열을 오름차순으로 정렬, 음수일 경우 내림차순으로 정렬

  if (order) {
    data.sort((a, b) => {
      if (a.text === undefined && b.text === undefined) {
        return 0;
      } else if (a.text === undefined) {
        return order === "asc" ? 1 : -1;
      } else if (b.text === undefined) {
        return order === "asc" ? -1 : 1;
      }

      if (order === "asc") {
        return a.text.localeCompare(b.text);
      }
      // order === "desc"
      return b.text.localeCompare(a.text);
    });
  }

  const pointer = draggable ? "grab" : "default";
  const gRef = useRef<SVGGElement>(null);
  const [pointerStyle, setPointerStyle] = useState<PointerType>(pointer);
  const [zoom, setZoom] = useState<Zoom>({ scale: 1, dx: 0, dy: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<TooltipMousePosition>({
    x: 0,
    y: 0,
    cx: 0,
    cy: 0,
  });
  const [selectedLegend, setSelectedLegend] = useState<SelectedLegend>({
    legendType: "",
    text: "",
    alarm: "",
  });

  const blinkStyleRef = useRef<HTMLStyleElement>();

  const colorToMatrixValues = useMemo(() => {
    const rgba = colorToRgba(hexAlarmStrokeBlinkColor);
    return createColorMatrixValues(rgba.r, rgba.g, rgba.b, rgba.a);
  }, [hexAlarmStrokeBlinkColor]);

  useLayoutEffect(() => {
    blinkStyleRef.current = document.createElement("style");
    blinkStyleRef.current.innerHTML = `
        @keyframes blink {
          25% { stroke: ${hexAlarmStrokeBlinkColor}; stroke-width: ${hexagonStrokeWidth ?? 0};}
          50% { stroke: ${hexAlarmStrokeBlinkColor}; stroke-width: ${(hexagonStrokeWidth ?? 0) * 2}; filter: url(#inset);}
          25% { stroke: ${hexAlarmStrokeBlinkColor}; stroke-width: ${hexagonStrokeWidth ?? 0};}
        }
        .blink {
          animation: blink 2s infinite;
          animation-delay: 4s;
        }
      `;
    document.head.appendChild(blinkStyleRef.current);

    return () => {
      if (blinkStyleRef.current !== undefined) {
        document.head.removeChild(blinkStyleRef.current);
      }
    };
  }, [hexAlarmStrokeBlinkColor, hexagonStrokeWidth]);

  useEffect(() => {
    const svg = gRef.current?.closest("svg");
    const g = gRef.current;
    const observer = new MutationObserver(() => {
      if (svg && g) {
        const bbox = g.getBBox();
        const margin = 20;
        svg.setAttribute(
          "viewBox",
          `${bbox.x - margin} ${bbox.y - margin} ${bbox.width + 2 * margin} ${
            bbox.height + 2 * margin
          }`,
        );
      }
    });

    if (g) {
      observer.observe(g, {
        childList: true, // 자식 요소의 추가 및 제거 감지
        attributes: true, // 속성 변화 감지
        subtree: true, // 하위 요소에 대한 변화까지 감지
      });
    }

    return () => {
      observer.disconnect(); // 컴포넌트가 언마운트될 때 옵저버 연결 해제
    };
  }, []);

  const convertToSvgPosition = (
    cx: number,
    cy: number,
  ): undefined | DOMPoint => {
    const svg = gRef.current?.closest("svg");
    if (!svg) return;
    const ctm = svg.getScreenCTM();
    const point = svg.createSVGPoint();
    point.x = cx;
    point.y = cy;
    return point.matrixTransform(ctm?.inverse());
  };

  const handleWheel = (e: WheelEvent) => {
    const domPoint = convertToSvgPosition(e.clientX, e.clientY);
    if (!domPoint) return;
    const { x, y } = domPoint;
    const direction = e.deltaY > 0 ? -1 : 1;
    const factor = 0.1;
    const newScale = Math.min(
      Math.max(zoom.scale + direction * factor, MIN_SCALE),
      MAX_SCALE,
    );

    const dx = (1 - newScale / zoom.scale) * (x - zoom.dx) + zoom.dx;
    const dy = (1 - newScale / zoom.scale) * (y - zoom.dy) + zoom.dy;

    setZoom({
      scale: newScale,
      dx,
      dy,
    });
  };

  const handleDoubleClick = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setStartPos({ x: 0, y: 0, cx: 0, cy: 0 });
    setZoom({ scale: 1, dx: 0, dy: 0 });
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setPointerStyle("grabbing");
    setStartPos({ x: zoom.dx, y: zoom.dy, cx: e.clientX, cy: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const previousMousePosition = convertToSvgPosition(
      startPos.cx,
      startPos.cy,
    );
    const currentMousePosition = convertToSvgPosition(e.clientX, e.clientY);
    if (!previousMousePosition || !currentMousePosition) return;

    setZoom(prev => {
      return {
        ...prev,
        dx: startPos.x - (previousMousePosition.x - currentMousePosition.x),
        dy: startPos.y - (previousMousePosition.y - currentMousePosition.y),
      };
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPointerStyle(pointer);
  };

  const textLegend = getLegendData(
    data,
    "text",
    hexagonStroke,
    hexagonColor,
    textLegendOrder,
  );
  const alarmLegend = getLegendData(
    data,
    "alarm",
    hexagonStroke,
    hexagonColor,
    alarmLegendOrder,
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {legendOn && (
        <div
          style={{
            width: `${width}px`,
            height: `${legendHeight}px`,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            gap: "60px",
          }}
        >
          {textLegend.length > 0 && (
            <HexagonChartLegend
              items={textLegend}
              legendType={"text"}
              setSelectedLegend={setSelectedLegend}
            />
          )}
          {alarmLegend.length > 0 && (
            <HexagonChartLegend
              items={alarmLegend}
              legendType={"alarm"}
              setSelectedLegend={setSelectedLegend}
            />
          )}
        </div>
      )}
      <HexGrid
        width={width}
        height={hexagonHeight}
        viewBox={`-50 -50 100 100`}
        onWheel={zooming ? handleWheel : undefined}
        onDoubleClick={draggable || zooming ? handleDoubleClick : undefined}
        onMouseDown={
          draggable ? handleMouseDown : (e: MouseEvent) => e.preventDefault()
        }
        onMouseMove={draggable ? handleMouseMove : undefined}
        onMouseUp={draggable ? handleMouseUp : undefined}
        onMouseLeave={draggable ? handleMouseUp : undefined}
        style={{ overflow: "hidden", cursor: pointerStyle }}
      >
        <defs>
          <filter
            id="inset"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values={colorToMatrixValues} />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_2468_67926"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_2468_67926"
              result="shape"
            />
          </filter>
        </defs>
        <g
          ref={gRef}
          transform={`translate(${zoom.dx}, ${zoom.dy}) scale(${zoom.scale})`}
        >
          <Layout size={size} flat={false} spacing={spacing} origin={origin}>
            {hexes.map((hex, i) => (
              <HexagonElement
                key={i}
                size={size}
                containerRef={containerRef}
                tooltipStyleRef={tooltipStyleRef}
                hex={hex}
                data={data[i]}
                goToLink={goToLink}
                toolTipOn={toolTipOn}
                tooltip={tooltip}
                setTooltip={setTooltip}
                fontSize={fontSize}
                fontFamily={fontFamily}
                fontColor={fontColor}
                N={data.length}
                hexagonColor={hexagonColor}
                hexagonStroke={hexagonStroke}
                hexagonStrokeWidth={hexagonStrokeWidth}
                disappearingPoint={disappearingPoint}
                contentsBackgroundShape={contentsBackgroundShape}
                contentsBackgroundColor={contentsBackgroundColor}
                contentsBackgroundStroke={contentsBackgroundStroke}
                contentsBackgroundStrokeWidth={contentsBackgroundStrokeWidth}
                contentsBackgroundSizeRatio={contentsBackgroundSizeRatio}
                contentsBackgroundRadius={contentsBackgroundRadius}
                iconSize={iconSize}
                selectedLegend={selectedLegend}
                scale={zoom.scale}
                mode={mode}
              />
            ))}
          </Layout>
        </g>
      </HexGrid>
      {toolTipOn && (
        <div
          ref={tooltipStyleRef}
          style={{
            position: "absolute",
            visibility: tooltip.visible ? "visible" : "hidden",
            backgroundColor: tooltipBackgroundColor || "white",
            color: tooltipFontColor || "black",
            fontFamily: fontFamily || "",
            fontSize: `${tooltipFontSize}px`,
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            border: `2px solid ${tooltip.borderColor || "black"}`,
            opacity: 0.7,
            padding: "8px",
            borderRadius: "5px",
            zIndex: 1000000000,
          }}
        >
          {tooltip.content?.map((data, i) => (
            <div key={i}>{`${data.key}: ${data.value}`}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HexagonChart;
