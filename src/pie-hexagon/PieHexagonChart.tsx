import React from "react";
import PieHexagonGrid from "./PieHexagonGrid";

const getDummyData = (length: number): number[] => new Array(length).fill(0);

const PieHexagonChart = () => {
  return (
    <svg width={"100%"} height={"750px"} viewBox="0 0 500 500">
      <PieHexagonGrid
        cx={250} // 원 중심 x
        cy={500} // 원 중심 y
        radius={455} // outer 반지름
        startAngle={-90}
        endAngle={90}
        thickness={20} // 영역 두께
        hexSize={10} // 핵사곤 사이즈
        spacing={1.12} // 핵사곤
        pieSliceStyle={{ fill: "#F7F8F8", strokeWidth: 1, stroke: "#E9EBEC" }}
        hexagonStyle={{
          fill: "red",
        }}
        data={getDummyData(0)} // data
      />
      <PieHexagonGrid
        cx={250}
        cy={500}
        radius={430}
        startAngle={-90}
        endAngle={90}
        thickness={60}
        hexSize={10}
        spacing={1.12}
        pieSliceStyle={{
          fill: "none",
          strokeWidth: 3,
          stroke: "#E5EDFF",
          strokeDasharray: "4",
        }}
        hexagonStyle={{
          fill: "#C2D4FF",
          stroke: "#004CFF",
        }}
        data={getDummyData(120)}
      />
      <PieHexagonGrid
        cx={250}
        cy={500}
        radius={370}
        startAngle={-90}
        endAngle={90}
        thickness={80}
        hexSize={10}
        spacing={1.12}
        pieSliceStyle={{
          fill: "none",
          strokeWidth: 3,
          stroke: "#E8F8EC",
          strokeDasharray: "4",
        }}
        hexagonStyle={{
          fill: "#CDEFD6",
          stroke: "#25BB4D",
        }}
        data={getDummyData(40)}
      />
      <PieHexagonGrid
        cx={250}
        cy={500}
        radius={290}
        startAngle={-90}
        endAngle={90}
        thickness={80}
        hexSize={10}
        spacing={1.12}
        pieSliceStyle={{
          fill: "none",
          strokeWidth: 3,
          stroke: "#EDF0F8",
          strokeDasharray: "4",
        }}
        hexagonStyle={{
          fill: "#EDF0F8",
          stroke: "#3955B1",
          strokeDasharray: "2 1",
        }}
        data={getDummyData(100)}
      />
      <PieHexagonGrid
        cx={250}
        cy={500}
        radius={210}
        startAngle={-90}
        endAngle={90}
        thickness={80}
        hexSize={10}
        spacing={1.12}
        pieSliceStyle={{
          fill: "none",
          strokeWidth: 3,
          stroke: "#FEF8E7",
          strokeDasharray: "4",
        }}
        hexagonStyle={{
          fill: "#FDEFC4",
          stroke: "#F5B800",
        }}
        data={getDummyData(20)}
      />
      <PieHexagonGrid
        cx={250}
        cy={500}
        radius={130}
        startAngle={-90}
        endAngle={90}
        thickness={40}
        hexSize={8}
        spacing={1.12}
        pieSliceStyle={{
          fill: "none",
          strokeWidth: 3,
          stroke: "#FDE7E8",
          strokeDasharray: "4",
        }}
        hexagonStyle={{
          fill: "#FBC6C8",
          stroke: "#ED121D",
        }}
        data={getDummyData(30)}
      />
      <line
        x1={-220}
        y1={500}
        x2={720}
        y2={500}
        strokeWidth={3}
        stroke="#EBEDED"
      />
    </svg>
  );
};

export default PieHexagonChart;
