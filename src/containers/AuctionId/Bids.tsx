import { AppInput } from "$/components/AppInput";
import { AppText } from "$/components/AppText";
import type { Auction } from "$/db/schema";
import { useSocket } from "$/hooks/useSocket";
import { useTelegram } from "$/hooks/useTelegram";
import { useCreateBidMutation } from "$/store/api";
import { useEffect, useState } from 'react';

interface BidsProps {
    auction: Auction;
}

export const Bids = ({ auction }: BidsProps) => {
    const [bidAmount, setBidAmount] = useState('');
    const { user, showAlert } = useTelegram();
    const { bids, auction: updatedAuction, error, isConnected } = useSocket(auction.id_auction);
    const [createBidMutation, { isLoading: isSubmitting }] = useCreateBidMutation();

    const currentPrice = updatedAuction?.current_price 
        ? parseFloat(updatedAuction.current_price.toString()) 
        : (auction.current_price ? parseFloat(auction.current_price.toString()) : parseFloat(auction.start_price.toString()));

    const quickBidSteps = [
        Math.ceil(currentPrice * 1.1),
        Math.ceil(currentPrice * 1.2),
        Math.ceil(currentPrice * 1.3),
    ];

    useEffect(() => {
        if (error) {
            showAlert(error);
        }
    }, [error, showAlert]);

    const handleQuickBid = (amount: number) => {
        setBidAmount(amount.toString());
    };

    const handleBidSubmit = async () => {
        if (!isConnected) {
            showAlert('Нет соединения с сервером. Пожалуйста, подождите...');
            return;
        }

        const userId = user?.id?.toString() || 'test-user-' + Date.now();
        
        const amount = parseFloat(bidAmount);
        
        if (isNaN(amount) || amount <= 0) {
            showAlert('Введите корректную сумму ставки');
            return;
        }

        if (amount <= currentPrice) {
            showAlert(`Ставка должна быть больше текущей цены: ${currentPrice}$`);
            return;
        }

        try {
            await createBidMutation({
                auctionId: auction.id_auction,
                userId,
                amount,
            }).unwrap();
            
            setBidAmount('');
            showAlert('Ставка успешно поставлена!');
        } catch (err) {
            const errorMessage = err && typeof err === 'object' && 'data' in err 
                ? (err.data as { error?: string })?.error || 'Ошибка при создании ставки'
                : 'Ошибка при создании ставки';
            showAlert(errorMessage);
        }
    };

    const formatPrice = (price: number) => {
        return `${Math.round(price)}$`;
    };

    const submitButtonClassName = `flex w-full items-center justify-center py-8 px-4 mt-16 rounded-xl bg-(--button-primary) ${
        isSubmitting || !isConnected ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80 transition-opacity'
    }`;

    const formatDate = (date: Date | string | null) => {
        if (!date) return '—';
        const d = typeof date === 'string' ? new Date(date) : date;
        return new Intl.DateTimeFormat('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(d);
    };

    const isMyBid = (bidUserId: string) => {
        return user?.id?.toString() === bidUserId;
    };

    const recentBids = bids.slice(0, 10);

    return (
        <div className="flex w-full flex-col gap-24 rounded-lg bg-(--bg-primary) p-10">
            <div className='flex flex-col gap-12'>
                <div className="flex flex-col gap-4">
                    <AppText size="M" text={`Текущая цена: ${formatPrice(currentPrice)}`} variant="semibold" />
                    {bids.length > 0 && (
                        <AppText 
                            className="text-[rgba(255,255,255,0.6)]" 
                            size="S" 
                            text={`Всего ставок: ${bids.length}`} 
                        />
                    )}
                </div>
                {recentBids.length > 0 && (
                    <div className="flex flex-col gap-8 rounded-lg bg-[rgba(87,92,112,0.2)] p-8 max-h-64 overflow-y-auto">
                        <AppText 
                            className="mb-4" 
                            size="S" 
                            text="Последние ставки:"
                            variant="medium"
                        />
                        <div className="flex flex-col gap-4">
                            {recentBids.map((bid) => (
                                <div
                                    key={bid.id_bid}
                                    className={`flex items-center justify-between rounded-lg p-6 transition-colors ${
                                        isMyBid(bid.user_id)
                                            ? 'bg-[rgba(26,97,89,0.3)] border border-(--primary)'
                                            : 'bg-[rgba(87,92,112,0.1)]'
                                    }`}
                                >
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-4">
                                            <AppText 
                                                className={isMyBid(bid.user_id) ? 'text-(--primary)' : ''} 
                                                size="S"
                                                text={formatPrice(parseFloat(bid.amount.toString()))}
                                                variant="semibold"
                                            />
                                            {isMyBid(bid.user_id) && (
                                                <AppText 
                                                    className="text-(--primary)" 
                                                    size="XS"
                                                    text="(Ваша ставка)"
                                                />
                                            )}
                                        </div>
                                        <AppText 
                                            className="text-[rgba(255,255,255,0.5)]" 
                                            size="XS"
                                            text={formatDate(bid.createdAt)}
                                        />
                                    </div>
                                    <AppText 
                                        className="text-[rgba(255,255,255,0.4)]" 
                                        size="XS"
                                        text={`ID: ${bid.user_id.slice(0, 8)}...`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <AppInput 
                    placeholder={`Минимум ${formatPrice(currentPrice + 1)}`}
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value.replace(/[^\d.]/g, ''))}
                />
                
                <div className="flex gap-4">
                    {quickBidSteps.map((step) => (
                        <button
                            key={step}
                            className="flex items-center py-4 px-8 bg-(--button-primary) rounded-xl hover:opacity-80 transition-opacity"
                            onClick={() => handleQuickBid(step)}
                        >
                            <AppText size="XS" text={formatPrice(step)} />
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="flex gap-16 justify-between">
                <button 
                    className={submitButtonClassName}
                    disabled={isSubmitting || !isConnected}
                    onClick={handleBidSubmit}
                >
                    {isSubmitting ? 'Отправка...' : 'Поставить ставку'}
                </button>
            </div>
            
            {!isConnected && (
                <AppText 
                    className="text-[rgba(255,255,255,0.6)] text-center" 
                    size="S" 
                    text="Подключение к серверу..." 
                />
            )}
        </div>
    );
}