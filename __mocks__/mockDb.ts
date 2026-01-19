type Category = {
    id_category: number;
    name_category: string;
    createdAt: string;
};

type Item = {
    id_item: number;
    category_id: number;
    refCode: string;
    brand_name: string;
    model: string;
    item_condition: 'New' | 'Used' | 'Unworn';
    material: string;
    productionYear: number;
    image: string;
    createdAt: string;
    updatedAt: string;
};

type WatchDetail = {
    id_watch_detail: number;
    item_id: number;
    crystal: string;
    dial: string;
    diameter: string;
    movement?: string | null;
    country: string;
    accessories: string;
    createdAt: string;
    updatedAt: string;
};

type Auction = {
    id_auction: number;
    item_id: number;
    start_price: string;
    current_price: string | null;
    start_time: string;
    end_time: string;
    status: 'active' | 'ended' | 'pending' | 'cancelled';
    createdAt: string;
    updatedAt: string;
};

type ItemImage = {
    id_image: number;
    item_id: number;
    images: string;
};

type Bid = {
    id_bid: number;
    auction_id: number;
    user_id: string;
    amount: string;
    createdAt: string;
};

function nowIso() {
    return new Date().toISOString();
}

function addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60_000);
}

// Простое in-memory хранилище для дев/локальной проверки (без БД)
const createdAt = nowIso();
const baseTime = new Date();

const categories: Category[] = [
    { id_category: 1, name_category: 'Watches', createdAt },
    { id_category: 2, name_category: 'Luxury', createdAt },
];

const items: Item[] = [
    {
        id_item: 1,
        category_id: 1,
        refCode: 'ROLEX-SUB-114060',
        brand_name: 'Rolex',
        model: 'Submariner 114060',
        item_condition: 'Unworn',
        material: 'Steel',
        productionYear: 2022,
        image: '/logo.png',
        createdAt,
        updatedAt: createdAt,
    },
    {
        id_item: 2,
        category_id: 2,
        refCode: 'OMEGA-SPD-311.30',
        brand_name: 'Omega',
        model: 'Speedmaster Professional',
        item_condition: 'Used',
        material: 'Steel',
        productionYear: 2019,
        image: '/logo.png',
        createdAt,
        updatedAt: createdAt,
    },
];

const watch_details: WatchDetail[] = [
    {
        id_watch_detail: 1,
        item_id: 1,
        crystal: 'Sapphire',
        dial: 'Black',
        diameter: '40mm',
        movement: 'Automatic',
        country: 'Switzerland',
        accessories: 'Box, Papers',
        createdAt,
        updatedAt: createdAt,
    },
    {
        id_watch_detail: 2,
        item_id: 2,
        crystal: 'Hesalite',
        dial: 'Black',
        diameter: '42mm',
        movement: 'Manual',
        country: 'Switzerland',
        accessories: 'Box',
        createdAt,
        updatedAt: createdAt,
    },
];

const auctions: Auction[] = [
    {
        id_auction: 101,
        item_id: 1,
        start_price: '10000.00',
        current_price: '11200.00',
        start_time: baseTime.toISOString(),
        end_time: addMinutes(baseTime, 120).toISOString(),
        status: 'active',
        createdAt,
        updatedAt: createdAt,
    },
    {
        id_auction: 102,
        item_id: 2,
        start_price: '6500.00',
        current_price: null,
        start_time: baseTime.toISOString(),
        end_time: addMinutes(baseTime, 90).toISOString(),
        status: 'active',
        createdAt,
        updatedAt: createdAt,
    },
];

const item_images: ItemImage[] = [
    { id_image: 1, item_id: 1, images: '/logo.png' },
    { id_image: 2, item_id: 1, images: '/logo.png' },
    { id_image: 3, item_id: 2, images: '/logo.png' },
];

let bidAutoInc = 1000;
const bids: Bid[] = [
    {
        id_bid: ++bidAutoInc,
        auction_id: 101,
        user_id: 'demo_user_1',
        amount: '11000.00',
        createdAt: addMinutes(baseTime, -10).toISOString(),
    },
    {
        id_bid: ++bidAutoInc,
        auction_id: 101,
        user_id: 'demo_user_2',
        amount: '11200.00',
        createdAt: addMinutes(baseTime, -5).toISOString(),
    },
];

function sortBidsDesc(list: Bid[]) {
    return [...list].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export const mockDb = {
    isEnabled() {
        return process.env.MOCK_DB === '1';
    },

    async getActiveItems() {
    // Возвращаем shape как у drizzle join: { auctions, items, categories }
        return auctions
            .filter((a) => a.status === 'active')
            .map((a) => {
                const item = items.find((i) => i.id_item === a.item_id)!;
                const cat = categories.find((c) => c.id_category === item.category_id)!;
                return { auctions: a, items: item, categories: cat };
            });
    },

    async getItemCard(id: number) {
        const item = items.find((i) => i.id_item === id);
        if (!item) return null;
        const details = watch_details.find((d) => d.item_id === id);
        const cat = categories.find((c) => c.id_category === item.category_id);
        if (!details || !cat) return null;
        return { items: item, watch_details: details, categories: cat };
    },

    async getItemImages(id: number) {
        const item = items.find((i) => i.id_item === id);
        if (!item) return [];
        const extra = item_images.filter((im) => im.item_id === id).map((im) => im.images);
        const main = item.image ? [item.image] : [];
        return [...main, ...extra];
    },

    async getAuctionByItemId(itemId: number) {
        return auctions.find((a) => a.item_id === itemId) ?? null;
    },

    async getAuctionById(auctionId: number) {
        return auctions.find((a) => a.id_auction === auctionId) ?? null;
    },

    async getBidsByAuctionId(auctionId: number) {
        return sortBidsDesc(bids.filter((b) => b.auction_id === auctionId));
    },

    async createBid(auctionId: number, userId: string, amount: number) {
        if (!auctionId || Number.isNaN(auctionId) || auctionId <= 0) {
            throw new Error('Invalid auction ID');
        }
        if (!userId || userId.trim() === '') {
            throw new Error('Invalid user ID');
        }
        if (!amount || amount <= 0) {
            throw new Error('Invalid bid amount');
        }

        const auction = auctions.find((a) => a.id_auction === auctionId);
        if (!auction) throw new Error('Auction not found');
        if (auction.status !== 'active') throw new Error('Auction is not active');

        const currentPrice = auction.current_price ? parseFloat(auction.current_price) : parseFloat(auction.start_price);
        if (amount <= currentPrice) {
            throw new Error('Bid amount must be greater than current price');
        }

        const newBid: Bid = {
            id_bid: ++bidAutoInc,
            auction_id: auctionId,
            user_id: userId,
            amount: amount.toFixed(2),
            createdAt: nowIso(),
        };
        bids.push(newBid);

        auction.current_price = newBid.amount;
        auction.updatedAt = nowIso();

        return newBid;
    },
};

