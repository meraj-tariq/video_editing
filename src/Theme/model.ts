export interface TTheme {
  // All Screen Sizes
  screens: {
    DESKTOP: number | string;
    WIDESCREEN: number | string;
    LARGE_TABLET: number | string;
    MEDIUM_TABLET: number | string;
    SMALL_TABLET: number | string;
    LARGE_MOBILE: number | string;
    MEDIUM_MOBILE: number | string;
    SMALL_MOBILE: number | string;
  };

  // All Global App Colors
  colors: IColors;

  // All Global App Font Sizes
  fonts: {
    SMALL_SIZE: number;
    LARGE_SIZE: number;
    MEDIUM_SIZE: number;
    CIRCULAR_ALL: string;
    CIRCULAR_BOLD: string;
    CIRCULAR_BOOK: string;
    CIRCULAR_MEDIUM: string;
  };

  shadows: {
    S1: string;
    S2: string;
    S3: string;
  };

  zIndex: {
    APP_BAR: number;
    DRAWER: number;
  };

  shape: {
    BORDER_RADIUS: string;
  };
}

export interface IColors {
  PRIMARY: string;
  PRIMARY_LIGHT: string;
  PRIMARY_DARK: string;
  SECONDARY: string;
  GREY: string;
  LIGHT_PINK: string;
  DANGER: string;
  PRIMARY_TEXT: string;
  SECONDARY_TEXT: string;
  BUTTON_TEXT: string;
  SUBTITLE_TEXT: string;
  WHITE: string;
  TRANSPARENT: string;
  BG_PRIMARY: string;
  PRIMARY_DARK_TEXT: string;
}

export interface IColors {
  DARK: string;
  PRIMARY: string;
  PRIMARY_LIGHT: string;
  PRIMARY_DARK: string;
  SECONDARY: string;
  GREY: string;
  LIGHT_PINK: string;
  DANGER: string;
  PRIMARY_TEXT: string;
  SECONDARY_TEXT: string;
  BUTTON_TEXT: string;
  SUBTITLE_TEXT: string;
  WHITE: string;
  TRANSPARENT: string;
  BG_PRIMARY: string;
  PRIMARY_DARK_TEXT: string;
}
