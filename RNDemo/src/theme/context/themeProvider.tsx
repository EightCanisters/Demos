import PropTypes from 'prop-types';
import {useCurrentTheme} from './listener';
import React from 'react';
import {IFETheme} from '../constant/theme-constant-type';

export const ThemeContext = React.createContext({} as IFETheme);

export const ThemeProvider: React.ElementType = ({children}) => {
  const theme = useCurrentTheme();

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
ThemeProvider.propTypes = {children: PropTypes.node.isRequired};
