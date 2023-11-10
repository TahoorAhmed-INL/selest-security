import io from 'socket.io-client';
import { BASE_URL } from '../api';

class SocketManager {
    constructor() {
        this.socket = null;
    }

    initializeSocket() {
        try {
            this.socket = io(BASE_URL, {
                transports: ['websocket'],
            });

            console.log('Initializing socket', this.socket);

            this.socket.on('connected', (data) => {
                console.log(data);
            });
            this.socket.on('chat', (data) => {
                console.log(data,"getting token after joined a group of chat");
            });

            this.socket.on('disconnect', (reason) => {
                console.log('Socket disconnected with reason:', reason);
            });

            this.socket.on('error', (error) => {
                console.error('Socket error:', error);
            });

        } catch (err) {
            console.log('Socket is not initialized', err);
        }
    }

    emit(event, data = {}) {
        this.socket.emit(event, data);
    }
    on(event, cb) {
        this.socket.on(event, cb);
    }
    removeListener(listenerName) {
        this.socket.removeListener(listenerName);
    }

    disconnectSocket() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

const socketManager = new SocketManager();

export default socketManager;