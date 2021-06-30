import React from 'react';
import AppEntrance from './src/index';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Localization} from './src/locales/localization';
import {ThemeProvider} from './src/theme/context/themeProvider';

const localization = new Localization();
localization.initializeAsync();

const App: () => React.ReactElement = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppEntrance />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
