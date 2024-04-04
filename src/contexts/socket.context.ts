import { createContext } from "react";
import { Socket } from "socket.io-client";
import ChatMessageDto from "../dto/chat-message.dto";

interface SocketContextProps {
    socket: Socket;
    chatData: ChatMessageDto[];
    connect: () => void;
    disconnect: () => void;
    sendMessage: (message: string, accessToken: string) => void;
}

const SocketContext = createContext<SocketContextProps | null>(null);

export default SocketContext;