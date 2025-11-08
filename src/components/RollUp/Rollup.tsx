'use client';

import type React from 'react';
import { useState } from 'react';
import { AppText } from '../AppText';

interface RollupProps {
    label: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const Rollup = ({ label, children, defaultOpen = true }: RollupProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="w-auto rounded-lg bg-[#18181B] p-5">
            <button className="flex w-full items-center justify-between focus:outline-none" onClick={toggle}>
                <AppText
                    size="L"
                    text={label}
                    variant="medium"
                />
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                    ▶
                </span>
            </button>
            <div className={`grid transition-all duration-300 ${ isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0' }`}>
                <div className="overflow-hidden">
                    <div className="pt-6 pb-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}