import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {routes} from '../navigation/routes';
import {themedStyleSheet, useTheme} from '../theme';
import {IFETheme} from '../theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import {DeepReadonly} from '../types/core-types';

const Tab = createBottomTabNavigator();

const TabNavigation: () => React.ReactElement = () => {
  const theme = useTheme();
  const styles = getThemedStyles(theme);
  const {t} = useTranslation();
  const Home = (): JSX.Element => (
    <View style={styles.pageContainer}>
      <Text>{t('Title-home')}</Text>
    </View>
  );
  const Cart = (): JSX.Element => (
    <View style={styles.pageContainer}>
      <Text>{t('Title-cart')}</Text>
    </View>
  );
  const Mine = (): JSX.Element => (
    <View style={styles.pageContainer}>
      <Text>{t('Title-mine')}</Text>
    </View>
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.containerStyle}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: theme.colors.primaryButtonBackground,
          inactiveTintColor: theme.colors.subText,
          style: {
            backgroundColor: theme.colors.background,
            height: 56,
          },
          tabStyle: {
            height: 56,
            paddingTop: theme.spacing.s1,
            paddingBottom: theme.spacing.s1,
          },
          labelStyle: {
            fontFamily: theme.fontFamily.primary,
            fontSize: theme.fontSize.body,
          },
        }}>
        <Tab.Screen
          name={routes.home}
          component={Home}
          options={{
            tabBarLabel: t('Title-home'),
          }}
        />
        <Tab.Screen
          name={routes.cart}
          component={Cart}
          options={{
            tabBarLabel: t('Title-cart'),
          }}
        />
        <Tab.Screen
          name={routes.mine}
          component={Mine}
          options={{
            tabBarLabel: t('Title-mine'),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const getThemedStyles = themedStyleSheet((t: DeepReadonly<IFETheme>) => {
  return {
    containerStyle: {
      flex: 1,
      backgroundColor: t.colors.background,
    },
    pageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: t.colors.background,
    },
  };
});

export default TabNavigation;
