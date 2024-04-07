import { PropsWithChildren, useState } from "react";
import { Socket } from "socket.io-client";
import SocketContext from "../contexts/socket.context";
import ChatMessageDto from "../dto/chat-message.dto";

interface SocketProviderProps {
    socket: Socket;
}

function SocketProvider(props: PropsWithChildren<SocketProviderProps>) {
    const socket = props.socket;

    const [chatData, setChatData] = useState<ChatMessageDto[]>([]);

    const onUpdateChat = (data: ChatMessageDto[]) => {
        // console.log(data);
        setChatData(data);
    }

    const eventMapping = {
        UPDATE_CHAT: onUpdateChat
    };

    const init = () => {
        Object.entries(eventMapping).forEach(([key, value]) => {
            socket.on(key, value);
        });
    }

    const cleanUp = () => {
        Object.entries(eventMapping).forEach(([key, value]) => {
            socket.off(key, value);
        });
    }

    // useEffect(() => {
    //     init();
    //     return cleanUp;
    // }, []);

    const connect = () => {
        if (!socket.connected) {
            init();
            socket.connect();
        }
    }

    const disconnect = () => {
        if (!socket.disconnected) {
            cleanUp();
            socket.disconnect();
        }
    }

    const sendMessage = (message: string, accessToken: string) => {
        socket.emit("SEND_MESSAGE", { message, accessToken });
    }

    return (
        <SocketContext.Provider value={{
            socket,
            chatData,
            connect,
            disconnect,
            sendMessage
        }}>
            {props.children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;