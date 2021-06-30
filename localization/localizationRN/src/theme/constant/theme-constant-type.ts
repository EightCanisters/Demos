export interface IFETheme {
  readonly name: ThemeColors;
  readonly fontSize: IFEFontSize;
  readonly fontWeight: IFEFontWeight;
  readonly fontFamily: IFEFontFamily;
  readonly spacing: IFESpacing;
  readonly lineHeight: IFELineHeight;
  readonly colors: IFEColor;
  readonly iconSize: IFEIconSize;
}
export enum ThemeColors {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export interface IFEPlatform {
  readonly fontSize: IFEFontSize;
  readonly fontWeight: IFEFontWeight;
  readonly fontFamily: IFEFontFamily;
  readonly spacing: IFESpacing;
  readonly lineHeight: IFELineHeight;
  readonly iconSize: IFEIconSize;
}
export interface IFEColor {
  readonly background: string;
  readonly bodyStandoutBackground: string;
  readonly bodyFrameBackground: string;
  readonly bodyFrameDivider: string;
  readonly bodyText: string;
  readonly bodyTextChecked: string;
  readonly subText: string;
  readonly bodyDivider: string;
  readonly disabledBackground: string;
  readonly disabledText: string;
  readonly disabledBodyText: string;
  readonly disabledSubtext: string;
  readonly disabledBodySubtext: string;
  readonly focusBorder: string;
  readonly variantBorder: string;
  readonly variantBorderHovered: string;
  readonly defaultStateBackground: string;
  readonly errorText: string;
  readonly warningText: string;
  readonly errorBackground: string;
  readonly blockingBackground: string;
  readonly warningBackground: string;
  readonly warningHighlight: string;
  readonly successBackground: string;
  readonly inputBorder: string;
  readonly inputBorderHovered: string;
  readonly inputBackground: string;
  readonly inputBackgroundChecked: string;
  readonly inputBackgroundCheckedHovered: string;
  readonly inputForegroundChecked: string;
  readonly inputFocusBorderAlt: string;
  readonly smallInputBorder: string;
  readonly inputText: string;
  readonly inputTextHovered: string;
  readonly inputPlaceholderText: string;
  readonly buttonBackground: string;
  readonly buttonBackgroundChecked: string;
  readonly buttonBackgroundHovered: string;
  readonly buttonBackgroundCheckedHovered: string;
  readonly buttonBackgroundPressed: string;
  readonly buttonBackgroundDisabled: string;
  readonly buttonBorder: string;
  readonly buttonText: string;
  readonly buttonTextHovered: string;
  readonly buttonTextChecked: string;
  readonly buttonTextCheckedHovered: string;
  readonly buttonTextPressed: string;
  readonly buttonTextDisabled: string;
  readonly buttonBorderDisabled: string;
  readonly buttonBorderFocused: string;
  readonly primaryButtonBackground: string;
  readonly primaryButtonBackgroundHovered: string;
  readonly primaryButtonBackgroundPressed: string;
  readonly primaryButtonBackgroundDisabled: string;
  readonly primaryButtonBorder: string;
  readonly primaryButtonBorderFocused: string;
  readonly primaryButtonText: string;
  readonly primaryButtonTextHovered: string;
  readonly primaryButtonTextPressed: string;
  readonly primaryButtonTextDisabled: string;
  readonly accentButtonBackground: string;
  readonly accentButtonText: string;
  readonly menuBackground: string;
  readonly menuDivider: string;
  readonly menuIcon: string;
  readonly menuHeader: string;
  readonly menuItemBackgroundHovered: string;
  readonly menuItemBackgroundPressed: string;
  readonly menuItemText: string;
  readonly menuItemTextHovered: string;
  readonly listBackground: string;
  readonly listText: string;
  readonly listItemBackgroundHovered: string;
  readonly listItemBackgroundChecked: string;
  readonly listItemBackgroundCheckedHovered: string;
  readonly listHeaderBackgroundHovered: string;
  readonly listHeaderBackgroundPressed: string;
  readonly actionLink: string;
  readonly actionLinkHovered: string;
  readonly link: string;
  readonly linkHovered: string;
  readonly linkPressed: string;
}
export interface IFEFontSize {
  readonly body: number;
  readonly subheader: number;
  readonly header: number;
}

type FEFontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export interface IFEFontWeight {
  readonly regular: FEFontWeight;
  readonly semiBold: FEFontWeight;
}

export interface IFEFontFamily {
  readonly primary: string;
  readonly secondary: string;
  readonly cursive: string;
  readonly monospace: string;
  readonly sansSerif: string;
  readonly serif: string;
}

export interface IFESpacing {
  readonly s2: number;
  readonly s1: number;
  readonly m1: number;
  readonly m: number;
  readonly l1: number;
  readonly l2: number;
}

export interface IFELineHeight {
  readonly lh16_18: number;
  readonly lh24_22: number;
  readonly lh24_26: number;
  readonly lh16_20: number;
  readonly lh16_22: number;
}

export interface IFEIconSize {
  readonly x_small: number;
  readonly small: number;
  readonly medium: number;
  readonly large: number;
  readonly x_large: number;
  readonly xx_large: number;
}
