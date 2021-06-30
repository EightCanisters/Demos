import React, {MutableRefObject, RefObject, useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigation from './navigation/drawerNavigation';
import {useTranslation} from 'react-i18next';

const AppStack = createStackNavigator();

const AppEntrance: () => React.ReactElement = () => {
  const {t} = useTranslation();
  const routeNameRef: MutableRefObject<string | undefined> = useRef();
  const navigationRef: RefObject<NavigationContainerRef> = React.createRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={(): void => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}>
      <AppStack.Navigator screenOptions={{headerShown: true}}>
        <AppStack.Screen name={t('App-title')} component={DrawerNavigation} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppEntrance;
