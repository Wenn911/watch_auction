import { getActiveItems, getItemCard, getItemImages } from '$/api';
import { Bids, Details, Info } from '$/containers/AuctionId';

export async function generateStaticParams() {
    const allItems = await getActiveItems();

    return allItems.map((post) => ({
        itemId: post.auctions.id_auction.toString(),
    }));
}

export default async function ItemPage({ params }: { params: Promise<{ itemId: string }> }) {
    const { itemId } = await params;

    const item = await getItemCard(parseInt(itemId));

    const images = await getItemImages(parseInt(itemId));

    if (!images) {
        return null;
    }

    if (!item) {
        return <div>Товар не найден</div>;
    }

    return (
        <div className="grid gap-16">
            <Info dataInstance={item.item_instances} dataItem={item.items} images={images} />
            <Details data={item} />
            <Bids />
        </div>
    );
}
