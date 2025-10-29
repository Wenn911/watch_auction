'use client'
 
import { useMemo } from "react";

import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';

import { AppText } from "$/components/AppText";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname()
  
  const showBackButton = useMemo(() => 
    (!/\/(active|win|saved|end)$/gi.test(pathname)),
  [pathname]);

  const goBack = () => router.back();

  return (
    <header className="flex gap-12 px-24 py-12 items-center border-b border-white/20">
      <Image src="/logo.jpg" width="32" height="32" alt="header" />
      <button
        className={`flex gap-8 items-center no-underline ${showBackButton ? 'visible' : 'invisible'}`}
        onClick={goBack}
      >
        <Image src="/backButton.svg" width="24" height="24" alt="BackButton" />
        <AppText size="M" variant="medium" text="Назад" />
      </button>
    </header>
  )
}