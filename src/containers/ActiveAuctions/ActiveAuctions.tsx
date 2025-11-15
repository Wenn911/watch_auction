import { getActiveItems } from '$/api';
import { AuctionItem } from '$/components/AuctionItem';
import { Empty } from '$/components/Empty';

export const ActiveAuctions = async () => {
    const allActiveItems = await getActiveItems();

    if (!allActiveItems.length) {
        return <Empty text="Здесь пока нет активных аукционов" />;
    }

    return (
        <div className="grid gap-16">
            {allActiveItems.map((item) => (
                <AuctionItem
                    key={item.auctions.id_auction}
                    auction={item.auctions}
                    category={item.categories}
                    instance={item.item_instances}
                    item={item.items}
                />
            ))}
        </div>
    );
};
