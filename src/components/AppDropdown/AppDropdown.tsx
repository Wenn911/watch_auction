'use client';

import ArrowIcon from '@/public/arrow-down.svg';
import { useRef, useState } from 'react';
import { AppText } from "../AppText";

interface AppDropdownProps {
    title: string;
    data: {
        key: string;
        value: string;
    }[];
}

export const AppDropdown = ({ title, data }: AppDropdownProps) => {
    const [isOpen, setOpen] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (isOpen) {
            setOpen(false);
        } else {
            setOpen(true);
            setTimeout(() => {
                if (contentRef.current) {
                    setContentHeight(contentRef.current.scrollHeight);
                }
            }, 10);
        }
    }

    return (
        <div className="px-24 bg-[rgba(87,92,112,0.3)] rounded-lg">
            <div className="flex justify-between py-16 items-center cursor-pointer" onClick={handleClick}>
                <AppText size="L" text={title} variant="medium" />
                <ArrowIcon 
                    className={`transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-270' : 'rotate-360'
                    }`} 
                />
            </div>
            <div 
                className="transition-all duration-300 ease-in-out overflow-hidden"
                style={{
                    height: isOpen ? `${contentHeight}px` : '0px',
                    opacity: isOpen ? 1 : 0
                }}
            >
                <div ref={contentRef}>
                    {data.map((item) => (
                        <div key={item.key} className="flex justify-between align-middle py-4 gap-16">
                            <AppText text={item.key} />
                            <AppText className='text-[rgba(255,255,255,0.6)] text-right' text={item.value} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}