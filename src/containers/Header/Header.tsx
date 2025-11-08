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
                alt="header"
                height="32"
                src="/logo.png"
                width="32"
            />
            <button
                className={`flex items-center gap-8 no-underline ${showBackButton ? 'visible' : 'invisible'}`}
                onClick={goBack}
            >
                <Image
                    alt="BackButton"
                    height="24"
                    src="/backButton.svg"
                    width="24"
                />
                <AppText
                    size="M"
                    text="Назад"
                    variant="medium"
                />
            </button>
        </header>
    );
};
