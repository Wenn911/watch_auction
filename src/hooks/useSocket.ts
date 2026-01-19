import { useCallback, useEffect, useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import type { Auction, Bid } from '$/db/schema';

interface BidsUpdate {
    auctionId: number;
    bids: Bid[];
}

interface AuctionUpdate {
    auction: Auction;
}

interface SocketError {
    message: string;
}

export const useSocket = (auctionId?: number) => {
    const [isConnected, setIsConnected] = useState(false);
    const [bids, setBids] = useState<Bid[]>([]);
    const [auction, setAuction] = useState<Auction | null>(null);
    const [error, setError] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const socketUrl = process.env.NODE_ENV === 'production' 
            ? process.env.VITE_SOCKET_URL || undefined
            : 'http://localhost:3001';
        
        socketRef.current = io(socketUrl);

        const socket = socketRef.current;

        socket.on('connect', () => {
            setIsConnected(true);
            console.log('🟢 Connected to server');
            
            if (auctionId) {
                socket.emit('subscribe_auction', { auctionId });
            }
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            console.log('🔴 Disconnected from server');
        });

        socket.on('bids_update', (data: BidsUpdate) => {
            setBids(data.bids);
            setError(null);
        });

        socket.on('bids_data', (data: BidsUpdate) => {
            setBids(data.bids);
            setError(null);
        });

        socket.on('auction_update', (data: AuctionUpdate) => {
            setAuction(data.auction);
            setError(null);
        });

        socket.on('bid_created', () => {
            setError(null);
        });

        socket.on('error', (error: SocketError) => {
            setError(error.message);
            console.error('Socket error:', error);
        });

        return () => {
            if (auctionId && socketRef.current) {
                socketRef.current.emit('unsubscribe_auction', { auctionId });
            }
            socket.disconnect();
        };
    }, [auctionId]);

    const subscribeToAuction = useCallback((id: number) => {
        if (socketRef.current && isConnected) {
            socketRef.current.emit('subscribe_auction', { auctionId: id });
        }
    }, [isConnected]);

    const unsubscribeFromAuction = useCallback((id: number) => {
        if (socketRef.current && isConnected) {
            socketRef.current.emit('unsubscribe_auction', { auctionId: id });
        }
    }, [isConnected]);

    const getBids = useCallback((id: number) => {
        if (socketRef.current && isConnected) {
            socketRef.current.emit('get_bids', { auctionId: id });
        }
    }, [isConnected]);

    const createBid = useCallback((id: number, userId: string, amount: number) => {
        if (socketRef.current && isConnected) {
            socketRef.current.emit('create_bid', { 
                auctionId: id, 
                userId, 
                amount 
            });
        } else {
            setError('Not connected to server');
        }
    }, [isConnected]);

    return {
        isConnected,
        bids,
        auction,
        error,
        subscribeToAuction,
        unsubscribeFromAuction,
        getBids,
        createBid,
    };
};
