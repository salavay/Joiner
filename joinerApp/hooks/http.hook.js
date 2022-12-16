import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const serverUrl = ''; // todo move to config

    const request = useCallback(async ({url, method = 'Get', body = null, headers = {}, isJson = true}) => {
        url = url.startsWith('/') ? serverUrl + url : url;
        setLoading(true);
        try {
            if (body && isJson) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Server Error');
            }

            setLoading(false);

            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(
        () => {
            setError(null);
        },
        [],
    );

    return {loading, request, error, clearError};
}