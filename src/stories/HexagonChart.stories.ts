import type { Meta, StoryObj } from "@storybook/react";
import HexagonChartWrapper from "../HexagonChartWrapper";
import getDummyData from "./mock/getDummyData";
import args from "./mock/args";
import { HexagonChartWrapperProps } from "../HexagonTypes";

const meta: Meta<HexagonChartWrapperProps> = {
  title: "Example/HexagonChart",
  component: HexagonChartWrapper,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof HexagonChartWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithData: Story = {
  args: {
    ...args,
    data: getDummyData(50),
    mode: "icon",
  },
};

export const dataWithEmptyArray: Story = {
  args: {
    ...args,
    data: [],
    mode: "icon",
  },
};

// Zooming Off
export const NoZooming: Story = {
  args: {
    ...args,
    data: getDummyData(30),
    zooming: false,
    mode: "icon",
  },
};

// Legend On
export const WithLegend: Story = {
  args: {
    ...args,
    data: getDummyData(20),
    legendOn: true,
    mode: "icon",
  },
};

// Different Mode - Text Mode
export const TextMode: Story = {
  args: {
    ...args,
    data: getDummyData(40),
    mode: "text",
  },
};

// Draggable Off
export const NonDraggable: Story = {
  args: {
    ...args,
    data: getDummyData(60),
    draggable: false,
    mode: "icon",
  },
};

// Different Icon Size
export const LargeIconSize: Story = {
  args: {
    ...args,
    data: getDummyData(50),
    iconSize: 70,
    mode: "icon",
  },
};

// Tooltip Off
export const TooltipOff: Story = {
  args: {
    ...args,
    data: getDummyData(50),
    toolTipOn: false,
    mode: "icon",
  },
};

// Smaller Hexagon Size
export const SmallHexagonSize: Story = {
  args: {
    ...args,
    data: getDummyData(50),
    hexagonMaxSize: 10,
    mode: "icon",
  },
};
