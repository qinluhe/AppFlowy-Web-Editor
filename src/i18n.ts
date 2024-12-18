import i18n from 'i18next';
import { initReactI18next, useTranslation as useReactI18next } from 'react-i18next';
import en from './locales/en.json';

const editorI18n = i18n.createInstance();

editorI18n
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
  return editorI18n.changeLanguage(lang);
}

export function addResourceBundle(lang: string, ns: string, resources: Record<string, string>) {
  editorI18n.addResourceBundle(lang, ns, resources, true, true);
}

export const useTranslation: typeof useReactI18next = (ns, options) => {
  return useReactI18next(ns, { ...options, i18n: editorI18n });
};