import React from 'react';
import { useTelegram } from '../hooks/useTelegram';

export const ThemeToggle: React.FC = () => {
  const { theme, webApp } = useTelegram();

  const toggleTheme = () => {
    if (webApp) {
      webApp.setHeaderColor(theme === 'light' ? 'secondary_bg_color' : 'bg_color');
    }
  };

  return (
    <div className="theme-toggle">
      <span>Тема: {theme === 'light' ? 'Светлая' : 'Тёмная'}</span>
      <button onClick={toggleTheme} className="theme-button">
        Переключить
      </button>
    </div>
  );
};