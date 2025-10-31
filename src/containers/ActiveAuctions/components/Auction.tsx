'use client';
import Image from "next/image";
import Link from "next/link";
import CopyIcon from "../../../../public/copy.svg";

import { AppText } from "$/components/AppText";
import type { Watch } from "$/db/schema";
import { useCopyToClipboard } from "$/hooks/useCopyToClipboard";

export const ActiveAuction = ({ auction }: { auction: Watch }) => {
    const { id, name, model, price, startTime, image, refCode } = auction;

    const { isCopied, copyToClipboard } = useCopyToClipboard(refCode);

    const handleCopyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        copyToClipboard();
    };

    return (
        <Link href={`/active/${id}`}>
            <div
                className="flex gap-18 w-full bg-[rgba(87,92,112,0.3)]
                rounded-lg relative overflow-hidden before:content-[''] before:absolute
                before:w-200 before:h-200 before:top-[-110px] before:left-169
                before:bg-[radial-gradient(66.32%_66.32%_at_50%_50%,var(--primary)_0%,rgba(0,0,0,0)_100%)]
                before:rounded-full before:blur-[76px]"
            >
                {image ?
                    <Image src={image} width="160" height="160" className="z-1" alt="img" />
                    :
                    <div className="w-160 h-160 bg-[rgba(87,92,112,0.5)] z-1" />
                }
                <div className="grid grid-rows-[auto_1fr_auto] gap-16 z-1 py-20">
                    <div className="flex gap-4 px-4 py-2 bg-[rgba(87,92,112,0.5)]
                    text-[rgba(255,255,255,0.6)] rounded-lg w-fit cursor-pointer
                     hover:text-[rgba(255,255,255)] hover:bg-[rgba(87,92,112,0.7)]"
                    onClick={handleCopyClick}
                    >
                        {isCopied ? <AppText text="Скопировано" /> :
                            <>
                                <AppText size="S" text={refCode} />
                                <CopyIcon />
                            </>}
                    </div>
                    <div className="flex flex-col gap-12">
                        <AppText
                            size="M"
                            variant="medium"
                            text={name}
                            className="text-(--primary)"
                        />
                        <AppText
                            size="M"
                            text={model}
                        />
                        <AppText
                            size="S"
                            variant="medium"
                            text={price}
                            className="text-[rgba(255,255,255,0.6)]"
                        />
                    </div>
                    {startTime &&
                        <AppText
                            size="S"
                            variant="medium"
                            text={`До начала: ${startTime}`}
                        />}
                </div>
            </div>
        </Link>
    );
};
