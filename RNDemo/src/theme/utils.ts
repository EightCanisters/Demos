import {platformAndroid, platformIos, themes} from './constant/theme-constant';
import {ThemeColors, IFETheme} from './constant/theme-constant-type';
import {isAndroidPlatform} from '../utils';

const platform = isAndroidPlatform() ? platformAndroid : platformIos;

const light = {
  name: ThemeColors.LIGHT,
  colors: themes.get(ThemeColors.LIGHT),
  ...platform,
} as IFETheme;

const dark = {
  name: ThemeColors.DARK,
  colors: themes.get(ThemeColors.DARK),
  ...platform,
} as IFETheme;

export const getThemeColors = (
  deviceTheme: string | null | undefined,
): ThemeColors => {
  return (
    ThemeColors[deviceTheme?.toUpperCase() as ThemeColors] ?? ThemeColors.LIGHT
  );
};
export const getTheme = (theme: ThemeColors): IFETheme => {
  if (theme === ThemeColors.DARK) {
    return dark;
  } else {
    return light;
  }
};
