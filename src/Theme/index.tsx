import { FC, ReactNode, useContext } from "react";
import { oneOfType, node, arrayOf } from "prop-types";
import { ThemeProvider as Provider, ThemeContext } from "styled-components";

import { styledComponentTheme } from "./theme";
import { IColors } from "./model";

type Props = {
  children: ReactNode;
};
const status: boolean = false;
const {
  DARK_MODE_COLORS,
  LIGHT_MODE_COLORS,
  fonts,
  screens,
  shadows,
  zIndex,
  shape,
} = styledComponentTheme;

export const colors: IColors = status ? DARK_MODE_COLORS : LIGHT_MODE_COLORS;

const ThemeProvider: FC<Props> = ({ children }) => {
  // const colors = useMemo(
  // 	() => (status ? DARK_MODE_COLORS : LIGHT_MODE_COLORS),
  // 	[DARK_MODE_COLORS, LIGHT_MODE_COLORS, status]
  // );

  return (
    <Provider theme={{ fonts, colors, screens, shadows, zIndex, shape }}>
      {children}
    </Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);

export default ThemeProvider;

ThemeProvider.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};
