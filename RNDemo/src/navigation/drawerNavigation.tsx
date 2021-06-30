import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {IFETheme, themedStyleSheet, useTheme} from '../theme';
import TabNavigation from './tabNavigation';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
): JSX.Element => {
  const theme = useTheme();
  const styles = getThemedStyles(theme);

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContentScrollView}>
      <DrawerItemList
        {...props}
        labelStyle={styles.drawerItemLabel}
        activeBackgroundColor={theme.colors.inputBackground}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigation: () => React.ReactElement = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const styles = getThemedStyles(theme);

  const Setting = (): JSX.Element => (
    <View style={styles.pageContainer}>
      <Text>{t('Title-setting')}</Text>
    </View>
  );

  return (
    <Drawer.Navigator
      initialRouteName={t('Title-home')}
      screenOptions={{headerShown: false}}
      drawerContent={(
        props: DrawerContentComponentProps<DrawerContentOptions>,
      ): React.ReactElement => <DrawerContent {...props} />}>
      <Drawer.Screen name={t('Title-home')} component={TabNavigation} />
      <Drawer.Screen name={t('Title-setting')} component={Setting} />
    </Drawer.Navigator>
  );
};

const getThemedStyles = themedStyleSheet((t: IFETheme) => {
  return {
    drawerContentScrollView: {
      backgroundColor: t.colors.background,
    },
    drawerItemLabel: {
      color: t.colors.bodyText,
    },
    pageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: t.colors.background,
    },
  };
});

export default DrawerNavigation;
