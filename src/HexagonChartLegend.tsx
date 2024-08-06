import React, { useState } from "react";
import { IconWithTextProps, LegendProps, PointerType } from "./HexagonTypes";

const IconWithText: React.FC<IconWithTextProps> = ({
  color,
  stroke,
  text,
  legendType,
  setSelectedLegend,
}) => {
  const [pointer, setPointer] = useState<PointerType>("default");

  return (
    <div
      style={{
        cursor: pointer,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "6px",
      }}
      onMouseOver={() => {
        setPointer("pointer");
        if (legendType === "text") {
          setSelectedLegend({
            legendType,
            alarm: "",
            text,
          });
        } else if (legendType === "alarm") {
          setSelectedLegend({
            legendType,
            text: "",
            alarm: text,
          });
        }
      }}
      onMouseLeave={() => {
        setPointer("default");
        setSelectedLegend({ legendType: "", text: "", alarm: "" });
      }}
    >
      <div
        style={{
          backgroundColor: color,
          border: `${stroke} solid 1px`,
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          display: "inline-block",
        }}
      />
      <span
        style={{
          textAlign: "left",
          verticalAlign: "middle",
          fontSize: "14px",
          lineHeight: "24px",
        }}
      >
        {text}
      </span>
    </div>
  );
};

const HexagonChartLegend: React.FC<LegendProps> = ({
  items,
  setSelectedLegend,
  legendType,
}) => (
  <div
    style={{
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      padding: "2px 10px",
      gap: "16px",
    }}
  >
    {items.map((item, index) => (
      <IconWithText
        key={index}
        {...item}
        setSelectedLegend={setSelectedLegend}
        legendType={legendType}
      />
    ))}
  </div>
);

export default HexagonChartLegend;
