import React from 'react';
     import { useTranslation } from 'react-i18next';
     import HomePage from './pages/HomePage';

     const App: React.FC = () => {
       const { t } = useTranslation();

       return (
         <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 flex flex-col items-center justify-center p-4">
           <header className="text-center">
             <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
               {t('welcome')}
             </h1>
             <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
               {t('description')}
             </p>
             <HomePage />
           </header>
         </div>
       );
     };

     export default App;