import {Platform} from 'react-native';

export const isAndroidPlatform = (): boolean => Platform.OS === 'android';
