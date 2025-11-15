import { AppDropdown } from "$/components/AppDropdown";
import { AppText } from "$/components/AppText";
import type { Category, Item, Item_instance, Watch_detail } from "$/db/schema";

interface DetaildProps { 
    data: {
        item_instances: Item_instance;
        categories: Category;
        items: Item;
        watch_details: Watch_detail
    }
}

export const Details = ({ data }: DetaildProps) => {
    const { categories, items, watch_details, item_instances } = data;

    const { name_category } = categories

    const { brand_name, model, material } = items;

    const { productionYear, item_condition } = item_instances;

    const { accessories, country, crystal, dial, diameter, movement } = watch_details;

    return (
        <AppDropdown title="Подробности">
            <div className="space-y-4 pt-6 pb-4">
                <div className="flex items-center justify-between p-5">
                    <AppText size="M" text="Type" variant="medium" />
                    <AppText className="text-[rgba(255,255,255,0.6)]" size="S" text={name_category} />
                </div>
                <div className="flex items-center justify-between p-5">
                    <AppText size="M" text="Country" variant="medium" />
                    <AppText className="text-[rgba(255,255,255,0.6)]" size="M" text={country} />
                </div>
                <div className="flex items-center justify-between p-5">
                    <AppText size="M" text="Condition" variant="medium" />
                    <AppText className="text-[rgba(255,255,255,0.6)]" size="M" text={item_condition} />
                </div>
                <div className="flex items-center justify-between p-5">
                    <AppText size="M" text="Accessories" variant="medium" />
                    <AppText className="text-[rgba(255,255,255,0.6)]" size="M" text={accessories} />
                </div>
                <div className="flex items-center justify-between p-5">
                    <AppText size="M" text="Production Year" variant="medium" />
                    <AppText className="text-[rgba(255,255,255,0.6)]" size="M" text={productionYear.toString()} />
                </div>
                <div className="flex items-center justify-between p-5">
                    <AppText size="M" text="Brand" variant="medium" />
                    <AppText className="text-[rgba(255,255,255,0.6)]" size="M" text={brand_name} />
                </div>
                <div className="flex items-center justify-between p-5">
                    <AppText size="M" text="Model" variant="medium" />
                    <AppText className="text-[rgba(255,255,255,0.6)]" size="M" text={model} />
                </div>
                <div className="flex items-center justify-between p-5">
                    <AppText size="M" text="Crystal" variant="medium" />
                    <AppText className="text-[rgba(255,255,255,0.6)]" size="M" text={crystal} />
                </div>
                <div className="flex items-center justify-between p-5">
                    <AppText size="M" text="Dial" variant="medium" />
                    <AppText className="text-[rgba(255,255,255,0.6)]" size="M" text={dial} />
                </div>
                <div className="flex items-center justify-between p-5">
                    <AppText size="M" text="Diameter" variant="medium" />
                    <AppText className="text-[rgba(255,255,255,0.6)]" size="M" text={diameter} />
                </div>
                <div className="flex items-center justify-between p-5">
                    <AppText size="M" text="Material" variant="medium" />
                    <AppText className="text-[rgba(255,255,255,0.6)]" size="M" text={material} />
                </div>
                {movement && (
                    <div className="flex items-center justify-between p-5">
                        <AppText size="M" text="Movement" variant="medium" />
                        <AppText className="text-[rgba(255,255,255,0.6)]" size="M" text={movement} />
                    </div>
                )}
            </div>
        </AppDropdown>
    )
}