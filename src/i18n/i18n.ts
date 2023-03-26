import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  landing,
  notFound,
  forgotPassword,
  forgotPasswordReset,
  reports,
  login,
  signup,
  home,
  forms,
  tables,
  cambridgeLanding,
} from './en';
import { landingEs } from './es';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    landing,
    notFound,
    forgotPassword,
    forgotPasswordReset,
    reports,
    login,
    signup,
    home,
    forms,
    tables,
    cambridgeLanding,
  },
  es: {
    landing: landingEs,
  },
};

i18n
  // passes i18n down to react-i18next
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
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
