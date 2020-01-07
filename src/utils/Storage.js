// import { AsyncStorage } from "react-native"
import AsyncStorage from '@react-native-community/async-storage';

let storageShared = null;

export default class Storage {
    constructor() {
        if (!storageShared) {
            storageShared = this;
        }
        return storageShared;
    }
    static shared() {
        if (!storageShared) {
            return new Storage();
        } else {
            return storageShared;
        }
    }
    clearStorage = async (key) => {
        await AsyncStorage.removeItem(key)
    }
    setStorage = async (key, value) => {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    };
    getStorage = async key => {
        let value = await AsyncStorage.getItem(key)
        return JSON.parse(value);
    };
}
