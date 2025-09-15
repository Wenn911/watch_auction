import { useState, useEffect } from 'react';
import type { WebAppUser } from 'telegram-web-app';

export const useTelegram = () => {
  const [user, setUser] = useState<WebAppUser>();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      tg.ready();
      setUser(tg.initDataUnsafe?.user);
      setTheme(tg.colorScheme);

      const handleThemeChange = () => {
        setTheme(tg.colorScheme);
      };

      tg.onEvent('themeChanged', handleThemeChange);

      return () => {
        tg.offEvent('themeChanged', handleThemeChange);
      };
    }
  }, []);

  const showAlert = (message: string) => {
    window.Telegram?.WebApp.showAlert(message);
  };

  const closeApp = () => {
    window.Telegram?.WebApp.close();
  };

  return {
    user,
    theme,
    showAlert,
    closeApp,
    isTelegram: !!window.Telegram,
    webApp: window.Telegram?.WebApp
  };
};