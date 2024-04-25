import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  landing,
  maps,
  notFound,
  forgotPassword,
  forgotPasswordReset,
  reports,
  login,
  signup,
  home,
  settings,
  faq,
  myTrees,
  site,
  admin,
  forms,
  tables,
  content,
  cambridgeLanding,
  treePage,
  treeInfo,
  shareMenu,
  treeActivity,
  careEntry,
  treeInfoTypes,
} from './en';
import {
  landingEs,
  mapsEs,
  notFoundEs,
  forgotPasswordEs,
  forgotPasswordResetEs,
  reportsEs,
  loginEs,
  signupEs,
  homeEs,
  settingsEs,
  faqEs,
  myTreesEs,
  siteEs,
  adminEs,
  formsEs,
  tablesEs,
  contentEs,
  treePageEs,
  treeInfoEs,
  shareMenuEs,
  treeActivityEs,
  careEntryEs,
  treeInfoTypesEs,
} from './es';

export const LOCALSTORAGE_I18N_KEY = 'i18n-lang';

// Returns the language code for the active language, with English as default
export function getActiveLanguage(): string {
  return localStorage.getItem(LOCALSTORAGE_I18N_KEY) ?? 'en';
}

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    landing,
    maps,
    notFound,
    forgotPassword,
    forgotPasswordReset,
    reports,
    login,
    signup,
    home,
    settings,
    faq,
    myTrees,
    site,
    admin,
    forms,
    tables,
    content,
    cambridgeLanding,
    treePage,
    treeInfo,
    shareMenu,
    treeActivity,
    careEntry,
    treeInfoTypes,
  },
  es: {
    landing: landingEs,
    maps: mapsEs,
    notFound: notFoundEs,
    forgotPassword: forgotPasswordEs,
    forgotPasswordReset: forgotPasswordResetEs,
    reports: reportsEs,
    login: loginEs,
    signup: signupEs,
    home: homeEs,
    settings: settingsEs,
    faq: faqEs,
    myTrees: myTreesEs,
    site: siteEs,
    admin: adminEs,
    forms: formsEs,
    tables: tablesEs,
    content: contentEs,
    treePage: treePageEs,
    treeInfo: treeInfoEs,
    shareMenu: shareMenuEs,
    treeActivity: treeActivityEs,
    careEntry: careEntryEs,
    treeInfoTypes: treeInfoTypesEs,
  },
};

i18n
  // passes i18n down to react-i18next
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: localStorage.getItem(LOCALSTORAGE_I18N_KEY) || 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    returnNull: false,

    interpolation: {
      escapeValue: false, // react already safe from xss
    },
  });

export default i18n;
