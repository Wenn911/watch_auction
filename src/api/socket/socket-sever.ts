import { Server as NetServer } from 'http';
import type { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export type NextApiResponseWithSocket = NextApiResponse & {
    socket: {
        server: NetServer & {
            io?: SocketIOServer;
        };
    };
};

let io: SocketIOServer | null = null;

export function initializeSocketIO() {
    if (io) return io;

    const httpServer = new NetServer();
    io = new SocketIOServer(httpServer, {
        // path: '/api/socketio',
        addTrailingSlash: false,
        cors: {
            origin: process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL : 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('🟢 Client connected:', socket.id);

        socket.on('get_watch', async (data: { id: number }) => {
            try {
                // const watch = await getBidsByWatchId(data.id);
                const watch = data;
                if (watch) {
                    socket.emit('watch_data', watch);
                } else {
                    socket.emit('error', { message: 'Watch not found' });
                }
            } catch (error) {
                socket.emit('error', { message: error });
            }
        });

        socket.on('subscribe_watches', async () => {
            // const watches = await getBidsByWatchId();
            const watches = 123;
            socket.emit('watches_update', watches);
        });

        socket.on('disconnect', () => {
            console.log('🔴 Client disconnected:', socket.id);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    });

    return io;
}

export function getSocketIO() {
    if (!io) {
        throw new Error('Socket.IO not initialized');
    }
    return io;
}
