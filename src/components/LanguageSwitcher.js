import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button onClick={() => handleLanguageChange('en')} className="px-4 py-2 border border-gray-300 rounded">English</button>
      <button onClick={() => handleLanguageChange('hi')} className="px-4 py-2 border border-gray-300 rounded">हिन्दी</button>
      <button onClick={() => handleLanguageChange('bn')} className="px-4 py-2 border border-gray-300 rounded">বাংলা</button>
    </div>
  );
};

export default LanguageSwitcher;
