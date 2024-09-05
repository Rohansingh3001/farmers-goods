import React from 'react';

const LanguageSwitcher = () => {
  const handleLanguageSwitch = (languageCode) => {
    const googleTranslateFrame = document.querySelector('iframe.goog-te-menu-frame');
    
    if (!googleTranslateFrame) return;
    
    const translateElement = googleTranslateFrame.contentWindow.document.querySelector(`.goog-te-menu2-item span[text="${languageCode}"]`);
    
    if (translateElement) {
      translateElement.click();
    }
  };

  return (
    <div className="language-switcher">
      <button onClick={() => handleLanguageSwitch('English')}>English</button>
      <button onClick={() => handleLanguageSwitch('Hindi')}>हिंदी</button>
      <button onClick={() => handleLanguageSwitch('Bengali')}>বাংলা</button>
    </div>
  );
};

export default LanguageSwitcher;
