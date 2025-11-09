'use client';

import ArrowIcon from '@/public/arrow-down.svg';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { AppText } from "../AppText";

interface AppDropdownProps {
    title: string;
    children: ReactNode;
}

export const AppDropdown = ({ title, children }: AppDropdownProps) => {
    const [isOpen, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setOpen(!isOpen);
    }

    const contentHeight = isOpen && contentRef.current 
        ? contentRef.current.scrollHeight 
        : 0;

    return (
        <div className="px-24 bg-(--bg-primary) rounded-lg">
            <div 
                className="flex justify-between py-16 items-center cursor-pointer" 
                role="button"
                tabIndex={0}
                onClick={handleClick}
            >
                <AppText size="L" text={title} variant="semibold" />
                <ArrowIcon 
                    className={`transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-270' : 'rotate-360'
                    }`} 
                />
            </div>
            <div 
                className="transition-all duration-300 ease-in-out overflow-hidden"
                style={{
                    height: contentHeight,
                    opacity: isOpen ? 1 : 0
                }}
            >
                <div ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    )
}