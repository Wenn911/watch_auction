import { getWatches } from '$/api';
import { Empty } from '$/components/Empty';

import { ActiveAuction } from './components';

export const ActiveAuctions = async () => {
    const allWatches = await getWatches();

    if (!allWatches.length) {
        return <Empty text="Здесь пока нет активных аукционов" />;
    }

    return (
        <div className="grid gap-16">
            {allWatches.map((item) => (
                <ActiveAuction
                    key={item.id}
                    auction={item}
                />
            ))}
        </div>
    );
};
