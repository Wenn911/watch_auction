import { getActiveItems } from '$/api';
import { Empty } from '$/components/Empty';

import { ActiveAuction } from './components';

export const ActiveAuctions = async () => {
    const allActiveItems = await getActiveItems();

    if (!allActiveItems.length) {
        return <Empty text="Здесь пока нет активных аукционов" />;
    }

    return (
        <div className="grid gap-16">
            {allActiveItems.map((item) => (
                <ActiveAuction
                    key={item.auctions.id_auction}
                    auction={item.auctions}
                    category={item.categories}
                    item={item.items}
                />
            ))}
        </div>
    );
};
