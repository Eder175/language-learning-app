import i18n from 'i18next';
     import { initReactI18next } from 'react-i18next';

     const resources = {
       'pt-BR': {
         translation: {
           welcome: 'Bem-vindo ao Language Learning Bot',
           description: 'Este é um bot de WhatsApp para aprendizado de idiomas.',
           home: 'Página Inicial',
         },
       },
       en: {
         translation: {
           welcome: 'Welcome to the Language Learning Bot',
           description: 'This is a WhatsApp bot for language learning.',
           home: 'Home Page',
         },
       },
     };

     i18n.use(initReactI18next).init({
       resources,
       lng: 'pt-BR',
       fallbackLng: 'en',
       interpolation: {
         escapeValue: false,
       },
     });

     export default i18n;