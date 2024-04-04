import { createContext } from "react";
import UserDto from "../dto/user.dto";

interface AuthContextProps {
    userId: string | null;
    changeUserId: (userId: string | null) => void;
    accessToken: string | null;
    fetchProfile: () => void;
    profile: UserDto | null;
    login: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default AuthContext;