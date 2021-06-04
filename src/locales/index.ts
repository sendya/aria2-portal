import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';
import moment from 'moment';
import zhCN from './lang/zh-CN';

const SUPPORT_LOCALES: string[] = ['zh-CN', 'en-US'];
const defaultLang = 'zh-CN';

const i18n = createI18n({
  legacy: false,
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages: {
    [defaultLang]: zhCN,
  },
  missingWarn: false,
  fallbackWarn: false,
});

export function setI18nLanguage(lang: string = defaultLang) {
  i18n.global.locale.value = lang;
  // request.headers.common['Accept-Language'] = lang
  document.querySelector('html')!.setAttribute('lang', lang);
}

export async function loadLanguageAsync(lang: string = defaultLang) {
  if (!SUPPORT_LOCALES.includes(lang)) {
    throw new Error(`${lang} lang not support`);
  }
  const currentI18n = i18n.global;

  if (currentI18n.locale.value !== lang && !currentI18n.availableLocales.includes(lang)) {
    const result = await import(
      /* webpackChunkName: "lang-[request]" */
      /* @vite-ignore */ `./lang/${lang}.ts`
    );
    const loadedLang = result.default;
    // set vue-i18n lang
    currentI18n.setLocaleMessage(lang, loadedLang);
    // set moment lang
    if (loadedLang.momentLocaleName) {
      moment.updateLocale(loadedLang.momentLocaleName, loadedLang.moment);
    }
    // save loaded
    setI18nLanguage(lang);
  }
  return nextTick();
}

export default i18n;
