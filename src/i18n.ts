import i18n from 'i18next';
     import { initReactI18next } from 'react-i18next';

     const resources = {
       'pt-BR': {
         translation: {
           welcome: 'Bem-vindo ao Language Learning Bot',
           description: 'Este é um bot de WhatsApp para aprendizado de idiomas.',
           home: 'Página Inicial',
           lesson: {
             correctResponse: 'Isso está correto! Vamos continuar com a próxima parte da lição.',
             incorrectResponse: 'Não está correto. Vamos tentar novamente!',
             optionFeedback: 'Boa escolha! Vamos continuar.',
             selectedOption: 'Opção selecionada',
             correctQuizResponse: 'Correto! Sua compreensão está melhorando.',
             incorrectQuizResponse: 'Não está correto. A resposta certa é outra. Vamos continuar!',
             pronunciationFeedback: 'Sua pronúncia está boa! Tente enfatizar a segunda sílaba um pouco mais.',
             completionMessage: 'Parabéns! Você completou a lição de hoje. Ótimo trabalho!',
           },
         },
       },
       en: {
         translation: {
           welcome: 'Welcome to the Language Learning Bot',
           description: 'This is a WhatsApp bot for language learning.',
           home: 'Home Page',
           lesson: {
             correctResponse: "That's correct! Let's continue with the next part of the lesson.",
             incorrectResponse: "That's not correct. Let's try again!",
             optionFeedback: 'Good choice! Let’s continue.',
             selectedOption: 'Selected option',
             correctQuizResponse: 'Correct! Your understanding is improving.',
             incorrectQuizResponse: "That's not correct. The right answer is different. Let's continue!",
             pronunciationFeedback: 'Your pronunciation is good! Try to emphasize the second syllable a bit more: ho-LA (not HO-la).',
             completionMessage: "Congratulations! You've completed today's lesson. Great job!",
           },
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