import { create } from "@storybook/theming/create";
import brandImage from "../src/stories/assets/nkia-logo.png";

const brandTitle = "Hexagon-Chart Storybook";
const brandUrl = "https://nkia-development.github.io/hexagon-chart";
const brandTarget = "_self";

const commonThemeObj = {
  brandTitle,
  brandUrl,
  brandImage,
  brandTarget,
};

export const darkTheme = create({
  base: "dark",
  ...commonThemeObj,
});

// TODO: jukangpark Add light theme
export const lightTheme = create({
  base: "light",
  ...commonThemeObj,
});
