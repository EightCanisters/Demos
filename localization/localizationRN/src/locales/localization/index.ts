import i18next, {i18n} from 'i18next';
import {loadResourceBundleAsync} from './helper';
import {supportedCultures} from './supportedCultures';
import en from '../resources/en-US/translation.json';
import * as RNLocalize from 'react-native-localize';
import {initReactI18next} from 'react-i18next';

// #region variables and type definitions
const translationNamespace = 'translation';
export type StringResources = typeof en;
export type LanguageKeys = keyof StringResources;
export const defaultLanguage = 'en-US';

export interface ICultureItem {
  name: string;
  description: string;
  resourceCenterCode: string;
  englishDescription: string;
}

export const getPhoneLocale = (): string => {
  const getCulture = (): string => {
    return RNLocalize.getLocales()[0].scriptCode
      ? `${RNLocalize.getLocales()[0].languageCode}-${
          RNLocalize.getLocales()[0].countryCode
        }`
      : defaultLanguage;
  };
  const culture = RNLocalize.getLocales()[0].languageTag;
  console.log(supportedCultures[culture] ? culture : getCulture());
  return supportedCultures[culture] ? culture : getCulture();
};

export class Localization {
  constructor() {
    this.onChangeLanguage();
  }

  private onChangeLanguage(): void {
    RNLocalize.addEventListener('change', () => {
      const locale = getPhoneLocale();
      this.setResourceBundleAsync(locale);
      this.i18nextInstance.changeLanguage(locale);
      this.changeLanguage(locale);
    });
  }

  public readonly i18nextInstance: i18n = i18next.createInstance();

  public async initializeAsync(): Promise<void> {
    await this.i18nextInstance.use(initReactI18next).init({
      lng: defaultLanguage,
      fallbackLng: defaultLanguage,
      ns: [translationNamespace],
      defaultNS: translationNamespace,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });

    Object.keys(this.getSupportedCultures()).forEach(async language => {
      await loadResourceBundleAsync(
        this.i18nextInstance,
        language,
        translationNamespace,
      );
    });
  }

  public getString(key: LanguageKeys): string {
    return this.i18nextInstance.t(key);
  }

  public async changeLanguage(locale: string): Promise<void> {
    if (!supportedCultures[locale]) {
      const errorMessage = `can't find locale ${locale} in the list of supported locales`;
      throw new Error(errorMessage);
    }

    // Downloading bundle if it's not already in place
    if (!this.i18nextInstance.hasResourceBundle(locale, translationNamespace)) {
      await loadResourceBundleAsync(
        this.i18nextInstance,
        locale,
        translationNamespace,
      );
    }

    this.i18nextInstance.changeLanguage(locale, error => {
      if (error) {
        console.error(error);
      }
    });
  }

  public getSupportedCultures(): Record<string, ICultureItem> {
    return supportedCultures;
  }

  public getCurrentLocale(): string {
    return this.i18nextInstance.language;
  }

  protected async setResourceBundleAsync(locale: string): Promise<void> {
    await loadResourceBundleAsync(
      this.i18nextInstance,
      locale,
      translationNamespace,
    );
  }
}
