'use client';

import { useState } from 'react';

export const useCopyToClipboard = (text: string) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);

            setTimeout(() => setIsCopied(false), 2000);

            return true;
        } catch (error) {
            console.error('Ошибка при копировании:', error);
        }
    };

    return { copyToClipboard, isCopied };
};
