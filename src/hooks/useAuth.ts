import { useContext } from "react";
import AuthContext from "../contexts/auth.context";

export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("AuthProvider is missing!");
    return context;
}