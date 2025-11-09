'use client'
import { useCopyToClipboard } from "$/hooks";
import CopyIcon from '@/public/copy.svg';
import { AppText } from "../AppText";

export const RefCodeCopy = ({ refCode }: { refCode: string }) => {
    const { isCopied, copyToClipboard } = useCopyToClipboard(refCode);

    const handleCopyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        copyToClipboard();
    };
    
    return (
        <div
            className="flex w-fit cursor-pointer gap-4 rounded-lg bg-[rgba(87,92,112,0.5)] px-4 py-2 text-[rgba(255,255,255,0.6)] hover:bg-[rgba(87,92,112,0.7)] hover:text-[rgba(255,255,255)] transition-all duration-200 active:scale-95 active:bg-[rgba(87,92,112,0.7)]"
            onClick={handleCopyClick}
        >
            {isCopied ? (
                <AppText text="Скопировано" />
            ) : (
                <>
                    <AppText
                        size="S"
                        text={refCode}
                    />

                    <CopyIcon />
                </>
            )}
        </div>
    )
}