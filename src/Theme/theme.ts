// theme.js
enum SCREENS {
  DESKTOP = "(max-width: 1440px)",
  WIDESCREEN = "(max-width: 1200px)",
  LARGE_TABLET = "(max-width: 1024px)",
  MEDIUM_TABLET = "(max-width: 900px)",
  SMALL_TABLET = "(max-width: 768px)",
  LARGE_MOBILE = "(max-width: 600px)",
  MEDIUM_MOBILE = "(max-width: 480px)",
  SMALL_MOBILE = "(max-width: 320px)",
}

// All app colors
enum LIGHT_MODE_COLORS {
  DARK = "000",
  PRIMARY = "#06BFBF",
  PRIMARY_LIGHT = "#06BFBF1A",
  PRIMARY_DARK = "#035E73",
  SECONDARY = "#C9C9C9",
  GREY = "#777777",
  LIGHT_PINK = "#D845261A",
  DANGER = "#D84526",
  PRIMARY_TEXT = "#707070",
  SECONDARY_TEXT = "#1E1E1ECC",
  BUTTON_TEXT = "#F1F1F1",
  SUBTITLE_TEXT = "#000000CC",
  WHITE = "#FFFFFF",
  TRANSPARENT = "transparent",
  BG_PRIMARY = "#035E73",
  PRIMARY_DARK_TEXT = "#02303B",
}

enum DARK_MODE_COLORS {
  DARK = "000",
  PRIMARY = "#06BFBF",
  PRIMARY_LIGHT = "#06BFBF1A",
  PRIMARY_DARK = "#035E73",
  SECONDARY = "#C9C9C9",
  GREY = "#777777",
  LIGHT_PINK = "#D845261A",
  DANGER = "#D84526",
  PRIMARY_TEXT = "#707070",
  SECONDARY_TEXT = "#1E1E1ECC",
  BUTTON_TEXT = "#F1F1F1",
  SUBTITLE_TEXT = "#000000CC",
  WHITE = "#FFFFFF",
  TRANSPARENT = "transparent",
  BG_PRIMARY = "#035E73",
  PRIMARY_DARK_TEXT = "#02303B",
}

// All app font sizes
enum FONTS {
  SMALL_SIZE = 8,
  MEDIUM_SIZE = 12,
  LARGE_SIZE = 16,
  CIRCULAR_ALL = "Circular, sans-serif",
  CIRCULAR_BOLD = "Circular-Bold, sans-serif",
  CIRCULAR_BOOK = "Circular-Book, sans-serif",
  CIRCULAR_MEDIUM = "Circular-Medium, sans-serif",
}

enum SHADOWS {
  S1 = " 0px 2px 4px #14213D29",
  S2 = "0px 4px 10px #0000004D",
  S3 = "0px -2px 4px #14213D29",
}

enum Z_INDEX {
  APP_BAR = 1100,
  DRAWER = 1200,
}

enum SHAPE {
  BORDER_RADIUS = "7.5px",
}

export const styledComponentTheme = {
  fonts: FONTS,
  screens: SCREENS,
  shadows: SHADOWS,
  zIndex: Z_INDEX,
  shape: SHAPE,
  DARK_MODE_COLORS,
  LIGHT_MODE_COLORS,
};
