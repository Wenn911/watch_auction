import { getItemCard, getItems } from '$/api';
import { AppText } from '$/components/AppText';
import { Rollup } from '../../components/RollUp';

export async function generateStaticParams() {
    const allItems = await getItems();

    return allItems.map((post) => ({
        itemId: post.id_item.toString(),
    }));
}

export default async function ItemPage({ params }: { params: Promise<{ itemId: string }> }) {
    const { itemId } = await params;

    const item = await getItemCard(parseInt(itemId));

    if (!item) {
        return <div>Товар не найден</div>;
    }

    const itemData = item[0];

    const { items, categories, watch_details } = itemData;

    const { name_category } = categories;

    const { brand_name, image, item_condition, material, model, productionYear, refCode } = items

    const { accessories, country, crystal, dial, diameter, movement } = watch_details;

    return (
        <div className="grid gap-16">
            <div className="flex w-full flex-col gap-10 rounded-lg bg-[#18181B] p-10 lg:min-h-56">
                <div className="flex justify-center rounded-md">
                    <img
                        src={image}
                        className="z-1 h-full w-full max-w-600 rounded-2xl"
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <AppText
                        size="L"
                        variant="medium"
                        text={brand_name}
                    />
                    <AppText
                        size="M"
                        variant="medium"
                        text={model}
                    />
                </div>
            </div>
            <div className="w-auto rounded-lg bg-[#18181B] pt-20 pr-20 pb-20 pl-20">
                <Rollup label={'Listing Details'}>
                    <div className="space-y-4 pt-6 pb-4">
                        <div className="flex items-center justify-between p-5">
                            <AppText size="M" variant="medium" text="Type:" />
                            <AppText size="M" text={name_category} />
                        </div>
                        <div className="flex items-center justify-between p-5">
                            <AppText size="M" variant="medium" text="Country:" />
                            <AppText size="M" text={country} />
                        </div>
                        <div className="flex items-center justify-between p-5">
                            <AppText size="M" variant="medium" text="Condition:" />
                            <AppText size="M" text={item_condition} />
                        </div>
                        <div className="flex items-center justify-between p-5">
                            <AppText size="M" variant="medium" text="Accessories:" />
                            <AppText size="M" text={accessories} />
                        </div>
                        <div className="flex items-center justify-between p-5">
                            <AppText size="M" variant="medium" text="Production Year:" />
                            <AppText size="M" text={productionYear.toString()} />
                        </div>
                    </div>
                </Rollup>
            </div>
            <div className="w-auto rounded-lg bg-[#18181B] pt-20 pr-20 pb-20 pl-20">
                <Rollup label={'Item Details'}>
                    <div className="space-y-4 pt-6 pb-4">
                        <div className="flex items-center justify-between p-5">
                            <AppText size="M" variant="medium" text="Brand:" />
                            <AppText size="M" text={brand_name} />
                        </div>
                        <div className="flex items-center justify-between p-5">
                            <AppText size="M" variant="medium" text="Model:" />
                            <AppText size="M" text={model} />
                        </div>
                        <div className="flex items-center justify-between p-5">
                            <AppText size="M" variant="medium" text="Crystal:" />
                            <AppText size="M" text={crystal} />
                        </div>
                        <div className="flex items-center justify-between p-5">
                            <AppText size="M" variant="medium" text="Dial:" />
                            <AppText size="M" text={dial} />
                        </div>
                        <div className="flex items-center justify-between p-5">
                            <AppText size="M" variant="medium" text="Diameter:" />
                            <AppText size="M" text={diameter} />
                        </div>
                        <div className="flex items-center justify-between p-5">
                            <AppText size="M" variant="medium" text="Material:" />
                            <AppText size="M" text={material} />
                        </div>
                        <div className="flex items-center justify-between p-5">
                            <AppText size="M" variant="medium" text="Movement:" />
                            <AppText size="M" text={movement} />
                        </div>
                    </div>
                </Rollup>
            </div>
        </div>
    );
}
