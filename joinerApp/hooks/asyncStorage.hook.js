import AsyncStorage from '@react-native-async-storage/async-storage'

export const useAsyncStorage = (key) => {
    const setStringItem = async (item) => {
        try {
            await AsyncStorage.setItem(key, item);
        } catch (e) {
            // saving error
        }
    }

    const setObjectItem = async (item) => {
        try {
            const jsonValue = JSON.stringify(item);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            // saving error
        }
    }

    const getStringItem = async () => {
        try {
            return await AsyncStorage.getItem(key);
        } catch(e) {
            // error reading value
        }
    }

    const getObjectItem = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            // error reading value
        }
    }

    const removeItem = async () => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {

        }
    }

    return {setStringItem, setObjectItem, getStringItem, getObjectItem, removeItem};
}