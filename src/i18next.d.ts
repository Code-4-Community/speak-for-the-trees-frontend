import './i18n/i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
