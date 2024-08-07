import React from "react";
import { HexagonChartWrapperProps } from "./HexagonTypes";
import useParentSize from "./useParentSize";
import HexagonChart from "./HexagonChart";

const HexagonChartWrapper: React.FC<HexagonChartWrapperProps> = props => {
  const [ref, size] = useParentSize();

  return (
    <div>
      <div
        style={{
          display: props.data.length <= 0 ? "flex" : "none",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {props.noDataCustomComponent ? (
          props.noDataCustomComponent()
        ) : (
          <span>NO DATA</span>
        )}
      </div>
      <div
        ref={ref}
        style={{
          width: props.width,
          height: props.height,
        }}
      >
        <HexagonChart {...props} width={size.width} height={size.height} />
      </div>
    </div>
  );
};

export default HexagonChartWrapper;
