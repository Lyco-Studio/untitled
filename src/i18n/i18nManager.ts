import type { TranslationKeys, TranslationDict, Lang } from './TranslationKeys';
import zhCN from './zh-CN';
import en from './en';

let currentLang: Lang = (typeof window !== 'undefined' && (localStorage.getItem('lang') as Lang)) || 'zh-CN';

const dictionaries: Record<Lang, TranslationDict> = {
  'zh-CN': zhCN,
  'en': en,
};

export function setLanguage(lang: Lang) {
  currentLang = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lang);
  }
}

export function getLanguage(): Lang {
  return currentLang;
}

export function getTranslation(key: TranslationKeys): string {
  return dictionaries[currentLang][key];
}

export const t = getTranslation;
