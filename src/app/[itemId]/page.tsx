import { getItemCard, getActiveItems } from '$/api';
import { Details, Info } from '$/containers/AuctionId';

export async function generateStaticParams() {
    const allItems = await getActiveItems();

    return allItems.map((post) => ({
        itemId: post.items.id_item.toString(),
    }));
}

export default async function ItemPage({ params }: { params: Promise<{ itemId: string }> }) {
    const { itemId } = await params;

    const item = await getItemCard(parseInt(itemId));

    if (!item) {
        return <div>Товар не найден</div>;
    }

    return (
        <div className="grid gap-16">
            <Info data={item.items} />
            <Details data={item} />
        </div>
    );
}
