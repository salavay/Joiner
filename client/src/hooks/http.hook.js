import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'Get', body = null, headers = {}) => {
        setLoading(true);
        try {
            console.log("In Request:", body);
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Server Error');
            }

            setLoading(true);

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