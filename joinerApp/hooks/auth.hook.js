import {useCallback, useEffect, useState} from "react";
import {useAsyncStorage} from "./asyncStorage.hook";

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ready, setReady] = useState(false);
    const {setObjectItem, getObjectItem, removeItem} = useAsyncStorage(storageName);

    const login = useCallback(async (jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);

        await setObjectItem({userId: id, token: jwtToken});
        console.log("Stored logged user");
    }, []);

    const logout = useCallback(async () => {
        setToken(null);
        setUserId(null);

        await removeItem();
        console.log("Removed logged out user");
    }, []);

    useEffect( () => {
        getFromStorage().catch(console.error);
    }, [login]);

    const getFromStorage = useCallback(async () => {
        const data = await getObjectItem();

        if (data && data.token) {
            console.log("Found already logged user");
            await login(data.token, data.userId);
        } else {
            console.log("Not found already logged user");
        }
        setReady(true);
    }, []);

    return {login, logout, token, userId, ready}
}