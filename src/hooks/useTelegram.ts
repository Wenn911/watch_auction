'use client';

import { useEffect, useState } from 'react';

import type { WebApp, WebAppUser } from 'telegram-web-app';

export const useTelegram = () => {
    const [user, setUser] = useState<WebAppUser>();
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isTelegram, setTelegram] = useState<boolean>(false);
    const [webApp, setWebApp] = useState<WebApp>();

    useEffect(() => {
        const tg = window.Telegram?.WebApp;

        if (tg) {
            setTelegram(true);
            setWebApp(tg);
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
        isTelegram,
        webApp
    };
};
