'use client'
import { AppSwiper } from "$/components/AppSwiper";
import { AppText } from "$/components/AppText";
import { RefCodeCopy } from "$/components/RefCodeCopy";
import type { Item, Item_instance } from "$/db/schema";

interface Props {
    dataInstance: Item_instance;
    dataItem: Item;
    images: string[];
}

export const Info = ({ dataInstance, dataItem, images }: Props) => {
    const { brand_name, model } = dataItem;
    const { refCode } = dataInstance;
        
    return (
        <div className="flex w-full flex-col gap-24 rounded-lg bg-(--bg-primary) p-10">
            <AppSwiper images={images} />
            <div className="flex flex-col">
                <RefCodeCopy refCode={refCode} />
                <div className="py-8">
                    <AppText
                        className="text-(--primary)"
                        size="XL"
                        text={brand_name}
                        variant="semibold"
                    />
                    <AppText
                        size="M"
                        text={model}
                    />
                </div>
                <AppText className="text-[rgba(255,255,255,0.6)]" text="1234$" />
                <button className="flex items-center justify-center py-8 mt-16 rounded-xl bg-(--button-primary)">Выкупить</button>
            </div>
        </div>
    )
}