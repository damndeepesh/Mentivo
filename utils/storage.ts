import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    setItem: async <T>(key: string, value: T): Promise<void> => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error('Error saving data', e);
        }
    },

    getItem: async <T>(key: string): Promise<T | null> => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Error reading data', e);
            return null;
        }
    },

    removeItem: async (key: string): Promise<void> => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing data', e);
        }
    },
};
