'use client';

import { useMemo } from 'react';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { AppText } from '$/components/AppText';

export const Header = () => {
    const router = useRouter();
    const pathname = usePathname();

    const showBackButton = useMemo(() => !/\/(active|win|saved|end)$/gi.test(pathname), [pathname]);

    const goBack = () => router.back();

    return (
        <header className="sticky top-0 z-2 flex items-center gap-12 border-b border-white/20 bg-black px-24 py-12">
            <Image
                src="/logo.png"
                width="32"
                height="32"
                alt="header"
            />
            <button
                className={`flex items-center gap-8 no-underline ${showBackButton ? 'visible' : 'invisible'}`}
                onClick={goBack}
            >
                <Image
                    src="/backButton.svg"
                    width="24"
                    height="24"
                    alt="BackButton"
                />
                <AppText
                    size="M"
                    variant="medium"
                    text="Назад"
                />
            </button>
        </header>
    );
};
