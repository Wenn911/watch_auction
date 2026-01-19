import { AuctionItem } from '$/components/AuctionItem';
import { Empty } from '$/components/Empty';
import { useGetActiveItemsQuery } from '$/store/api';

export const ActiveAuctions = () => {
    const { data: allActiveItems = [], isLoading } = useGetActiveItemsQuery();

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

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
