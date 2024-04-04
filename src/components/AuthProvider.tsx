import { PropsWithChildren, useState } from "react";
import AuthContext from "../contexts/auth.context";
import axios from "axios";
import Globals from "../etc/globals";
import UserDto from "../dto/user.dto";

function AuthProvider(props: PropsWithChildren) {
    const [userId, setUserId] = useState<string | null>(window.localStorage.getItem("userId"));
    const [accessToken, setAccessToken] = useState<string | null>(window.localStorage.getItem("accessToken"));
    const [profile, setProfile] = useState<UserDto | null>(null);

    const changeUserId = (userId: string | null) => {
        if (userId) {
            window.localStorage.setItem("userId", userId);
        } else {
            window.localStorage.removeItem("userId");
        }
        setUserId(userId);
    }

    const fetchProfile = () => {
        if (accessToken) {
            axios
                .get<UserDto>(`${Globals.API_URL}/auth/profile`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .then(res => {
                    setProfile(res.data);
                })
                .catch(err => {
                    console.log(err);
                    setAccessToken(null);
                    changeUserId(null);
                });
        }
    }

    const login = () => {
        if (userId) {
            axios
                .get<{ accessToken: string }>(`${Globals.API_URL}/auth/login/?userId=${userId}`)
                .then(res => {
                    setAccessToken(res.data.accessToken);
                    window.localStorage.setItem("accessToken", res.data.accessToken);
                    fetchProfile();
                })
                .catch(err => {
                    console.log(err);
                    changeUserId(null);
                });
        }
    }

    return (
        <AuthContext.Provider value={{
            userId,
            changeUserId,
            accessToken,
            fetchProfile,
            profile,
            login,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;