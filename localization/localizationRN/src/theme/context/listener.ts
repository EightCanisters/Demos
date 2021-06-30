import {useState, useEffect, useRef} from 'react';
import {getThemeColors, getTheme} from '../utils';
import {Appearance, Platform} from 'react-native';
import {IFETheme} from '../constant/theme-constant-type';

export const useCurrentTheme = (): IFETheme => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  let timeout = useRef<NodeJS.Timeout | null>(null).current;
  const delay = Platform.OS === 'ios' ? 250 : 50;
  // delay this listener update due to a bug in iOS,
  // when the user interface style changes to the opposite color scheme
  // and then back to the current color scheme immediately afterwards
  //https://github.com/facebook/react-native/issues/28525

  const onColorSchemeChange = (
    preferences: Readonly<Appearance.AppearancePreferences>,
  ): void => {
    resetCurrentTimeout();

    timeout = setTimeout(() => {
      setColorScheme(preferences.colorScheme);
    }, delay);
  };

  const resetCurrentTimeout = (): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    Appearance.addChangeListener(onColorSchemeChange);
    return (): void => {
      resetCurrentTimeout();
      Appearance.removeChangeListener(onColorSchemeChange);
    };
  });

  return getTheme(getThemeColors(colorScheme));
};
