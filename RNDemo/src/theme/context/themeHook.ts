import React from 'react';
import {ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {IFETheme} from '../constant/theme-constant-type';
import {ThemeContext} from './themeProvider';

export const useTheme = (): IFETheme => React.useContext(ThemeContext);

declare type INamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
export function themedStyleSheet<T extends INamedStyles<T>>(
  fn: (theme: Readonly<IFETheme>) => T,
): (theme: Readonly<IFETheme>) => T {
  return (theme): T => fn(theme);
}
