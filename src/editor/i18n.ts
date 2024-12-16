import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en.translation } },
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    keySeparator: '.',
  });

export function changeLanguage(lang: string) {
  return i18n.changeLanguage(lang);
}

export function addResourceBundle(lang: string, ns: string, resources: Record<string, string>) {
  i18n.addResourceBundle(lang, ns, resources, true, true);
}