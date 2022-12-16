import {useCallback, useEffect, useState} from "react";
import {useAsyncStorage} from "./asyncStorage.hook";
import {useHttp} from "./http.hook";

const storageName = 'userData';

export const useAuth = () => {
    const {request} = useHttp();
    const [token, setToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [ready, setReady] = useState(false);
    const {setObjectItem, getObjectItem, removeItem} = useAsyncStorage(storageName);

    const login = useCallback(async (jwtToken, user) => {
        setToken(jwtToken);
        setCurrentUser(user);

        await setObjectItem({user, token: jwtToken});
        console.log("Stored logged user");
    }, []);

    const logout = useCallback(async () => {
        setToken(null);
        setCurrentUser(null);

        await removeItem();
        console.log("Removed logged out user");
    }, []);

    useEffect( () => {
        getFromStorage().catch(console.error);
    }, [login]);

    const getFromStorage = useCallback(async () => {
        const data = await getObjectItem();

        if (data && data.token) {
            const result = await request({
                url: '/api/auth/verifyJWT',
                method: 'post',
                body: {
                    token: data.token
                }
            })
            if (!result) {
                console.log('JWT expired!');
                await logout();
                return;
            }
            console.log('JWT is valid!');
            await login(data.token, data.user);
        } else {
            console.log("Not found already logged user");
        }
        setReady(true);
    }, []);

    return {login, logout, token, user: currentUser, ready}
}