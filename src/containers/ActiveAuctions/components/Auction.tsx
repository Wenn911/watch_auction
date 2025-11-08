'use client';
import Image from 'next/image';
import Link from 'next/link';
import CopyIcon from '../../../../public/copy.svg';

import { AppText } from '$/components/AppText';
import { useCopyToClipboard } from '$/hooks';
import type { Auction, Category, Item } from '../../../db/schema.ts';

interface Props {
    auction: Auction,
    item: Item,
    category: Category
}

export const ActiveAuction = ({ auction, item, category }: Props) => {
    const { id_auction, start_price, current_price, start_time, end_time, status} = auction;
    const { refCode, brand_name, model, image } = item;
    const { name_category } = category;

    const { isCopied, copyToClipboard } = useCopyToClipboard(refCode);

    const handleCopyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        copyToClipboard();
    };

    return (
        <Link href={`/${id_auction}`}>
            <div className="relative flex w-full gap-18 overflow-hidden rounded-lg bg-[rgba(87,92,112,0.3)] before:absolute before:top-[-110px] before:left-169 before:h-200 before:w-200 before:rounded-full before:bg-[radial-gradient(66.32%_66.32%_at_50%_50%,var(--primary)_0%,rgba(0,0,0,0)_100%)] before:blur-[76px] before:content-['']">
                {image ? (
                    <Image
                        src={image}
                        width="160"
                        height="160"
                        className="z-1"
                        alt="img"
                    />
                ) : (
                    <div className="z-1 h-160 w-160 bg-[rgba(87,92,112,0.5)]" />
                )}
                <div className="z-1 grid grid-rows-[auto_1fr_auto] gap-16 py-20">
                    <div
                        className="flex w-fit cursor-pointer gap-4 rounded-lg bg-[rgba(87,92,112,0.5)] px-4 py-2 text-[rgba(255,255,255,0.6)] hover:bg-[rgba(87,92,112,0.7)] hover:text-[rgba(255,255,255)]"
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
                    <div className="flex flex-col gap-12">
                        <AppText
                            size="M"
                            variant="medium"
                            text={name_category}
                        />
                        <AppText
                            size="M"
                            variant="medium"
                            text={brand_name}
                            className="text-(--primary)"
                        />
                        <AppText
                            size="M"
                            text={model}
                        />
                        <AppText
                            size="S"
                            variant="medium"
                            text={`Начальная цена:  $${start_price}`}
                            className="text-[rgba(255,255,255,0.6)]"
                        />
                        {current_price && (
                            <AppText
                                size="S"
                                variant="medium"
                                text={`Текущая цена: $${current_price}`}
                                className="text-[rgba(255,255,255,0.6)]"
                            />
                        )}
                    </div>
                    {start_time && (
                        <AppText
                            size="S"
                            variant="medium"
                            text={`Начало: ${start_time}`}
                        />
                    )}
                    {end_time && (
                        <AppText
                            size="S"
                            variant="medium"
                            text={`Конец: ${end_time}`}
                        />
                    )}
                    <AppText
                        size="M"
                        variant="medium"
                        text={`Статус: ${status}`}
                    />
                </div>
            </div>
        </Link>
    );
};
