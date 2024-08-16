import type { Meta, StoryObj } from "@storybook/react";
import PieHexagonChart from "../pie-hexagon/PieHexagonChart";
import { HexagonChartWrapperProps } from "../HexagonTypes";

const meta: Meta<HexagonChartWrapperProps> = {
  title: "Example/PieHexagonChart",
  component: PieHexagonChart,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fill",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof PieHexagonChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultData: Story = {};
