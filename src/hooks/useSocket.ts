import { useContext } from "react";
import SocketContext from "../contexts/socket.context";

function useSocket() {
    const context = useContext(SocketContext);
    if (!context) throw new Error("SocketProvider is missing!");
    return context;
}

export default useSocket;