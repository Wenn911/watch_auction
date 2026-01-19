import { useParams } from 'react-router-dom';
import { Bids, Details, Info } from '$/containers/AuctionId';
import { useGetItemQuery, useGetItemImagesQuery, useGetAuctionByItemIdQuery } from '$/store/api';

export default function ItemPage() {
    const { itemId } = useParams<{ itemId: string }>();
    const itemIdNum = itemId ? parseInt(itemId, 10) : 0;

    const { data: item, isLoading: itemLoading } = useGetItemQuery(itemIdNum);
    const { data: images, isLoading: imagesLoading } = useGetItemImagesQuery(itemIdNum);
    const { data: auction, isLoading: auctionLoading } = useGetAuctionByItemIdQuery(itemIdNum);

    if (itemLoading || imagesLoading || auctionLoading) {
        return <div>Загрузка...</div>;
    }

    if (!item || !images || !auction) {
        return <div>Товар не найден</div>;
    }

    return (
        <div className="grid gap-16">
            <Info data={item.items} images={images} />
            <Details data={item} />
            <Bids auction={auction} />
        </div>
    );
}
