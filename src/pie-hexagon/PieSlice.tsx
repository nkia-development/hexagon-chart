import React from "react";
import { PieSliceProps } from "./PieHexagonTypes";
import { polarToCartesian } from "./PieHexagonUtil";

const PieSlice: React.FC<PieSliceProps> = ({
  cx,
  cy,
  radius,
  startAngle,
  endAngle,
  thickness,
  style,
}) => {
  const startOuter = polarToCartesian(cx, cy, radius, startAngle);
  const endOuter = polarToCartesian(cx, cy, radius, endAngle);
  const startInner = polarToCartesian(cx, cy, radius - thickness, startAngle);
  const endInner = polarToCartesian(cx, cy, radius - thickness, endAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const pathData = `
    M ${startInner.x} ${startInner.y}
    A ${radius - thickness} ${radius - thickness} 0 ${largeArcFlag} 1 ${endInner.x} ${endInner.y}
    L ${endOuter.x} ${endOuter.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 0 ${startOuter.x} ${startOuter.y}
    Z
  `;

  return <path d={pathData} style={style} />;
};

export default PieSlice;
