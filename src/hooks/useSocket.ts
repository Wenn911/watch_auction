'use client';

import { useEffect, useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

export const useSocket = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [bids, setBids] = useState<any[]>([]);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io(process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000', {
            path: '/api/socketio',
        });

        const socket = socketRef.current;

        socket.on('connect', () => {
            setIsConnected(true);
            console.log('🟢 Connected to server');
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            console.log('🔴 Disconnected from server');
        });

        socket.on('bids_data', (data: any[]) => {
            setBids(data);
        });

        socket.on('error', (error: { message: string }) => {
            console.error('Socket error:', error);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const getBids = (id: number) => {
        if (socketRef.current && isConnected) {
            socketRef.current.emit('get_bids', { id });
        }
    };

    const subscribeToBids = () => {
        if (socketRef.current && isConnected) {
            socketRef.current.emit('subscribe_bids');
        }
    };

    return {
        isConnected,
        bids,
        getBids,
        subscribeToBids,
    };
};
