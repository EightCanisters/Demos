/* eslint-disable max-lines-per-function */
// import type en from './resources/en-US/translation.json';
// import type { i18n } from 'i18next';
import {i18n} from 'i18next';
import {DeepReadonly} from '../../types/core-types';

export async function loadResourceBundleAsync(
  instance: DeepReadonly<i18n>,
  locale: string,
  namespace: string,
): Promise<void> {
  let bP;

  switch (locale) {
    case 'en-US':
      bP = import('../resources/en-US/translation.json');
      break;
    case 'zh-US':
    case 'zh-CN':
      bP = import('../resources/zh-US/translation.json');
      break;

    default:
      bP = import('../resources/en-US/translation.json');
  }

  const strings = (await bP).default;
  instance.addResourceBundle(locale, namespace, strings);
}
