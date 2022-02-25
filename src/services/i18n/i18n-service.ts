import en from './en';
import vi from './vi';
import { logd } from 'shared';

var I18n = require('i18n-js');

I18n.fallbacks = true;

I18n.translations = {
  en,
  vi,
};

I18n.defaultLocale = 'en-US';

I18n.locale = 'vi-VN';

const TAG = 'I18nService';

export class I18nService {
  static currentLocale(): string {
    return I18n.currentLocale();
  }

  static defaultLocale(): string {
    return I18n.defaultLocale;
  }

  /**
   * {
   *  "greeting": "Hello, %{name}. Good morning"
   * }
   * i18n.t ("greeting", {
   *    name: "ALi"
   * })
   */
  static t(key: string, params?: any) {
    return I18n.t(key, params);
  }

  static changeLocale(locale: string) {
    logd(TAG, `changeLocale: ${locale}`);
    I18n.locale = locale;
  }
}
