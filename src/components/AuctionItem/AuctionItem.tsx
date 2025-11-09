'use client';
import Image from 'next/image';
import Link from 'next/link';

import { AppText } from '$/components/AppText';
import type { Auction, Category, Item } from '../../db/schema';
import { RefCodeCopy } from '../RefCodeCopy';

interface Props {
    auction: Auction;
    item: Item;
    category: Category;
}

export const AuctionItem = ({ auction, item, category }: Props) => {
    const { id_auction, start_price, current_price, start_time, end_time, status} = auction;
    const { refCode, brand_name, model, image } = item;
    const { name_category } = category;

    return (
        <Link href={`/${id_auction}`}>
            <div className="relative flex w-full gap-18 overflow-hidden rounded-lg bg-[rgba(87,92,112,0.3)] before:absolute before:top-[-110px] before:left-169 before:h-200 before:w-200 before:rounded-full before:bg-[radial-gradient(66.32%_66.32%_at_50%_50%,var(--primary)_0%,rgba(0,0,0,0)_100%)] before:blur-[76px] before:content-[''] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
                {image ? (
                    <Image
                        alt="img"
                        className="object-cover z-1"
                        height="160"
                        src={image}
                        width="160"
                    />
                ) : (
                    <div className="z-1 h-160 w-160 bg-[rgba(87,92,112,0.5)]" />
                )}

                <div className="z-1 grid grid-rows-[auto_1fr_auto] gap-16 py-20">
                    <RefCodeCopy refCode={refCode} />

                    <div className="flex flex-col gap-12">
                        <AppText
                            size="M"
                            text={name_category}
                            variant="medium"
                        />
                        <AppText
                            className="text-(--primary)"
                            size="M"
                            text={brand_name}
                            variant="medium"
                        />

                        <AppText
                            size="M"
                            text={model}
                        />

                        <AppText
                            className="text-[rgba(255,255,255,0.6)]"
                            size="S"
                            text={`Начальная цена:  $${start_price}`}
                            variant="medium"
                        />
                        {current_price && (
                            <AppText
                                className="text-[rgba(255,255,255,0.6)]"
                                size="S"
                                text={`Текущая цена: $${current_price}`}
                                variant="medium"
                            />
                        )}
                    </div>
                    {start_time && (
                        <AppText
                            size="S"
                            text={`Начало: ${start_time}`}
                            variant="medium"
                        />
                    )}
                    {end_time && (
                        <AppText
                            size="S"
                            text={`Конец: ${end_time}`}
                            variant="medium"
                        />
                    )}
                    <AppText
                        size="M"
                        text={`Статус: ${status}`}
                        variant="medium"
                    />
                </div>
            </div>
        </Link>
    );
};
