import { initializeSocketIO } from './socket-sever';

export async function GET() {
    initializeSocketIO();

    return new Response(JSON.stringify({ status: 'Socket.IO server is running' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
